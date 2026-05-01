import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Payout.css";

const PayoutSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  const payout = state?.payout;
  const invoice = state?.invoice;

  useEffect(() => {
    // Slight delay for animation effect
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Redirect if no payout data
  useEffect(() => {
    if (!payout) {
      navigate("/dashboard");
    }
  }, [payout, navigate]);

  if (!payout) return null;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const maskedAccount = payout.bankAccount
    ? `···${payout.bankAccount.slice(-4)}`
    : "···";

  return (
    <div className="payout-success-page">
      <div className={`success-card ${showContent ? "visible" : ""}`}>
        {/* Success Icon */}
        <div className="success-circle">
          <span className="success-checkmark">✓</span>
        </div>

        <h1 className="success-title">Payment Initiated!</h1>

        {/* Amount */}
        <div className="success-amount">
          ₹{payout.netPayout?.toLocaleString("en-IN")}
        </div>
        <p className="success-sub">
          is on its way to {payout.bankName || "your bank"} {maskedAccount}
        </p>

        {/* Details */}
        <div className="success-details">
          <div className="success-row">
            <span>Reference Number</span>
            <span className="ref-number">{payout.referenceNumber}</span>
          </div>
          <div className="success-row">
            <span>Invoice</span>
            <span>{invoice?.invoiceNumber || "—"}</span>
          </div>
          <div className="success-row">
            <span>Buyer</span>
            <span>{invoice?.buyerName || "—"}</span>
          </div>
          <div className="success-row">
            <span>Initiated At</span>
            <span>{formatDate(payout.createdAt)}</span>
          </div>
          <div className="success-row">
            <span>Expected Arrival</span>
            <span className="arrival-text">
              {formatDate(payout.expectedArrival)}
            </span>
          </div>
          <div className="success-row">
            <span>Status</span>
            <span className="status-badge badge-teal">
              {payout.status}
            </span>
          </div>
        </div>

        {/* Savings Note */}
        <div className="savings-note">
          💡 You saved vs a bank loan by using AarthFlow advance
        </div>

        {/* Actions */}
        <div className="success-actions">
          <button
            className="btn-primary"
            onClick={() => navigate("/invoices/upload")}
          >
            Upload Another Invoice
          </button>
          <button
            className="btn-ghost"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
          <button
            className="btn-ghost"
            onClick={() => navigate("/payouts")}
          >
            View All Payouts
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayoutSuccess;