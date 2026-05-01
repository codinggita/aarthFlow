const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getRecentInvoices,
  getDashboardSummary,
} = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

// All dashboard routes are protected
router.use(protect);

router.get("/stats", getDashboardStats);
router.get("/recent-invoices", getRecentInvoices);
router.get("/summary", getDashboardSummary);

module.exports = router;