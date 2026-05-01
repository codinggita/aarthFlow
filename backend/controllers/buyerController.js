const Buyer = require("../models/Buyer");

// POST /api/buyers
const addBuyer = async (req, res) => {
  try {
    const {
      name,
      gstNumber,
      industry,
      paymentTermsDays,
      riskLevel,
      isTReDSEligible,
      averageDelayDays,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Buyer name is required",
      });
    }

    const existingBuyer = await Buyer.findOne({
      name: name.trim(),
      addedBy: req.user.id,
    });

    if (existingBuyer) {
      return res.status(409).json({
        success: false,
        message: "Buyer already added",
      });
    }

    const buyer = await Buyer.create({
      name,
      gstNumber,
      industry,
      paymentTermsDays: paymentTermsDays || 60,
      riskLevel: riskLevel || "Low",
      isTReDSEligible: isTReDSEligible || false,
      averageDelayDays: averageDelayDays || 0,
      addedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Buyer added successfully",
      buyer,
    });
  } catch (error) {
    console.error("Add buyer error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET /api/buyers
const getBuyers = async (req, res) => {
  try {
    const { search, riskLevel, isTReDSEligible } = req.query;

    const filter = { addedBy: req.user.id };

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (riskLevel) {
      filter.riskLevel = riskLevel;
    }

    if (isTReDSEligible !== undefined) {
      filter.isTReDSEligible = isTReDSEligible === "true";
    }

    const buyers = await Buyer.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: buyers.length,
      buyers,
    });
  } catch (error) {
    console.error("Get buyers error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET /api/buyers/:id
const getBuyerById = async (req, res) => {
  try {
    const buyer = await Buyer.findOne({
      _id: req.params.id,
      addedBy: req.user.id,
    });

    if (!buyer) {
      return res.status(404).json({
        success: false,
        message: "Buyer not found",
      });
    }

    res.status(200).json({ success: true, buyer });
  } catch (error) {
    console.error("Get buyer error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// PATCH /api/buyers/:id
const updateBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.findOneAndUpdate(
      { _id: req.params.id, addedBy: req.user.id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!buyer) {
      return res.status(404).json({
        success: false,
        message: "Buyer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Buyer updated successfully",
      buyer,
    });
  } catch (error) {
    console.error("Update buyer error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// DELETE /api/buyers/:id
const deleteBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.findOneAndDelete({
      _id: req.params.id,
      addedBy: req.user.id,
    });

    if (!buyer) {
      return res.status(404).json({
        success: false,
        message: "Buyer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Buyer deleted successfully",
    });
  } catch (error) {
    console.error("Delete buyer error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  addBuyer,
  getBuyers,
  getBuyerById,
  updateBuyer,
  deleteBuyer,
};