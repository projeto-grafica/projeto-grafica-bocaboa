import uuid
from datetime import datetime


class Rating:
    def __init__(self, user_id, sticker_id, score):
        self.rating_id = str(uuid.uuid4())
        self.user_id = user_id
        self.sticker_id = sticker_id
        self.score = score
        self.created_at = datetime.now().isoformat()

    def to_dict(self):
        return {
            "rating_id": self.rating_id,
            "user_id": self.user_id,
            "sticker_id": self.sticker_id,
            "score": self.score,
            "created_at": self.created_at
        }

    @staticmethod
    def validate(data):
        if 'user_id' not in data or not data['user_id']:
            raise ValueError("User ID is required")

        if 'sticker_id' not in data or not data['sticker_id']:
            raise ValueError("Sticker ID is required")

        if 'score' not in data:
            raise ValueError("Score is required")

        score = int(data['score'])
        if score < 1 or score > 5:
            raise ValueError("Score must be between 1 and 5")
