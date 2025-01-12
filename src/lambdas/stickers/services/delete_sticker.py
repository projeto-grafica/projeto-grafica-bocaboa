def handle(event, stickers_table, user_id, user_role):
    sticker_id = event['pathParameters']['id']

    response = stickers_table.get_item(
        Key={'id': sticker_id}
    )

    if 'Item' not in response:
        return {
            'statusCode': 404,
            'message': 'Sticker not found'
        }

    existing_sticker = response['Item']

    if user_role != 'admin' and existing_sticker['created_by'] != user_id:
        return {
            'statusCode': 403,
            'message': 'Permission denied'
        }

    stickers_table.delete_item(
        Key={'id': sticker_id}
    )

    return {
        'statusCode': 204,
        'body': ''
    }
