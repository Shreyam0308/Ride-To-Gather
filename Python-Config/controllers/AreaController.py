from models.AreaModel import Area,AreaOut
from bson import ObjectId
from config.database import area_collection,city_collection,state_collection
from fastapi import APIRouter,HTTPException
from fastapi.responses import JSONResponse


async def addArea(area:Area):
    savearea = await area_collection.insert_one(area.dict())
    if not savearea:
        raise HTTPException(status_code=500, detail="Error saving area")
    else:
        return JSONResponse(content={"message":"city added"},status_code=201)
    


async def getArea():
    areas = await area_collection.find().to_list()
    for area in areas:
        if "city_id" in area:
            try:
                # Ensure city_id is a valid ObjectId
                city_id = ObjectId(area["city_id"]) if isinstance(area["city_id"], str) else area["city_id"]
                city = await city_collection.find_one({"_id": city_id})
            except Exception:
                city = None  # Handle invalid city_id gracefully
            
            state = {}
            if city:
                city["_id"] = str(city["_id"])
                area["city"] = city
                try:
                    state = await state_collection.find_one({"_id": ObjectId(city["state_id"])})
                    if state:
                        state["_id"] = str(state["_id"])
                        area["state"] = state
                    else:
                        area["state"] = {}
                except Exception:
                    area["state"] = {}
            else:
                area["city"] = {}
                area["state"] = {}
        
    return [AreaOut(**area) for area in areas]


async def getAreaByCityId(city_id:str):
    print("city id",city_id)
    areas = await area_collection.find({"city_id":city_id}).to_list()
    for area in areas:
        if "city_id" in area and isinstance(area["city_id"], ObjectId):
            area["city_id"] = str(area["city_id"])
        
        city  = await city_collection.find_one({"_id":ObjectId(area["city_id"])})    
        if city:
            city["_id"] = str(city["_id"])
            area["city"] = city
    
    return [AreaOut(**area) for area in areas]


async def updateAreaName(areaid: str, new_name: str, cityid: str):
    try:
        area = await area_collection.find_one({"_id": ObjectId(areaid)})
        if not area:
            raise HTTPException(status_code=404, detail="Area with the given ID not found")
        
        if area.get("city_id") != cityid:
            raise HTTPException(status_code=400, detail="Area is not associated with the City.")
        
        update_result = await area_collection.update_one(
            {"_id": ObjectId(areaid)},
            {"$set": {"name": new_name}}
        )
        
        if update_result.modified_count == 0:
            raise HTTPException(status_code=500, detail="Failed to update area name")
        
        return JSONResponse(content={"message": "Area name updated successfully"}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid input: {str(e)}")