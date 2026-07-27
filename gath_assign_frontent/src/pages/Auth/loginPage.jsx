import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import FloatingBubbles from "./FloatingBubble";
import "./loginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
        "https://gath-assignment-backend.onrender.com/user/login",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.status) {
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Invalid credentials. Please try again."
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
          <h1>Welcome Back</h1>
          <p>Sign in to continue to your dashboard</p>
        </div>

        {errorMessage && <div className="error-banner">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
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
            {isSubmitting ? "Logging in..." : "Login"} <FiArrowRight size={18} />
          </motion.button>
        </form>

        <div className="login-footer">
          Don't have an account? <Link to="/user/register">Sign Up</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;