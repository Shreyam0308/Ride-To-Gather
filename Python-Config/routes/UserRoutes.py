from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from models.UserModel import User, UserOut, UserLogin
from controllers.UserController import *
from typing import List

router = APIRouter()

@router.post("/create_user")
async def create_user(user: User):
    return await addUser(user)

# @router.post("/user/")
# async def post_user(
#     firstName:str = Form(...),
#     lastName:str = Form(...),
#     age:int = Form(...),
#     status:bool = Form(...),
#     role_id:str = Form(...),
#     email:str = Form(...),
#     password:str = Form(...),
#     image:UploadFile = File(...)):
#     return await addUser(
#         firstName, lastName, age, status, role_id, email, password, image
#     )
    
@router.get("/get_all_users")
async def get_users():
    return await getAllUsers()

@router.get("/find_user_by_user_id/{user_id}")
async def find_user_by_user_id(user_id: str):
    return await getUserById(user_id)

@router.post("/login")
async def login(user: UserLogin):
    return await loginUser(user)

@router.delete("/delete_user/{user_id}")
async def delete_user(user_id: str):
    return await deleteUser(user_id)