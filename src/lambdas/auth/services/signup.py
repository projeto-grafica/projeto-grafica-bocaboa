import json
import boto3
import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

def create_user(user_sub, email, role='client'):
    try:
        item = {
            'userId': user_sub,
            'email': email,
            'role': role,
            'createdAt': datetime.now().isoformat(),
            'updatedAt': datetime.now().isoformat()
        }
        
        table.put_item(Item=item)
        return item
    except Exception as e:
        raise Exception(f"Error creating user: {str(e)}")

def handle(body, cognito, user_pool_id, client_id):
    try:
        email = body.get('email')
        password = body.get('password')
        
        if not email or not password:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Email and password are required'})
            }
        
        # Create user in Cognito
        response = cognito.sign_up(
            ClientId=client_id,
            Username=email,
            Password=password,
            UserAttributes=[
                {
                    'Name': 'email',
                    'Value': email
                }
            ]
        )
        
        create_user(response['UserSub'], email)
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'User created successfully. Please check your email for confirmation code.',
                'userSub': response['UserSub']
            })
        }
        
    except cognito.exceptions.UsernameExistsException:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'User already exists'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }