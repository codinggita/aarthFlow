const express = require("express");
const router = express.Router();
const {
  addBuyer,
  getBuyers,
  getBuyerById,
  updateBuyer,
  deleteBuyer,
} = require("../controllers/buyerController");
const { protect } = require("../middleware/authMiddleware");

// All buyer routes are protected
router.use(protect);

router.post("/", addBuyer);
router.get("/", getBuyers);
router.get("/:id", getBuyerById);
router.patch("/:id", updateBuyer);
router.delete("/:id", deleteBuyer);

module.exports = router;