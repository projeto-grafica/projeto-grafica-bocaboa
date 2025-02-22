import json
import uuid
from datetime import datetime

def handle(event, cognito, users_table, user_pool_id):
    try:
        body = json.loads(event['body'])
        
        # Validate required fields
        required_fields = ['email', 'password', 'name']
        for field in required_fields:
            if field not in body:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'message': f'Missing required field: {field}'})
                }
        
        user_id = str(uuid.uuid4())
        
        # Create user in Cognito
        cognito_response = cognito.admin_create_user(
            UserPoolId=user_pool_id,
            Username=body['email'],
            UserAttributes=[
                {'Name': 'email', 'Value': body['email']},
                {'Name': 'name', 'Value': body['name']},
                {'Name': 'custom:user_id', 'Value': user_id}
            ],
            TemporaryPassword=body['password'],
            MessageAction='SUPPRESS'
        )
        
        # Set permanent password
        cognito.admin_set_user_password(
            UserPoolId=user_pool_id,
            Username=body['email'],
            Password=body['password'],
            Permanent=True
        )
        
        # Store additional user data in DynamoDB
        user_item = {
            'id': user_id,
            'email': body['email'],
            'name': body['name'],
            'role': 'client',
            'created_at': datetime.utcnow().isoformat(),
            'updated_at': datetime.utcnow().isoformat()
        }
        
        users_table.put_item(Item=user_item)
        
        return {
            'statusCode': 201,
            'body': json.dumps(user_item)
        }
        
    except Exception as e:
        print(f"Error creating user: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error creating user'})
        }