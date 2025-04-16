from fastapi import APIRouter, HTTPException
from models.VehicleModel import Vehicle, VehicleOut
from controllers.VehicleController import *
from typing import List

router = APIRouter()

@router.post("/create_vehicle")
async def create_vehicle(vehicle: Vehicle):
    return await addVehicle(vehicle)

@router.get("/get_all_vehicles")
async def get_all_vehicles():
    return await getAllvehicle()

@router.get("/find_vehicle_by_vehicle_id/{vehicle_id}")
async def get_vehicle(vehicle_id: str):
    return await getVehicleById(vehicle_id)

@router.get("/find_vehicle_by_user_id/{user_id}")
async def get_user_vehicles(user_id: str):
    return await getUserById(user_id)