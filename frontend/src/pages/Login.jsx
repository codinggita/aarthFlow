import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const { login, sendLoginOTP, verifyLoginOTP, error } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("otp");
  const [otpStep, setOtpStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!mobile || mobile.length !== 10) {
      return setFormError("Enter a valid 10-digit mobile number");
    }
    setLoading(true);
    const result = await sendLoginOTP(mobile);
    setLoading(false);
    if (result.success) {
      setOtpStep(2);
      setSuccessMsg("OTP sent successfully");
    } else {
      setFormError(result.message);
    }
  };

  // Handle verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!otp || otp.length !== 6) {
      return setFormError("Enter the 6-digit OTP");
    }
    setLoading(true);
    const result = await verifyLoginOTP(mobile, otp);
    setLoading(false);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setFormError(result.message);
    }
  };

  // Handle email login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!email || !password) {
      return setFormError("Email and password are required");
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setFormError(result.message);
    }
  };

  return (
    <div className="login-page">
      {/* Left Panel */}
      <div className="login-left">
        <div className="login-logo">AarthFlow</div>
        <div className="login-illustration">
          <div className="flow-node">📄 Invoice Uploaded</div>
          <div className="flow-line">↓</div>
          <div className="flow-node">✅ Buyer Confirmed</div>
          <div className="flow-line">↓</div>
          <div className="flow-node active">₹ Funds Released</div>
        </div>
        <p className="login-tagline">
          2,400+ SMEs getting paid faster
        </p>
      </div>

      {/* Right Panel */}
      <div className="login-right">
        <h2 className="login-title">Welcome back</h2>
        <p className="login-subtitle">Access your AarthFlow dashboard</p>

        {/* Tab Toggle */}
        <div className="login-tabs">
          <button
            className={activeTab === "otp" ? "tab active" : "tab"}
            onClick={() => { setActiveTab("otp"); setFormError(""); }}
          >
            Mobile OTP
          </button>
          <button
            className={activeTab === "email" ? "tab active" : "tab"}
            onClick={() => { setActiveTab("email"); setFormError(""); }}
          >
            Email & Password
          </button>
        </div>

        {/* Error / Success messages */}
        {formError && <p className="form-error">{formError}</p>}
        {successMsg && <p className="form-success">{successMsg}</p>}

        {/* OTP Tab */}
        {activeTab === "otp" && (
          <>
            {otpStep === 1 ? (
              <form onSubmit={handleSendOTP} className="login-form">
                <div className="input-group">
                  <span className="input-prefix">+91</span>
                  <input
                    type="tel"
                    placeholder="Mobile number"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Sending..." : "Send OTP →"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="login-form">
                <p className="otp-hint">Sent to +91 {mobile}</p>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="otp-input"
                />
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Verifying..." : "Verify & Login →"}
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => { setOtpStep(1); setOtp(""); }}
                >
                  ← Change number
                </button>
              </form>
            )}
          </>
        )}

        {/* Email Tab */}
        {activeTab === "email" && (
          <form onSubmit={handleEmailLogin} className="login-form">
            <input
              type="email"
              placeholder="Business email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>
        )}

        <p className="login-footer">
          New to AarthFlow?{" "}
          <span onClick={() => navigate("/signup")} className="link">
            Create account →
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;