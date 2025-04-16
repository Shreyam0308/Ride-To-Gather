from motor.motor_asyncio import AsyncIOMotorClient

#db url
MONGO_URL = "mongodb://localhost:27017"
DATABASE_NAME ="25_Python_Fast_API_Internship"

client = AsyncIOMotorClient(MONGO_URL)
db = client[DATABASE_NAME]
role_collection = db["roles"]
user_collection = db["users"]
state_collection = db["states"]
city_collection = db["cities"]
area_collection = db["areas"]
vehicle_collection = db['vehicles']
ride_collection = db['rides']
rating_collection = db['ratings']
ride_book_collection = db['ride_books']