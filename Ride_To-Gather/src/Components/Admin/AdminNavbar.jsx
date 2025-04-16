import React from "react";
import "../../assets/Css/Common.css"; // Ensure the global styles are imported
import { Link, Outlet } from "react-router-dom";

export const AdminNavbar = () => {
    return (
        <>
        <div className="user-navbar">
            <div className="navbar">
                <div className="logo">
                    <img src="/Logo.svg" alt="Logo" className="navbar-logo" />
                    <p>Ride To-Gather</p>
                </div>
                <div className="navbar-links">
                    <Link to="/admin">Home</Link>
                    <Link to="/admin/delete_user">Manage Users</Link>
                    <Link to="/admin/add_area">Add Area</Link>
                    <Link to="/admin/update_area">Update Area</Link>
                    <Link to="/logout">Log Out</Link>
                </div>
            </div>
        </div>
        <div className="content">
            <Outlet />
        </div>
        </>
    );
};