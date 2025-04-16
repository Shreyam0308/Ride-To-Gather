from models.RideModel import Ride, RideOut
from bson import ObjectId
from config.database import ride_collection,area_collection,city_collection,state_collection,user_collection,vehicle_collection
from fastapi import HTTPException
from fastapi.responses import JSONResponse

async def addRide(ride: Ride):
    ride.driver_id = ObjectId(ride.driver_id)
    ride.passenger_id = [ObjectId(id) for id in ride.passenger_id]
    ride.vehicle_id = ObjectId(ride.vehicle_id)
    ride.dropin_area_id = ObjectId(ride.dropin_area_id)
    ride.dropoff_area_id = ObjectId(ride.dropoff_area_id)
    insert_ride = ride.dict()
    
    dropin_area = await area_collection.find_one({"_id": ride.dropin_area_id})
    if dropin_area:
        dropin_area['_id'] = str(dropin_area['_id'])
        city = await city_collection.find_one({"_id": ObjectId(dropin_area["city_id"])})
        if city:
            dropin_area["city"] = city
            city['_id'] = str(city['_id'])
            state = await state_collection.find_one({"_id": ObjectId(city["state_id"])})
            if state:
                state['_id'] = str(state['_id'])
                dropin_area["state"] = state
        insert_ride["dropin_area"] = dropin_area
    
    dropoff_area = await area_collection.find_one({"_id": ride.dropoff_area_id})
    if dropoff_area:
        dropoff_area['_id'] = str(dropoff_area['_id'])
        city = await city_collection.find_one({"_id": ObjectId(dropoff_area["city_id"])})
        if city:
            dropoff_area["city"] = city
            city['_id'] = str(city['_id'])
            state = await state_collection.find_one({"_id": ObjectId(city["state_id"])})
            if state:
                state['_id'] = str(state['_id'])
                dropoff_area["state"] = state
        insert_ride["dropoff_area"] = dropoff_area
        
    driver_details = await user_collection.find_one({"_id": ride.driver_id})
    print(driver_details)
    if driver_details:
        driver_details['_id'] = str(driver_details['_id'])
        driver_details["role_id"] = str(driver_details["role_id"])
        insert_ride["driver_details"] = driver_details
    
    vehicle = await vehicle_collection.find_one({"_id": ride.vehicle_id})
    if vehicle:
        if vehicle["userid"] == ride.driver_id:
            vehicle['_id'] = str(vehicle['_id'])
            vehicle["userid"] = str(vehicle["userid"])
            insert_ride["vehicle_details"] = vehicle
        else:
            raise HTTPException(status_code=400, detail="Vehicle does not belong to the driver")    

    result = await ride_collection.insert_one(insert_ride)
    if result:
        return JSONResponse(status_code=201, content={"message": "Ride added successfully"})
    else:
        raise HTTPException(status_code=500, detail="Failed to add ride")

async def getAllRides(userid:str):
    temp = await ride_collection.find().to_list(length=None)
    created_rides = []
    booked_rides = []
    for ride in temp:
        if userid == str(ride["driver_id"]):
            booked_rides.append(ride)
        else:
            created_rides.append(ride)
    
    if len(created_rides) > 0:
        return [RideOut(**ride) for ride in created_rides]
    else:
        raise HTTPException(status_code=500, detail=f"rides not created by User")

async def getRideById(ride_id: str):
    ride = await ride_collection.find_one({"_id": ObjectId(ride_id)})
    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found")  
    return RideOut(**ride)

async def findRideByDriver(user_id: str):
    if not user_id or user_id == "null":  # Validate user_id
        raise HTTPException(status_code=400, detail="Invalid user_id provided")
    
    try:
        user_object_id = ObjectId(user_id)  # Convert to ObjectId
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user_id format")
    
    rides = await ride_collection.find({"driver_id": user_object_id}).to_list(length=None)
    if rides:
        return [RideOut(**ride) for ride in rides]
    else:
        raise HTTPException(status_code=404, detail="User has not created any rides")

async def findRideByPassenger(user_id: str):
    if not user_id or user_id == "null":  # Validate user_id
        raise HTTPException(status_code=400, detail="Invalid user_id provided")
    
    try:
        user_object_id = ObjectId(user_id)  # Convert to ObjectId
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user_id format")
    
    rides = await ride_collection.find({"passenger_id": user_object_id}).to_list(length=None)
    if rides:
        return [RideOut(**ride) for ride in rides]
    else:
        raise HTTPException(status_code=404, detail="User has not booked any rides")

# async def updateRide(id:str, ride_id: str, user_id:str):
#     ride = await ride_collection.find_one({"_id": ObjectId(id)})
#     if ride:
#         result = await ride_collection.update_one({"_id": ObjectId(id)}, {"$set": ride.available_seats: ride.available_seats - 1, "$set": ride.passenger_id: ride.passenger_id.append(user_id)})
#         if result.modified_count > 0:
#             return JSONResponse(status_code=200, content={"message": "Ride updated successfully"})
#         else:
#             raise HTTPException(status_code=500, detail="Failed to update ride")