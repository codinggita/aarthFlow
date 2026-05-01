const Invoice = require("../models/Invoice");

// GET /api/dashboard/stats
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Total funded amount
    const fundedInvoices = await Invoice.find({
      user: userId,
      status: "Funded",
    });

    const totalFunded = fundedInvoices.reduce(
      (sum, inv) => sum + (inv.netPayout || 0),
      0
    );

    // Pending invoices count
    const pendingInvoices = await Invoice.find({
      user: userId,
      status: { $in: ["Submitted", "Buyer Notified", "Buyer Confirming"] },
    });

    // Under review count
    const underReview = await Invoice.find({
      user: userId,
      status: "Under Review",
    });

    // Total invoice value across all invoices
    const allInvoices = await Invoice.find({ user: userId });

    const totalInvoiceValue = allInvoices.reduce(
      (sum, inv) => sum + (inv.invoiceAmount || 0),
      0
    );

    // Average advance rate
    const avgAdvanceRate =
      fundedInvoices.length > 0
        ? fundedInvoices.reduce((sum, inv) => sum + (inv.feePercent || 0), 0) /
          fundedInvoices.length
        : 0;

    // Available credit limit (simple estimate: 80% of avg monthly invoices)
    const creditLimit = totalInvoiceValue * 0.8;

    res.status(200).json({
      success: true,
      stats: {
        totalFunded: Math.round(totalFunded),
        fundedCount: fundedInvoices.length,
        pendingCount: pendingInvoices.length,
        underReviewCount: underReview.length,
        totalInvoices: allInvoices.length,
        avgAdvanceRate: parseFloat(avgAdvanceRate.toFixed(2)),
        creditLimit: Math.round(creditLimit),
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET /api/dashboard/recent-invoices
const getRecentInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
        "invoiceNumber buyerName invoiceAmount status createdAt netPayout advancePercent"
      );

    res.status(200).json({
      success: true,
      count: invoices.length,
      invoices,
    });
  } catch (error) {
    console.error("Recent invoices error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET /api/dashboard/summary
const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const allInvoices = await Invoice.find({ user: userId });

    // Group by status
    const statusMap = {};
    allInvoices.forEach((inv) => {
      statusMap[inv.status] = (statusMap[inv.status] || 0) + 1;
    });

    // Total savings vs bank loan (bank = 20% p.a., flowpay avg 2%)
    const fundedInvoices = allInvoices.filter((i) => i.status === "Funded");
    const totalAdvanced = fundedInvoices.reduce(
      (sum, inv) => sum + (inv.advanceAmount || 0),
      0
    );
    const bankCost = totalAdvanced * 0.2;
    const flowpayCost = fundedInvoices.reduce(
      (sum, inv) => sum + (inv.feeAmount || 0),
      0
    );
    const totalSavings = Math.round(bankCost - flowpayCost);

    res.status(200).json({
      success: true,
      summary: {
        statusBreakdown: statusMap,
        totalSavings,
        totalAdvanced: Math.round(totalAdvanced),
        totalInvoices: allInvoices.length,
      },
    });
  } catch (error) {
    console.error("Dashboard summary error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getRecentInvoices,
  getDashboardSummary,
};