import json


def handle(event, orders_table, user_id, user_role):
    order_id = event['pathParameters']['id']
    body = json.loads(event['body'])

    # check if the order exists
    response = orders_table.get_item(
        Key={'id': order_id}
    )

    if 'Item' not in response:
        return {
            'statusCode': 404,
            'message': 'order not found'
        }

    existing_order = response['Item']

    # check permissions
    if user_role != 'admin' and existing_order['created_by'] != user_id:
        return {
            'statusCode': 403,
            'message': 'Permission denied'
        }

    update_expr = """
        SET #name = :name,
            description = :description,
            width = :width,
            height = :height,
            paperType = :paperType,
            color = :color,
            shape = :shape,
            price = :price,
            promotion_id = :promotion_id
    """

    expr_attribute_names = {
        '#name': 'name'
    }

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

    orders_table.update_item(
        Key={'id': order_id},
        UpdateExpression=update_expr,
        ExpressionAttributeNames=expr_attribute_names,
        ExpressionAttributeValues=expr_values
    )

    response = orders_table.get_item(
        Key={'id': order_id}
    )

    return {
        'statusCode': 200,
        'body': response['Item']
    }
