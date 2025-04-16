from fastapi import APIRouter, HTTPException
from controllers.RoleController import *
from models.RoleModel import Role, RoleOut

router = APIRouter()

@router.post("/create_role")
async def create_role(role: Role):
    return await addRole(role)

@router.get("/get_all_roles")
async def get_all_roles():
    return await getAllRoles()

@router.get("/find_role_by_role_id/{role_id}")
async def get_role(role_id: str):
    return await getRoleById(role_id)