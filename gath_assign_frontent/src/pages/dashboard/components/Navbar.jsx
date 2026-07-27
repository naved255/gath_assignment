import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiInfo,
  FiSettings,
  FiShield,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/dashboardPage.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://gath-assignment-backend.onrender.com/user/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      localStorage.removeItem("accessToken");
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

      {/* Hamburger Toggle Button for Mobile */}
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle Navigation"
      >
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Navigation Links */}
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <a
            href="#profile"
            className="nav-item"
            onClick={() => setMenuOpen(false)}
          >
            <FiUser className="nav-icon" />
            <span>Profile</span>
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="nav-item"
            onClick={() => setMenuOpen(false)}
          >
            <FiMail className="nav-icon" />
            <span>Contact</span>
          </a>
        </li>
        <li>
          <a
            href="#info"
            className="nav-item"
            onClick={() => setMenuOpen(false)}
          >
            <FiInfo className="nav-icon" />
            <span>Information</span>
          </a>
        </li>
        <li>
          <a
            href="#settings"
            className="nav-item"
            onClick={() => setMenuOpen(false)}
          >
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