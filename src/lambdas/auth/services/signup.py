import json

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