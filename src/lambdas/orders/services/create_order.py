import datetime
import json


def handle(event, orders_table, user_id):
    body = json.loads(event['body'])

    order_id = str(hash(datetime.datetime.now().isoformat()))

    order = {
        'id': order_id,
        'client_id': user_id,
        'sticker_id': body.get('sticker_id'),
        'personalized': body.get('personalized', False),
        'date': datetime.datetime.now().isoformat(),
        'preparing': False,
        'delivered': False,
        'finished': False
    }

    orders_table.put_item(Item=order)

    return {
        'statusCode': 201,
        'body': json.dumps(order)
    }
