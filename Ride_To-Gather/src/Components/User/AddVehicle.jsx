import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCar, FaIdCard, FaUsers, FaBuilding } from "react-icons/fa";
import "../../assets/Css/AddVehicle.css";

export const AddVehicle = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      model: "",
      licenseplate: "",
      seatcapacity: "",
      companyname: "",
    },
  });

  const submitHandler = async (data) => {
    data.userid = localStorage.getItem("id");
    try {
      const res = await axios.post("/create_vehicle", data);
      if (res.status === 201 || res.status === 200) {
        alert("Vehicle successfully associated with user.");
        reset();
        navigate("/user");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        alert(data.message || "An error occurred. Please try again.");
      } else {
        alert("Network error or server is unreachable.");
      }
    }
  };

  const validationSchema = {
    model: {
      required: { value: true, message: "Model is required" },
    },
    licenseplate: {
      required: { value: true, message: "License Plate is required" },
      pattern: {
        value: /^[A-Z]{2}-[0-9]{2}-[A-Z]{2}-[0-9]{4}$/,
        message: "Invalid format (e.g., AB-12-CD-3456)",
      },
    },
    seatcapacity: {
      required: { value: true, message: "Seat Capacity is required" },
      min: { value: 1, message: "Must be at least 1" },
    },
    companyname: {
      required: { value: true, message: "Company Name is required" },
    },
  };

  return (
    <motion.div
      className="add-vehicle-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="background-animation"></div>
      <motion.h1
        className="add-vehicle-heading"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Register Vehicle
      </motion.h1>
      <motion.form
        onSubmit={handleSubmit(submitHandler)}
        className="add-vehicle-form"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="form-group"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="model">
            <FaCar className="field-icon" /> Model
          </label>
          <input
            type="text"
            id="model"
            {...register("model", validationSchema.model)}
          />
          {errors.model && (
            <span className="error-message">{errors.model.message}</span>
          )}
        </motion.div>
        <motion.div
          className="form-group"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label htmlFor="licenseplate">
            <FaIdCard className="field-icon" /> License Plate
          </label>
          <input
            type="text"
            id="licenseplate"
            {...register("licenseplate", validationSchema.licenseplate)}
          />
          {errors.licenseplate && (
            <span className="error-message">{errors.licenseplate.message}</span>
          )}
        </motion.div>
        <motion.div
          className="form-group"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <label htmlFor="seatcapacity">
            <FaUsers className="field-icon" /> Seat Capacity
          </label>
          <input
            type="number"
            id="seatcapacity"
            {...register("seatcapacity", validationSchema.seatcapacity)}
          />
          {errors.seatcapacity && (
            <span className="error-message">{errors.seatcapacity.message}</span>
          )}
        </motion.div>
        <motion.div
          className="form-group"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <label htmlFor="companyname">
            <FaBuilding className="field-icon" /> Company Name
          </label>
          <input
            type="text"
            id="companyname"
            {...register("companyname", validationSchema.companyname)}
          />
          {errors.companyname && (
            <span className="error-message">{errors.companyname.message}</span>
          )}
        </motion.div>
        <motion.div
          className="form-group"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <input type="submit" value="Add Vehicle" className="add-button" />
        </motion.div>
      </motion.form>
    </motion.div>
  );
};