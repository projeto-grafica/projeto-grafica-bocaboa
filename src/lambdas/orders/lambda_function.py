import json
import boto3
import logging

from src.lambdas.orders.services import create_order, get_order, list_orders, update_order_status

dynamodb = boto3.resource('dynamodb')
orders_table = dynamodb.Table('orders')

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    logger.info("Received event: %s", json.dumps(event, indent=2))
    
    try:
        # Handle both event structures (HTTP API and REST API)
        http_method = event.get("httphttp_method") or event.get("requestContext", {}).get("http", {}).get("http_method")
        path = event.get("path") or event.get("requestContext", {}).get("http", {}).get("path")

        # Get user information from authorizer (if exists)
        authorizer = event.get('requestContext', {}).get('authorizer', {})
        user_id = authorizer.get('user_id')
        user_role = authorizer.get('role', 'client')

        if http_method == 'POST' and path == '/orders':
            return create_order.handle(event, orders_table, user_id)

        elif http_method == 'GET' and '/orders/' in path and path.split('/')[-1] != 'orders':
            return get_order.handle(event, orders_table, user_id, user_role)

        elif http_method == 'GET' and path == '/orders':
            return list_orders.handle(event, orders_table, user_id, user_role)

        elif http_method == 'PUT' and path.endswith('/status'):
            return update_order_status.handle(event, orders_table, user_id, user_role)

        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Not Found'})
            }

    except Exception as e:
        logger.error(f"Error: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Internal Server Error'})
        }
