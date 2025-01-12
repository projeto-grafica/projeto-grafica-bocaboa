import json


def handle(event, stickers_table):
    path_parameters = event.get('pathParameters', {})

    sticker_id = path_parameters.get('id')
    if not sticker_id:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Sticker ID is required'})
        }

    response = stickers_table.get_item(
        Key={'id': sticker_id}
    )

    if 'Item' not in response:
        return {
            'statusCode': 404,
            'message': 'Sticker not found'
        }

    return {
        'statusCode': 200,
        'body': response['Item']
    }
