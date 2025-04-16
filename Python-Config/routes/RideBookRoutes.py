from fastapi import APIRouter, HTTPException
from controllers.RideBookController import *
from models.RideBookModel import RideBook, RideBookOut

router = APIRouter()

@router.post("/create_ride_book")
async def create_ride_book(ride_book: RideBook):
    return await createRideBook(ride_book)

@router.get("/get_all_ride_books")
async def get_all_ride_books():
    return await getAllRideBooks()

@router.get("/find_ride_book_by_ride_book_id/{ride_book_id}")
async def get_ride_book(ride_book_id: str):
    return await getRideBookById(ride_book_id)

@router.get("/find_ride_book_by_ride_id/{ride_id}")
async def get_ride_books_by_ride(ride_id: str):
    return await getRideBooksByRide(ride_id)

@router.get("/find_ride_books_by_passenger_id/{passenger_id}")
async def get_ride_books_by_passenger(passenger_id: str):
    return await getRideBooksByPassenger(passenger_id)

@router.get("/find_ride_books_by_driver_id/{driver_id}")
async def get_ride_books_by_driver(driver_id: str):
    return await getRideBooksByDriver(driver_id)

@router.delete("/cancel_ride_book/{ride_book_id}")
async def cancel_ride_book(ride_book_id: str):
    return await cancelRideBook(ride_book_id) 