import json

def handle(event, cognito, client_id):
    try:
        body = json.loads(event['body'])
        
        if 'email' not in body or 'password' not in body:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Email and password are required'})
            }
            
        response = cognito.initiate_auth(
            ClientId=client_id,
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME': body['email'],
                'PASSWORD': body['password']
            }
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'accessToken': response['AuthenticationResult']['AccessToken'],
                'refreshToken': response['AuthenticationResult']['RefreshToken'],
                'idToken': response['AuthenticationResult']['IdToken'],
                'expiresIn': response['AuthenticationResult']['ExpiresIn']
            })
        }
        
    except cognito.exceptions.NotAuthorizedException:
        return {
            'statusCode': 401,
            'body': json.dumps({'message': 'Invalid credentials'})
        }
    except Exception as e:
        print(f"Error during login: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error during login'})
        }