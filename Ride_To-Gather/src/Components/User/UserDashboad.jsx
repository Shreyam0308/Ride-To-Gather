import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../assets/Css/UserDashboard.css";
import { Link } from 'react-router-dom';

export const UserDashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [bookedRides, setBookedRides] = useState([]);
  const [createdRides, setCreatedRides] = useState([]);
  const [bookedRidesError, setBookedRidesError] = useState(false);
  const [createdRidesError, setCreatedRidesError] = useState(false);

  const userId = localStorage.getItem('id');

  useEffect(() => {
    axios.get(`/find_user_by_user_id/${userId}`)
      .then(response => setUserDetails(response.data))
      .catch(error => console.error('Error fetching user details:', error));

    axios.get(`/find_ride_by_passenger_id/${userId}`)
      .then(response => setBookedRides(response.data))
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setBookedRidesError(true);
        } else {
          console.error('Error fetching booked rides:', error);
        }
      });

    axios.get(`/find_ride_by_driver_id/${userId}`)
      .then(response => setCreatedRides(response.data))
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setCreatedRidesError(true);
        } else {
          console.error('Error fetching created rides:', error);
        }
      });
  }, [userId]);

  return (
    <div className="user-dashboard-container">
      <h1 className="dashboard-heading">User Dashboard</h1>

      {userDetails && (
        <div className="user-details dynamic-box">
          <h2>User Details</h2>
          <p><strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Age:</strong> {userDetails.age}</p>
          <p><strong>Status:</strong> {userDetails.status ? "Active" : "Inactive"}</p>
        </div>
      )}

      <div className="rides-section">
        <div className="rides-box dynamic-box">
          <h2>Booked Rides</h2>
          {bookedRidesError ? (
            <p className="error-message">Ohh!, you don't booked a ride.</p>
          ) : bookedRides.length === 0 ? (
            <p>No booked rides available.</p>
          ) : (
            <ul>
              {bookedRides.map(ride => (
                <li key={ride._id} className="ride-item">
                  <p><strong>Ride ID:</strong> {ride._id}</p>
                  <p><strong>Destination:</strong> {ride.dropin_area.name}, {ride.dropin_area.city.name}, ({ride.dropin_area.state.name})</p>
                  <p><strong>Date:</strong> {ride.time_to_dropin}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rides-box dynamic-box">
          <h2>Created Rides</h2>
          {createdRidesError ? (
            <p className="error-message">
              You does not create a ride. <Link to="/admin/add_area">Create one now!</Link>
            </p>
          ) : createdRides.length === 0 ? (
            <p>No created rides available.</p>
          ) : (
            <ul>
              {createdRides.map(ride => (
                <li key={ride._id} className="ride-item">
                  <p><strong>Ride ID:</strong> {ride._id}</p>
                  <p><strong>Destination:</strong> {ride.dropin_area.name}, {ride.dropin_area.city.name}, ({ride.dropin_area.state.name})</p>
                  <p><strong>Date:</strong> {ride.time_to_dropin}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
