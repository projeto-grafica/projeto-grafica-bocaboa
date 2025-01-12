def handle(event, stickers_table):
    sticker_id = event['pathParameters']['id']

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
