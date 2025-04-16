from models.VehicleModel import Vehicle, VehicleOut
from bson import ObjectId
from config.database import user_collection, vehicle_collection
from fastapi import HTTPException
from fastapi.responses import JSONResponse

async def getAllvehicle():
    try:
        vehicles = await vehicle_collection.find().to_list(length=None)
        for vehicle in vehicles:
            if "userid" in vehicle and isinstance(vehicle['userid'], ObjectId):
                vehicle['userid'] = str(vehicle['userid'])
            user = await user_collection.find_one({"_id": ObjectId(vehicle['userid'])})
            if user:
                user['_id'] = str(user['_id'])
                vehicle['user'] = user
        return [VehicleOut(**vehicle) for vehicle in vehicles]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching vehicles: {str(e)}")

async def addVehicle(vehicle: Vehicle):
    try:
        existing_vehicle = await vehicle_collection.find_one({"licenseplate": vehicle.licenseplate})
        if existing_vehicle:
            if "userid" in existing_vehicle and existing_vehicle["userid"]:
                return JSONResponse(status_code=400, content={"message": "Vehicle is already associated with a user"})
            else:
                update_result = await vehicle_collection.update_one(
                    {"_id": existing_vehicle["_id"]},
                    {"$set": {"userid": ObjectId(vehicle.userid)}}
                )
                if update_result.modified_count > 0:
                    return JSONResponse(status_code=200, content={"message": "Vehicle associated with user successfully"})
                else:
                    return JSONResponse(status_code=400, content={"message": "Failed to associate vehicle with user"})
        else:
            vehicle_dict = vehicle.dict(by_alias=True)
            if vehicle_dict.get("seatcapacity", 0) < 1:
                return JSONResponse(status_code=400, content={"message": "Minimum seat capacity is 1 required"})
                
            vehicle_dict["userid"] = ObjectId(vehicle_dict["userid"])
            
            result = await vehicle_collection.insert_one(vehicle_dict)
            if result.inserted_id:
                return JSONResponse(status_code=201, content={"message": "Vehicle created and associated with user successfully"})
            else:
                return JSONResponse(status_code=400, content={"message": "Failed to create vehicle"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": "Failed to process vehicle", "error": str(e)})

async def getUserById(userId: str):
    try:
        vehicle = await vehicle_collection.find({"userid": ObjectId(userId)}).to_list(length=None)
        if not vehicle:
            raise HTTPException(status_code=404, detail="vehicle not found")
        vehicles = []
        for v in vehicle:
            if "userid" in v and isinstance(v['userid'], ObjectId):
                v['userid'] = str(v['userid'])
            user = await user_collection.find_one({"_id": ObjectId(v['userid'])})
            if user:
                user['_id'] = str(user['_id'])
                v['user'] = user
                vehicles.append(VehicleOut(**v))
        return vehicles
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching user vehicle: {str(e)}")

async def getVehicleById(vehicleId: str):
    try:
        vehicle = await vehicle_collection.find_one({"_id": ObjectId(vehicleId)})
        if not vehicle:
            raise HTTPException(status_code=404, detail="Vehicle not found")
        vehicle['_id'] = str(vehicle['_id'])
        return VehicleOut(**vehicle)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching vehicle: {str(e)}")