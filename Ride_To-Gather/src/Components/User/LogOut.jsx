import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../../assets/Css/Common.css";

export const LogOut = () => {
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(true);

    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();
        // Redirect to login page
        navigate("/login");
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        // Navigate back to previous page
        navigate(-1);
    };

    return (
        <AnimatePresence>
            {showConfirmation && (
                <motion.div
                    className="logout-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="logout-modal"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5 }}
                    >
                        <div className="logout-content">
                            <motion.div
                                className="logout-icon"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                👋
                            </motion.div>
                            <h2>Confirm Logout</h2>
                            <p>Are you sure you want to log out?</p>
                            <div className="logout-buttons">
                                <motion.button
                                    className="logout-button cancel"
                                    onClick={handleCancel}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    className="logout-button confirm"
                                    onClick={handleLogout}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Logout
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};