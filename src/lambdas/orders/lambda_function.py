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
        client_id = event['requestContext']['authorizer']['lambda']['sub']
        user_role = event['requestContext']['authorizer']['lambda']['role']

        method = event['requestContext']['http']['method']
        path = event['requestContext']['http']['path']

        if method == 'POST' and path == '/orders':
            return create_order.handle(event, orders_table, client_id)

        elif method == 'GET' and '/orders/' in path and path.split('/')[-1] != 'orders':
            return get_order.handle(event, orders_table, client_id, user_role)

        elif method == 'GET' and path == '/orders':
            return list_orders.handle(event, orders_table, client_id, user_role)

        elif method == 'PUT' and path.endswith('/status'):
            return update_order_status.handle(event, orders_table, client_id, user_role)

        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Not Found'})
            }

    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Internal Server Error'})
        }