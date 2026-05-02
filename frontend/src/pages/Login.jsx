import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const { login, verifyLoginOTP, sendLoginOTP } = useAuth();
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

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!mobile || mobile.length !== 10) return setFormError("Enter a valid 10-digit mobile number");
    
    setLoading(true);
    await sendLoginOTP(mobile);
    setLoading(false);
    setOtpStep(2);
    setSuccessMsg("OTP sent successfully to +91 " + mobile);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!otp || otp.length !== 6) return setFormError("Enter the 6-digit OTP");
    
    setLoading(true);
    const result = await verifyLoginOTP(mobile, otp);
    setLoading(false);
    if (result.success) navigate("/dashboard");
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!email || !password) return setFormError("Email and password are required");
    
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="auth-side-panel">
        <Link to="/" className="auth-logo">AarthFlow</Link>
        <div className="auth-visual">
          <div className="glow-sphere"></div>
          <div className="auth-content-wrap">
            <h1>Unlock capital <br />in 24 hours.</h1>
            <p>Join 2,400+ businesses using AarthFlow to bridge their working capital gap with institutional-grade financing.</p>
          </div>
          <div className="auth-badge">
            <span className="badge-dot"></span> RBI REGULATED NODE ONLINE
          </div>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-card">
          <header className="auth-header">
            <h2>Welcome back</h2>
            <p>Enter your details to access your dashboard</p>
          </header>

          <div className="auth-tabs">
            <button 
              className={`auth-tab ${activeTab === 'otp' ? 'active' : ''}`}
              onClick={() => { setActiveTab('otp'); setFormError(''); setSuccessMsg(''); }}
            >
              Mobile OTP
            </button>
            <button 
              className={`auth-tab ${activeTab === 'email' ? 'active' : ''}`}
              onClick={() => { setActiveTab('email'); setFormError(''); setSuccessMsg(''); }}
            >
              Email Login
            </button>
          </div>

          {formError && <div className="auth-alert error">{formError}</div>}
          {successMsg && <div className="auth-alert success">{successMsg}</div>}

          {activeTab === "otp" ? (
            <div className="auth-step-wrap">
              {otpStep === 1 ? (
                <form onSubmit={handleSendOTP} className="auth-form">
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <div className="input-with-prefix">
                      <span className="prefix">+91</span>
                      <input
                        type="tel"
                        placeholder="98765 43210"
                        maxLength={10}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                  <button type="submit" className="auth-btn-primary" disabled={loading}>
                    {loading ? "Sending..." : "Continue"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="auth-form">
                  <div className="form-group">
                    <label>Enter 6-digit OTP</label>
                    <input
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="otp-input-field"
                      autoFocus
                    />
                    <p className="helper-text">Sent to +91 {mobile} <span onClick={() => setOtpStep(1)} className="text-link">Change</span></p>
                  </div>
                  <button type="submit" className="auth-btn-primary" disabled={loading}>
                    {loading ? "Verifying..." : "Access Dashboard"}
                  </button>
                </form>
              )}
            </div>
          ) : (
            <form onSubmit={handleEmailLogin} className="auth-form">
              <div className="form-group">
                <label>Business Email</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="auth-btn-primary" disabled={loading}>
                {loading ? "Authenticating..." : "Login"}
              </button>
            </form>
          )}

          <footer className="auth-footer">
            <p>New to AarthFlow? <Link to="/signup" className="text-link">Create an account</Link></p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;