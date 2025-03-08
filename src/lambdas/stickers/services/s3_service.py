import os
import boto3
import uuid
import logging
from botocore.exceptions import ClientError
from typing import Dict, List, Tuple

logger = logging.getLogger()
logger.setLevel(logging.INFO)


class S3Service:
    def __init__(self, bucket_name=None):
        self.s3 = boto3.client('s3')
        self.bucket_name = bucket_name or os.environ.get('STICKERS_BUCKET_NAME')

    def generate_presigned_url(self, key: str, expiration=3600) -> str:
        try:
            response = self.s3.generate_presigned_url(
                'put_object',
                Params={'Bucket': self.bucket_name, 'Key': key},
                ExpiresIn=expiration
            )
            return response
        except ClientError as e:
            logger.error(f"Error generating presigned URL: {e}")
            raise

    def generate_presigned_post(self, key: str, expiration=3600) -> Dict:
        try:
            response = self.s3.generate_presigned_post(
                Bucket=self.bucket_name,
                Key=key,
                ExpiresIn=expiration
            )
            return response
        except ClientError as e:
            logger.error(f"Error generating presigned POST: {e}")
            raise

    def generate_upload_urls(self, sticker_id: str, count: int = 1) -> List[Dict]:
        urls = []

        for i in range(count):
            file_id = str(uuid.uuid4())
            key = f"stickers/{sticker_id}/{file_id}"

            presigned_post = self.generate_presigned_post(key)

            urls.append({
                'upload_url': presigned_post['url'],
                'upload_fields': presigned_post['fields'],
                'image_url': f"https://{self.bucket_name}.s3.amazonaws.com/{key}"
            })

        return urls

    def delete_image(self, image_url: str) -> bool:
        try:
            parts = image_url.replace('https://', '').split('/')
            key = '/'.join(parts[1:])  # Remover o domínio (bucket.s3.amazonaws.com)

            self.s3.delete_object(
                Bucket=self.bucket_name,
                Key=key
            )
            return True
        except ClientError as e:
            logger.error(f"Error deleting image: {e}")
            return False
