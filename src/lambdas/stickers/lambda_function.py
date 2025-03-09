import json
import boto3
import logging

from src.lambdas.stickers.services.stickers_service import StickerService

dynamodb = boto3.resource('dynamodb')
stickers_table = dynamodb.Table('stickers')
sticker_service = StickerService(stickers_table=stickers_table)

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    logger.info("Received event: %s", json.dumps(event, indent=2))

    try:
        http_method = event.get("httpMethod") or event.get("requestContext", {}).get("http", {}).get("method")
        path = event.get("path") or event.get("requestContext", {}).get("http", {}).get("path")

        authorizer = event.get('requestContext', {}).get('authorizer', {})
        user_id = authorizer.get('user_id')
        user_role = authorizer.get('role', 'client')

        body = None
        if event.get('body'):
            body = json.loads(event['body'])

        path_parameters = event.get('pathParameters', {}) or {}
        query_parameters = event.get('queryStringParameters', {}) or {}

        if http_method == 'POST' and path.endswith('/stickers'):
            sticker = sticker_service.create_sticker(body, user_id)
            return {
                'statusCode': 201,
                'body': json.dumps(sticker, default=str)
            }

        elif http_method == 'GET' and '/stickers/' in path and not path.endswith('/images'):
            sticker_id = path_parameters.get('id')
            sticker = sticker_service.get_sticker(sticker_id)

            if not sticker:
                return {
                    'statusCode': 404,
                    'body': json.dumps({'message': 'Sticker not found'})
                }

            return {
                'statusCode': 200,
                'body': json.dumps(sticker, default=str)
            }

        elif http_method == 'GET' and path.endswith('/stickers'):
            limit = int(query_parameters.get('limit', 50))
            last_key = query_parameters.get('lastEvaluatedKey')
            tipo = query_parameters.get('tipo')  # Obter o parâmetro tipo da consulta

            if last_key:
                try:
                    last_key = json.loads(last_key)
                except:
                    return {
                        'statusCode': 400,
                        'body': json.dumps({'message': 'Invalid lastEvaluatedKey format'})
                    }

            result = sticker_service.list_stickers(
                limit=limit,
                last_evaluated_key=last_key,
                user_id=user_id,
                user_role=user_role,
                tipo=tipo
            )

            return {
                'statusCode': 200,
                'body': json.dumps(result, default=str)
            }

        elif http_method == 'PUT' and '/stickers/' in path and not path.endswith('/images'):
            sticker_id = path_parameters.get('id')
            updated_sticker = sticker_service.update_sticker(sticker_id, body, user_id, user_role)
            return {
                'statusCode': 200,
                'body': json.dumps(updated_sticker, default=str)
            }

        elif http_method == 'DELETE' and '/stickers/' in path and not path.endswith('/images'):
            sticker_id = path_parameters.get('id')
            sticker_service.delete_sticker(sticker_id, user_id, user_role)
            return {
                'statusCode': 204,
                'body': ''
            }

        elif http_method == 'POST' and path.endswith('/images'):
            sticker_id = path_parameters.get('id')
            count = int(body.get('count', 1))

            upload_urls = sticker_service.generate_image_upload_urls(sticker_id, count)
            return {
                'statusCode': 200,
                'body': json.dumps(upload_urls)
            }

        elif http_method == 'PUT' and path.endswith('/images'):
            sticker_id = path_parameters.get('id')
            image_urls = body.get('image_urls', [])

            if not image_urls:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'message': 'No image URLs provided'})
                }

            updated_sticker = sticker_service.add_images_to_sticker(
                sticker_id, image_urls, user_id, user_role
            )

            return {
                'statusCode': 200,
                'body': json.dumps(updated_sticker, default=str)
            }

        elif http_method == 'DELETE' and path.endswith('/images'):
            sticker_id = path_parameters.get('id')
            image_url = body.get('image_url')

            if not image_url:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'message': 'Image URL is required'})
                }

            updated_sticker = sticker_service.remove_image_from_sticker(
                sticker_id, image_url, user_id, user_role
            )

            return {
                'statusCode': 200,
                'body': json.dumps(updated_sticker, default=str)
            }

        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Not found'})
            }

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
