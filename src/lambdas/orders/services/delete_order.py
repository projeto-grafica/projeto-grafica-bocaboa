def handle(event, orders_table, user_id, user_role):
    order_id = event['pathParameters']['id']

    response = orders_table.get_item(
        Key={'id': order_id}
    )

    if 'Item' not in response:
        return {
            'statusCode': 404,
            'message': 'order not found'
        }

    existing_order = response['Item']

    if user_role != 'admin' and existing_order['created_by'] != user_id:
        return {
            'statusCode': 403,
            'message': 'Permission denied'
        }

    orders_table.delete_item(
        Key={'id': order_id}
    )

    return {
        'statusCode': 204,
        'body': ''
    }
