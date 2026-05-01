const express = require("express");
const router = express.Router();
const {
  initiatePayout,
  getPayouts,
  getPayoutById,
  updatePayoutStatus,
} = require("../controllers/payoutController");
const { protect } = require("../middleware/authMiddleware");

// All payout routes are protected
router.use(protect);

router.post("/initiate", initiatePayout);
router.get("/", getPayouts);
router.get("/:id", getPayoutById);
router.patch("/:id/status", updatePayoutStatus);

module.exports = router;