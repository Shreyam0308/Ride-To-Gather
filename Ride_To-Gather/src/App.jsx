import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
// Common
import { WelcomeNavbar } from "./Components/Common/WelcomeNavbar";
import { WelcomePage } from "./Components/Common/WelcomePage";
import { Login } from "./Components/Common/Login";
import { LogOut } from "./Components/User/LogOut";
import { ErrorPage } from "./Components/User/ErrorPage";
import { Signup } from "./Components/Common/Signup";
// User
import PrivateUserRoutes from "./Components/Hooks/PrivateUserRoutes";
import { UserNavbar } from "./Components/Layouts/UserNavbar";
import { Home } from "./Components/User/Home";
import { AddVehicle } from "./Components/User/AddVehicle";
import { AddRide } from "./Components/User/AddRide";
// Admin
import PrivateAdminRoutes from "./Components/Hooks/PrivateAdminRoutes";
import { AdminSignup } from "./Components/Admin/AdminSignup";
import { AdminNavbar } from "./Components/Admin/AdminNavbar";
import { AddArea } from "./Components/Admin/AddArea";
import { ManageUser } from "./Components/Admin/ManageUser";
import LogoutConfirmation from "./Components/User/LogoutConfirmation";
import { UpdateArea } from "./Components/Admin/UpdateArea";
import { AdminHomePage } from "./Components/Admin/AdminHomePage";
import { UserDashboard } from "./Components/User/UserDashboad";
import { BookRide } from "./Components/User/BookRide";
import { ErrorBoundary } from "./ErrorBoundary";
import { ConfirmRide } from "./Components/User/ConfirmRide";

axios.defaults.baseURL = "http://localhost:8000";

const App = () => {
    return (
        <ErrorBoundary>
            <Router>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/adminsignup" element={<AdminSignup />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<LogOut />} />

                    <Route element={<PrivateUserRoutes />}>
                        <Route element={<UserNavbar />}>
                            <Route path="/user" element={<Home />} />
                            <Route path="/user/addvehicle" element={<AddVehicle />} />
                            <Route path="/user/addride" element={<AddRide />} />
                            <Route path="/user/user_dashboard" element={<UserDashboard />} />
                            <Route path="/confirm-ride/:rideId" element={<ConfirmRide />} />
                            <Route path="/user/*" element={<ErrorPage />} />
                        </Route>
                    </Route>

                    <Route element={<PrivateAdminRoutes />}>
                        <Route element={<AdminNavbar />}>
                            <Route element={<AdminNavbar />}>
                                <Route path="/admin" element={<AdminHomePage />} />
                                <Route path="/admin/add_area" element={<AddArea />} />
                                <Route path="/admin/update_area" element={<UpdateArea />} />
                                <Route path="/admin/delete_user" element={<ManageUser />} />
                                <Route path="/admin/*" element={<ErrorPage />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route path="/*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </ErrorBoundary>
    );
};

export default App;
