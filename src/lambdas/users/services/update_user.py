import json
from datetime import datetime

def handle_update_user(target_user_id, current_user_id, body, users_table):
    if target_user_id != current_user_id:
        return {
            'statusCode': 403,
            'body': json.dumps({'message': 'Access denied'})
        }
    
    try:
        update_attrs = {}
        allowed_fields = ['name', 'phone', 'address']
        
        for field in allowed_fields:
            if field in body:
                update_attrs[field] = body[field]
                
        if not update_attrs:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'No valid fields to update'})
            }
            
        # Build update expression
        update_expression = 'SET updated_at = :updated_at'
        expression_values = {
            ':updated_at': datetime.utcnow().isoformat()
        }
        
        for key, value in update_attrs.items():
            update_expression += f', #{key} = :{key}'
            expression_values[f':{key}'] = value
            
        # Update user
        response = users_table.update_item(
            Key={
                'user_id': target_user_id
            },
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_values,
            ExpressionAttributeNames={f'#{k}': k for k in update_attrs.keys()},
            ReturnValues='ALL_NEW'
        )
        
        updated_user = response['Attributes']
        if 'password' in updated_user:
            del updated_user['password']
            
        return {
            'statusCode': 200,
            'body': json.dumps(updated_user)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }