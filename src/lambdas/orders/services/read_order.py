import json


def handle(event, orders_table):
    path_parameters = event.get('pathParameters', {})

    order_id = path_parameters.get('id')
    if not order_id:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'order ID is required'})
        }

    response = orders_table.get_item(
        Key={'id': order_id}
    )

    if 'Item' not in response:
        return {
            'statusCode': 404,
            'message': 'order not found'
        }

    return {
        'statusCode': 200,
        'body': response['Item']
    }
