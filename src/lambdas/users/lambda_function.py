import json
import logging
from src.lambdas.users.services import get_user, update_user, delete_user

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info("Received event: %s", json.dumps(event, indent=2))
    
    try:
        method = event['requestContext']['http']['method']
        path = event['rawPath']
        
        # Get user_id from path parameters if present
        path_parameters = event.get('pathParameters', {})
        user_id = path_parameters.get('userId') if path_parameters else None
        
        # Get request body if present
        body = json.loads(event.get('body', '{}')) if event.get('body') else {}
        
        if method == 'GET' and user_id:
            user = get_user(user_id)
            if not user:
                return {
                    'statusCode': 404,
                    'body': json.dumps({'message': 'User not found'})
                }
            return {
                'statusCode': 200,
                'body': json.dumps(user)
            }
            
        elif method == 'PUT' and user_id:
            updated_user = update_user(user_id, body)
            return {
                'statusCode': 200,
                'body': json.dumps(updated_user)
            }
            
        elif method == 'DELETE' and user_id:
            delete_user(user_id)
            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'User deleted successfully'})
            }
            
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Invalid request'})
        }
        
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }