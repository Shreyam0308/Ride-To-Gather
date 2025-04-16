from models.RideBookModel import RideBook, RideBookOut
from models.RideModel import RideStatus
from bson import ObjectId
from config.database import ride_book_collection, ride_collection, user_collection, vehicle_collection
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from datetime import datetime

async def createRideBook(ride_book: RideBook):
    ride_book_dict = ride_book.dict()
    
    ride_book_dict["ride_id"] = ObjectId(ride_book_dict["ride_id"])
    ride_book_dict["driver_id"] = ObjectId(ride_book_dict["driver_id"])
    ride_book_dict["passenger_id"] = [ObjectId(id) for id in ride_book_dict["passenger_id"] if id]
    ride_book_dict["vehicle_id"] = ObjectId(ride_book_dict["vehicle_id"])
    
    ride_book_dict["booked_at"] = datetime.utcnow()

    ride = await ride_collection.find_one({"_id": ride_book_dict["ride_id"]})
    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found")
    
    if ride["available_seats"] < len(ride_book_dict["passenger_id"]):
        raise HTTPException(status_code=400, detail="Not enough seats available")

    vehicle = await vehicle_collection.find_one({"_id": ride_book_dict["vehicle_id"]})
    
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    if str(vehicle["user_id"]) != str(ride_book_dict["driver_id"]):
        raise HTTPException(status_code=403, detail="Vehicle does not belong to the driver")

    for passenger_id in ride_book_dict["passenger_id"]:
        passenger = await user_collection.find_one({"_id": passenger_id})
        if not passenger:
            raise HTTPException(status_code=404, detail=f"Passenger {passenger_id} not found")

    result = await ride_book_collection.insert_one(ride_book_dict)
    
    await ride_collection.update_one(
        {"_id": ride_book_dict["ride_id"]},
        {
            "$inc": {"available_seats": -len(ride_book_dict["passenger_id"])},
            "$set": {"status": RideStatus.BOOKED}
        }
    )
    
    return JSONResponse(status_code=201, content={"message": "Ride booked successfully"})

async def getAllRideBooks():
    ride_books = await ride_book_collection.find().to_list(length=None)
    if ride_books:
        return [RideBookOut(**ride_book) for ride_book in ride_books]
    else:
        raise HTTPException(status_code=404, detail="No ride bookings found")

async def getRideBookById(ride_book_id: str):
    ride_book = await ride_book_collection.find_one({"_id": ObjectId(ride_book_id)})
    if not ride_book:
        raise HTTPException(status_code=404, detail="Ride booking not found")
    return RideBookOut(**ride_book)

async def getRideBooksByRide(ride_id: str):
    ride_books = await ride_book_collection.find({"ride_id": ObjectId(ride_id)}).to_list(length=None)
    if ride_books:
        return [RideBookOut(**ride_book) for ride_book in ride_books]
    else:
        raise HTTPException(status_code=404, detail="No bookings found for this ride")

async def getRideBooksByPassenger(passenger_id: str):
    ride_books = await ride_book_collection.find({"passenger_id": ObjectId(passenger_id)}).to_list(length=None)
    if ride_books:
        return [RideBookOut(**ride_book) for ride_book in ride_books]
    else:
        raise HTTPException(status_code=404, detail="No bookings found for this passenger")

async def getRideBooksByDriver(driver_id: str):
    ride_books = await ride_book_collection.find({"driver_id": ObjectId(driver_id)}).to_list(length=None)
    if ride_books:
        return [RideBookOut(**ride_book) for ride_book in ride_books]
    else:
        raise HTTPException(status_code=404, detail="No bookings found for this driver")

async def cancelRideBook(ride_book_id: str):
    ride_book = await ride_book_collection.find_one({"_id": ObjectId(ride_book_id)})
    if not ride_book:
        raise HTTPException(status_code=404, detail="Ride booking not found")

    ride = await ride_collection.find_one({"_id": ride_book["ride_id"]})
    if not ride:
        raise HTTPException(status_code=404, detail="Associated ride not found")

    await ride_collection.update_one(
        {"_id": ride_book["ride_id"]},
        {
            "$inc": {"available_seats": len(ride_book["passenger_id"])},
            "$set": {"status": RideStatus.PENDING}
        }
    )

    result = await ride_book_collection.delete_one({"_id": ObjectId(ride_book_id)})
    if result.deleted_count == 1:
        return JSONResponse(status_code=200, content={"message": "Ride booking cancelled successfully"})
    else:
        raise HTTPException(status_code=500, detail="Failed to cancel ride booking") 