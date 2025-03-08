import json
import logging
from src.lambdas.admin.services.promotions_service import PromotionsService

logger = logging.getLogger()
logger.setLevel(logging.INFO)

promotions_service = PromotionsService()


def create_promotion(event, context):
    try:
        body = json.loads(event.get('body', '{}'))

        promotion = promotions_service.create_promotion(body)

        return {
            'statusCode': 201,
            'body': json.dumps(promotion, default=str)
        }
    except ValueError as e:
        logger.warning(f"Erro de validação: {str(e)}")
        return {
            'statusCode': 400,
            'body': json.dumps({'message': str(e)})
        }
    except Exception as e:
        logger.error(f"Erro ao criar promoção: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Erro interno do servidor'})
        }


def get_promotion(event, context):
    try:
        promotion_id = event['pathParameters']['id']

        promotion = promotions_service.get_promotion(promotion_id)

        if not promotion:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Promoção não encontrada'})
            }

        return {
            'statusCode': 200,
            'body': json.dumps(promotion, default=str)
        }
    except Exception as e:
        logger.error(f"Erro ao buscar promoção: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Erro interno do servidor'})
        }


def update_promotion(event, context):
    try:
        promotion_id = event['pathParameters']['id']
        body = json.loads(event.get('body', '{}'))

        promotion = promotions_service.update_promotion(promotion_id, body)

        return {
            'statusCode': 200,
            'body': json.dumps(promotion, default=str)
        }
    except ValueError as e:
        logger.warning(f"Erro de validação: {str(e)}")
        return {
            'statusCode': 400,
            'body': json.dumps({'message': str(e)})
        }
    except Exception as e:
        logger.error(f"Erro ao atualizar promoção: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Erro interno do servidor'})
        }


def delete_promotion(event, context):
    try:
        promotion_id = event['pathParameters']['id']

        promotions_service.delete_promotion(promotion_id)

        return {
            'statusCode': 204,
            'body': ''
        }
    except ValueError as e:
        logger.warning(f"Erro de validação: {str(e)}")
        return {
            'statusCode': 400,
            'body': json.dumps({'message': str(e)})
        }
    except Exception as e:
        logger.error(f"Erro ao excluir promoção: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Erro interno do servidor'})
        }


def list_promotions(event, context):
    try:
        query_params = event.get('queryStringParameters', {}) or {}

        active_only = query_params.get('active') == 'true'
        limit = int(query_params.get('limit', 50))
        last_key = query_params.get('lastEvaluatedKey')

        if last_key:
            try:
                last_key = json.loads(last_key)
            except json.JSONDecodeError:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'message': 'Formato inválido para lastEvaluatedKey'})
                }

        result = promotions_service.list_promotions(
            active_only=active_only,
            limit=limit,
            last_evaluated_key=last_key
        )

        return {
            'statusCode': 200,
            'body': json.dumps(result, default=str)
        }
    except Exception as e:
        logger.error(f"Erro ao listar promoções: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Erro interno do servidor'})
        }
