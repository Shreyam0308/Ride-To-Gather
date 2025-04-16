from fastapi import APIRouter, HTTPException
from controllers.RideController import *
from models.RideModel import Ride, RideOut

router = APIRouter()

@router.post("/create_ride")
async def create_ride(ride: Ride):
    return await addRide(ride)

@router.get("/get_all_rides/{userid}")
async def get_all_rides(userid: str):
    return await getAllRides(userid)

@router.get("/find_ride_by_ride_id/{ride_id}")
async def get_ride(ride_id: str):
    return await getRideById(ride_id)

@router.get("/find_ride_by_driver_id/{user_id}")
async def get_driver_rides(user_id: str):
    return await findRideByDriver(user_id)

@router.get("/find_ride_by_passenger_id/{user_id}")
async def get_passenger_rides(user_id: str):
    """Route to get rides booked by a passenger."""
    return await findRideByPassenger(user_id)

# @router.post("/book_ride_by_ride_id/{ride_id}")
# async def book_ride(ride_id: str, passenger_id: str):
#     return await updateRideStatus(ride_id, passenger_id)

# @router.post("/cancel_ride_by_ride_id/{ride_id}")
# async def cancel_ride(ride_id: str, user_id: str):
#     return await cancelRide(ride_id, user_id)