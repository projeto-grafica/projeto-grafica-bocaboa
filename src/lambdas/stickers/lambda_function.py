import json
import boto3
import logging

from src.lambdas.stickers.services import create_sticker, update_sticker, list_stickers, delete_sticker, read_sticker

dynamodb = boto3.resource('dynamodb')
stickers_table = dynamodb.Table('stickers')

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info("Received event: %s", json.dumps(event, indent=2))

    try:
        # Handle both event structures (HTTP API and REST API)
        http_method = event.get("httpMethod") or event.get("requestContext", {}).get("http", {}).get("method")
        path = event.get("path") or event.get("requestContext", {}).get("http", {}).get("path")

        # Get user information from authorizer (if exists)
        authorizer = event.get('requestContext', {}).get('authorizer', {})
        user_id = authorizer.get('user_id')
        user_role = authorizer.get('role', 'client')

        if http_method == 'POST' and path.endswith('/stickers'):
            result = create_sticker.handle(event, stickers_table, user_id)

        elif http_method == 'GET' and '/stickers/' in path:
            result = read_sticker.handle(event, stickers_table)

        elif http_method == 'GET' and path.endswith('/stickers'):
            result = list_stickers.handle(event, stickers_table, user_id, user_role)

        elif http_method == 'PUT' and '/stickers/' in path:
            result = update_sticker.handle(event, stickers_table, user_id, user_role)

        elif http_method == 'DELETE' and '/stickers/' in path:
            result = delete_sticker.handle(event, stickers_table, user_id, user_role)

        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Not found'})
            }

        if isinstance(result['body'], dict):
            result['body'] = json.dumps(result['body'], default=str)

        return result

    except ValueError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': str(e)})
        }
    except Exception as e:
        logger.error("Error processing request: %s", str(e), exc_info=True)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }
