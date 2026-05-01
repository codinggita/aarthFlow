import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createInvoice, getBuyers } from "../utils/api";
import "../styles/Invoice.css";

const ADVANCE_OPTIONS = [
  { percent: 80, fee: 1.5 },
  { percent: 90, fee: 2.0 },
  { percent: 100, fee: 2.8 },
];

const InvoiceUpload = () => {
  const navigate = useNavigate();

  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [selectedAdvance, setSelectedAdvance] = useState(90);
  const [fileName, setFileName] = useState("");

  const [formData, setFormData] = useState({
    invoiceNumber: "",
    buyerName: "",
    buyerGST: "",
    invoiceAmount: "",
    invoiceDate: "",
    dueDate: "",
  });

  useEffect(() => {
    getBuyers()
      .then((res) => setBuyers(res.buyers))
      .catch(() => setBuyers([]));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  const calculateBreakdown = () => {
    const amount = parseFloat(formData.invoiceAmount) || 0;
    const option = ADVANCE_OPTIONS.find(
      (o) => o.percent === selectedAdvance
    );
    const advanceAmount = (amount * option.percent) / 100;
    const feeAmount = (advanceAmount * option.fee) / 100;
    const netPayout = advanceAmount - feeAmount;
    return { advanceAmount, feeAmount, netPayout, feePercent: option.fee };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const {
      invoiceNumber, buyerName,
      invoiceAmount, invoiceDate, dueDate,
    } = formData;

    if (!invoiceNumber || !buyerName || !invoiceAmount || !invoiceDate || !dueDate) {
      return setFormError("All fields are required");
    }

    if (parseFloat(invoiceAmount) <= 0) {
      return setFormError("Invoice amount must be greater than 0");
    }

    if (new Date(dueDate) <= new Date(invoiceDate)) {
      return setFormError("Due date must be after invoice date");
    }

    setLoading(true);
    try {
      const res = await createInvoice({
        ...formData,
        invoiceAmount: parseFloat(formData.invoiceAmount),
        advancePercent: selectedAdvance,
      });
      navigate(`/invoices/${res.invoice._id}`);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const { advanceAmount, feeAmount, netPayout, feePercent } =
    calculateBreakdown();

  return (
    <div className="invoice-upload-page">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Dashboard
        </button>
        <h1>Upload New Invoice</h1>
      </div>

      <div className="upload-layout">
        {/* Left — Form */}
        <div className="upload-form-card">
          {formError && <p className="form-error">{formError}</p>}

          {/* File Drop Zone */}
          <div
            className={`drop-zone ${fileName ? "has-file" : ""}`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {fileName ? (
              <div className="file-preview">
                <span className="file-icon">📄</span>
                <span className="file-name">{fileName}</span>
                <span
                  className="file-remove"
                  onClick={() => setFileName("")}
                >
                  ×
                </span>
              </div>
            ) : (
              <>
                <span className="drop-icon">☁️</span>
                <p>Drop your GST invoice PDF here</p>
                <label className="browse-label">
                  or <span>Browse Files</span>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
                <p className="drop-hint">PDF, JPG, PNG · Max 10MB</p>
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="invoice-form">
            {/* Buyer Select */}
            <div className="form-group">
              <label>Buyer Name</label>
              {buyers.length > 0 ? (
                <select
                  name="buyerName"
                  value={formData.buyerName}
                  onChange={handleChange}
                >
                  <option value="">Select buyer</option>
                  {buyers.map((b) => (
                    <option key={b._id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name="buyerName"
                  placeholder="Enter buyer name"
                  value={formData.buyerName}
                  onChange={handleChange}
                />
              )}
            </div>

            <div className="form-group">
              <label>Buyer GST (optional)</label>
              <input
                type="text"
                name="buyerGST"
                placeholder="Buyer GSTIN"
                maxLength={15}
                value={formData.buyerGST}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Invoice Number</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  placeholder="e.g. INV-2024-001"
                  value={formData.invoiceNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Invoice Amount (₹)</label>
                <input
                  type="number"
                  name="invoiceAmount"
                  placeholder="e.g. 485000"
                  min="1"
                  value={formData.invoiceAmount}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Invoice Date</label>
                <input
                  type="date"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Advance Options */}
            <div className="form-group">
              <label>Choose Advance %</label>
              <div className="advance-options">
                {ADVANCE_OPTIONS.map((opt) => (
                  <div
                    key={opt.percent}
                    className={`advance-card ${
                      selectedAdvance === opt.percent ? "selected" : ""
                    }`}
                    onClick={() => setSelectedAdvance(opt.percent)}
                  >
                    <p className="advance-percent">{opt.percent}% Advance</p>
                    <p className="advance-fee">Fee: {opt.fee}%</p>
                    {formData.invoiceAmount && (
                      <p className="advance-net">
                        Net: ₹
                        {(
                          (parseFloat(formData.invoiceAmount) *
                            opt.percent) /
                            100 -
                          (((parseFloat(formData.invoiceAmount) *
                            opt.percent) /
                            100) *
                            opt.fee) /
                            100
                        ).toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Breakdown */}
            {formData.invoiceAmount && (
              <div className="breakdown-card">
                <div className="breakdown-row">
                  <span>Invoice Amount</span>
                  <span>
                    ₹
                    {parseFloat(
                      formData.invoiceAmount
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="breakdown-row">
                  <span>Advance ({selectedAdvance}%)</span>
                  <span>₹{advanceAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="breakdown-row fee">
                  <span>AarthFlow Fee ({feePercent}%)</span>
                  <span>− ₹{feeAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="breakdown-row net">
                  <span>You Receive</span>
                  <span>₹{netPayout.toLocaleString("en-IN")}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn-primary full-width"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit for Early Payment →"}
            </button>
            <p className="submit-note">
              Buyer will be auto-notified. Typical confirmation: 4-8 hours.
            </p>
          </form>
        </div>

        {/* Right — Info Panel */}
        <div className="upload-info-panel">
          <h3>How it works</h3>
          <div className="info-step">
            <span className="info-num">1</span>
            <p>Upload your GST invoice and select the buyer</p>
          </div>
          <div className="info-step">
            <span className="info-num">2</span>
            <p>Buyer gets notified and confirms invoice validity</p>
          </div>
          <div className="info-step">
            <span className="info-num">3</span>
            <p>Funds hit your bank account within 24 hours</p>
          </div>
          <div className="info-tip">
            💡 Typical cost: 1.5–2.5% flat vs 4–5% monthly bank loan
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceUpload;