import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInvoiceById } from "../utils/api";
import "../styles/Invoice.css";

const PIPELINE_STEPS = [
  "Submitted",
  "Buyer Notified",
  "Buyer Confirming",
  "Funded",
];

const STATUS_COLORS = {
  Funded: "green",
  "Under Review": "amber",
  "Buyer Confirming": "teal",
  "Buyer Notified": "teal",
  Submitted: "gray",
  Rejected: "red",
};

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true);
      try {
        const res = await getInvoiceById(id);
        setInvoice(res.invoice);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getStepIndex = (status) => {
    const index = PIPELINE_STEPS.indexOf(status);
    return index >= 0 ? index : 0;
  };

  if (loading) {
    return (
      <div className="invoice-loading">
        <div className="spinner"></div>
        <p>Loading invoice...</p>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="invoice-error">
        <p>⚠️ {error || "Invoice not found"}</p>
        <button onClick={() => navigate("/invoices")}>
          ← Back to Invoices
        </button>
      </div>
    );
  }

  const activeStep = getStepIndex(invoice.status);

  return (
    <div className="invoice-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span onClick={() => navigate("/invoices")} className="link">
          ← My Invoices
        </span>
        <span> / {invoice.invoiceNumber}</span>
      </div>

      {/* Top Summary */}
      <div className="detail-summary-card">
        <div className="detail-summary-left">
          <h2>{invoice.invoiceNumber}</h2>
          <p className="detail-buyer">{invoice.buyerName}</p>
        </div>
        <div className="detail-summary-center">
          <h2>₹{invoice.invoiceAmount?.toLocaleString("en-IN")}</h2>
          <p>Invoice Value</p>
        </div>
        <div className="detail-summary-right">
          <span
            className={`status-badge large badge-${
              STATUS_COLORS[invoice.status] || "gray"
            }`}
          >
            {invoice.status}
          </span>
          <p className="submitted-on">
            Submitted: {formatDate(invoice.createdAt)}
          </p>
        </div>
      </div>

      {/* Status Pipeline */}
      <div className="pipeline-card">
        {PIPELINE_STEPS.map((step, index) => (
          <div key={step} className="pipeline-item">
            <div
              className={`pipeline-node ${
                index < activeStep
                  ? "done"
                  : index === activeStep
                  ? "active"
                  : "pending"
              }`}
            >
              {index < activeStep ? "✓" : index + 1}
            </div>
            <p className="pipeline-label">{step}</p>
            {index < PIPELINE_STEPS.length - 1 && (
              <div
                className={`pipeline-line ${
                  index < activeStep ? "filled" : ""
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Detail + Payout */}
      <div className="detail-bottom">
        {/* Invoice Details */}
        <div className="detail-card">
          <h3>Invoice Details</h3>
          <div className="detail-row">
            <span>Invoice Number</span>
            <span>{invoice.invoiceNumber}</span>
          </div>
          <div className="detail-row">
            <span>Buyer Name</span>
            <span>{invoice.buyerName}</span>
          </div>
          {invoice.buyerGST && (
            <div className="detail-row">
              <span>Buyer GST</span>
              <span>{invoice.buyerGST}</span>
            </div>
          )}
          <div className="detail-row">
            <span>Invoice Amount</span>
            <span>₹{invoice.invoiceAmount?.toLocaleString("en-IN")}</span>
          </div>
          <div className="detail-row">
            <span>Invoice Date</span>
            <span>{formatDate(invoice.invoiceDate)}</span>
          </div>
          <div className="detail-row">
            <span>Due Date</span>
            <span>{formatDate(invoice.dueDate)}</span>
          </div>
          <div className="detail-row">
            <span>Status</span>
            <span
              className={`status-badge badge-${
                STATUS_COLORS[invoice.status] || "gray"
              }`}
            >
              {invoice.status}
            </span>
          </div>
        </div>

        {/* Payout Calculator */}
        <div className="payout-card">
          <h3>Payout Breakdown</h3>
          <div className="payout-row">
            <span>Invoice Amount</span>
            <span>₹{invoice.invoiceAmount?.toLocaleString("en-IN")}</span>
          </div>
          <div className="payout-row">
            <span>Advance ({invoice.advancePercent}%)</span>
            <span>₹{invoice.advanceAmount?.toLocaleString("en-IN")}</span>
          </div>
          <div className="payout-row fee">
            <span>AarthFlow Fee ({invoice.feePercent}%)</span>
            <span>− ₹{invoice.feeAmount?.toLocaleString("en-IN")}</span>
          </div>
          <div className="payout-row net">
            <span>You Receive</span>
            <span>₹{invoice.netPayout?.toLocaleString("en-IN")}</span>
          </div>

          {invoice.status === "Buyer Confirming" ||
          invoice.status === "Funded" ? (
            <button
              className="btn-primary full-width"
              onClick={() =>
                navigate(`/payouts/initiate/${invoice._id}`)
              }
            >
              Confirm & Receive →
            </button>
          ) : (
            <p className="payout-waiting">
              ⏳ Waiting for buyer confirmation before payout
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;