import datetime

from src.lambdas.stickers.services.utils.utils import validate_sticker_data, calculate_price


def handle(event, stickers_table, user_id):
    body = event['body']
    validate_sticker_data(body)

    sticker_id = str(hash(datetime.now().isoformat()))

    price = calculate_price(
        body['width'],
        body['height'],
        body['paperType'],
        body['color'],
        body['shape']
    )

    sticker = {
        'id': sticker_id,
        'name': body['name'],
        'description': body.get('description', ''),
        'width': body['width'],
        'height': body['height'],
        'paperType': body['paperType'],
        'color': body['color'],
        'shape': body['shape'],
        'price': price,
        'created_by': user_id,
        'created_at': datetime.now().isoformat(),
        'promotion_id': body.get('promotion_id')
    }

    stickers_table.put_item(Item=sticker)

    return {
        'statusCode': 201,
        'body': sticker
    }
