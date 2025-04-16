from pydantic import BaseModel, Field, validator
from datetime import datetime
from bson import ObjectId

class Rating(BaseModel):
    rating_id:str
    ride_id:str
    reviewer_id:str
    reviewee_id:str
    rating:float
    review_text:str
    review_date:datetime

class RatingOut(Rating):
    rating_id:str = Field(alias="_id")
    ride_id:str
    reviewer_id:str
    reviewee_id:str
    rating:float
    review_text:str
    review_date:datetime
    
    @validator("rating_id",pre=True,always=True)
    def convert_objectId(cls,v):
        if isinstance(v,ObjectId):
            return str(v)
        return v
    
    @validator("ride_id", pre=True, always=True)
    def convert_role(cls, v):
        if isinstance(v, dict) and "_id" in v:
            v["_id"] = str(v["_id"])
        return v
    
    @validator("reviewer_id", pre=True, always=True)
    def convert_reviewer(cls, v):
        if isinstance(v, dict) and "_id" in v:
            v["_id"] = str(v["_id"])
        return v
    
    @validator("reviewee_id", pre=True, always=True)
    def convert_reviewee(cls, v):
        if isinstance(v, dict) and "_id" in v:
            v["_id"] = str(v["_id"])
        return v