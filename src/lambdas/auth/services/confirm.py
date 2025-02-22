import json

def handle(body, cognito, client_id):
    try:
        email = body.get('email')
        confirmation_code = body.get('code')
        
        if not email or not confirmation_code:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Email and confirmation code are required'})
            }
        
        # Confirm signup
        cognito.confirm_sign_up(
            ClientId=client_id,
            Username=email,
            ConfirmationCode=confirmation_code
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'User confirmed successfully'
            })
        }
        
    except cognito.exceptions.CodeMismatchException:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Invalid confirmation code'})
        }
    except cognito.exceptions.ExpiredCodeException:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Confirmation code has expired'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }