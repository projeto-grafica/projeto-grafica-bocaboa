import json

def handle(target_user_id, current_user_id, users_table):
    if target_user_id != current_user_id:
        return {
            'statusCode': 403,
            'body': json.dumps({'message': 'Access denied'})
        }
    
    try:
        response = users_table.get_item(
            Key={
                'user_id': target_user_id
            }
        )
        
        user = response.get('Item')
        if not user:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'User not found'})
            }
            
        # Remove sensitive information
        if 'password' in user:
            del user['password']
            
        return {
            'statusCode': 200,
            'body': json.dumps(user)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }