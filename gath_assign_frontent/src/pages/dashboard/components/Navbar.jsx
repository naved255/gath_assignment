import React from "react";
import { FiUser, FiMail, FiInfo, FiSettings, FiShield, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/dashboardPage.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call backend to invalidate refresh token & clear HTTP-only cookie
      await axios.post(
        "http://localhost:3000/user/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      // Clear local storage token
      localStorage.removeItem("accessToken");

      // Redirect to login page
      navigate("/user/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FiShield className="brand-icon" />
        <span className="brand-title">
          ABYSS<span className="brand-accent">OS</span>
        </span>
      </div>

      <ul className="navbar-links">
        <li>
          <a href="#profile" className="nav-item">
            <FiUser className="nav-icon" />
            <span>Profile</span>
          </a>
        </li>
        <li>
          <a href="#contact" className="nav-item">
            <FiMail className="nav-icon" />
            <span>Contact</span>
          </a>
        </li>
        <li>
          <a href="#info" className="nav-item">
            <FiInfo className="nav-icon" />
            <span>Information</span>
          </a>
        </li>
        <li>
          <a href="#settings" className="nav-item">
            <FiSettings className="nav-icon" />
            <span>Settings</span>
          </a>
        </li>
        <li>
          <button onClick={handleLogout} className="nav-item logout-btn">
            <FiLogOut className="nav-icon" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;