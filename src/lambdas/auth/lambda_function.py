import json
import os
import boto3

from src.lambdas.auth.services import signup, login, confirm

cognito = boto3.client('cognito-idp')
USER_POOL_ID = os.environ['COGNITO_USER_POOL_ID']
CLIENT_ID = os.environ['COGNITO_CLIENT_ID']


def lambda_handler(event, context):
    try:
        route = event['rawPath']
        method = event['requestContext']['http']['method']

        if method != 'POST':
            return {
                'statusCode': 405,
                'body': json.dumps({'message': 'Method not allowed'})
            }

        body = json.loads(event.get('body', '{}'))

        if route == '/auth/signup':
            return signup.handle(body, cognito, USER_POOL_ID, CLIENT_ID)
        elif route == '/auth/login':
            return login.handle(body, cognito, CLIENT_ID)
        elif route == '/auth/confirm':
            return confirm.handle(body, cognito, CLIENT_ID)
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Route not found'})
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }
