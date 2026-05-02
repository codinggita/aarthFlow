const PayoutSummary = ({ invoice }) => {
  if (!invoice) return null;
  return (
    <div className="payout-summary-card">
      <h3>Payout Summary</h3>
      <div className="summary-invoice">
        <p className="summary-inv-num">{invoice.invoiceNumber}</p>
        <p className="summary-buyer">{invoice.buyerName}</p>
      </div>

      <div className="summary-row">
        <span>Invoice Amount</span>
        <span>₹{invoice.invoiceAmount?.toLocaleString("en-IN")}</span>
      </div>
      <div className="summary-row">
        <span>Advance ({invoice.advancePercent}%)</span>
        <span>₹{invoice.advanceAmount?.toLocaleString("en-IN")}</span>
      </div>
      <div className="summary-row fee">
        <span>AarthFlow Fee ({invoice.feePercent}%)</span>
        <span>− ₹{invoice.feeAmount?.toLocaleString("en-IN")}</span>
      </div>
      <div className="summary-divider"></div>
      <div className="summary-row net">
        <span>You Receive</span>
        <span>₹{invoice.netPayout?.toLocaleString("en-IN")}</span>
      </div>

      <div className="arrival-box">
        <span className="arrival-icon">⚡</span>
        <div>
          <p className="arrival-title">Expected Arrival</p>
          <p className="arrival-time">Within 24 hours</p>
        </div>
      </div>
    </div>
  );
};

export default PayoutSummary;
