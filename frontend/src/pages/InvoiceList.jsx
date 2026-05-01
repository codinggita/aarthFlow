import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getInvoices } from "../utils/api";
import "../styles/Invoice.css";

const STATUS_FILTERS = [
  "All", "Submitted", "Buyer Notified",
  "Buyer Confirming", "Under Review", "Funded", "Rejected",
];

const STATUS_COLORS = {
  Funded: "green",
  "Under Review": "amber",
  "Buyer Confirming": "teal",
  "Buyer Notified": "teal",
  Submitted: "gray",
  Rejected: "red",
};

const InvoiceList = () => {
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const res = await getInvoices();
        setInvoices(res.invoices);
        setFiltered(res.invoices);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  // Filter + search
  useEffect(() => {
    let result = invoices;

    if (activeFilter !== "All") {
      result = result.filter((inv) => inv.status === activeFilter);
    }

    if (search.trim()) {
      result = result.filter(
        (inv) =>
          inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
          inv.buyerName.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [activeFilter, search, invoices]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  if (loading) {
    return (
      <div className="invoice-loading">
        <div className="spinner"></div>
        <p>Loading invoices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="invoice-error">
        <p>⚠️ {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="invoice-list-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <button
            className="back-btn"
            onClick={() => navigate("/dashboard")}
          >
            ← Dashboard
          </button>
          <h1>My Invoices</h1>
          <p className="page-sub">{invoices.length} invoices total</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => navigate("/invoices/upload")}
        >
          + Upload Invoice
        </button>
      </div>

      {/* Filters + Search */}
      <div className="invoice-controls">
        <div className="filter-pills">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-pill ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
              {f !== "All" && (
                <span className="filter-count">
                  {invoices.filter((i) => i.status === f).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search invoice # or buyer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Invoice Table */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>📄 No invoices found</p>
          <p className="empty-sub">
            {activeFilter !== "All"
              ? `No invoices with status "${activeFilter}"`
              : "Upload your first invoice to get started"}
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate("/invoices/upload")}
          >
            Upload Invoice
          </button>
        </div>
      ) : (
        <div className="invoice-table-card">
          <div className="table-header">
            <span>Invoice #</span>
            <span>Buyer</span>
            <span>Amount</span>
            <span>Due Date</span>
            <span>Submitted</span>
            <span>Net Payout</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {filtered.map((inv) => (
            <div key={inv._id} className="table-row">
              <span className="inv-number">{inv.invoiceNumber}</span>
              <span className="inv-buyer">{inv.buyerName}</span>
              <span className="inv-amount">
                ₹{inv.invoiceAmount?.toLocaleString("en-IN")}
              </span>
              <span className="inv-date">{formatDate(inv.dueDate)}</span>
              <span className="inv-date">{formatDate(inv.createdAt)}</span>
              <span className="inv-net">
                ₹{inv.netPayout?.toLocaleString("en-IN") || "—"}
              </span>
              <span
                className={`status-badge badge-${
                  STATUS_COLORS[inv.status] || "gray"
                }`}
              >
                {inv.status}
              </span>
              <button
                className="view-btn"
                onClick={() => navigate(`/invoices/${inv._id}`)}
              >
                View →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceList;