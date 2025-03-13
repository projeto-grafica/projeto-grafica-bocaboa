import boto3
from decimal import Decimal
from boto3.dynamodb.conditions import Key

from src.lambdas.stickers.models.ratings import Rating


class RatingService:
    def __init__(self, ratings_table=None, stickers_table=None):
        self.dynamodb = boto3.resource('dynamodb')
        self.ratings_table = ratings_table or self.dynamodb.Table('sticker_ratings')
        self.stickers_table = stickers_table or self.dynamodb.Table('stickers')

    def create_rating(self, data, user_id):
        sticker_id = data['sticker_id']
        sticker_response = self.stickers_table.get_item(
            Key={'sticker_id': sticker_id}
        )

        if 'Item' not in sticker_response:
            raise ValueError(f"Sticker with ID {sticker_id} not found")

        existing_rating = self.get_user_rating(user_id, sticker_id)
        if existing_rating:
            raise ValueError("You have already rated this sticker")

        data['user_id'] = user_id
        Rating.validate(data)

        # Criar avaliação
        rating = Rating(
            user_id=user_id,
            sticker_id=sticker_id,
            score=int(data['score'])
        )

        self.ratings_table.put_item(Item=rating.to_dict())

        self.update_sticker_average_rating(sticker_id)

        return rating.to_dict()

    def get_user_rating(self, user_id, sticker_id):
        response = self.ratings_table.scan(
            FilterExpression=Key('user_id').eq(user_id) & Key('sticker_id').eq(sticker_id)
        )

        items = response.get('Items', [])
        return items[0] if items else None

    def get_sticker_ratings(self, sticker_id, limit=50, last_evaluated_key=None):
        params = {
            'FilterExpression': Key('sticker_id').eq(sticker_id),
            'Limit': limit
        }

        if last_evaluated_key:
            params['ExclusiveStartKey'] = last_evaluated_key

        response = self.ratings_table.scan(**params)

        return {
            'items': response.get('Items', []),
            'lastEvaluatedKey': response.get('LastEvaluatedKey'),
            'count': response.get('Count', 0)
        }

    def update_sticker_average_rating(self, sticker_id):
        ratings = self.ratings_table.scan(
            FilterExpression=Key('sticker_id').eq(sticker_id)
        )

        items = ratings.get('Items', [])

        if not items:
            return

        total_score = sum(int(item['score']) for item in items)
        average_rating = round(total_score / len(items), 1)
        ratings_count = len(items)

        self.stickers_table.update_item(
            Key={'sticker_id': sticker_id},
            UpdateExpression="SET average_rating = :avg, ratings_count = :count",
            ExpressionAttributeValues={
                ':avg': Decimal(str(average_rating)),
                ':count': ratings_count
            }
        )
