from src.lambdas.stickers.services.utils.utils import validate_sticker_data, calculate_price


def handle(event, stickers_table, user_id, user_role):
    sticker_id = event['pathParameters']['id']
    body = event['body']

    # check if the sticker exists
    response = stickers_table.get_item(
        Key={'id': sticker_id}
    )

    if 'Item' not in response:
        return {
            'statusCode': 404,
            'message': 'Sticker not found'
        }

    existing_sticker = response['Item']

    # check permissions
    if user_role != 'admin' and existing_sticker['created_by'] != user_id:
        return {
            'statusCode': 403,
            'message': 'Permission denied'
        }

    validate_sticker_data(body)
    price = calculate_price(
        body['width'],
        body['height'],
        body['paperType'],
        body['color'],
        body['shape']
    )

    update_expr = """
        SET name = :name,
            description = :description,
            width = :width,
            height = :height,
            paperType = :paperType,
            color = :color,
            shape = :shape,
            price = :price,
            promotion_id = :promotion_id
    """

    expr_values = {
        ':name': body['name'],
        ':description': body.get('description', ''),
        ':width': body['width'],
        ':height': body['height'],
        ':paperType': body['paperType'],
        ':color': body['color'],
        ':shape': body['shape'],
        ':price': price,
        ':promotion_id': body.get('promotion_id')
    }

    stickers_table.update_item(
        Key={'id': sticker_id},
        UpdateExpression=update_expr,
        ExpressionAttributeValues=expr_values
    )

    response = stickers_table.get_item(
        Key={'id': sticker_id}
    )

    return {
        'statusCode': 200,
        'body': response['Item']
    }
