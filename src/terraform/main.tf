provider "aws" {
  region  = var.region
  profile = "personal"
}

# ---------------------
#   Cognito
# ---------------------

resource "aws_cognito_user_pool" "main" {
  name = "boca-boa-user-pool"

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  username_attributes = ["email"]
  auto_verify_attributes = ["email"]

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
  }
}

resource "aws_cognito_user_pool_client" "main" {
  name         = "boca-boa-client"
  user_pool_id = aws_cognito_user_pool.main.id

  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH"
  ]
}


# ---------------------
#   API Gateway
# ---------------------

resource "aws_apigatewayv2_api" "main" {
  name          = "boca-boa-api"
  protocol_type = "HTTP"
  
  cors_configuration {
    allow_headers = ["Content-Type", "Authorization"]
    allow_methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    allow_origins = ["*"] # replace with frotend endpoint in production
    max_age       = 300
  }
}

resource "aws_apigatewayv2_stage" "main" {
  api_id      = aws_apigatewayv2_api.main.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_authorizer" "main" {
  api_id          = aws_apigatewayv2_api.main.id
  authorizer_type = "JWT"
  identity_sources = ["$request.header.Authorization"]
  name            = "cognito-authorizer"

  jwt_configuration {
    audience = [aws_cognito_user_pool_client.main.id]
    issuer = "https://cognito-idp.${var.region}.amazonaws.com/${aws_cognito_user_pool.main.id}"
  }
}

# ---------------------
#   Dynamodb
# ---------------------

module "users_table" {
  source        = "./modules/dynamodb"
  table_name    = "users"
  hash_key_name = "id"
  hash_key_type = "N"
}

module "stickers_table" {
  source        = "./modules/dynamodb"
  table_name    = "stickers"
  hash_key_name = "id"
  hash_key_type = "S"
}

module "orders_table" {
  source        = "./modules/dynamodb"
  table_name    = "orders"
  hash_key_name = "id"
  hash_key_type = "S"
}

module "promotions_table" {
  source        = "./modules/dynamodb"
  table_name    = "promotions"
  hash_key_name = "id"
  hash_key_type = "S"
}

# ---------------------
#   IAM Roles
# ---------------------

# IAM Role for Lambda
resource "aws_iam_role" "lambda_role" {
  name = "sticker_shop_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# IAM Policy for DynamoDB access
resource "aws_iam_role_policy" "dynamodb_policy" {
  name = "sticker_shop_dynamodb_policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Scan",
          "dynamodb:Query"
        ]
        Resource = [
          module.users_table.table_arn,
          module.stickers_table.table_arn,
          module.orders_table.table_arn,
          module.promotions_table.table_arn
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy" "cognito_policy" {
  name = "sticker_shop_cognito_policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "cognito-idp:AdminCreateUser",
          "cognito-idp:AdminSetUserPassword",
          "cognito-idp:AdminInitiateAuth",
          "cognito-idp:AdminRespondToAuthChallenge",
          "cognito-idp:AdminConfirmSignUp"
        ]
        Resource = [aws_cognito_user_pool.main.arn]
      }
    ]
  })
}

# CloudWatch Logs policy
resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# ---------------------
#   Lambdas
# ---------------------

# Users
module "users_lambda" {
  source        = "./modules/lambda"
  function_name = "users_handler"
  role_arn      = aws_iam_role.lambda_role.arn
  handler       = "lambda_function.lambda_handler"
  zip_file      = "./deployments/users.zip"
  layers = []
  environment_variables = {
    COGNITO_USER_POOL_ID = aws_cognito_user_pool.main.id
    COGNITO_CLIENT_ID    = aws_cognito_user_pool_client.main.id
  }
  api_gw_execution_arn = aws_apigatewayv2_api.main.execution_arn
}

# Stickers
module "stickers_lambda" {
  source               = "./modules/lambda"
  function_name        = "stickers_handler"
  role_arn             = aws_iam_role.lambda_role.arn
  handler              = "lambda_function.lambda_handler"
  zip_file             = "./deployments/stickers.zip"
  layers = []
  environment_variables = {}
  api_gw_execution_arn = aws_apigatewayv2_api.main.execution_arn
}

# Orders
module "orders_lambda" {
  source               = "./modules/lambda"
  function_name        = "orders_handler"
  role_arn             = aws_iam_role.lambda_role.arn
  handler              = "lambda_function.lambda_handler"
  zip_file             = "./deployments/orders.zip"
  layers = []
  environment_variables = {}
  api_gw_execution_arn = aws_apigatewayv2_api.main.execution_arn
}

# ---------------------
#   API Routes
# ---------------------

# Users
module "users_signup_route" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.main.id
  method            = "POST"
  path              = "/auth/signup"
  lambda_invoke_arn = module.users_lambda.invoke_arn
}

module "users_login_route" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.main.id
  method            = "POST"
  path              = "/auth/login"
  lambda_invoke_arn = module.users_lambda.invoke_arn
}

module "users_confirm_signup_route" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.main.id
  method            = "POST"
  path              = "/auth/confirm"
  lambda_invoke_arn = module.users_lambda.invoke_arn
}

module "users_get_route" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.main.id
  method            = "GET"
  path              = "/users/{userId}"
  lambda_invoke_arn = module.users_lambda.invoke_arn
  authorizer_id     = aws_apigatewayv2_authorizer.main.id
}

module "users_update_route" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.main.id
  method            = "PUT"
  path              = "/users/{userId}"
  lambda_invoke_arn = module.users_lambda.invoke_arn
  authorizer_id     = aws_apigatewayv2_authorizer.main.id
}

module "users_delete_route" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.main.id
  method            = "DELETE"
  path              = "/users/{userId}"
  lambda_invoke_arn = module.users_lambda.invoke_arn
  authorizer_id     = aws_apigatewayv2_authorizer.main.id
}

# Update existing routes to use authorizer
# module "stickers_create_route" {
#   source            = "./modules/api_gateway"
#   api_id            = aws_apigatewayv2_api.main.id
#   method            = "POST"
#   path              = "/stickers"
#   lambda_invoke_arn = module.stickers_lambda.invoke_arn
#   authorizer_id     = aws_apigatewayv2_authorizer.main.id
# }

# Stickers
module "stickers_create_route" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.main.id
  method            = "POST"
  path              = "/stickers"
  lambda_invoke_arn = module.stickers_lambda.invoke_arn
}

module "stickers_get_route" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.main.id
  method            = "GET"
  path              = "/stickers/{id}"
  lambda_invoke_arn = module.stickers_lambda.invoke_arn
}

module "stickers_list_route" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.main.id
  method            = "GET"
  path              = "/stickers"
  lambda_invoke_arn = module.stickers_lambda.invoke_arn
}

module "stickers_update_route" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.main.id
  method            = "PUT"
  path              = "/stickers/{id}"
  lambda_invoke_arn = module.stickers_lambda.invoke_arn
}

module "stickers_delete_route" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.main.id
  method            = "DELETE"
  path              = "/stickers/{id}"
  lambda_invoke_arn = module.stickers_lambda.invoke_arn
}

# Orders
module "orders_create_route" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.main.id
  method            = "POST"
  path              = "/orders"
  lambda_invoke_arn = module.orders_lambda.invoke_arn
}

module "orders_get_route" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.main.id
  method            = "GET"
  path              = "/orders/{id}"
  lambda_invoke_arn = module.orders_lambda.invoke_arn
}

module "orders_list_route" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.main.id
  method            = "GET"
  path              = "/orders"
  lambda_invoke_arn = module.orders_lambda.invoke_arn
}

module "orders_update_status_route" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.main.id
  method            = "PUT"
  path              = "/orders/{id}/status"
  lambda_invoke_arn = module.orders_lambda.invoke_arn
}