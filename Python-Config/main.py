from fastapi import FastAPI
from routes.RoleRoutes import router as role_router
from routes.UserRoutes import router as user_router
from routes.StateRoutes import router as state_router
from routes.CityRoutes import router as city_router
from routes.AreaRoutes import router as area_router
from routes.VehicleRoutes import router as vehicle_router
from routes.RidesRoutes import router as ride_router
from routes.RideBookRoutes import router as ride_book_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(role_router)
app.include_router(user_router)
app.include_router(state_router)
app.include_router(city_router)
app.include_router(area_router)
app.include_router(vehicle_router)
app.include_router(ride_router)
app.include_router(ride_book_router)
