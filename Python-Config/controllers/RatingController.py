from models.RatingModel import Rating, RatingOut
from bson import ObjectId
from config.database import rating_collection, user_collection
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from datetime import datetime

async def addRating(rating: Rating):
    reviewer = await user_collection.find_one({"_id": ObjectId(rating.reviewer_id)})
    reviewee = await user_collection.find_one({"_id": ObjectId(rating.reviewee_id)})

    if not reviewer:
        raise HTTPException(status_code=400, detail="Reviewer not found")
    if not reviewee:
        raise HTTPException(status_code=400, detail="Reviewee not found")

    rating.review_date = datetime.now()
    result = await rating_collection.insert_one(rating.dict())
    return JSONResponse(status_code=201, content={"message": "Rating created successfully"})

async def getAllRatings():
    ratings = await rating_collection.find().to_list(length=None)
    
    for rating in ratings:
        rating["_id"] = str(rating["_id"])
        
        reviewer = await user_collection.find_one({"_id": ObjectId(rating["reviewer_id"])})
        reviewee = await user_collection.find_one({"_id": ObjectId(rating["reviewee_id"])})

        if reviewer:
            reviewer["_id"] = str(reviewer["_id"])
            rating["reviewer"] = reviewer
        if reviewee:
            reviewee["_id"] = str(reviewee["_id"])
            rating["reviewee"] = reviewee

    return [RatingOut(**rating) for rating in ratings]

async def getRatingById(rating_id: str):
    rating = await rating_collection.find_one({"_id": ObjectId(rating_id)})
    if rating:
        rating["_id"] = str(rating["_id"])
        
        reviewer = await user_collection.find_one({"_id": ObjectId(rating["reviewer_id"])})
        reviewee = await user_collection.find_one({"_id": ObjectId(rating["reviewee_id"])})

        if reviewer:
            reviewer["_id"] = str(reviewer["_id"])
            rating["reviewer"] = reviewer
        if reviewee:
            reviewee["_id"] = str(reviewee["_id"])
            rating["reviewee"] = reviewee
            
        return RatingOut(**rating)
    else:
        raise HTTPException(status_code=404, detail="Rating not found")

async def getRatingByUserId(user_id: str):
    user = await user_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    ratings = await rating_collection.find({
        "$or": [
            {"reviewer_id": ObjectId(user_id)},
            {"reviewee_id": ObjectId(user_id)}
        ]
    }).to_list(length=None)
    
    for rating in ratings:
        rating["_id"] = str(rating["_id"])
        
        reviewer = await user_collection.find_one({"_id": ObjectId(rating["reviewer_id"])})
        reviewee = await user_collection.find_one({"_id": ObjectId(rating["reviewee_id"])})

        if reviewer:
            reviewer["_id"] = str(reviewer["_id"])
            rating["reviewer"] = reviewer
        if reviewee:
            reviewee["_id"] = str(reviewee["_id"])
            rating["reviewee"] = reviewee

    return [RatingOut(**rating) for rating in ratings]