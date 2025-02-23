import json

def handle(event, orders_table, client_id, user_role):
    if user_role != 'admin':
        return {
            'statusCode': 403,
            'body': json.dumps({'message': 'Only admins can update order status'})
        }

    order_id = event['pathParameters']['id']
    body = json.loads(event['body'])
    new_status = body.get('status')

    if not new_status:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Status is required'})
        }

    try:
        orders_table.update_item(
            Key={'id': order_id},
            UpdateExpression='SET #status = :status',
            ExpressionAttributeNames={'#status': 'status'},
            ExpressionAttributeValues={':status': new_status}
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Order status updated successfully'})
        }
    except Exception as e:
        return {
            'statusCode': 404,
            'body': json.dumps({'message': 'Order not found'})
        }