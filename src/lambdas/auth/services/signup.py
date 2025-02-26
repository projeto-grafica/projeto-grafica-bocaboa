import json
import boto3

from src.lambdas.auth.models.user import User

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')


def handle(body, cognito, user_pool_id, client_id):
    try:
        email = body.get('email')
        password = body.get('password')
        name = body.get('name')

        if not email or not password or not name:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Email, password, and name are required'})
            }

        response = cognito.sign_up(
            ClientId=client_id,
            Username=email,
            Password=password,
            UserAttributes=[
                {'Name': 'email', 'Value': email},
                {'Name': 'name', 'Value': name}
            ]
        )

        # Criar e salvar o usuário no DynamoDB
        user = User(response['UserSub'], email, name)
        user.save()

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
