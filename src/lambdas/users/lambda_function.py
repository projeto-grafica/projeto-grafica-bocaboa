import json
import logging
from src.lambdas.users.services.user_service import get_user, update_user, delete_user

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info("Received event: %s", json.dumps(event, indent=2))
    
    try:
        # Handle both direct Lambda invocations and API Gateway requests
        if 'requestContext' in event:
            method = event['requestContext']['httpMethod']
            path_parameters = event.get('pathParameters', {})
        else:
            method = event.get('httpMethod', event.get('method', 'GET'))
            path_parameters = event.get('pathParameters', {})
        
        # Try to get user_id from either 'userId' or 'id' parameter
        user_id = path_parameters.get('userId') or path_parameters.get('id')
        logger.info(f"Extracted user_id: {user_id}")
        
        body = json.loads(event.get('body', '{}')) if event.get('body') else {}
        
        if not user_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'User ID is required'})
            }
        
        if method == 'GET':
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
            
        elif method == 'PUT':
            updated_user = update_user(user_id, body)
            return {
                'statusCode': 200,
                'body': json.dumps(updated_user)
            }
            
        elif method == 'DELETE':
            delete_user(user_id)
            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'User deleted successfully'})
            }
            
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Invalid request method'})
        }
        
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }