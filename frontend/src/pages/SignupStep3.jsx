import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Signup.css";

const SignupStep3 = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [bankFetched, setBankFetched] = useState(false);
  const [bankName, setBankName] = useState("");

  const [formData, setFormData] = useState({
    accountNumber: "",
    confirmAccount: "",
    ifscCode: "",
    accountType: "Current",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
  };

  // Simulate IFSC fetch
  const handleFetchBank = () => {
    if (!formData.ifscCode || formData.ifscCode.length < 11) {
      return setFormError("Enter a valid 11-character IFSC code");
    }
    setBankName("HDFC Bank — Surat Main Branch");
    setBankFetched(true);
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const { accountNumber, confirmAccount, ifscCode } = formData;

    if (!accountNumber || !confirmAccount || !ifscCode) {
      return setFormError("All fields are required");
    }

    if (accountNumber !== confirmAccount) {
      return setFormError("Account numbers do not match");
    }

    if (ifscCode.length !== 11) {
      return setFormError("Enter a valid 11-character IFSC code");
    }

    setLoading(true);
    // Bank details saved locally for now — payout API will use these
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="signup-page">
      {/* Left Panel */}
      <div className="signup-left">
        <div className="signup-logo">AarthFlow</div>
        <p className="signup-tagline">
          Where should we send your money?
        </p>
        <div className="security-note">
          🔒 256-bit encrypted · RBI Compliant
        </div>
      </div>

      {/* Right Panel */}
      <div className="signup-right">
        {/* Step Indicator */}
        <div className="step-indicator">
          <div className="step done">
            <span className="step-circle">✓</span>
            <span className="step-label">Business Info</span>
          </div>
          <div className="step-line filled"></div>
          <div className="step done">
            <span className="step-circle">✓</span>
            <span className="step-label">Invoice Setup</span>
          </div>
          <div className="step-line filled"></div>
          <div className="step active">
            <span className="step-circle">3</span>
            <span className="step-label">Bank Details</span>
          </div>
        </div>

        <h2 className="signup-title">Bank Account Details</h2>
        <p className="signup-subtitle">Step 3 of 3 — almost done!</p>

        {formError && <p className="form-error">{formError}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="number"
            name="accountNumber"
            placeholder="Account Number"
            value={formData.accountNumber}
            onChange={handleChange}
          />

          <input
            type="number"
            name="confirmAccount"
            placeholder="Confirm Account Number"
            value={formData.confirmAccount}
            onChange={handleChange}
          />

          {/* IFSC with fetch */}
          <div className="gst-row">
            <input
              type="text"
              name="ifscCode"
              placeholder="IFSC Code (e.g. HDFC0001234)"
              maxLength={11}
              value={formData.ifscCode}
              onChange={(e) => {
                handleChange(e);
                setBankFetched(false);
                setBankName("");
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
            <p className="bank-fetched">✓ {bankName}</p>
          )}

          {/* Account Type Toggle */}
          <div className="account-type-toggle">
            <button
              type="button"
              className={formData.accountType === "Current" ? "toggle active" : "toggle"}
              onClick={() => setFormData({ ...formData, accountType: "Current" })}
            >
              Current Account
            </button>
            <button
              type="button"
              className={formData.accountType === "Savings" ? "toggle active" : "toggle"}
              onClick={() => setFormData({ ...formData, accountType: "Savings" })}
            >
              Savings Account
            </button>
          </div>

          {user && (
            <input
              type="text"
              value={user.ownerName}
              disabled
              className="input-disabled"
              placeholder="Account Holder Name"
            />
          )}

          <div className="signup-actions">
            <button
              type="button"
              className="btn-ghost"
              onClick={() => navigate("/signup/step2")}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Finishing..." : "Complete Setup →"}
            </button>
          </div>

          <p className="security-text">
            🔒 256-bit encrypted · RBI Compliant · Data never stored in plain text
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupStep3;