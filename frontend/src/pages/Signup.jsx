import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SignupStep1 } from "../components/auth/SignupStep1";
import { SignupStep2, SignupStep3 } from "../components/auth/SignupSteps";
import "../styles/Login.css"; 
import "../styles/Signup.css";

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [gstVerified, setGstVerified] = useState(false);
  const [gstLoading, setGstLoading] = useState(false);
  const [formData, setFormData] = useState({ businessName: "", gstNumber: "", ownerName: "", mobile: "", email: "", password: "", businessType: "Manufacturer", avgMonthlyRevenue: "", topBuyers: "", accountNumber: "", ifscCode: "" });

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setFormError(""); };

  const handleVerifyGST = (e) => {
    e.preventDefault();
    if (!formData.gstNumber || formData.gstNumber.length < 15) return setFormError("Enter valid 15-char GST");
    setGstLoading(true);
    setTimeout(() => { setGstVerified(true); setGstLoading(false); setFormError(""); }, 1000);
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.businessName || !formData.gstNumber || !formData.ownerName) return setFormError("Fill all required business details");
      if (!gstVerified) return setFormError("Verify GST number first");
    }
    setFormError(""); setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    const result = await register(formData); setLoading(false);
    if (result.success) navigate("/dashboard"); else setFormError(result.message);
  };

  const sidebarConfig = [
    { title: "Start your liquidity journey.", sub: "Get your first invoice funded in under 24 hours.", step: 1, label: "Business Info", desc: "Register your company" },
    { title: "Configure your financing.", sub: "Tell us about your revenue and top buyers.", step: 2, label: "Invoice Setup", desc: "Connect your buyers" },
    { title: "Finalize your account.", sub: "Connect your business bank account.", step: 3, label: "Bank Details", desc: "Verify your payout account" }
  ];

  return (
    <div className="auth-container">
      <div className="auth-side-panel">
        <Link to="/" className="auth-logo">AarthFlow</Link>
        <div className="auth-visual">
          <div className="glow-sphere"></div>
          <div className="auth-content-wrap">
            <h1>{sidebarConfig[step-1].title}</h1>
            <p>{sidebarConfig[step-1].sub}</p>
          </div>
          <div className="signup-steps-v">
            {sidebarConfig.map(s => (
              <div key={s.step} className={`step-v ${step >= s.step ? 'active' : ''}`}>
                <span className="dot"></span>
                <div className="step-v-text"><strong>{s.label}</strong><p>{s.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-card signup-card">
          <header className="auth-header">
            <div className="step-tag">STEP {step} OF 3</div>
            <h2>{step === 1 ? "Create account" : step === 2 ? "Invoice Setup" : "Bank Verification"}</h2>
            <p>{step === 1 ? "Tell us about your business" : step === 2 ? "Estimate liquidity needs" : "Where to send funds?"}</p>
          </header>
          {formError && <div className="auth-alert error">{formError}</div>}
          {step === 1 && <SignupStep1 formData={formData} handleChange={handleChange} handleVerifyGST={handleVerifyGST} gstVerified={gstVerified} gstLoading={gstLoading} nextStep={nextStep} />}
          {step === 2 && <SignupStep2 formData={formData} handleChange={handleChange} setStep={setStep} nextStep={nextStep} />}
          {step === 3 && <SignupStep3 formData={formData} handleChange={handleChange} setStep={setStep} handleSubmit={handleSubmit} loading={loading} />}
          <footer className="auth-footer"><p>Already have an account? <Link to="/login" className="text-link">Login</Link></p></footer>
        </div>
      </div>
    </div>
  );
};

export default Signup;