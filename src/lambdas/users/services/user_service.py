import boto3
from datetime import datetime
from src.lambdas.users.models.user import User
from src.lambdas.users.models.address import Address

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')


def get_user(user_id):
    try:
        response = table.get_item(Key={'id': str(user_id)})
        if 'Item' in response:
            return response['Item']
        return None
    except Exception as e:
        raise Exception(f"Error getting user: {str(e)}")


def update_user(user_id, updates):
    try:
        if 'addresses' in updates:
            user_data = get_user(user_id)
            if not user_data:
                raise Exception(f"User with ID {user_id} not found")

            user = User.from_dict(user_data)

            addresses = []
            for addr_data in updates['addresses']:
                Address.validate(addr_data)
                addresses.append(Address.from_dict(addr_data))

            user.addresses = addresses
            user.updated_at = datetime.now().isoformat()

            table.put_item(Item=user.to_dict())
            return user.to_dict()

        update_expression = "SET "
        expression_values = {}

        for key, value in updates.items():
            if key not in ['id', 'addresses']:
                update_expression += f"#{key} = :{key}, "
                expression_values[f":{key}"] = value

        update_expression += "#updated_at = :updated_at"
        expression_values[":updated_at"] = datetime.now().isoformat()

        attribute_names = {f"#{k}": k for k in updates.keys() if k != 'addresses'}
        attribute_names["#updated_at"] = "updated_at"

        response = table.update_item(
            Key={'id': str(user_id)},
            UpdateExpression=update_expression,
            ExpressionAttributeNames=attribute_names,
            ExpressionAttributeValues=expression_values,
            ReturnValues="ALL_NEW"
        )
        return response.get('Attributes')
    except Exception as e:
        raise Exception(f"Error updating user: {str(e)}")


def delete_user(user_id):
    try:
        table.delete_item(Key={'id': str(user_id)})
        return True
    except Exception as e:
        raise Exception(f"Error deleting user: {str(e)}")
