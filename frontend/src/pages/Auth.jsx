import { useState } from "react";
import "../styles/auth.css";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint =
        mode === "login"
          ? "http://localhost:5000/api/auth/login"
          : "http://localhost:5000/api/auth/signup";

      const body =
        mode === "login"
          ? { email: form.email, password: form.password }
          : { name: form.name, email: form.email, password: form.password, company: form.company };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }

      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">

      {/* LEFT PANEL */}
      <div className="auth-left">
        <div className="auth-left-inner">
          <div className="auth-logo">AarthFlow</div>
          <h2 className="auth-headline">
            Your invoices are confirmed.<br />
            Your cash should be too.
          </h2>
          <p className="auth-desc">
            Stop waiting 60 to 90 days to get paid. AarthFlow converts
            your confirmed orders into working capital — within 48 hours.
          </p>

          <div className="auth-stats">
            <div className="auth-stat">
              <div className="auth-stat-val">₹500Cr+</div>
              <div className="auth-stat-label">Capital Unlocked</div>
            </div>
            <div className="auth-stat">
              <div className="auth-stat-val">2400+</div>
              <div className="auth-stat-label">SMEs Onboarded</div>
            </div>
            <div className="auth-stat">
              <div className="auth-stat-val">48hr</div>
              <div className="auth-stat-label">Avg Approval</div>
            </div>
          </div>

          <div className="auth-card-preview">
            <div className="preview-label">Cash Gap Exposure</div>
            <div className="preview-amount">₹43.2L</div>
            <div className="preview-sub">Next 30 days · 3 invoices at risk</div>
            <div className="preview-bar">
              <div className="preview-fill" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <div className="auth-form-box">

          {/* TOGGLE */}
          <div className="auth-toggle">
            <button
              className={`toggle-btn ${mode === "login" ? "active" : ""}`}
              onClick={() => { setMode("login"); setError(""); }}
            >
              Log In
            </button>
            <button
              className={`toggle-btn ${mode === "signup" ? "active" : ""}`}
              onClick={() => { setMode("signup"); setError(""); }}
            >
              Sign Up
            </button>
          </div>

          <h1 className="form-title">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="form-sub">
            {mode === "login"
              ? "Log in to your AarthFlow dashboard."
              : "Start bridging your cash gap today."}
          </p>

          {/* ERROR */}
          {error && <div className="auth-error">{error}</div>}

          {/* FORM */}
          <form className="auth-form" onSubmit={handleSubmit}>

            {mode === "signup" && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Prince Nayakpara"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
            )}

            {mode === "signup" && (
              <div className="form-group">
                <label htmlFor="company">Company Name</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your company name"
                  value={form.company}
                  onChange={handleChange}
                  required
                  autoComplete="organization"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder={mode === "signup" ? "Min. 8 characters" : "Enter your password"}
                value={form.password}
                onChange={handleChange}
                required
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                minLength={mode === "signup" ? 8 : undefined}
              />
            </div>

            {mode === "login" && (
              <div className="form-forgot">
                <a href="#">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Log In to Dashboard"
                : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              className="switch-link"
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </p>

          <p className="auth-terms">
            By continuing, you agree to AarthFlow's{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>

        </div>
      </div>

    </div>
  );
}