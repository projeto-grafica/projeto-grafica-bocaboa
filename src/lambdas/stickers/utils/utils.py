from decimal import Decimal


def validate_sticker_data(data):
    required_fields = ['name', 'width', 'height', 'paperType', 'color', 'shape']
    for field in required_fields:
        if field not in data:
            raise ValueError(f"Missing required field: {field}")

    if not (0 < data['width'] <= 1000):
        raise ValueError("Width must be between 0 and 1000")
    if not (0 < data['height'] <= 1000):
        raise ValueError("Height must be between 0 and 1000")
    if data['paperType'] not in ['glossy', 'matte', 'transparent']:
        raise ValueError("Invalid paper type")
    if data['color'] not in ['full_color', 'black_white', 'single_color']:
        raise ValueError("Invalid color option")
    if data['shape'] not in ['rectangle', 'circle', 'custom']:
        raise ValueError("Invalid shape")


def calculate_price(width, height, paper_type, color, shape):
    base_price = (width * height) / 1000

    multipliers = {
        'paperType': {
            'glossy': 1.2,
            'matte': 1.0,
            'transparent': 1.5
        },
        'color': {
            'full_color': 1.5,
            'black_white': 1.0,
            'single_color': 1.2
        },
        'shape': {
            'rectangle': 1.0,
            'circle': 1.2,
            'custom': 1.5
        }
    }

    final_price = (base_price *
                   multipliers['paperType'][paper_type] *
                   multipliers['color'][color] *
                   multipliers['shape'][shape])

    return round(Decimal(str(final_price)), 2)
