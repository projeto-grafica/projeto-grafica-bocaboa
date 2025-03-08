import json
import logging

from src.lambdas.admin.handlers.orders_admin_handlers import list_orders
from src.lambdas.admin.handlers.promotion_handlers import list_promotions, create_promotion, get_promotion, update_promotion, delete_promotion

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    logger.info("Received event: %s", json.dumps(event, indent=2))

    try:
        if 'rawPath' in event:
            route = event['rawPath']
            method = event['requestContext']['http']['method']
        else:
            route = event['path']
            method = event['httpMethod']

        authorizer = event.get('requestContext', {}).get('authorizer', {})
        user_role = authorizer.get('role')

        if user_role != 'admin':
            return {
                'statusCode': 403,
                'body': json.dumps({'message': 'Acesso negado. Apenas administradores podem acessar esta API.'})
            }

        if method == 'GET' and route == '/admin/promotions':
            return list_promotions(event, context)

        elif method == 'POST' and route == '/admin/promotions':
            return create_promotion(event, context)

        elif method == 'GET' and route.startswith('/admin/promotions/') and len(route.split('/')) == 4:
            return get_promotion(event, context)

        elif method == 'PUT' and route.startswith('/admin/promotions/') and len(route.split('/')) == 4:
            return update_promotion(event, context)

        elif method == 'DELETE' and route.startswith('/admin/promotions/') and len(route.split('/')) == 4:
            return delete_promotion(event, context)

        # Rotas para visualização e gerenciamento de pedidos como administrador
        elif method == 'GET' and route == '/admin/orders':
            return list_orders(event, context)

    except Exception as e:
        logger.error(f"Erro ao processar requisição: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Erro interno do servidor'})
        }
