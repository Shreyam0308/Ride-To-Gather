import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeNavbar } from '../Common/WelcomeNavbar';
import '../../assets/Css/Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export const AdminSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        password: '',
        status: true,
        role_id: '67c9447e0bb595c2b0f7387c'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/create_user', formData);
            if (response.data) {
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <motion.div 
                className="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div 
                    className="loading-spinner"
                    animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                        rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                />
            </motion.div>
        );
    }

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <>
            <WelcomeNavbar />
            <motion.div 
                className="signup-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="background-animation"></div> {/* Add background animation */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="signup-form"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                >
                <motion.div 
                    className="signup-header"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: 0.2
                    }}
                >
                    <motion.h1 
                        className="signup-title"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Create Admin Account
                    </motion.h1>
                    <motion.p 
                        className="signup-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Join our admin team
                    </motion.p>
                </motion.div>

                    <AnimatePresence>
                        {error && (
                            <motion.div 
                                className="error-message"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="form-row">
                        <motion.div className="form-group" variants={inputVariants}>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </motion.div>
                        <motion.div className="form-group" variants={inputVariants}>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </motion.div>
                    </div>

                    <div className="form-row">
                        <motion.div className="form-group" variants={inputVariants}>
                            <label htmlFor="age">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                                min="18"
                            />
                        </motion.div>
                        <motion.div className="form-group" variants={inputVariants}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </motion.div>
                    </div>

                    <motion.div className="form-group" variants={inputVariants}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                    </motion.div>

                    <motion.button
                        type="submit"
                        className="signup-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        variants={inputVariants}
                    >
                        Sign Up
                    </motion.button>

                    <motion.p 
                        className="login-link"
                        variants={inputVariants}
                    >
                        Already have an account?{' '}
                        <motion.span
                            onClick={() => navigate('/login')}
                            whileHover={{ scale: 1.05 }}
                            style={{ cursor: 'pointer' }}
                        >
                            Log In
                        </motion.span>
                    </motion.p>
                </motion.form>
            </motion.div>
        </>
    );
};
