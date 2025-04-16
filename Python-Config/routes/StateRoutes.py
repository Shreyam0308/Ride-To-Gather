from fastapi import APIRouter, HTTPException
from controllers.StateController import *
from models.StateModel import State, StateOut

router = APIRouter()

@router.post("/create_state")
async def create_state(state: State):
    return await addState(state)

@router.get("/get_all_states")
async def get_all_states():
    return await getAllStates()

@router.get("/find_state_by_state_id/{state_id}")
async def get_state(state_id: str):
    return await getStateByStateId(state_id)