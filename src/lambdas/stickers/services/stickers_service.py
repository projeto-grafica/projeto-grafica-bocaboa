import uuid
import logging
from decimal import Decimal

import boto3
from boto3.dynamodb.conditions import Key
from typing import Dict, List, Optional

from src.lambdas.stickers.models.stickers import Sticker
from src.lambdas.stickers.services.s3_service import S3Service

logger = logging.getLogger()
logger.setLevel(logging.INFO)


class StickerService:
    def __init__(self, stickers_table=None, bucket_name=None):
        self.dynamodb = boto3.resource('dynamodb')
        self.stickers_table = stickers_table or self.dynamodb.Table('stickers')
        self.s3_service = S3Service(bucket_name)

    def create_sticker(self, data: Dict, user_id: str) -> Dict:
        Sticker.validate(data)

        sticker_id = str(uuid.uuid4())

        sticker = Sticker(
            sticker_id=sticker_id,
            name=data['name'],
            description=data.get('description', ''),
            width=data['width'],
            height=data['height'],
            paper_type=data['paperType'],
            color=data['color'],
            shape=data['shape'],
            price=Decimal(str(data['price'])),
            created_by=user_id,
            tipo=data.get('tipo', 'etiqueta'),
            images=data.get('images', []),
            addresses=data.get('addresses', []),
            promotion_id=data.get('promotion_id')
        )

        self.stickers_table.put_item(Item=sticker.to_dict())

        return sticker.to_dict()

    def get_sticker(self, sticker_id: str) -> Optional[Dict]:
        response = self.stickers_table.get_item(
            Key={'sticker_id': sticker_id}
        )

        return response.get('Item')

    def update_sticker(self, sticker_id: str, data: Dict, user_id: str, user_role: str) -> Dict:
        existing_sticker = self.get_sticker(sticker_id)
        if not existing_sticker:
            raise ValueError("Sticker not found")

        if user_role != 'admin' and existing_sticker['created_by'] != user_id:
            raise ValueError("Permission denied")

        Sticker.validate(data)

        sticker_data = {**existing_sticker, **data}

        sticker = Sticker.from_dict(sticker_data)

        self.stickers_table.put_item(Item=sticker.to_dict())

        return sticker.to_dict()

    def delete_sticker(self, sticker_id: str, user_id: str, user_role: str) -> bool:
        existing_sticker = self.get_sticker(sticker_id)
        if not existing_sticker:
            raise ValueError("Sticker not found")

        if user_role != 'admin' and existing_sticker['created_by'] != user_id:
            raise ValueError("Permission denied")

        if 'images' in existing_sticker and existing_sticker['images']:
            for image_url in existing_sticker['images']:
                self.s3_service.delete_image(image_url)

        self.stickers_table.delete_item(
            Key={'sticker_id': sticker_id}
        )

        return True

    def list_stickers(self, limit: int = 50, last_evaluated_key: Dict = None,
                      user_id: str = None, user_role: str = None) -> Dict:
        scan_params = {
            'Limit': limit
        }

        if user_role == 'client':
            scan_params['FilterExpression'] = Key('created_by').eq(user_id)

        if last_evaluated_key:
            scan_params['ExclusiveStartKey'] = last_evaluated_key

        response = self.stickers_table.scan(**scan_params)

        return {
            'items': response.get('Items', []),
            'lastEvaluatedKey': response.get('LastEvaluatedKey'),
            'count': response.get('Count', 0)
        }

    def generate_image_upload_urls(self, sticker_id: str, count: int = 1) -> List[Dict]:
        return self.s3_service.generate_upload_urls(sticker_id, count)

    def add_images_to_sticker(self, sticker_id: str, image_urls: List[str], user_id: str, user_role: str) -> Dict:
        existing_sticker = self.get_sticker(sticker_id)
        if not existing_sticker:
            raise ValueError("Sticker not found")

        if user_role != 'admin' and existing_sticker['created_by'] != user_id:
            raise ValueError("Permission denied")

        current_images = existing_sticker.get('images', [])

        updated_images = current_images + image_urls

        update_expr = "SET images = :images"
        expr_values = {
            ':images': updated_images
        }

        self.stickers_table.update_item(
            Key={'sticker_id': sticker_id},
            UpdateExpression=update_expr,
            ExpressionAttributeValues=expr_values
        )

        return self.get_sticker(sticker_id)

    def remove_image_from_sticker(self, sticker_id: str, image_url: str, user_id: str, user_role: str) -> Dict:
        existing_sticker = self.get_sticker(sticker_id)
        if not existing_sticker:
            raise ValueError("Sticker not found")

        if user_role != 'admin' and existing_sticker['created_by'] != user_id:
            raise ValueError("Permission denied")

        current_images = existing_sticker.get('images', [])

        if image_url in current_images:
            self.s3_service.delete_image(image_url)

            updated_images = [img for img in current_images if img != image_url]

            update_expr = "SET images = :images"
            expr_values = {
                ':images': updated_images
            }

            self.stickers_table.update_item(
                Key={'sticker_id': sticker_id},
                UpdateExpression=update_expr,
                ExpressionAttributeValues=expr_values
            )

        return self.get_sticker(sticker_id)
