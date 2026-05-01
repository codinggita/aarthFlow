const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: [true, "Invoice number is required"],
      trim: true,
    },
    buyerName: {
      type: String,
      required: [true, "Buyer name is required"],
      trim: true,
    },
    buyerGST: {
      type: String,
      trim: true,
      uppercase: true,
    },
    invoiceAmount: {
      type: Number,
      required: [true, "Invoice amount is required"],
      min: [1, "Amount must be greater than 0"],
    },
    invoiceDate: {
      type: Date,
      required: [true, "Invoice date is required"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    advancePercent: {
      type: Number,
      enum: [80, 90, 100],
      default: 90,
    },
    advanceAmount: {
      type: Number,
    },
    feePercent: {
      type: Number,
    },
    feeAmount: {
      type: Number,
    },
    netPayout: {
      type: Number,
    },
    status: {
      type: String,
      enum: [
        "Submitted",
        "Buyer Notified",
        "Buyer Confirming",
        "Under Review",
        "Funded",
        "Rejected",
      ],
      default: "Submitted",
    },
    fileUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);