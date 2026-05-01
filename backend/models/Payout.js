const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },
    invoiceAmount: {
      type: Number,
      required: true,
    },
    advancePercent: {
      type: Number,
      required: true,
    },
    advanceAmount: {
      type: Number,
      required: true,
    },
    feePercent: {
      type: Number,
      required: true,
    },
    feeAmount: {
      type: Number,
      required: true,
    },
    netPayout: {
      type: Number,
      required: true,
    },
    bankAccount: {
      type: String,
      required: [true, "Bank account number is required"],
    },
    ifscCode: {
      type: String,
      required: [true, "IFSC code is required"],
      uppercase: true,
    },
    bankName: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Initiated", "Processing", "Completed", "Failed"],
      default: "Initiated",
    },
    expectedArrival: {
      type: Date,
    },
    referenceNumber: {
      type: String,
      unique: true,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Auto-generate reference number before saving
payoutSchema.pre("save", function (next) {
  if (!this.referenceNumber) {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(1000 + Math.random() * 9000);
    this.referenceNumber = `AFP-${timestamp}-${random}`;
  }
  next();
});

module.exports = mongoose.model("Payout", payoutSchema);