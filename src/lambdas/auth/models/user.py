from datetime import datetime

import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')


class User:
    def __init__(self, user_sub, email, name, role='client'):
        self.id = user_sub
        self.email = email
        self.name = name
        self.role = role
        self.created_at = datetime.now().isoformat()
        self.updated_at = datetime.now().isoformat()

    def to_dict(self):
        """Converte o objeto User para um dicionário compatível com DynamoDB."""
        return self.__dict__

    def save(self):
        """Salva o usuário no DynamoDB."""
        table.put_item(Item=self.to_dict())
