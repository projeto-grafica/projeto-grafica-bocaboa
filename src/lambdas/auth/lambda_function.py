import json
import os
import boto3

cognito = boto3.client('cognito-idp')
USER_POOL_ID = os.environ['COGNITO_USER_POOL_ID']
CLIENT_ID = os.environ['COGNITO_CLIENT_ID']

def lambda_handler(event, context):
    try:
        method = event['requestContext']['http']['method']
        path = event['requestContext']['http']['path']
        
        if method == 'POST' and path == '/auth/login':
            return login_handler(event, cognito, CLIENT_ID)
            
        elif method == 'POST' and path == '/auth/logout':
            return logout_handler(event, cognito)
            
        elif method == 'POST' and path == '/auth/refresh':
            return refresh_token_handler(event, cognito, CLIENT_ID)
            
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