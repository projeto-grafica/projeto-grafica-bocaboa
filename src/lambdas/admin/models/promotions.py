from datetime import datetime
from decimal import Decimal


class Promotion:
    def __init__(self,
                 promotion_id=None,
                 name=None,
                 description=None,
                 discount_percentage=None,
                 start_date=None,
                 end_date=None,
                 active=True):
        self.promotion_id = promotion_id
        self.name = name
        self.description = description
        self.discount_percentage = discount_percentage
        self.start_date = start_date
        self.end_date = end_date
        self.active = active
        self.created_at = datetime.now().isoformat()
        self.updated_at = datetime.now().isoformat()

    def to_dict(self):
        return {
            "promotion_id": self.promotion_id,
            "name": self.name,
            "description": self.description,
            "discount_percentage": self.discount_percentage,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "active": self.active,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    @classmethod
    def from_dict(cls, data):
        promotion = cls(
            promotion_id=data.get("promotion_id"),
            name=data.get("name"),
            description=data.get("description"),
            discount_percentage=data.get("discount_percentage"),
            start_date=data.get("start_date"),
            end_date=data.get("end_date"),
            active=data.get("active", True)
        )

        if "created_at" in data:
            promotion.created_at = data["created_at"]
        if "updated_at" in data:
            promotion.updated_at = data["updated_at"]

        return promotion

    @staticmethod
    def validate(data):
        required_fields = ["name", "discount_percentage", "start_date", "end_date"]

        for field in required_fields:
            if field not in data:
                raise ValueError(f"Campo obrigatório ausente: {field}")

        discount = data["discount_percentage"]
        if not isinstance(discount, (int, float, Decimal)) or discount <= 0 or discount > 100:
            raise ValueError("Percentual de desconto deve ser um número entre 0 e 100")

        try:
            start = datetime.fromisoformat(data["start_date"])
            end = datetime.fromisoformat(data["end_date"])

            if end < start:
                raise ValueError("A data de término deve ser posterior à data de início")
        except (ValueError, TypeError):
            raise ValueError("Formato de data inválido. Use o formato ISO (YYYY-MM-DDTHH:MM:SS)")
