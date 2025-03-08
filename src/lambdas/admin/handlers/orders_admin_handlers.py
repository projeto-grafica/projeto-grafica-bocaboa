import json
import logging
from src.lambdas.admin.services.orders_admin_service import OrdersAdminService

logger = logging.getLogger()
logger.setLevel(logging.INFO)

orders_admin_service = OrdersAdminService()


def list_orders(event, context):
    try:
        query_params = event.get('queryStringParameters', {}) or {}

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

        filters = {}

        if 'clientId' in query_params:
            filters['client_id'] = query_params['clientId']

        if 'status' in query_params:
            filters['status'] = query_params['status']

        if 'dateStart' in query_params:
            filters['date_start'] = query_params['dateStart']

        if 'dateEnd' in query_params:
            filters['date_end'] = query_params['dateEnd']

        result = orders_admin_service.list_orders(
            limit=limit,
            last_evaluated_key=last_key,
            filters=filters
        )

        return {
            'statusCode': 200,
            'body': json.dumps(result, default=str)
        }
    except Exception as e:
        logger.error(f"Erro ao listar pedidos: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Erro interno do servidor'})
        }


def get_order_details(event, context):
    try:
        order_id = event['pathParameters']['id']

        order = orders_admin_service.get_order_details(order_id)

        if not order:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Pedido não encontrado'})
            }

        return {
            'statusCode': 200,
            'body': json.dumps(order, default=str)
        }
    except Exception as e:
        logger.error(f"Erro ao buscar detalhes do pedido: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Erro interno do servidor'})
        }


def update_order_status(event, context):
    try:
        order_id = event['pathParameters']['id']
        body = json.loads(event.get('body', '{}'))

        if 'status' not in body:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Status é obrigatório'})
            }

        updated_order = orders_admin_service.update_order_status(
            order_id,
            body['status']
        )

        return {
            'statusCode': 200,
            'body': json.dumps(updated_order, default=str)
        }
    except ValueError as e:
        logger.warning(f"Erro de validação: {str(e)}")
        return {
            'statusCode': 400,
            'body': json.dumps({'message': str(e)})
        }
    except Exception as e:
        logger.error(f"Erro ao atualizar status do pedido: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Erro interno do servidor'})
        }


def get_statistics(event, context):
    try:
        query_params = event.get('queryStringParameters', {}) or {}

        period = int(query_params.get('period', 30))

        stats = orders_admin_service.get_orders_statistics(period=period)

        return {
            'statusCode': 200,
            'body': json.dumps(stats, default=str)
        }
    except Exception as e:
        logger.error(f"Erro ao obter estatísticas: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Erro interno do servidor'})
        }
