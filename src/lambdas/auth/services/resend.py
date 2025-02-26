import json


def handle(body, cognito, client_id):
    try:
        email = body.get('email')

        if not email:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Email is required'})
            }

        # Resend confirmation code
        cognito.resend_confirmation_code(
            ClientId=client_id,
            Username=email
        )

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Confirmation code resent successfully'
            })
        }

    except cognito.exceptions.UserNotFoundException:
        return {
            'statusCode': 404,
            'body': json.dumps({'message': 'User not found'})
        }
    except cognito.exceptions.InvalidParameterException:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Invalid parameters'})
        }
    except cognito.exceptions.LimitExceededException:
        return {
            'statusCode': 429,
            'body': json.dumps({'message': 'Too many attempts. Please try again later'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }
