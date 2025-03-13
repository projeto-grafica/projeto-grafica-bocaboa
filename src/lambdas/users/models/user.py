from datetime import datetime
from typing import Dict, List, Optional

import boto3

from src.lambdas.users.models.address import Address

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')


class User:
    def __init__(self, user_id: str, email: str, name: str, role: str = 'client', addresses: Optional[List[Address]] = None):
        self.id = user_id
        self.email = email
        self.name = name
        self.role = role
        self.addresses = addresses or []
        self.created_at = datetime.now().isoformat()
        self.updated_at = datetime.now().isoformat()

    @classmethod
    def from_dict(cls, data: Dict) -> 'User':
        addresses = []
        if 'addresses' in data and isinstance(data['addresses'], list):
            addresses = [Address.from_dict(addr) for addr in data['addresses']]
        elif 'address' in data and data['address']:
            addresses = [Address.from_dict(data['address'])]

        user = cls(
            user_id=data.get('id'),
            email=data.get('email'),
            name=data.get('name'),
            role=data.get('role', 'client'),
            addresses=addresses
        )

        if 'created_at' in data:
            user.created_at = data['created_at']
        if 'updated_at' in data:
            user.updated_at = data['updated_at']

        return user

    def to_dict(self):
        result = {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'role': self.role,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'addresses': [address.to_dict() for address in self.addresses]
        }

        return result

    def save(self):
        table.put_item(Item=self.to_dict())
