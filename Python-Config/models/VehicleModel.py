from pydantic import BaseModel,Field,validator
from bson import ObjectId
from typing import Optional, Dict, Any
import bcrypt

class Vehicle(BaseModel):
    userid:str
    model:str
    licenseplate:str
    seatcapacity:int
    companyname:str
    
class VehicleOut(Vehicle):
    id:str = Field(alias="_id")
    model:str
    licenseplate:str
    seatcapacity:int
    companyname:str
    userid:str
    
    @validator("id",pre=True,always=True)
    def convert_objectId(cls,v):
        if isinstance(v,ObjectId):
            return str(v)
        return v
    
    @validator("userid", pre=True, always=True)
    def convert_role(cls, v):
        if isinstance(v, dict) and "_id" in v:
            v["_id"] = str(v["_id"])
        return v