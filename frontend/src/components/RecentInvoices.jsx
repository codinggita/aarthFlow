import "../styles/Dashboard.css";

const STATUS_COLORS = {
  Funded: "green",
  "Under Review": "amber",
  "Buyer Confirming": "teal",
  Submitted: "gray",
  Rejected: "red",
  "Buyer Notified": "teal",
};

const RecentInvoices = ({ invoices, onViewAll }) => {
  if (!invoices || invoices.length === 0) {
    return (
      <div className="recent-invoices-card">
        <div className="card-header">
          <h3>Recent Invoices</h3>
        </div>
        <div className="empty-state">
          <p>📄 No invoices yet</p>
          <p className="empty-sub">
            Upload your first invoice to get started
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amount) =>
    `₹${amount?.toLocaleString("en-IN") || 0}`;

  return (
    <div className="recent-invoices-card">
      <div className="card-header">
        <h3>Recent Invoices</h3>
        <button className="view-all-link" onClick={onViewAll}>
          View All →
        </button>
      </div>

      <div className="invoice-table">
        {/* Table Header */}
        <div className="table-header">
          <span>Invoice #</span>
          <span>Buyer</span>
          <span>Amount</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        {/* Table Rows */}
        {invoices.map((inv) => (
          <div key={inv._id} className="table-row">
            <span className="inv-number">
              {inv.invoiceNumber}
            </span>
            <span className="inv-buyer">{inv.buyerName}</span>
            <span className="inv-amount">
              {formatAmount(inv.invoiceAmount)}
            </span>
            <span className="inv-date">
              {formatDate(inv.createdAt)}
            </span>
            <span
              className={`status-badge badge-${
                STATUS_COLORS[inv.status] || "gray"
              }`}
            >
              {inv.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentInvoices;