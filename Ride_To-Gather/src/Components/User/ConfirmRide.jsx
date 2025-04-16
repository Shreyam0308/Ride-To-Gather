import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "../../assets/Css/ConfirmRide.css";

export const ConfirmRide = () => {
    const { rideId } = useParams();
    const [rideDetails, setRideDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`/find_ride_by_ride_id/${rideId}`)
            .then((response) => setRideDetails(response.data))
            .catch((error) => {
                console.error("Error fetching ride details:", error);
                setError("Failed to fetch ride details. Please try again later.");
            });
    }, [rideId]);

    if (error) {
        return (
            <motion.div
                className="error-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {error}
            </motion.div>
        );
    }

    if (!rideDetails) {
        return (
            <motion.div
                className="loading-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="spinner"></div>
                <p className="loading-message">Loading ride details...</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="confirm-ride-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <h1 className="confirm-ride-title">Confirm Ride</h1>
            <div className="ride-details-card">
                <p><strong>Ride ID:</strong> {rideDetails._id}</p>
                <p><strong>Time to Drop-in:</strong> {rideDetails.time_to_dropin || "Routine"}</p>
                <p><strong>Driver:</strong> {rideDetails.driver_details?.firstName} {rideDetails.driver_details?.lastName} (Age: {rideDetails.driver_details?.age})</p>
                <p><strong>Driver Email:</strong> {rideDetails.driver_details?.email}</p>
                <p><strong>Passenger IDs:</strong> {rideDetails.passenger_id?.length > 0 ? rideDetails.passenger_id.join(", ") : "No passengers"}</p>
                <p><strong>Vehicle:</strong> {rideDetails.vehicle_details?.model} ({rideDetails.vehicle_details?.companyname})</p>
                <p><strong>License Plate:</strong> {rideDetails.vehicle_details?.licenseplate}</p>
                <p><strong>Drop-in Area:</strong> {rideDetails.dropin_area?.name}, {rideDetails.dropin_area?.city?.name}, {rideDetails.dropin_area?.state?.name}</p>
                <p><strong>Drop-off Area:</strong> {rideDetails.dropoff_area?.name}, {rideDetails.dropoff_area?.city?.name}, {rideDetails.dropoff_area?.state?.name}</p>
                <p><strong>Available Seats:</strong> {rideDetails.available_seats}</p>
                <p><strong>Price:</strong> ₹{rideDetails.price}</p>
                <p><strong>Description:</strong> {rideDetails.ride_desc}</p>
            </div>
            <motion.button
                className="confirm-ride-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Ride confirmed!")}
            >
                Confirm Ride
            </motion.button>
        </motion.div>
    );
};