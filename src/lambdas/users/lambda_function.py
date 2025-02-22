import json
import os
import boto3

from src.lambdas.users.services import create_user, get_user, update_user, delete_user

cognito = boto3.client('cognito-idp')
dynamodb = boto3.resource('dynamodb')
users_table = dynamodb.Table(os.environ['USERS_TABLE'])
USER_POOL_ID = os.environ['COGNITO_USER_POOL_ID']


def lambda_handler(event, context):
    try:
        # Extract authorization info from the event
        client_id = event['requestContext']['authorizer']['lambda']['sub']
        user_role = event['requestContext']['authorizer']['lambda']['role']

        method = event['requestContext']['http']['method']
        path = event['requestContext']['http']['path']

        if method == 'POST' and path == '/users':
            return create_user.handle(event, cognito, users_table, USER_POOL_ID)

        elif method == 'GET' and '/users/' in path:
            return get_user.handle(event, users_table, client_id, user_role)

        elif method == 'PUT' and '/users/' in path:
            return update_user.handle(event, cognito, users_table, client_id, user_role, USER_POOL_ID)

        elif method == 'DELETE' and '/users/' in path:
            return delete_user.handle(event, cognito, users_table, client_id, user_role, USER_POOL_ID)

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
