import boto3
import logging
from datetime import datetime, timedelta
from boto3.dynamodb.conditions import Key, Attr

logger = logging.getLogger()
logger.setLevel(logging.INFO)


class OrdersAdminService:
    def __init__(self, orders_table=None, users_table=None, stickers_table=None):
        self.dynamodb = boto3.resource('dynamodb')
        self.orders_table = orders_table or self.dynamodb.Table('orders')
        self.users_table = users_table or self.dynamodb.Table('users')
        self.stickers_table = stickers_table or self.dynamodb.Table('stickers')

    def list_orders(self, limit=50, last_evaluated_key=None, filters=None):
        try:
            params = {
                'Limit': limit
            }

            filter_expressions = []

            if filters:
                if 'client_id' in filters:
                    filter_expressions.append(Key('client_id').eq(filters['client_id']))

                if 'status' in filters:
                    filter_expressions.append(Attr('status').eq(filters['status']))

                if 'date_start' in filters and 'date_end' in filters:
                    filter_expressions.append(
                        Attr('date').between(filters['date_start'], filters['date_end'])
                    )
                elif 'date_start' in filters:
                    filter_expressions.append(Attr('date').gte(filters['date_start']))
                elif 'date_end' in filters:
                    filter_expressions.append(Attr('date').lte(filters['date_end']))

            if filter_expressions:
                filter_expression = filter_expressions[0]
                for expr in filter_expressions[1:]:
                    filter_expression = filter_expression & expr

                params['FilterExpression'] = filter_expression

            if last_evaluated_key:
                params['ExclusiveStartKey'] = last_evaluated_key

            response = self.orders_table.scan(**params)

            return {
                'items': response.get('Items', []),
                'lastEvaluatedKey': response.get('LastEvaluatedKey'),
                'count': response.get('Count', 0)
            }
        except Exception as e:
            logger.error(f"Erro ao listar pedidos: {str(e)}")
            raise

    def get_order_details(self, order_id):
        try:
            order_response = self.orders_table.get_item(
                Key={'id': order_id}
            )

            if 'Item' not in order_response:
                return None

            order = order_response['Item']

            if 'client_id' in order:
                try:
                    user_response = self.users_table.get_item(
                        Key={'id': order['client_id']}
                    )
                    if 'Item' in user_response:
                        order['client_details'] = user_response['Item']
                except Exception as e:
                    logger.warning(f"Erro ao buscar detalhes do cliente: {str(e)}")

            if 'sticker_id' in order:
                try:
                    sticker_response = self.stickers_table.get_item(
                        Key={'sticker_id': order['sticker_id']}
                    )
                    if 'Item' in sticker_response:
                        order['sticker_details'] = sticker_response['Item']
                except Exception as e:
                    logger.warning(f"Erro ao buscar detalhes do sticker: {str(e)}")

            return order
        except Exception as e:
            logger.error(f"Erro ao buscar detalhes do pedido: {str(e)}")
            raise

    def update_order_status(self, order_id, new_status):
        try:
            response = self.orders_table.get_item(
                Key={'id': order_id}
            )

            if 'Item' not in response:
                raise ValueError(f"Pedido com ID {order_id} não encontrado")

            valid_statuses = ['preparing', 'delivered', 'finished', 'cancelled']
            if new_status not in valid_statuses:
                raise ValueError(f"Status inválido. Opções válidas: {', '.join(valid_statuses)}")

            update_response = self.orders_table.update_item(
                Key={'id': order_id},
                UpdateExpression="SET #status = :status, updated_at = :updated_at",
                ExpressionAttributeNames={'#status': 'status'},
                ExpressionAttributeValues={
                    ':status': new_status,
                    ':updated_at': datetime.now().isoformat()
                },
                ReturnValues="ALL_NEW"
            )

            return update_response.get('Attributes')
        except Exception as e:
            logger.error(f"Erro ao atualizar status do pedido: {str(e)}")
            raise

    def get_orders_statistics(self, period=30):
        try:
            end_date = datetime.now()
            start_date = end_date - timedelta(days=period)

            response = self.orders_table.scan(
                FilterExpression=Attr('date').between(
                    start_date.isoformat(),
                    end_date.isoformat()
                )
            )

            orders = response.get('Items', [])

            stats = {
                'total_orders': len(orders),
                'orders_by_status': {},
                'average_order_value': 0,
                'total_revenue': 0
            }

            total_value = 0
            count_with_value = 0

            for order in orders:
                status = order.get('status', 'unknown')
                stats['orders_by_status'][status] = stats['orders_by_status'].get(status, 0) + 1

                if 'price' in order:
                    try:
                        price = float(order['price'])
                        total_value += price
                        count_with_value += 1
                    except (ValueError, TypeError):
                        pass

            if count_with_value > 0:
                stats['average_order_value'] = total_value / count_with_value
                stats['total_revenue'] = total_value

            return stats
        except Exception as e:
            logger.error(f"Erro ao calcular estatísticas de pedidos: {str(e)}")
            raise
