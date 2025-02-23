import json
import uuid
from datetime import datetime

def handle(event, orders_table, client_id):
    try:
        body = json.loads(event['body'])
        
        required_fields = ['sticker_id', 'is_custom']
        for field in required_fields:
            if field not in body:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'message': f'Missing required field: {field}'})
                }
        
        # Create order object
        order = {
            'id': str(uuid.uuid4()),
            'client_id': client_id,
            'sticker_id': body['sticker_id'],
            'is_custom': body['is_custom'],
            'status': 'preparing',  # Default status
            'created_at': datetime.utcnow().isoformat()
        }
        
        # Save to DynamoDB
        orders_table.put_item(Item=order)
        
        return {
            'statusCode': 201,
            'body': json.dumps(order)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Error creating order',
                'error': str(e)
            })
        }