import datetime
import json


def handle(event, orders_table, client_id):
    body = json.loads(event['body'])

    order = {
        'id': str(hash(datetime.datetime.now().isoformat())),
        'client_id': client_id,
        'sticker_id': body['sticker_id'],
        'personalized': body.get('personalized', False),  # defaults to False if not specified
        'date': datetime.datetime.now().isoformat(),
        'status': 'preparing'  # Initial status
    }

    orders_table.put_item(Item=order)

    return {
        'statusCode': 201,
        'body': order
    }
