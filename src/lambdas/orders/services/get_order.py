def handle(event, orders_table, client_id, user_role):
    order_id = event['pathParameters']['id']

    order = orders_table.get_item(
        Key={'id': order_id}
    ).get('Item')

    if not order:
        return {
            'statusCode': 404,
            'body': {'message': 'Order not found'}
        }

    # Check if user has permission to view this order
    if user_role != 'admin' and order['client_id'] != client_id:
        return {
            'statusCode': 403,
            'body': {'message': 'Unauthorized to view this order'}
        }

    return {
        'statusCode': 200,
        'body': order
    }
