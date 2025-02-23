import json

def handle(event, orders_table, client_id, user_role):
    # if admin, can see all orders. If user, can only see their own orders
    if user_role == 'admin':
        response = orders_table.scan()
    else:
        response = orders_table.query(
            IndexName='client_id-index',
            KeyConditionExpression='client_id = :client_id',
            ExpressionAttributeValues={
                ':client_id': client_id
            }
        )

    orders = response.get('Items', [])

    return {
        'statusCode': 200,
        'body': json.dumps({
            'orders': orders,
            'lastEvaluatedKey': response.get('LastEvaluatedKey'),
            'count': len(orders)
        })
    }