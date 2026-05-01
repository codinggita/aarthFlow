const express = require("express");
const router = express.Router();
const { register, login, sendOTP, verifyOTP, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

// Private route (needs JWT token in header)
router.get("/me", protect, getMe);

module.exports = router;