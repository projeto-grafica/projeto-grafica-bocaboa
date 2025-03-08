from dataclasses import dataclass, asdict
from typing import Dict, Optional


@dataclass
class Address:
    cep: str
    city: str
    state: str
    street: str
    number: str
    complement: Optional[str] = None

    @classmethod
    def from_dict(cls, data: Dict) -> 'Address':
        return cls(
            cep=data.get('cep'),
            city=data.get('city'),
            state=data.get('state'),
            street=data.get('street'),
            number=data.get('number'),
            complement=data.get('complement')
        )

    def to_dict(self) -> Dict:
        return asdict(self)

    @staticmethod
    def validate(data: Dict) -> None:
        required_fields = ['cep', 'city', 'state', 'street', 'number']
        for field in required_fields:
            if field not in data:
                raise ValueError(f"Missing required address field: {field}")
