const Payout = require("../models/Payout");
const Invoice = require("../models/Invoice");
const { calculateAdvance } = require("../utils/feeCalculator");

// POST /api/payouts/initiate
const initiatePayout = async (req, res) => {
  try {
    const { invoiceId, bankAccount, ifscCode, bankName } = req.body;

    if (!invoiceId || !bankAccount || !ifscCode) {
      return res.status(400).json({
        success: false,
        message: "Invoice ID, bank account and IFSC code are required",
      });
    }

    // Check invoice exists and belongs to user
    const invoice = await Invoice.findOne({
      _id: invoiceId,
      user: req.user.id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    // Only funded or buyer-confirmed invoices can be paid out
    if (!["Buyer Confirming", "Under Review", "Funded"].includes(invoice.status)) {
      return res.status(400).json({
        success: false,
        message: "Invoice is not eligible for payout yet",
      });
    }

    // Check payout not already initiated for this invoice
    const existing = await Payout.findOne({ invoice: invoiceId });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Payout already initiated for this invoice",
      });
    }

    const {
      advancePercent,
      feePercent,
      advanceAmount,
      feeAmount,
      netPayout,
    } = calculateAdvance(invoice.invoiceAmount, invoice.advancePercent);

    // Expected arrival = 24 hours from now
    const expectedArrival = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const payout = await Payout.create({
      user: req.user.id,
      invoice: invoiceId,
      invoiceAmount: invoice.invoiceAmount,
      advancePercent,
      advanceAmount,
      feePercent,
      feeAmount,
      netPayout,
      bankAccount,
      ifscCode: ifscCode.toUpperCase(),
      bankName: bankName || "",
      status: "Initiated",
      expectedArrival,
    });

    // Update invoice status to Funded
    invoice.status = "Funded";
    await invoice.save();

    res.status(201).json({
      success: true,
      message: "Payout initiated successfully",
      payout,
    });
  } catch (error) {
    console.error("Initiate payout error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET /api/payouts
const getPayouts = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { user: req.user.id };
    if (status) filter.status = status;

    const payouts = await Payout.find(filter)
      .populate("invoice", "invoiceNumber buyerName invoiceDate dueDate")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payouts.length,
      payouts,
    });
  } catch (error) {
    console.error("Get payouts error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET /api/payouts/:id
const getPayoutById = async (req, res) => {
  try {
    const payout = await Payout.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("invoice", "invoiceNumber buyerName invoiceAmount status");

    if (!payout) {
      return res.status(404).json({
        success: false,
        message: "Payout not found",
      });
    }

    res.status(200).json({ success: true, payout });
  } catch (error) {
    console.error("Get payout error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// PATCH /api/payouts/:id/status
const updatePayoutStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = ["Initiated", "Processing", "Completed", "Failed"];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payout status",
      });
    }

    const payout = await Payout.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        status,
        ...(status === "Completed" && { completedAt: new Date() }),
      },
      { new: true }
    );

    if (!payout) {
      return res.status(404).json({
        success: false,
        message: "Payout not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payout status updated",
      payout,
    });
  } catch (error) {
    console.error("Update payout status error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  initiatePayout,
  getPayouts,
  getPayoutById,
  updatePayoutStatus,
};