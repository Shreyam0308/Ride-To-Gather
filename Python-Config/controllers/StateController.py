from models.StateModel import State,StateOut
from bson import ObjectId
from fastapi.responses import JSONResponse
from fastapi import HTTPException
from config.database import state_collection

async def addState(state:State):
    savedState = await state_collection.insert_one(state.dict())
    if savedState:
        return JSONResponse(status_code=201,content={"message:":"State Added Successfully"})
    raise HTTPException(status_code=500,detail="Internal Server Error")

async def getAllStates():
    states = await state_collection.find().to_list()
    if len(states)==0:
        return JSONResponse(status_code=404,content={"message":"No State Found"})
    return [StateOut(**state) for state in states]
    
async def getStateByStateId(stateId:str):
    result = await state_collection.find_one({"_id":ObjectId(stateId)})
    print(result)    
    return StateOut(**result)