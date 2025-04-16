from models.UserModel import User,UserOut,UserLogin
from bson import ObjectId
from config.database import user_collection,role_collection
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from fastapi import APIRouter, HTTPException, UploadFile, File,Form
from fastapi.responses import JSONResponse
import bcrypt
import shutil
import os
from utils.CloudinaryUtil import upload_image

UPLOAD_DIR = "profile_photo"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def addUser(user:User):
    user.role_id = ObjectId(user.role_id)
    print("after type cast",user.role_id)
    result = await user_collection.insert_one(user.dict())
    return JSONResponse(status_code=201,content={"message":"User created successfully"})

# async def addUser(
#     firstName:str = Form(...),
#     lastName:str = Form(...),
#     age:int = Form(...),
#     status:bool = Form(...),
#     role_id:str = Form(...),
#     email:str = Form(...),
#     password:str = Form(...),
#     image:UploadFile = File(...)
# ):
#     try:
    
#         # Ensure upload directory exists
#         os.makedirs(UPLOAD_DIR, exist_ok=True)

#         #abc.jpg -> ["abc", "jpg"]
#         # Save the uploaded file
#         file_ext = image.filename.split(".")[-1]  # Get file extension
#         file_path = os.path.join(UPLOAD_DIR, f"{ObjectId()}.{file_ext}")  # Rename file
#         with open(file_path, "wb") as buffer:
#             shutil.copyfileobj(image.file, buffer)

#         # Create a product object (DO NOT include `image` directly)
        
#         #upload image to cloudinary
#         image_url = await upload_image(file_path)
        
#         user_data = {
#             "firstName": str(firstName),
#             "lastName": str(lastName),
#             "age": int(age),
#             "status": bool(status),
#             "role_id": str(ObjectId(role_id)),
#             "email": str(email),
#             "password": str(password),
#             "image_url":image_url # Only store path, NOT file object
#         }
#         print(user_data)
#         insertedProduct = await user_collection.insert_one(user_data)

#         return JSONResponse(content={"message": "User registered successfully"}, status_code=201)
#     except Exception as e:
#         print(f"An error occurred: {str(e)}")
#         raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

async def getUserById(user_id:str):
    user = await user_collection.find_one({"_id":ObjectId(user_id)})
    print(user)
    if user is None:
        raise HTTPException(status_code=404,detail="User not found")
    
    if "role_id" in user and isinstance(user["role_id"], ObjectId):
        user["role_id"] = str(user["role_id"])
    
    role = await role_collection.find_one({"_id":ObjectId(user["role_id"])})
    
    if role:
        user["role_id"] = str(role["_id"])
        user["role"] = role
    
    return UserOut(**user)

async def getAllUsers():
    users = await user_collection.find().to_list(length=None)

    for user in users:
        if "role_id" in user and isinstance(user["role_id"], ObjectId):
            user["role_id"] = str(user["role_id"])
        
        role = await role_collection.find_one({"_id": ObjectId(user["role_id"])})  
        
        if role:
            role["_id"] = str(role["_id"])
            user["role"] = role

    return [UserOut(**user) for user in users]

async def loginUser(request:UserLogin):
    foundUser = await user_collection.find_one({"email":request.email})
    # print(":foundUser",foundUser)
    if foundUser is None:
        raise HTTPException(status_code=404,detail="User not found")
        
    if "password" in foundUser and bcrypt.checkpw(request.password.encode(),foundUser["password"].encode()):
        foundUser["_id"] = str(foundUser["_id"])
        foundUser["role_id"] = str(foundUser["role_id"])
        role = await role_collection.find_one({"_id":ObjectId(foundUser["role_id"])})
        foundUser["role"] = role
        print("foundUser",foundUser)
        return {"message":"user login success","user":UserOut(**foundUser)}
    else:
        raise HTTPException(status_code=404,detail="Invalid password")

async def deleteUser(user_id:str):
    user = await user_collection.find_one({"_id":ObjectId(user_id)})
    if user is None:
        raise HTTPException(status_code=404,detail="User not found")
    role = await role_collection.find_one({"_id":ObjectId(user["role_id"])})
    if role['name'] == "Admin":
        raise HTTPException(status_code=400,detail="Cannot delete admin user")
    await user_collection.delete_one({"_id":ObjectId(user_id)})
    return JSONResponse(status_code=200,content={"message":"User deleted successfully"})