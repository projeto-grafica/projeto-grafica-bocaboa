import json

def handle_delete_user(target_user_id, current_user_id, users_table):
    if target_user_id != current_user_id:
        return {
            'statusCode': 403,
            'body': json.dumps({'message': 'Access denied'})
        }
    
    try:
        users_table.delete_item(
            Key={
                'user_id': target_user_id
            }
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'User deleted successfully'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }