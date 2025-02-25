import json

from boto3.dynamodb.conditions import Key


def handle(event, orders_table, user_id, user_role):
    query_params = event.get('queryStringParameters', {}) or {}
    limit = int(query_params.get('limit', 50))
    last_evaluated_key = query_params.get('lastEvaluatedKey')

    scan_params = {
        'Limit': limit
    }

    if user_role == 'user':
        scan_params['FilterExpression'] = Key('created_by').eq(user_id)

    if last_evaluated_key:
        scan_params['ExclusiveStartKey'] = json.loads(last_evaluated_key)

    response = orders_table.scan(**scan_params)

    return {
        'statusCode': 200,
        'body': {
            'items': response.get('Items', []),
            'lastEvaluatedKey': response.get('LastEvaluatedKey'),
            'count': response.get('Count', 0)
        }
    }
