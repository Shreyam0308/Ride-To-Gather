import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { WelcomeNavbar } from './WelcomeNavbar';
import '../../assets/Css/Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState({ show: false, name: '', role: '' });

  const submitHandler = async (data) => {
    setIsLoading(true);
    setLoginError('');
    try {
      const res = await axios.post("/login", data);
      if (res.data) {
        localStorage.setItem("id", res.data.user._id);
        localStorage.setItem("name", res.data.user.firstName);
        localStorage.setItem("role", res.data.user.role.name);

        // Show welcome message
        setLoginSuccess({
          show: true,
          name: res.data.user.firstName,
          role: res.data.user.role.name
        });

        // Navigate after showing welcome message
        setTimeout(() => {
          if (res.data.user.role.name === "User") {
            navigate("/user");
          } else if (res.data.user.role.name === "Admin") {
            navigate("/admin");
          }
        }, 2000); // Wait for 2 seconds before navigating
      } else {
        setLoginError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(error.response?.data?.message || "Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = {
    email: {
      required: {
        value: true,
        message: "Email is required"
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address"
      }
    },
    password: {
      required: {
        value: true,
        message: "Password is required"
      },
    }
  };

  if (loginSuccess.show) {
    return (
      <motion.div 
        className="welcome-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="welcome-content"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
        >
          <motion.div
            className="welcome-icon"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.2, times: [0, 0.6, 1] }}
          >
            👋
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Welcome back, {loginSuccess.name}!
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          ><br /> <br />
            Redirecting to your {loginSuccess.role.toLowerCase()} dashboard...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  if (isLoading) {
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

  return (
    <>
      <WelcomeNavbar />
      <motion.div 
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <motion.div 
          className="login-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
        <motion.form 
          onSubmit={handleSubmit(submitHandler)} 
          className="login-form"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div 
            className="login-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="login-title">LOGIN USER</h1>
            <p className="login-subtitle">Welcome back! Please enter your details</p>
          </motion.div>

            {loginError && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {loginError}
              </motion.div>
            )}

            <div className="form-group">
              <motion.label 
                htmlFor="email"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="label-with-icon">
                  <FaEnvelope className="field-icon" />
                  <span>Email</span>
                </div>
              </motion.label>
              <motion.div
                className="input-container"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <input 
                  type="email" 
                  id="email" 
                  {...register("email", validationSchema.email)} 
                  placeholder='Enter email'
                />
                {errors.email && (
                  <motion.span 
                    className="error-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.email.message}
                  </motion.span>
                )}
              </motion.div>
            </div>

            <div className="form-group">
              <motion.label 
                htmlFor="password"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="label-with-icon">
                  <FaLock className="field-icon" />
                  <span>Password</span>
                </div>
              </motion.label>
              <motion.div
                className="input-container"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <input 
                  type="password" 
                  id="password" 
                  {...register("password", validationSchema.password)} 
                  placeholder='Enter password'
                />
                {errors.password && (
                  <motion.span 
                    className="error-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.password.message}
                  </motion.span>
                )}
              </motion.div>
            </div>

            <motion.div 
              className="form-group"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                type="submit"
                className="login-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaSignInAlt className="button-icon" />
                <span>Login</span>
              </motion.button>
            </motion.div>

            <motion.p 
              className="signup-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Don't have an account?{' '}
              <motion.span
                onClick={() => navigate('/signup')}
                whileHover={{ scale: 1.1 }}
                style={{ cursor: 'pointer', color: '#1a237e' }}
              >
                Sign Up
              </motion.span>
            </motion.p>
          </motion.form>
        </motion.div>
      </motion.div>
      {/* <div className="footer-container">
        <p className="footer-text">© 2023 Your Company. All rights reserved.</p>
        <p className="footer-text">Privacy Policy | Terms of Service</p>
      </div> */}
    </>
  );
};