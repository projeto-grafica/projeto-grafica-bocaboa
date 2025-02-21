import json
import os
import boto3

dynamodb = boto3.resource('dynamodb')
orders_table = dynamodb.Table(os.environ['ORDERS_TABLE'])

from src.lambdas.orders.services import create_order, get_order, list_orders, update_order_status


def lambda_handler(event, context):
    try:
        # Extract authorization info from the event
        client_id = event['requestContext']['authorizer']['lambda']['sub']
        user_role = event['requestContext']['authorizer']['lambda']['role']
        
        method = event['requestContext']['http']['method']
        path = event['requestContext']['http']['path']
        
        # Route the request to the appropriate handler
        if method == 'POST' and path == '/orders':
            return create_order(event, orders_table, client_id)
            
        elif method == 'GET' and '/orders/' in path and path.split('/')[-1] != 'orders':
            return get_order(event, orders_table, client_id, user_role)
            
        elif method == 'GET' and path == '/orders':
            return list_orders(event, orders_table, client_id, user_role)
            
        elif method == 'PUT' and path.endswith('/status'):
            return update_order_status(event, orders_table, client_id, user_role)
            
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Not Found'})
            }
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Internal Server Error'})
        }