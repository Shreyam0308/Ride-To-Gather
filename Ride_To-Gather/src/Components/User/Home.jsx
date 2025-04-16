import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../../assets/Css/Home.css";

export const Home = () => {
    const navigate = useNavigate();
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userid = localStorage.getItem("id");

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const response = await axios.get(`/get_all_rides/${userid}`);
                setRides(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRides();
    }, []);

    const handleRideClick = (rideId) => {
        navigate(`/confirm-ride/${rideId}`);
    };

    const formatLocation = (area, city, state) => {
        if (!area) return "N/A";
        if (!city) return "N/A";
        if (!state) return "N/A";
        return area.name + ", " + city.name + ", (" + state.name + ")";
    };

    const formatVehicle = (vehicle) => {
        if (!vehicle) return "N/A";
        return `${vehicle.companyname} (${vehicle.licenseplate})`;
    };

    const formatDriver = (driver) => {
        if (!driver) return "N/A";
        return `${driver.firstName} ${driver.lastName}`;
    };

    if (loading) {
        return (
            <motion.div
                className="loading-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="loading-spinner" />
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                className="error-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
            >
                <p>Error: {error}</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="home-header">
                <motion.h1
                    className="home-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Book Rides
                </motion.h1>
                <motion.button
                    className="add-ride-btn"
                    onClick={() => navigate("/user/addride")}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    Add Ride
                </motion.button>
            </div>

            <motion.div
                className="rides-table-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <table className="rides-table">
                    <thead>
                        <tr>
                            <th>Drop-in Location</th>
                            <th>Drop-off Location</th>
                            <th>Vehicle Details</th>
                            <th>Driver</th>
                            <th>Time to Drop-in</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <AnimatePresence>
                        <tbody>
                            {rides.map((ride, index) => (
                                <motion.tr
                                    key={ride._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() => handleRideClick(ride._id)} // Navigate on click
                                    style={{ cursor: "pointer" }} // Add pointer cursor for better UX
                                >
                                    <td>{formatLocation(ride.dropin_area, ride.dropin_area.city, ride.dropin_area.state)}</td>
                                    <td>{formatLocation(ride.dropoff_area, ride.dropin_area.city, ride.dropin_area.state)}</td>
                                    <td>{formatVehicle(ride.vehicle_details)}</td>
                                    <td>{formatDriver(ride.driver_details)}</td>
                                    <td>{ride.time_to_dropin}</td>
                                    <td>{ride.available_seats}</td>
                                    <td>₹{ride.price}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </AnimatePresence>
                </table>
            </motion.div>
        </motion.div>
    );
};