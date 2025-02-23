import json

def handle(event, orders_table, client_id, user_role):
    order_id = event['pathParameters']['id']

    order = orders_table.get_item(
        Key={
            'id': order_id
        }
    ).get('Item')

    if not order:
        return {
            'statusCode': 404,
            'body': json.dumps({'message': 'Order not found'})
        }

    # Only allow users to see their own orders unless they're admin
    if user_role != 'admin' and order['client_id'] != client_id:
        return {
            'statusCode': 403,
            'body': json.dumps({'message': 'Forbidden'})
        }

    return {
        'statusCode': 200,
        'body': json.dumps(order)
    }