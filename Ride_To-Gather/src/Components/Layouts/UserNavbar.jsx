import React from "react";
import "../../assets/Css/Common.css";
import { Link, Outlet } from "react-router-dom";
// import "../../assets/Logo.svg";

export const UserNavbar = () => {
    const username = localStorage.getItem("name");
    return (
        <>
        <div className="user-navbar">
            <div className="navbar">
                {/* <Link to="/user" className="navbar-logo-link"> */}
                    <div className="logo">
                        {/* <Logo /> */}
                        {/* <img src="Logo" alt="Logo" className="navbar-logo" /> */}
                        {/* <img src="" alt="Logo" className="navbar-logo" /> */}
                        <p>Ride To-Gather</p>
                    </div>
                {/* </Link> */}
                <div className="navbar-links">
                    <Link to="/user" className="no-underline">Home</Link>
                    <Link to="/user/addvehicle" className="no-underline">Register Vehicle</Link>
                    <Link to="/user/addride" className="no-underline">Create Ride</Link>
                    <Link to="/user/user_dashboard" className="no-underline">{username}</Link>
                    <Link to="/logout" className="no-underline">Log Out</Link>
                </div>
            </div>
        </div>
            <div className="content">
                <Outlet />
            </div>
        </>
    );
};

export default UserNavbar;