import boto3
import uuid
import logging
from datetime import datetime
from boto3.dynamodb.conditions import Key

from src.lambdas.admin.models.promotions import Promotion

logger = logging.getLogger()
logger.setLevel(logging.INFO)


class PromotionsService:
    def __init__(self, promotions_table=None):
        self.dynamodb = boto3.resource('dynamodb')
        self.promotions_table = promotions_table or self.dynamodb.Table('promotions')

    def create_promotion(self, data):
        try:
            Promotion.validate(data)

            promotion_id = str(uuid.uuid4())

            promotion = Promotion(
                promotion_id=promotion_id,
                name=data['name'],
                description=data.get('description', ''),
                discount_percentage=data['discount_percentage'],
                start_date=data['start_date'],
                end_date=data['end_date'],
                active=data.get('active', True)
            )

            self.promotions_table.put_item(Item=promotion.to_dict())

            return promotion.to_dict()
        except Exception as e:
            logger.error(f"Erro ao criar promoção: {str(e)}")
            raise

    def get_promotion(self, promotion_id):
        try:
            response = self.promotions_table.get_item(
                Key={'promotion_id': promotion_id}
            )

            if 'Item' not in response:
                return None

            return response['Item']
        except Exception as e:
            logger.error(f"Erro ao buscar promoção: {str(e)}")
            raise

    def update_promotion(self, promotion_id, data):
        try:
            existing_promotion = self.get_promotion(promotion_id)
            if not existing_promotion:
                raise ValueError(f"Promoção com ID {promotion_id} não encontrada")

            promotion_data = {**existing_promotion, **data}

            Promotion.validate(promotion_data)

            promotion_data['updated_at'] = datetime.now().isoformat()

            promotion = Promotion.from_dict(promotion_data)

            self.promotions_table.put_item(Item=promotion.to_dict())

            return promotion.to_dict()
        except Exception as e:
            logger.error(f"Erro ao atualizar promoção: {str(e)}")
            raise

    def delete_promotion(self, promotion_id):
        try:
            existing_promotion = self.get_promotion(promotion_id)
            if not existing_promotion:
                raise ValueError(f"Promoção com ID {promotion_id} não encontrada")

            self.promotions_table.delete_item(
                Key={'promotion_id': promotion_id}
            )

            return True
        except Exception as e:
            logger.error(f"Erro ao excluir promoção: {str(e)}")
            raise

    def list_promotions(self, active_only=False, limit=50, last_evaluated_key=None):
        try:
            params = {
                'Limit': limit
            }

            if active_only:
                params['FilterExpression'] = Key('active').eq(True)

            if last_evaluated_key:
                params['ExclusiveStartKey'] = last_evaluated_key

            response = self.promotions_table.scan(**params)

            return {
                'items': response.get('Items', []),
                'lastEvaluatedKey': response.get('LastEvaluatedKey'),
                'count': response.get('Count', 0)
            }
        except Exception as e:
            logger.error(f"Erro ao listar promoções: {str(e)}")
            raise
