import datetime

def handle(event, orders_table, client_id, user_role):
    if user_role != 'admin':
        return {
            'statusCode': 403,
            'body': {'message': 'Only admins can update order status'}
        }
    
    order_id = event['pathParameters']['id']
    new_status = event['body']['status']
    
    # Validate status
    valid_statuses = ['preparing', 'delivered', 'finished']
    if new_status not in valid_statuses:
        return {
            'statusCode': 400,
            'body': {'message': f'Invalid status. Must be one of: {", ".join(valid_statuses)}'}
        }
    
    update_expression = 'SET #status = :status'
    expression_values = {
        ':status': new_status
    }
    
    try:
        response = orders_table.update_item(
            Key={'id': order_id},
            UpdateExpression=update_expression,
            ExpressionAttributeNames={'#status': 'status'},
            ExpressionAttributeValues=expression_values,
            ReturnValues='ALL_NEW'
        )
        
        return {
            'statusCode': 200,
            'body': response['Attributes']
        }
    except orders_table.exceptions.ConditionalCheckFailedException:
        return {
            'statusCode': 404,
            'body': {'message': 'Order not found'}
        }