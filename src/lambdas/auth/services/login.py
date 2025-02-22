import json

def handle(body, cognito, client_id):
    try:
        email = body.get('email')
        password = body.get('password')
        
        if not email or not password:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Email and password are required'})
            }
        
        # Authenticate user
        response = cognito.initiate_auth(
            ClientId=client_id,
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME': email,
                'PASSWORD': password
            }
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Login successful',
                'tokens': {
                    'accessToken': response['AuthenticationResult']['AccessToken'],
                    'refreshToken': response['AuthenticationResult']['RefreshToken'],
                    'idToken': response['AuthenticationResult']['IdToken']
                }
            })
        }
        
    except cognito.exceptions.NotAuthorizedException:
        return {
            'statusCode': 401,
            'body': json.dumps({'message': 'Invalid credentials'})
        }
    except cognito.exceptions.UserNotConfirmedException:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'User is not confirmed'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }