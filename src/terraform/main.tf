provider "aws" {
  region  = "us-east-1"
  profile = "personal"
}

# API Gateway
resource "aws_apigatewayv2_api" "main" {
  name          = "boca-boa-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "main" {
  api_id      = aws_apigatewayv2_api.main.id
  name        = "$default"
  auto_deploy = true
}

# DynamoDB Tables
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

# CloudWatch Logs policy
resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Stickers Lambda Function
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

# Stickers API Routes
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
