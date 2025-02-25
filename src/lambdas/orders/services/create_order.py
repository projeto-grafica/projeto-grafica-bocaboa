import datetime
import json

from src.lambdas.orders.services.utils.utils import validate_order_data, calculate_price


def handle(event, orders_table, user_id):
    body = json.loads(event['body'])
    validate_order_data(body)

    order_id = str(hash(datetime.datetime.now().isoformat()))

    price = calculate_price(
        body['width'],
        body['height'],
        body['paperType'],
        body['color'],
        body['shape']
    )

    order = {
        'id': order_id,
        'name': body['name'],
        'description': body.get('description', ''),
        'width': body['width'],
        'height': body['height'],
        'paperType': body['paperType'],
        'color': body['color'],
        'shape': body['shape'],
        'price': price,
        'created_by': user_id,
        'created_at': datetime.datetime.now().isoformat(),
        'promotion_id': body.get('promotion_id')
    }

    orders_table.put_item(Item=order)

    return {
        'statusCode': 201,
        'body': order
    }
