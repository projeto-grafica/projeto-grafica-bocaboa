from datetime import datetime
from typing import Dict, Optional
from src.lambdas.users.models.address import Address


class User:
    def __init__(self,
                 user_id: str,
                 email: str,
                 name: str,
                 role: str = 'client',
                 address: Optional[Address] = None):
        self.id = user_id
        self.email = email
        self.name = name
        self.role = role
        self.address = address
        self.created_at = datetime.now().isoformat()
        self.updated_at = datetime.now().isoformat()

    @classmethod
    def from_dict(cls, data: Dict) -> 'User':
        address = None
        if 'address' in data and data['address']:
            address = Address.from_dict(data['address'])

        user = cls(
            user_id=data.get('id'),
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

    def to_dict(self) -> Dict:
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

    def set_address(self, address: Address) -> None:
        self.address = address
        self.updated_at = datetime.now().isoformat()

    def remove_address(self) -> None:
        self.address = None
        self.updated_at = datetime.now().isoformat()
