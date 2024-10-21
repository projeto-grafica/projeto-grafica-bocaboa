provider "aws" {
  region = "us-east-1"
}

# ----------------------------------------
# Criação de Recursos
# ----------------------------------------

# # Cria o bucket S3
# module "s3_bucket" {
#   source      = "./modules/s3"
#   bucket_name = "[ADICIONAR AQUI NOME CASO O BUCKET FOR NECESSÁRIO]-bucket"
# }

# Cria a tabela DynamoDB
module "dynamodb_MUDAR_NOME" {
  source         = "./modules/dynamodb"
  table_name     = "[ADICIONAR AQUI O NOME DA TABELA]"
  hash_key_name  = "[PREENCHER]"
  hash_key_type  = "S"
  range_key_name = "[PREENCHER]"
  range_key_type = "S"
}

# Cria a tabela de Pre Registered Users
module "dynamodb_pre_registered_users" {
  source        = "./modules/dynamodb"
  table_name    = "pre-registered-users"
  hash_key_name = "email"
  hash_key_type = "S"
}

# Cria o Cognito User Pool e App Client
module "cognito" {
  source = "./modules/cognito"

  user_pool_name  = "sphe-user-pool"
  app_client_name = "sphe-app-client"
}

# ----------------------------------------
# IAM Roles e Permissões
# ----------------------------------------

# Cria a role IAM para as Lambdas
resource "aws_iam_role" "lambda_role" {
  name = "lambda_execution_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      Effect = "Allow"
      Sid    = ""
    }]
  })
}

# Anexa políticas gerenciadas amplas à role
resource "aws_iam_role_policy_attachment" "lambda_full_access_s3" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
  role       = aws_iam_role.lambda_role.name

  depends_on = [aws_iam_role.lambda_role]
}

resource "aws_iam_role_policy_attachment" "lambda_full_access_dynamodb" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
  role       = aws_iam_role.lambda_role.name

  depends_on = [aws_iam_role.lambda_role]
}

resource "aws_iam_role_policy_attachment" "lambda_full_access_cognito" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonCognitoPowerUser"
  role       = aws_iam_role.lambda_role.name

  depends_on = [aws_iam_role.lambda_role]
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_role.name

  depends_on = [aws_iam_role.lambda_role]
}

# ----------------------------------------
# Criação de Lambda Layers
# ----------------------------------------

# Cria a Lambda Layer
resource "aws_lambda_layer_version" "extract_layer" {
  filename            = "./deployments/extract_layer.zip"
  layer_name          = "extract-layer"
  compatible_runtimes = ["python3.11"]
  source_code_hash    = filebase64sha256("./deployments/extract_layer.zip")
}

# ----------------------------------------
# Criação de Lambdas
# ----------------------------------------

# LAMBDA DE EXEMPLO
module "lambda_MUDAR_NOME" {
  source        = "./modules/lambda"
  function_name = "[NOME DA FUNÇÃO]"
  role_arn      = aws_iam_role.lambda_role.arn
  zip_file      = "./deployments/CAMINHO DO ARQUIVO.zip"
  layers        = []
  environment_variables = {
    S3_BUCKET_NAME      = module.s3_bucket.bucket_name
    DYNAMODB_TABLE_NAME = module.dynamodb_MUDAR_NOME.table_name
  }
  api_gw_execution_arn = aws_apigatewayv2_api.http_api.execution_arn
}

# ----------------------------------------
# Lambdas relacionadas a Autenticação e Usuários
# ----------------------------------------

module "lambda_add_pre_registered_user" {
  source        = "./modules/lambda"
  function_name = "add_pre_registered_user"
  role_arn      = aws_iam_role.lambda_role.arn
  zip_file      = "./deployments/add_pre_registered_user.zip"
  layers = []
  api_gw_execution_arn = aws_apigatewayv2_api.http_api.execution_arn
  environment_variables = {
    PRE_REGISTERED_USERS_TABLE = module.dynamodb_pre_registered_users.table_name
  }
}

module "lambda_confirm_email" {
  source        = "./modules/lambda"
  function_name = "confirm_email"
  role_arn      = aws_iam_role.lambda_role.arn
  zip_file      = "./deployments/confirm_email.zip"
  layers = []
  api_gw_execution_arn = aws_apigatewayv2_api.http_api.execution_arn
  environment_variables = {
    COGNITO_USER_POOL_ID = module.cognito.user_pool_id
    COGNITO_CLIENT_ID    = module.cognito.app_client_id
    PRE_REGISTERED_USERS_TABLE = module.dynamodb_pre_registered_users.table_name
  }
}

module "lambda_confirm_forgot_password" {
  source        = "./modules/lambda"
  function_name = "confirm_forgot_password"
  role_arn      = aws_iam_role.lambda_role.arn
  zip_file      = "./deployments/confirm_forgot_password.zip"
  layers = []
  api_gw_execution_arn = aws_apigatewayv2_api.http_api.execution_arn
  environment_variables = {
    COGNITO_USER_POOL_ID = module.cognito.user_pool_id
    COGNITO_CLIENT_ID    = module.cognito.app_client_id
  }
}

module "lambda_login" {
  source        = "./modules/lambda"
  function_name = "login"
  role_arn      = aws_iam_role.lambda_role.arn
  zip_file      = "./deployments/login.zip"
  layers = []
  api_gw_execution_arn = aws_apigatewayv2_api.http_api.execution_arn
  environment_variables = {
    COGNITO_USER_POOL_ID = module.cognito.user_pool_id
    COGNITO_CLIENT_ID    = module.cognito.app_client_id
  }
}

module "lambda_delete_pre_registered_user" {
  source        = "./modules/lambda"
  function_name = "delete_pre_registered_user"
  role_arn      = aws_iam_role.lambda_role.arn
  zip_file      = "./deployments/delete_pre_registered_user.zip"
  layers = []
  api_gw_execution_arn = aws_apigatewayv2_api.http_api.execution_arn
  environment_variables = {
    PRE_REGISTERED_USERS_TABLE = module.dynamodb_pre_registered_users.table_name
  }
}

module "lambda_delete_user" {
  source        = "./modules/lambda"
  function_name = "delete_user"
  role_arn      = aws_iam_role.lambda_role.arn
  zip_file      = "./deployments/delete_user.zip"
  layers = []
  api_gw_execution_arn = aws_apigatewayv2_api.http_api.execution_arn
  environment_variables = {
    COGNITO_USER_POOL_ID = module.cognito.user_pool_id
    COGNITO_CLIENT_ID    = module.cognito.app_client_id
  }
}

module "lambda_forgot_password" {
  source        = "./modules/lambda"
  function_name = "forgot_password"
  role_arn      = aws_iam_role.lambda_role.arn
  zip_file      = "./deployments/forgot_password.zip"
  layers = []
  api_gw_execution_arn = aws_apigatewayv2_api.http_api.execution_arn
  environment_variables = {
    COGNITO_USER_POOL_ID = module.cognito.user_pool_id
    COGNITO_CLIENT_ID    = module.cognito.app_client_id
  }
}

module "lambda_get_pre_registered_users" {
  source        = "./modules/lambda"
  function_name = "get_pre_registered_users"
  role_arn      = aws_iam_role.lambda_role.arn
  zip_file      = "./deployments/get_pre_registered_users.zip"
  layers = []
  api_gw_execution_arn = aws_apigatewayv2_api.http_api.execution_arn
  environment_variables = {
    PRE_REGISTERED_USERS_TABLE = module.dynamodb_pre_registered_users.table_name
  }
}

module "lambda_get_users" {
  source        = "./modules/lambda"
  function_name = "get_users"
  role_arn      = aws_iam_role.lambda_role.arn
  zip_file      = "./deployments/get_users.zip"
  layers = []
  api_gw_execution_arn = aws_apigatewayv2_api.http_api.execution_arn
  environment_variables = {
    COGNITO_USER_POOL_ID = module.cognito.user_pool_id
    COGNITO_CLIENT_ID    = module.cognito.app_client_id
  }
}

module "lambda_register" {
  source        = "./modules/lambda"
  function_name = "register"
  role_arn      = aws_iam_role.lambda_role.arn
  zip_file      = "./deployments/register.zip"
  layers = []
  api_gw_execution_arn = aws_apigatewayv2_api.http_api.execution_arn
  environment_variables = {
    COGNITO_USER_POOL_ID       = module.cognito.user_pool_id
    COGNITO_CLIENT_ID          = module.cognito.app_client_id
    PRE_REGISTERED_USERS_TABLE = module.dynamodb_pre_registered_users.table_name
  }
}

# ----------------------------------------
# API Gateway
# ----------------------------------------

# Cria o API Gateway
resource "aws_apigatewayv2_api" "http_api" {
  name          = "[NOME DA API]"
  protocol_type = "HTTP"
}

# Stage da API
resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

# eXEMPLO API GATEWAY
module "api_gateway_MUDAR_NOME" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.http_api.id
  method            = "POST"
  path              = "/MUDAR_NOME"
  lambda_invoke_arn = module.lambda_MUDAR_NOME.lambda_invoke_arn
}

# ----------------------------------------
# Endpoints de Autorização e Autenticação
# ----------------------------------------

module "api_gateway_add_pre_registered_user" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.http_api.id
  method            = "POST"
  path              = "/add-pre-registered-user"
  lambda_invoke_arn = module.lambda_add_pre_registered_user.lambda_invoke_arn
}

module "api_gateway_confirm_email" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.http_api.id
  method            = "POST"
  path              = "/confirm-email"
  lambda_invoke_arn = module.lambda_confirm_email.lambda_invoke_arn
}

module "api_gateway_confirm_forgot_password" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.http_api.id
  method            = "POST"
  path              = "/confirm-forgot-password"
  lambda_invoke_arn = module.lambda_confirm_forgot_password.lambda_invoke_arn
}

module "api_gateway_login" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.http_api.id
  method            = "POST"
  path              = "/login"
  lambda_invoke_arn = module.lambda_login.lambda_invoke_arn
}

module "api_gateway_delete_pre_registered_user" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.http_api.id
  method            = "POST"
  path              = "/delete-pre-registered-user"
  lambda_invoke_arn = module.lambda_delete_pre_registered_user.lambda_invoke_arn
}

module "api_gateway_delete_user" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.http_api.id
  method            = "POST"
  path              = "/delete-user"
  lambda_invoke_arn = module.lambda_delete_user.lambda_invoke_arn
}

module "api_gateway_forgot_password" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.http_api.id
  method            = "POST"
  path              = "/forgot-password"
  lambda_invoke_arn = module.lambda_forgot_password.lambda_invoke_arn
}

module "api_gateway_get_pre_registered_users" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.http_api.id
  method            = "GET"
  path              = "/get-pre-registered-users"
  lambda_invoke_arn = module.lambda_get_pre_registered_users.lambda_invoke_arn
}

module "api_gateway_get_users" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.http_api.id
  method            = "GET"
  path              = "/get-users"
  lambda_invoke_arn = module.lambda_get_users.lambda_invoke_arn
}

module "api_gateway_register" {
  source            = "./modules/api_gateway"
  api_id            = aws_apigatewayv2_api.http_api.id
  method            = "POST"
  path              = "/register"
  lambda_invoke_arn = module.lambda_register.lambda_invoke_arn
}

# ----------------------------------------
# Notificações do S3
# ----------------------------------------

# CASO PRECISE DE ALGO RELACIONADO TEM AQUI, MAS ACHO QUE NÃO

# # Configuração do evento de notificação do S3 para acionar a Lambda quando um novo arquivo for adicionado
# resource "aws_s3_bucket_notification" "s3_notification" {
#   bucket = module.s3_bucket.bucket_name

#   lambda_function {
#     lambda_function_arn = aws_lambda_function.extract_MUDAR_NOME.arn
#     events              = ["s3:ObjectCreated:*"]
#     filter_suffix       = ".pdf" # Aciona apenas quando arquivos PDF são carregados
#   }

#   depends_on = [
#     aws_lambda_permission.allow_s3_invoke_lambda
#   ]
# }

# # Permissões para o S3 invocar a Lambda
# resource "aws_lambda_permission" "allow_s3_invoke_lambda" {
#   statement_id  = "AllowS3InvokeLambda"
#   action        = "lambda:InvokeFunction"
#   function_name = aws_lambda_function.extract_MUDAR_NOME.function_name
#   principal     = "s3.amazonaws.com"
#   source_arn    = module.s3_bucket.bucket_arn
# }
