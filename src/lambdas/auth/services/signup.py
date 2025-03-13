import json
import boto3

from src.lambdas.auth.models.user import User
from src.lambdas.auth.models.address import Address

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

        addresses = []
        if 'addresses' in body and isinstance(body['addresses'], list):
            for addr_data in body['addresses']:
                try:
                    Address.validate(addr_data)
                    addresses.append(Address.from_dict(addr_data))
                except ValueError as e:
                    return {
                        'statusCode': 400,
                        'body': json.dumps({'message': str(e)})
                    }
        elif 'address' in body and body['address']:
            try:
                Address.validate(body['address'])
                addresses.append(Address.from_dict(body['address']))
            except ValueError as e:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'message': str(e)})
                }

        user = User(response['UserSub'], email, name, addresses)
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
