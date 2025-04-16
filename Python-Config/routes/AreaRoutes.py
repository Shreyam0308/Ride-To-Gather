from fastapi import APIRouter, HTTPException, Form
from controllers.AreaController import *
from models.AreaModel import Area, AreaOut

router = APIRouter()

@router.post("/create_area")
async def create_area(area: Area):
    return await addArea(area)

@router.get("/get_all_areas")
async def get_all_areas():
    return await getArea()

@router.get("/find_area_by_city_id/{city_id}")
async def get_city_areas(city_id: str):
    return await getAreaByCityId(city_id)

@router.put("/update_area_name/{areaid}")
async def update_area_name(areaid: str,new_name: str,cityid: str):
    return await updateAreaName(areaid, new_name, cityid)