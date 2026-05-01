import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/tokens.css";
import "../styles/buttons.css";
import "../styles/navbar.css";
import "../styles/hero.css";
import "../styles/sections.css";
import "../styles/footer.css";
import "../styles/responsive.css";

const NAV_LINKS = ["Features", "Solutions", "How It Works", "Pricing"];

const STATS = [
  { value: "₹500Cr+", label: "Capital Unlocked" },
  { value: "2400+", label: "SMEs Onboarded" },
  { value: "48hr", label: "Average Approval Time" },
];

const PARADOX_ITEMS = [
  {
    icon: "📋",
    title: "Buyer-Imposed Terms",
    desc: "Large corporates enforce 60 to 90 day payment cycles, leaving you with confirmed orders but no cash in hand.",
  },
  {
    icon: "⏱",
    title: "You Pay in 30 Days",
    desc: "Your suppliers, staff, and operations cannot wait. You must pay within 30 days — regardless of when you get paid.",
  },
  {
    icon: "⚡",
    title: "The Cash Gap",
    desc: "AarthFlow bridges this gap instantly — converting your unpaid invoices into working capital within 48 hours.",
    highlight: true,
  },
];

const PIPELINE_STEPS = [
  { step: "01", title: "Connect", desc: "Link your invoices and buyer contracts in minutes." },
  { step: "02", title: "Verify", desc: "We verify your confirmed orders with large buyers automatically." },
  { step: "03", title: "Advance", desc: "Receive up to 90% of your invoice value within 48 hours." },
  { step: "04", title: "Repay", desc: "Repay when your buyer settles the invoice. No hidden charges." },
];

const FEATURES = [
  {
    title: "Instant Communication",
    desc: "Real-time updates on your invoice status, buyer approvals, and fund disbursements — all in one place.",
  },
  {
    title: "Competitive Rates",
    desc: "Access financing at rates far lower than traditional short-term loans. No collateral required.",
  },
  {
    title: "Dynamic Limits",
    desc: "Your financing limit grows with your business. The more invoices you process, the higher your limit.",
  },
  {
    title: "Tech-First Integration",
    desc: "Seamlessly integrate with your existing accounting software, GST portal, and banking systems.",
  },
];

const FOOTER_LINKS = {
  Partner: ["Become a Lender", "Refer an SME", "API Access"],
  Company: ["About Us", "Careers", "Blog", "Press"],
  "Need Help?": ["Support Center", "Contact Us", "Privacy Policy", "Terms of Service"],
};

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-inner">
          <div className="nav-logo">AarthFlow</div>
          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            {NAV_LINKS.map((l) => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
          <div className="nav-actions">
            <Link to="/login" className="btn-ghost">Log In</Link>
            <Link to="/signup" className="btn-primary">Get Started</Link>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <span className="hero-tag">B2B Invoice Financing for Indian SMEs</span>
            <h1>
              Stop waiting <span className="accent">90 days</span><br />
              to get paid.
            </h1>
            <p className="hero-sub">
              Large buyers impose 60–90 day payment terms while your bills are due in 30.
              AarthFlow converts your confirmed invoices into working capital — instantly.
            </p>
            <div className="hero-cta">
              <Link to="/signup" className="btn-primary large">Get Started Free</Link>
              <a href="#how-it-works" className="btn-outline large">See How It Works</a>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <div className="card-label">Cash Gap</div>
              <div className="card-amount danger">₹43.2L</div>
              <div className="card-sub">Next 30 days · 3 invoices at risk</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "72%" }} />
              </div>
              <div className="card-row">
                <span>Receivable in 82 days</span>
                <span className="muted">₹1.2Cr</span>
              </div>
              <div className="card-row">
                <span>Obligations due in 30 days</span>
                <span className="danger-text">₹43.2L</span>
              </div>
              <Link to="/signup" className="btn-primary block-btn">Bridge the Gap</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stats-inner">
          {STATS.map((s) => (
            <div className="stat-item" key={s.label}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CASH FLOW PARADOX */}
      <section className="paradox">
        <div className="section-inner">
          <h2 className="section-title">The Cash Flow Paradox</h2>
          <p className="section-sub">
            Indian SMEs are profitable on paper but cash-starved in reality. Here is why.
          </p>
          <div className="paradox-grid">
            {PARADOX_ITEMS.map((item) => (
              <div className={`paradox-card ${item.highlight ? "highlight" : ""}`} key={item.title}>
                <div className="paradox-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section className="pipeline">
        <div className="section-inner">
          <h2 className="section-title">Modern Capital Pipeline</h2>
          <p className="section-sub">Four steps from invoice to funds in your account.</p>
          <div className="pipeline-steps">
            {PIPELINE_STEPS.map((s, i) => (
              <div className="pipeline-step" key={s.step}>
                <div className="step-number">{s.step}</div>
                <div className="step-connector">{i < PIPELINE_STEPS.length - 1 && <span />}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="section-inner">
          <h2 className="section-title">Engineered for Enterprise SMEs</h2>
          <p className="section-sub">
            Every feature is built around the real operational challenges that small businesses face.
          </p>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="feature-dot" />
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="section-inner center">
          <h2>Ready to unlock your cash?</h2>
          <p>Join thousands of Indian SMEs who no longer wait 90 days to get paid.</p>
          <div className="hero-cta">
            <Link to="/signup" className="btn-primary large">Apply Now</Link>
            <Link to="/login" className="btn-outline-light large">View Prototype</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">AarthFlow</div>
            <p>Turn confirmed orders into instant working capital. Built for India's SMEs.</p>
            <p className="footer-copy">Built by Prince Nayakpara</p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div className="footer-col" key={group}>
              <h4>{group}</h4>
              <ul>
                {links.map((l) => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 AarthFlow. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}