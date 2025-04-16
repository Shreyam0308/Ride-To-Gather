from pydantic import BaseModel, Field, validator
from typing import Optional, Any, List
from bson import ObjectId
from datetime import datetime
from enum import Enum  # Import Enum for RideStatus

class RideStatus(str, Enum):  # Define RideStatus as an Enum
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class RideBook(BaseModel):
    ride_id: str
    driver_id: str
    passenger_id: List[str]
    vehicle_id: str
    available_seats: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
    booked_at: Optional[datetime] = None

    @validator('passenger_id')
    def validate_passenger_count(cls, v, values):
        if 'available_seats' in values and len(v) > values['available_seats']:
            raise ValueError(f'Number of passengers ({len(v)}) cannot exceed available seats ({values["available_seats"]})')
        return v

class RideBookOut(RideBook):
    id: str = Field(alias="_id")

    @validator("id", "ride_id", "driver_id", "passenger_id", "vehicle_id", pre=True, always=True)
    def convert_objectId(cls, v):
        if isinstance(v, ObjectId):
            return str(v)
        if isinstance(v, list):
            return [str(item) if isinstance(item, ObjectId) else item for item in v]
        return v
