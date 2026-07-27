import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import User from "./Model/userModel.js";
import { verifyAccessToken } from "./middlewares/authMiddleware.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser()); 

// Add this right after initializing express: const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your React app's local URL (Vite: 5173, CRA: 3000)
    credentials: true, // Allows sending and receiving HTTP-only cookies
  })
);

// Database Connection 
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gath_test")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Helper Functions to Generate Tokens
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" } // Short lifetime
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // Long lifetime
  );
};

// ==========================================
// ROUTES
// ==========================================

// 1. REGISTER
app.post("/user/register", async (req, res) => {
  try {
  
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ status: true, message: "User created successfully", userId: user._id });
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: false, message: error.message });
  }
});

// 2. LOGIN
app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ status: false, message: "Invalid email or password" });
    }

    // Generate both tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    // Store refresh token in secure HTTP-Only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      status: true,
      message: "Logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: false, message: error.message });
  }
});

// 3. REFRESH TOKEN (Get new access token when old one expires)
app.post("/user/refresh-token", async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ status: false, message: "Refresh token missing" });
  }

  try {
    // Find user with matching refresh token in DB
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ status: false, message: "Invalid refresh token" });
    }

    // Verify token expiration & signature
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ status: false, message: "Expired or invalid refresh token" });
      }

      // Generate NEW Access Token
      const newAccessToken = generateAccessToken(user);

      res.json({
        status: true,
        accessToken: newAccessToken,
      });
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

// 4. LOGOUT (Invalidate refresh token)
app.post("/user/logout", async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    // Clear token from DB
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });
  }

  // Clear cookie
  res.clearCookie("refreshToken");
  res.json({ status: true, message: "Logged out successfully" });
});

// 5. PROTECTED ROUTE EXAMPLE
app.get("/user/dashboard", verifyAccessToken, (req, res) => {
  res.json({
    status: true,
    message: "Welcome to your protected dashboard!",
    user: req.user,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});