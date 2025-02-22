resource "aws_apigatewayv2_integration" "lambda" {
  api_id             = var.api_id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = var.lambda_invoke_arn
}

resource "aws_apigatewayv2_route" "route" {
  api_id             = var.api_id
  route_key          = "${var.method} ${var.path}"
  target             = "integrations/${aws_apigatewayv2_integration.lambda.id}"
  authorization_type = var.authorizer_id != null ? "JWT" : "NONE"
  authorizer_id      = var.authorizer_id
}