from datetime import datetime
from typing import Dict

import boto3

from src.lambdas.auth.models.address import Address

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')


class User:
    def __init__(self, user_sub: str, email: str, name: str, address: Address, role='client'):
        self.id = user_sub
        self.email = email
        self.name = name
        self.address = address
        self.role = role
        self.created_at = datetime.now().isoformat()
        self.updated_at = datetime.now().isoformat()

    @classmethod
    def from_dict(cls, data: Dict) -> 'User':
        address = None
        if 'address' in data and data['address']:
            address = Address.from_dict(data['address'])

        user = cls(
            user_sub=data.get('id'),
            email=data.get('email'),
            name=data.get('name'),
            role=data.get('role', 'client'),
            address=address
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
            'updated_at': self.updated_at
        }

        if self.address:
            result['address'] = self.address.to_dict()

        return result

    def save(self):
        table.put_item(Item=self.to_dict())
