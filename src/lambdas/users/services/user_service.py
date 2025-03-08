import boto3
from datetime import datetime

from src.lambdas.users.models.address import Address
from src.lambdas.users.models.user import User

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
        update_expression = "SET "
        expression_values = {}

        for key, value in updates.items():
            if key not in ['id']:  # Prevent updating primary key
                update_expression += f"#{key} = :{key}, "
                expression_values[f":{key}"] = value

        update_expression += "#updated_at = :updated_at"
        expression_values[":updated_at"] = datetime.now().isoformat()

        attribute_names = {f"#{k}": k for k in updates.keys()}
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


def set_user_address(user_id, address_data):
    try:
        Address.validate(address_data)

        user_data = get_user(user_id)
        if not user_data:
            raise Exception(f"User with ID {user_id} not found")

        user = User.from_dict(user_data)

        address = Address.from_dict(address_data)
        user.set_address(address)

        update_expression = "SET address = :address, updated_at = :updated_at"
        expression_values = {
            ":address": address.to_dict() if address else None,
            ":updated_at": datetime.now().isoformat()
        }

        response = table.update_item(
            Key={'id': str(user_id)},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_values,
            ReturnValues="ALL_NEW"
        )

        return response.get('Attributes')
    except Exception as e:
        raise Exception(f"Error setting user address: {str(e)}")


def remove_user_address(user_id):
    try:
        user_data = get_user(user_id)
        if not user_data:
            raise Exception(f"User with ID {user_id} not found")

        user = User.from_dict(user_data)

        user.remove_address()

        update_expression = "REMOVE address SET updated_at = :updated_at"
        expression_values = {
            ":updated_at": datetime.now().isoformat()
        }

        response = table.update_item(
            Key={'id': str(user_id)},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_values,
            ReturnValues="ALL_NEW"
        )

        return response.get('Attributes')
    except Exception as e:
        raise Exception(f"Error removing user address: {str(e)}")


def get_user_address(user_id):
    try:
        user_data = get_user(user_id)
        if not user_data:
            raise Exception(f"User with ID {user_id} not found")

        return user_data.get('address')
    except Exception as e:
        raise Exception(f"Error getting user address: {str(e)}")
