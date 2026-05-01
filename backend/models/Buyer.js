const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Buyer name is required"],
      trim: true,
    },
    gstNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    paymentTermsDays: {
      type: Number,
      default: 60,
    },
    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    isTReDSEligible: {
      type: Boolean,
      default: false,
    },
    averageDelayDays: {
      type: Number,
      default: 0,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Buyer", buyerSchema);