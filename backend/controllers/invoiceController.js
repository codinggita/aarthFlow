const Invoice = require("../models/Invoice");

// Fee calculation helper
const calculateFee = (amount, advancePercent) => {
  const feeMap = { 80: 1.5, 90: 2.0, 100: 2.8 };
  const feePercent = feeMap[advancePercent] || 2.0;
  const advanceAmount = (amount * advancePercent) / 100;
  const feeAmount = (advanceAmount * feePercent) / 100;
  const netPayout = advanceAmount - feeAmount;
  return { feePercent, advanceAmount, feeAmount, netPayout };
};

// POST /api/invoices
const createInvoice = async (req, res) => {
  try {
    const {
      invoiceNumber, buyerName, buyerGST,
      invoiceAmount, invoiceDate, dueDate, advancePercent,
    } = req.body;

    if (!invoiceNumber || !buyerName || !invoiceAmount || !invoiceDate || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const { feePercent, advanceAmount, feeAmount, netPayout } =
      calculateFee(invoiceAmount, advancePercent || 90);

    const invoice = await Invoice.create({
      user: req.user.id,
      invoiceNumber,
      buyerName,
      buyerGST,
      invoiceAmount,
      invoiceDate,
      dueDate,
      advancePercent: advancePercent || 90,
      advanceAmount,
      feePercent,
      feeAmount,
      netPayout,
    });

    res.status(201).json({
      success: true,
      message: "Invoice submitted successfully",
      invoice,
    });
  } catch (error) {
    console.error("Create invoice error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET /api/invoices
const getInvoices = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { user: req.user.id };
    if (status) filter.status = status;

    const invoices = await Invoice.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: invoices.length,
      invoices,
    });
  } catch (error) {
    console.error("Get invoices error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET /api/invoices/:id
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({ success: true, invoice });
  } catch (error) {
    console.error("Get invoice error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// PATCH /api/invoices/:id/status
const updateInvoiceStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = [
      "Submitted", "Buyer Notified",
      "Buyer Confirming", "Under Review",
      "Funded", "Rejected",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status },
      { new: true }
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice status updated",
      invoice,
    });
  } catch (error) {
    console.error("Update status error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { createInvoice, getInvoices, getInvoiceById, updateInvoiceStatus };