const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoiceStatus,
} = require("../controllers/invoiceController");
const { protect } = require("../middleware/authMiddleware");

// All invoice routes are protected
router.use(protect);

router.post("/", createInvoice);
router.get("/", getInvoices);
router.get("/:id", getInvoiceById);
router.patch("/:id/status", updateInvoiceStatus);

module.exports = router;