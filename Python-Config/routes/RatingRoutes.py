from fastapi import APIRouter, HTTPException
from controllers.RatingController import *
from models.RatingModel import Rating, RatingOut

router = APIRouter()

@router.post("/create_rating")
async def create_rating(rating: Rating):
    return await addRating(rating)

@router.get("/get_all_ratings")
async def get_all_ratings():
    return await getAllRatings()

@router.get("/find_rating_by_rating_id/{rating_id}")
async def get_rating(rating_id: str):
    return await getRatingById(rating_id)

@router.get("/find_rating_by_user_id/{user_id}")
async def get_rating_by_user_id(user_id: str):
    return await getRatingByUserId(user_id)
