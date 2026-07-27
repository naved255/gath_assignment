import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SharkScene from "../components/SharkScene";
import CardGrid from "../components/CardGrid";
import "../styles/dashboardPage.css";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      // Redirect unauthenticated user to login
      navigate("/user/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // Don't render dashboard content until token is verified
  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <div className="dashboard">
      <Navbar />
      <CardGrid />
      <SharkScene />
    </div>
  );
};

export default DashboardPage;
