import json
import boto3
import logging

from src.lambdas.orders.services import create_order, update_order, list_orders, delete_order, read_order

dynamodb = boto3.resource('dynamodb')
orders_table = dynamodb.Table('orders')

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    logger.info("Received event: %s", json.dumps(event, indent=2))

    try:
        # Handle both event structures (HTTP API and REST API)
        http_method = event.get("httpMethod") or event.get("requestContext", {}).get("http", {}).get("method")
        path = event.get("path") or event.get("requestContext", {}).get("http", {}).get("path")

        # Get user information from authorizer (if exists)
        authorizer = event.get('requestContext', {}).get('authorizer', {})
        user_id = authorizer.get('user_id')
        user_role = authorizer.get('role', 'client')

        if http_method == 'POST' and path.endswith('/orders'):
            result = create_order.handle(event, orders_table, user_id)

        elif http_method == 'GET' and '/orders/' in path:
            result = read_order.handle(event, orders_table)

        elif http_method == 'GET' and path.endswith('/orders'):
            result = list_orders.handle(event, orders_table, user_id, user_role)

        elif http_method == 'PUT' and '/orders/' in path:
            result = update_order.handle(event, orders_table, user_id, user_role)

        elif http_method == 'DELETE' and '/orders/' in path:
            result = delete_order.handle(event, orders_table, user_id, user_role)

        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Not found'})
            }

        if isinstance(result['body'], dict):
            result['body'] = json.dumps(result['body'], default=str)

        return result

    except ValueError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': str(e)})
        }
    except Exception as e:
        logger.error("Error processing request: %s", str(e), exc_info=True)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }
