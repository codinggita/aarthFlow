// Fee percent based on advance percent chosen
const FEE_MAP = {
  80: 1.5,
  90: 2.0,
  100: 2.8,
};

// Calculate advance breakdown
const calculateAdvance = (invoiceAmount, advancePercent) => {
  const feePercent = FEE_MAP[advancePercent] || 2.0;
  const advanceAmount = (invoiceAmount * advancePercent) / 100;
  const feeAmount = parseFloat(((advanceAmount * feePercent) / 100).toFixed(2));
  const netPayout = parseFloat((advanceAmount - feeAmount).toFixed(2));

  return {
    advancePercent,
    feePercent,
    advanceAmount: parseFloat(advanceAmount.toFixed(2)),
    feeAmount,
    netPayout,
  };
};

// Compare FlowPay cost vs bank loan cost
const calculateSavings = (advanceAmount, feeAmount) => {
  const bankAnnualRate = 0.2;
  const bankCost = parseFloat((advanceAmount * bankAnnualRate).toFixed(2));
  const savings = parseFloat((bankCost - feeAmount).toFixed(2));

  return {
    bankCost,
    flowpayCost: feeAmount,
    savings,
  };
};

// Get all 3 advance options at once for the UI picker
const getAllAdvanceOptions = (invoiceAmount) => {
  return [80, 90, 100].map((percent) => {
    const breakdown = calculateAdvance(invoiceAmount, percent);
    const savings = calculateSavings(
      breakdown.advanceAmount,
      breakdown.feeAmount
    );
    return { ...breakdown, ...savings };
  });
};

module.exports = {
  calculateAdvance,
  calculateSavings,
  getAllAdvanceOptions,
};