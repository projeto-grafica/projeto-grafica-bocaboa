from datetime import datetime
from decimal import Decimal
from typing import List, Dict, Optional


class Sticker:
    def __init__(self,
                 sticker_id: str = None,
                 name: str = None,
                 description: str = None,
                 width: int = None,
                 height: int = None,
                 paper_type: str = None,
                 color: str = None,
                 shape: str = None,
                 price: Decimal = None,
                 created_by: str = None,
                 tipo: str = 'etiqueta',
                 images: List[str] = None,
                 addresses: List[Dict] = None,
                 promotion_id: str = None):

        self.sticker_id = sticker_id
        self.name = name
        self.description = description
        self.width = width
        self.height = height
        self.paper_type = paper_type
        self.color = color
        self.shape = shape
        self.price = price
        self.created_by = created_by
        self.tipo = tipo
        self.images = images or []
        self.addresses = addresses or []
        self.promotion_id = promotion_id
        self.created_at = datetime.now().isoformat()

    @classmethod
    def from_dict(cls, data: Dict) -> 'Sticker':
        sticker = cls(
            sticker_id=data.get('sticker_id'),
            name=data.get('name'),
            description=data.get('description', ''),
            width=data.get('width'),
            height=data.get('height'),
            paper_type=data.get('paperType'),
            color=data.get('color'),
            shape=data.get('shape'),
            price=data.get('price'),
            created_by=data.get('created_by'),
            tipo=data.get('tipo', 'etiqueta'),
            images=data.get('images', []),
            addresses=data.get('addresses', []),
            promotion_id=data.get('promotion_id')
        )

        if 'created_at' in data:
            sticker.created_at = data['created_at']

        return sticker

    def to_dict(self) -> Dict:
        return {
            'sticker_id': self.sticker_id,
            'name': self.name,
            'description': self.description,
            'width': self.width,
            'height': self.height,
            'paperType': self.paper_type,
            'color': self.color,
            'shape': self.shape,
            'price': self.price,
            'created_by': self.created_by,
            'tipo': self.tipo,
            'images': self.images,
            'addresses': self.addresses,
            'promotion_id': self.promotion_id,
            'created_at': self.created_at
        }

    @staticmethod
    def validate(data: Dict) -> None:
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

        if 'addresses' in data and data['addresses']:
            for address in data['addresses']:
                required_address_fields = ['cep', 'cidade', 'estado', 'logradouro', 'numero']
                for field in required_address_fields:
                    if field not in address:
                        raise ValueError(f"Missing required address field: {field}")
