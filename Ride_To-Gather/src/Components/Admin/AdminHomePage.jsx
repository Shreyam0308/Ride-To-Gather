import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/Css/AdminHomePage.css"; // Ensure the global styles are imported

export const AdminHomePage = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all ratings on component mount
  useEffect(() => {
    axios
      .get("/get_all_ratings")
      .then((response) => {
        setRatings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ratings:", error);
        setLoading(false);
      });
  }, []);

  // Delete a rating
  const handleDeleteRating = (ratingId) => {
    if (window.confirm("Are you sure you want to delete this rating?")) {
      axios
        .delete(`/delete_rating/${ratingId}`)
        .then(() => {
          alert("Rating deleted successfully!");
          setRatings(ratings.filter((rating) => rating.rating_id !== ratingId));
        })
        .catch((error) => {
          console.error("Error deleting rating:", error);
          alert("Failed to delete rating.");
        });
    }
  };

  // Update user details (placeholder for actual implementation)
  const handleUpdateUser = (userId) => {
    alert(`Update functionality for user ${userId} is not implemented yet.`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-home-container">
      <h2>User Reviews and Feedback</h2>
      {ratings.length === 0 ? (
        <p>No reviews or feedback available.</p>
      ) : (
        <table className="ratings-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Rating</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((rating) => (
              <tr key={rating.rating_id}>
                <td>{rating.user_id}</td>
                <td>{rating.rating}</td>
                <td>{rating.feedback}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdateUser(rating.user_id)}
                  >
                    Update User
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteRating(rating.rating_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
