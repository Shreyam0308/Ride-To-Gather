from pydantic import BaseModel, Field, validator
from typing import Optional, Any
from bson import ObjectId
from enum import Enum  # Import Enum for RideStatus
import datetime

class RideStatus(str, Enum):  # Define RideStatus as an Enum
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class Ride(BaseModel):
    driver_id:str
    passenger_id:list[Optional[str]] = []
    vehicle_id:str
    time_to_dropin:str
    dropin_area_id:str
    dropoff_area_id:str
    available_seats:int
    price:float
    ride_desc:str

class RideOut(Ride):
    id: str = Field(alias="_id")
    time_to_dropin:str = "Routine"
    driver_id: Optional[str]
    passenger_id: Optional[list[Optional[str]]] = None
    vehicle_id:str
    dropin_area_id:str
    dropoff_area_id:str
    available_seats:int
    price:float
    ride_desc:str
    vehicle_details: Optional[dict[str, Any]] = None
    driver_details: Optional[dict[str, Any]] = None
    dropin_area: Optional[dict[str, Any]] = None
    dropoff_area: Optional[dict[str, Any]] = None
    
    @validator("id", "driver_id", "passenger_id", "vehicle_id", "dropin_area_id", "dropoff_area_id", pre=True, always=True)
    def convert_objectId(cls, v):
        if isinstance(v, ObjectId):
            return str(v)
        return v
