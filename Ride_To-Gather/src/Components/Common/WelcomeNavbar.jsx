
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../../assets/Css/Common.css";

export const WelcomeNavbar = () => { // Named export
    return (
        <div className="user-navbar" style={{position: "static"}}>
            
            <div className="navbar navbar-links">
                <Link to="/">
                <div className="logo">
                    {/* <img src="/Logo.svg" alt="Logo" className="navbar-logo" /> */}
                    <p>Ride To-Gather</p>
                </div>
                </Link>
                <div className="navbar-links">
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Log In</Link>
                </div>
            </div>
        </div>
    );
};
