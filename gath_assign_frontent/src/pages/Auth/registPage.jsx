import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import FloatingBubbles from "./FloatingBubble";
import "./loginPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://gath-assignment-backend.onrender.com/user/register",
        formData,
        { withCredentials: true }
      );

      if (response.data.status) {
        navigate("/user/login");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <FloatingBubbles />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="login-card"
      >
        <div className="login-header">
          <h1>Sign Up</h1>
          <p>Create an account to get started</p>
        </div>

        {errorMessage && <div className="error-banner">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FiUser size={18} />
            <input
              required
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <FiMail size={18} />
            <input
              required
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <FiLock size={18} />
            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="login-button"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"} <FiArrowRight size={18} />
          </motion.button>
        </form>

        <div className="login-footer">
          Already have an account? <Link to="/user/login">Log In</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;