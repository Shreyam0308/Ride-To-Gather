from fastapi import APIRouter, HTTPException
from controllers.CityController import *
from models.CityModel import City, CityOut

router = APIRouter()

@router.post("/create_city")
async def create_city(city: City):
    return await addCity(city)

@router.get("/get_all_cities")
async def get_all_cities():
    return await getAllCities()

@router.get("/find_city_by_city_id/{city_id}")
async def get_city(city_id: str):
    return await getCityById(city_id)

@router.get("/find_city_by_state_id/{state_id}")
async def get_state_cities(state_id: str):
    return await getCityByStateId(state_id)