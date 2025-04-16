import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/Css/ErrorPage.css';

export const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="error-page">
            <div className="error-content">
                <h1 className="error-title">404</h1>
                <p className="error-message">Oops! The page you're looking for doesn't exist.</p>
                <button className="back-button" onClick={handleGoBack}>
                    Go Back
                </button>
            </div>
        </div>
    );
};