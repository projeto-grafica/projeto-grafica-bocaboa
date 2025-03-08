output "api_endpoint" {
  value = aws_apigatewayv2_api.main.api_endpoint
}

output "users_table_name" {
  value = module.users_table.table_name
}

output "stickers_table_name" {
  value = module.stickers_table.table_name
}

output "orders_table_name" {
  value = module.orders_table.table_name
}