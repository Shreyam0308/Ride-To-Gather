import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaCar, FaMapMarkerAlt, FaClock, FaUsers, FaRupeeSign, FaInfoCircle } from "react-icons/fa";
import "../../assets/Css/AddRide.css";

export const AddRide = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [vehicles, setVehicles] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user_id = localStorage.getItem("id");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`/find_vehicle_by_user_id/${user_id}`);
        setVehicles(response.data);
      } catch (error) {
        setError("Failed to fetch vehicles. Please try again later.");
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axios.get("/get_all_areas");
        // console.log(response.data);
        setCities(response.data);
      } catch (error) {
        setError("Failed to fetch cities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
    fetchCities();
  }, [user_id]);

  const handleBack = () => {
    navigate(-1);
  };

  const submitHandler = async (data) => {
    data.userid = user_id;
    data.driver_id = user_id;
    data.time_to_dropin = data.time_to_dropin.toString().slice(0, 19).replace("T", " ");
    data.passenger_id = [];

    setIsSubmitting(true);

    try {
      const res = await axios.post("/create_ride", data);
      if (res.status === 201) {
        alert("Ride added successfully");
        navigate("/user");
      } else {
        alert("Failed to add Ride");
      }
    } catch (error) {
      alert("Failed to add Ride. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validationSchema = {
    vehicle_id: {
      required: { value: true, message: "Vehicle is required" },
    },
    dropin_area_id: {
      required: { value: true, message: "Drop-in Area is required" },
    },
    dropoff_area_id: {
      required: { value: true, message: "Drop-off Area is required" },
    },
    time_to_dropin: {
      required: { value: true, message: "Time to Drop-in is required" },
    },
    available_seats: {
      required: { value: true, message: "Available Seats is required" },
      min: { value: 1, message: "Must be at least 1" },
    },
    price: {
      required: { value: true, message: "Price is required" },
      min: { value: 100, message: "Must be at least ₹100" },
    },
    ride_desc: {
      required: { value: true, message: "Ride Description is required" },
    },
  };

  if (loading) {
    return (
      <div className="add-ride-background">
        <motion.div className="loading-spinner" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} />
      </div>
    );
  }

  return (
    <div className="add-ride-background">
      <div className="background-animation"></div>
      <motion.button
        className="back-btn"
        onClick={handleBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back
      </motion.button>
      <motion.div
        className="add-ride-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="add-ride-heading"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Add New Ride
        </motion.h1>
        <motion.form
          onSubmit={handleSubmit(submitHandler)}
          className="add-ride-form"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div className="form-group" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <label htmlFor="vehicle_id">
              <FaCar className="field-icon" /> Vehicle
            </label>
            <select id="vehicle_id" {...register("vehicle_id", validationSchema.vehicle_id)}>
              <option value="">Select Vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.model} ({vehicle.licenseplate})
                </option>
              ))}
            </select>
            {errors.vehicle_id && <span className="error-message">{errors.vehicle_id.message}</span>}
          </motion.div>
          <motion.div className="form-group" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <label htmlFor="dropin_area_id">
              <FaMapMarkerAlt className="field-icon" /> Drop-in Area
            </label>
            <select id="dropin_area_id" {...register("dropin_area_id", validationSchema.dropin_area_id)}>
              <option value="">Select Drop-in Area</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}, {city.city.name}, ({city.state.name})
                </option>
              ))}
            </select>
            {errors.dropin_area_id && <span className="error-message">{errors.dropin_area_id.message}</span>}
          </motion.div>
          <motion.div className="form-group" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
            <label htmlFor="dropoff_area_id">
              <FaMapMarkerAlt className="field-icon" /> Drop-off Area
            </label>
            <select id="dropoff_area_id" {...register("dropoff_area_id", validationSchema.dropoff_area_id)}>
              <option value="">Select Drop-off Area</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}, {city.city.name}, ({city.state.name})
                </option>
              ))}
            </select>
            {errors.dropoff_area_id && <span className="error-message">{errors.dropoff_area_id.message}</span>}
          </motion.div>
          <motion.div className="form-group" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
            <label htmlFor="time_to_dropin">
              <FaClock className="field-icon" /> Time to Drop-in
            </label>
            <input type="datetime-local" id="time_to_dropin" {...register("time_to_dropin", validationSchema.time_to_dropin)} />
            {errors.time_to_dropin && <span className="error-message">{errors.time_to_dropin.message}</span>}
          </motion.div>
          <motion.div className="form-group" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
            <label htmlFor="available_seats">
              <FaUsers className="field-icon" /> Available Seats
            </label>
            <input type="number" id="available_seats" min="1" {...register("available_seats", validationSchema.available_seats)} />
            {errors.available_seats && <span className="error-message">{errors.available_seats.message}</span>}
          </motion.div>
          <motion.div className="form-group" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
            <label htmlFor="price">
              <FaRupeeSign className="field-icon" /> Price (₹)
            </label>
            <input type="number" id="price" min="100" {...register("price", validationSchema.price)} />
            {errors.price && <span className="error-message">{errors.price.message}</span>}
          </motion.div>
          <motion.div className="form-group" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1 }}>
            <label htmlFor="ride_desc">
              <FaInfoCircle className="field-icon" /> Ride Description
            </label>
            <textarea id="ride_desc" placeholder="Enter details about your ride..." {...register("ride_desc", validationSchema.ride_desc)} />
            {errors.ride_desc && <span className="error-message">{errors.ride_desc.message}</span>}
          </motion.div>
          <motion.div className="form-group button-group" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.1 }}>
            <motion.button
              type="submit"
              className="generate-ride-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Generate Ride"}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};