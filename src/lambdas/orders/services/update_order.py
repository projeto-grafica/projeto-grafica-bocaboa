import json


def handle(event, orders_table, user_id, user_role):
    order_id = event['pathParameters']['id']
    body = json.loads(event['body'])

    # Verifica se o pedido existe
    response = orders_table.get_item(
        Key={'id': order_id}
    )

    if 'Item' not in response:
        return {
            'statusCode': 404,
            'body': json.dumps({'message': 'Order not found'})
        }

    existing_order = response['Item']

    # Verifica permissões: somente o admin ou o dono do pedido pode atualizar
    if user_role != 'admin' and existing_order['client_id'] != user_id:
        return {
            'statusCode': 403,
            'body': json.dumps({'message': 'Permission denied'})
        }

    # Define o preço apenas se estiver no corpo da requisição
    price = body.get('price', existing_order.get('price', 0))

    update_expr = "SET #name = :name, description = :description, width = :width, height = :height, paperType = :paperType, color = :color, shape = :shape, price = :price"
    expr_attribute_names = {'#name': 'name'}
    expr_values = {
        ':name': body['name'],
        ':description': body.get('description', ''),
        ':width': body['width'],
        ':height': body['height'],
        ':paperType': body['paperType'],
        ':color': body['color'],
        ':shape': body['shape'],
        ':price': price,
    }

    # Adiciona promotion_id se estiver presente no corpo da requisição
    if 'promotion_id' in body:
        update_expr += ", promotion_id = :promotion_id"
        expr_values[':promotion_id'] = body['promotion_id']

    # Atualiza o pedido no banco de dados
    orders_table.update_item(
        Key={'id': order_id},
        UpdateExpression=update_expr,
        ExpressionAttributeNames=expr_attribute_names,
        ExpressionAttributeValues=expr_values
    )

    # Busca o pedido atualizado
    response = orders_table.get_item(
        Key={'id': order_id}
    )

    return {
        'statusCode': 200,
        'body': json.dumps(response['Item'])
    }
