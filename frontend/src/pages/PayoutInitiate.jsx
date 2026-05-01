import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInvoiceById, initiatePayout } from "../utils/api";
import "../styles/Payout.css";

const PayoutInitiate = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [bankData, setBankData] = useState({
    bankAccount: "",
    confirmAccount: "",
    ifscCode: "",
    bankName: "",
    accountType: "Current",
  });

  const [bankFetched, setBankFetched] = useState(false);
  const [fetchedBankName, setFetchedBankName] = useState("");

  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true);
      try {
        const res = await getInvoiceById(invoiceId);
        setInvoice(res.invoice);
      } catch (err) {
        setFormError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [invoiceId]);

  const handleChange = (e) => {
    setBankData({ ...bankData, [e.target.name]: e.target.value });
    setFormError("");
  };

  // Simulate IFSC lookup
  const handleFetchBank = () => {
    if (!bankData.ifscCode || bankData.ifscCode.length < 11) {
      return setFormError("Enter a valid 11-character IFSC code");
    }
    setFetchedBankName("HDFC Bank — Surat Main Branch");
    setBankFetched(true);
    setBankData({ ...bankData, bankName: "HDFC Bank" });
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const { bankAccount, confirmAccount, ifscCode } = bankData;

    if (!bankAccount || !confirmAccount || !ifscCode) {
      return setFormError("All bank fields are required");
    }

    if (bankAccount !== confirmAccount) {
      return setFormError("Account numbers do not match");
    }

    if (ifscCode.length !== 11) {
      return setFormError("Enter valid 11-character IFSC code");
    }

    setSubmitting(true);
    try {
      const res = await initiatePayout({
        invoiceId,
        bankAccount: bankData.bankAccount,
        ifscCode: bankData.ifscCode.toUpperCase(),
        bankName: bankData.bankName,
      });
      navigate("/payouts/success", {
        state: { payout: res.payout, invoice },
      });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="payout-loading">
        <div className="spinner"></div>
        <p>Loading invoice details...</p>
      </div>
    );
  }

  return (
    <div className="payout-initiate-page">
      {/* Header */}
      <div className="page-header">
        <button
          className="back-btn"
          onClick={() => navigate(`/invoices/${invoiceId}`)}
        >
          ← Back to Invoice
        </button>
        <h1>Confirm & Receive Payment</h1>
      </div>

      <div className="payout-layout">
        {/* Left — Bank Form */}
        <div className="payout-form-card">
          <h3>Bank Account Details</h3>
          <p className="payout-subtitle">
            Where should we send your money?
          </p>

          {formError && <p className="form-error">{formError}</p>}

          <form onSubmit={handleSubmit} className="payout-form">
            <div className="form-group">
              <label>Account Number</label>
              <input
                type="number"
                name="bankAccount"
                placeholder="Enter account number"
                value={bankData.bankAccount}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Confirm Account Number</label>
              <input
                type="number"
                name="confirmAccount"
                placeholder="Re-enter account number"
                value={bankData.confirmAccount}
                onChange={handleChange}
              />
            </div>

            {/* IFSC with Fetch */}
            <div className="form-group">
              <label>IFSC Code</label>
              <div className="ifsc-row">
                <input
                  type="text"
                  name="ifscCode"
                  placeholder="e.g. HDFC0001234"
                  maxLength={11}
                  value={bankData.ifscCode}
                  onChange={(e) => {
                    handleChange(e);
                    setBankFetched(false);
                    setFetchedBankName("");
                  }}
                />
                <button
                  type="button"
                  className="btn-verify"
                  onClick={handleFetchBank}
                >
                  Fetch
                </button>
              </div>
              {bankFetched && (
                <p className="bank-fetched">✓ {fetchedBankName}</p>
              )}
            </div>

            {/* Account Type */}
            <div className="form-group">
              <label>Account Type</label>
              <div className="account-toggle">
                <button
                  type="button"
                  className={
                    bankData.accountType === "Current"
                      ? "toggle active"
                      : "toggle"
                  }
                  onClick={() =>
                    setBankData({ ...bankData, accountType: "Current" })
                  }
                >
                  Current Account
                </button>
                <button
                  type="button"
                  className={
                    bankData.accountType === "Savings"
                      ? "toggle active"
                      : "toggle"
                  }
                  onClick={() =>
                    setBankData({ ...bankData, accountType: "Savings" })
                  }
                >
                  Savings Account
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary full-width"
              disabled={submitting}
            >
              {submitting
                ? "Initiating Payout..."
                : "Confirm & Receive →"}
            </button>

            <p className="security-text">
              🔒 256-bit encrypted · RBI Compliant · Funds in 24 hours
            </p>
          </form>
        </div>

        {/* Right — Payout Summary */}
        {invoice && (
          <div className="payout-summary-card">
            <h3>Payout Summary</h3>
            <div className="summary-invoice">
              <p className="summary-inv-num">{invoice.invoiceNumber}</p>
              <p className="summary-buyer">{invoice.buyerName}</p>
            </div>

            <div className="summary-row">
              <span>Invoice Amount</span>
              <span>
                ₹{invoice.invoiceAmount?.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="summary-row">
              <span>Advance ({invoice.advancePercent}%)</span>
              <span>
                ₹{invoice.advanceAmount?.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="summary-row fee">
              <span>AarthFlow Fee ({invoice.feePercent}%)</span>
              <span>
                − ₹{invoice.feeAmount?.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row net">
              <span>You Receive</span>
              <span>
                ₹{invoice.netPayout?.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="arrival-box">
              <span className="arrival-icon">⚡</span>
              <div>
                <p className="arrival-title">Expected Arrival</p>
                <p className="arrival-time">Within 24 hours</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayoutInitiate;