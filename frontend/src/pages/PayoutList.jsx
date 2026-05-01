import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPayouts } from "../utils/api";
import "../styles/Payout.css";

const STATUS_COLORS = {
  Initiated: "teal",
  Processing: "amber",
  Completed: "green",
  Failed: "red",
};

const PayoutList = () => {
  const navigate = useNavigate();

  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const FILTERS = ["All", "Initiated", "Processing", "Completed", "Failed"];

  useEffect(() => {
    const fetchPayouts = async () => {
      setLoading(true);
      try {
        const res = await getPayouts();
        setPayouts(res.payouts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPayouts();
  }, []);

  const filtered =
    activeFilter === "All"
      ? payouts
      : payouts.filter((p) => p.status === activeFilter);

  const totalPaid = payouts
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + (p.netPayout || 0), 0);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  if (loading) {
    return (
      <div className="payout-loading">
        <div className="spinner"></div>
        <p>Loading payouts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payout-error">
        <p>⚠️ {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="payout-list-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <button
            className="back-btn"
            onClick={() => navigate("/dashboard")}
          >
            ← Dashboard
          </button>
          <h1>Payouts</h1>
          <p className="page-sub">{payouts.length} total payouts</p>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="payout-summary-strip">
        <div className="strip-card">
          <p className="strip-label">Total Paid Out</p>
          <h3 className="strip-value teal">
            ₹{totalPaid.toLocaleString("en-IN")}
          </h3>
        </div>
        <div className="strip-card">
          <p className="strip-label">Total Payouts</p>
          <h3 className="strip-value">{payouts.length}</h3>
        </div>
        <div className="strip-card">
          <p className="strip-label">Completed</p>
          <h3 className="strip-value green">
            {payouts.filter((p) => p.status === "Completed").length}
          </h3>
        </div>
        <div className="strip-card">
          <p className="strip-label">In Progress</p>
          <h3 className="strip-value amber">
            {payouts.filter((p) =>
              ["Initiated", "Processing"].includes(p.status)
            ).length}
          </h3>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="filter-pills">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-pill ${activeFilter === f ? "active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Payout List */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>💰 No payouts found</p>
          <p className="empty-sub">
            Initiate a payout from any confirmed invoice
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate("/invoices")}
          >
            View Invoices
          </button>
        </div>
      ) : (
        <div className="payout-table-card">
          <div className="table-header">
            <span>Reference #</span>
            <span>Invoice</span>
            <span>Buyer</span>
            <span>Amount</span>
            <span>Net Payout</span>
            <span>Bank</span>
            <span>Date</span>
            <span>Status</span>
          </div>

          {filtered.map((payout) => (
            <div key={payout._id} className="table-row">
              <span className="ref-num">{payout.referenceNumber}</span>
              <span className="inv-number">
                {payout.invoice?.invoiceNumber || "—"}
              </span>
              <span className="inv-buyer">
                {payout.invoice?.buyerName || "—"}
              </span>
              <span className="inv-amount">
                ₹{payout.invoiceAmount?.toLocaleString("en-IN")}
              </span>
              <span className="inv-net">
                ₹{payout.netPayout?.toLocaleString("en-IN")}
              </span>
              <span className="bank-info">
                {payout.bankName || "—"} ···
                {payout.bankAccount?.slice(-4)}
              </span>
              <span className="inv-date">
                {formatDate(payout.createdAt)}
              </span>
              <span
                className={`status-badge badge-${
                  STATUS_COLORS[payout.status] || "gray"
                }`}
              >
                {payout.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PayoutList;