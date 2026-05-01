import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Signup.css";

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [gstVerified, setGstVerified] = useState(false);
  const [gstLoading, setGstLoading] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    gstNumber: "",
    ownerName: "",
    mobile: "",
    email: "",
    password: "",
    businessType: "Manufacturer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
  };

  // Simulate GST verification
  const handleVerifyGST = async () => {
    if (!formData.gstNumber || formData.gstNumber.length < 15) {
      return setFormError("Enter a valid 15-character GST number");
    }
    setGstLoading(true);
    setTimeout(() => {
      setGstVerified(true);
      setGstLoading(false);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const { businessName, gstNumber, ownerName, mobile, email, password } =
      formData;

    if (!businessName || !gstNumber || !ownerName || !mobile || !email || !password) {
      return setFormError("All fields are required");
    }

    if (mobile.length !== 10) {
      return setFormError("Enter a valid 10-digit mobile number");
    }

    if (password.length < 6) {
      return setFormError("Password must be at least 6 characters");
    }

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setFormError(result.message);
    }
  };

  return (
    <div className="signup-page">
      {/* Left Panel */}
      <div className="signup-left">
        <div className="signup-logo">AarthFlow</div>
        <div className="signup-illustration">
          <div className="flow-node">📄 Invoice Uploaded</div>
          <div className="flow-line">↓</div>
          <div className="flow-node">✅ Buyer Confirmed</div>
          <div className="flow-line">↓</div>
          <div className="flow-node active">₹ Funds Released</div>
        </div>
        <p className="signup-tagline">
          Get your first invoice funded in under 24 hours
        </p>
      </div>

      {/* Right Panel */}
      <div className="signup-right">
        {/* Step Indicator */}
        <div className="step-indicator">
          <div className="step active">
            <span className="step-circle">1</span>
            <span className="step-label">Business Info</span>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <span className="step-circle">2</span>
            <span className="step-label">Invoice Setup</span>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <span className="step-circle">3</span>
            <span className="step-label">Bank Details</span>
          </div>
        </div>

        <h2 className="signup-title">Tell us about your business</h2>
        <p className="signup-subtitle">Step 1 of 3 — takes 2 minutes</p>

        {formError && <p className="form-error">{formError}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={handleChange}
          />

          {/* GST Field with Verify Button */}
          <div className="gst-row">
            <input
              type="text"
              name="gstNumber"
              placeholder="GST Number (15 characters)"
              maxLength={15}
              value={formData.gstNumber}
              onChange={(e) => {
                handleChange(e);
                setGstVerified(false);
              }}
            />
            {!gstVerified ? (
              <button
                type="button"
                className="btn-verify"
                onClick={handleVerifyGST}
                disabled={gstLoading}
              >
                {gstLoading ? "Verifying..." : "Verify GST"}
              </button>
            ) : (
              <span className="gst-verified">✓ Verified</span>
            )}
          </div>

          <div className="form-row">
            <input
              type="text"
              name="ownerName"
              placeholder="Owner Full Name"
              value={formData.ownerName}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              maxLength={10}
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Business Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
          />

          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
          >
            <option value="Manufacturer">Manufacturer</option>
            <option value="Trader">Trader</option>
            <option value="Service Provider">Service Provider</option>
            <option value="Contractor">Contractor</option>
          </select>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Continue →"}
          </button>
        </form>

        <p className="signup-footer">
          Already registered?{" "}
          <span onClick={() => navigate("/login")} className="link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;