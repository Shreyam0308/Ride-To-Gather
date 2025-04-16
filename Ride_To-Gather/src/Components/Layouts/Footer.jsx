import React from "react";
import { Link } from "react-router-dom";
import "../../assets/Css/Footer.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/services" className="footer-link">Services</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
            {/* <li><Link to="/faq" className="footer-link">FAQ</Link></li> */}
          </ul>
        </div>
        {/* <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">F</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">T</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">I</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">L</a>
          </div>
        </div> */}
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Ride-To-Gather. All rights reserved.</p>
      </div>
    </footer>
  );
};