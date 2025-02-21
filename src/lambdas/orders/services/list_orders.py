import json
from boto3.dynamodb.conditions import Key


def handle(event, orders_table, client_id, user_role):
    query_params = event.get('queryStringParameters', {}) or {}
    limit = int(query_params.get('limit', 50))
    last_evaluated_key = query_params.get('lastEvaluatedKey')
    status = query_params.get('status')

    # Base query parameters
    query_params = {
        'Limit': limit
    }

    # If regular client, only show their orders
    if user_role == 'client':
        query_params['KeyConditionExpression'] = Key('client_id').eq(client_id)
        if status:
            query_params['FilterExpression'] = Key('status').eq(status)
    # If admin, can see all orders with optional status filter
    else:
        if status:
            query_params['FilterExpression'] = Key('status').eq(status)

    if last_evaluated_key:
        query_params['ExclusiveStartKey'] = json.loads(last_evaluated_key)

    response = orders_table.query(**query_params) if user_role == 'client' else orders_table.scan(**query_params)

    return {
        'statusCode': 200,
        'body': {
            'items': response.get('Items', []),
            'lastEvaluatedKey': response.get('LastEvaluatedKey'),
            'count': response.get('Count', 0)
        }
    }
