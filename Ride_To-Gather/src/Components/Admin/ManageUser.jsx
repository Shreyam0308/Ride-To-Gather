import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/Css/ManageUser.css';

export const ManageUser = () => {
    const [userId, setUserId] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (userId.length !== 24) {
            setError('User ID must be 24 characters long.');
            setUserDetails(null);
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get(`/find_user_by_user_id/${userId}`);
            setUserDetails(response.data);
            setError('');
        } catch (err) {
            setError('User not found.');
            setUserDetails(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (userDetails.role.name === 'Admin') {
            setError('Cannot delete an Admin user.');
            return;
        }
        setIsLoading(true);
        try {
            await axios.delete(`/delete_user/${userId}`);
            setUserDetails(null);
            setError('User deleted successfully.');
        } catch (err) {
            setError('Failed to delete user.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="manage-user">
            <h1 className="manage-user-title">Manage User</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter User ID (24 characters)"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    maxLength={24}
                />
                <button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {userDetails && (
                <div className="user-details">
                    <h2>User Details</h2>
                    <p><strong>First Name:</strong> {userDetails.firstName}</p>
                    <p><strong>Last Name:</strong> {userDetails.lastName}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Role:</strong> {userDetails.role.name}</p>
                    <p><strong>Status:</strong> {userDetails.status ? 'Active' : 'Inactive'}</p>
                    {userDetails.role.name !== 'Admin' && (
                        <button
                            className="delete-button"
                            onClick={handleDelete}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Deleting...' : 'Delete User'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
