import boto3
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

def get_user(user_id):
    try:
        response = table.get_item(Key={'userId': user_id})
        return response.get('Item')
    except Exception as e:
        raise Exception(f"Error getting user: {str(e)}")

def update_user(user_id, updates):
    try:
        update_expression = "SET "
        expression_values = {}
        
        for key, value in updates.items():
            if key not in ['userId']:  # Prevent updating primary key
                update_expression += f"#{key} = :{key}, "
                expression_values[f":{key}"] = value
        
        update_expression += "#updatedAt = :updatedAt"
        expression_values[":updatedAt"] = datetime.now().isoformat()

        attribute_names = {f"#{k}": k for k in updates.keys()}
        attribute_names["#updatedAt"] = "updatedAt"

        response = table.update_item(
            Key={'userId': user_id},
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
        table.delete_item(Key={'userId': user_id})
        return True
    except Exception as e:
        raise Exception(f"Error deleting user: {str(e)}")