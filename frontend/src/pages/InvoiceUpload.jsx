import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard-layout.css";
import "../styles/invoice-upload.css";

const SidebarItem = ({ to, icon, label, active }) => (
  <Link to={to} className={`side-nav-item ${active ? 'active' : ''}`}>
    <span className="nav-icon">{icon}</span>
    <span className="nav-label">{label}</span>
  </Link>
);

const InvoiceUpload = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const stats = [
    { label: "AVAILABLE CREDIT", value: "₹12.4M", sub: "65% of your ₹20M limit utilized.", type: "light" },
    { label: "AVERAGE DISBURSAL", value: "4.2s", sub: "Institutional speed enabled.", type: "dark" },
    { label: "ACTIVE INVOICES", value: "24", sub: "4 pending verification.", type: "light" },
  ];

  return (
    <div className="dash-container-v2">
      {/* SIDEBAR */}
      <aside className="sidebar-v2">
        <div className="sidebar-brand">
          <div className="brand-logo">AarthFlow</div>
          <p className="brand-sub">INSTITUTIONAL FINANCE</p>
        </div>
        <nav className="sidebar-nav">
          <SidebarItem to="/dashboard" icon="📊" label="Dashboard" />
          <SidebarItem to="/invoices" icon="📄" label="Invoices" active />
          <SidebarItem to="/financing" icon="🏛️" label="Financing" />
          <SidebarItem to="/customers" icon="👥" label="Customers" />
          <SidebarItem to="/reports" icon="📈" label="Reports" />
          <SidebarItem to="/settings" icon="⚙️" label="Settings" />
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-links-bottom">
            <Link to="/support">❓ Support</Link>
            <Link to="/docs">📖 Documentation</Link>
          </div>
          <div className="update-badge">
            <span className="update-dot"></span>
            <strong>NEW UPDATE</strong>
            <p>Institutional trade tracking is now live in the reporting tab.</p>
            <span>May 12, 10:30 AM</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="main-viewport">
        <header className="top-bar-v2">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search transactions..." />
          </div>
          <div className="top-bar-actions">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn" onClick={() => navigate("/settings")}>⚙️</button>
            <div className="user-avatar-v2" onClick={() => navigate("/settings")} style={{ cursor: 'pointer' }}>{user?.ownerName?.charAt(0) || "A"}</div>
          </div>
        </header>

        <div className="content-body invoice-body">
          <div className="invoice-main-layout">
            <div className="invoice-primary-col">
              <section className="upload-section">
                <h2>New Invoice</h2>
                <p className="sub-text">Accelerate your cash flow by uploading your commercial invoices.</p>
                
                <div className="drop-zone">
                  <div className="drop-icon">☁️</div>
                  <p><strong>Drag and drop files here</strong></p>
                  <p className="small">PDF, JPG or PNG up to 20MB</p>
                  <button className="btn-browse">Browse Files</button>
                </div>

                <div className="form-grid-v2">
                  <div className="form-group-v2">
                    <label>CUSTOMER NAME</label>
                    <select className="input-v2">
                      <option>Select Customer</option>
                      <option>Reliance Industries</option>
                      <option>Tata Motors</option>
                    </select>
                  </div>
                  <div className="form-group-v2">
                    <label>DUE DATE</label>
                    <input type="date" className="input-v2" defaultValue="2024-05-12" />
                  </div>
                </div>
              </section>

              <section className="lifecycle-section">
                <div className="section-header-row">
                  <h3>Invoice Lifecycle</h3>
                  <div className="header-actions">
                    <button className="btn-ghost">Download PDF</button>
                    <button className="btn-dark">View Ledger</button>
                  </div>
                </div>

                <div className="lifecycle-stepper">
                  <div className="step-node active">
                    <div className="node-icon">🛡️</div>
                    <div className="node-info">
                      <strong>Verified</strong>
                      <span>May 12, 11:45 AM</span>
                    </div>
                  </div>
                  <div className="step-line active"></div>
                  <div className="step-node active">
                    <div className="node-icon">🏛️</div>
                    <div className="node-info">
                      <strong>Financing Active</strong>
                      <span className="status-badge">CURRENT STATUS</span>
                    </div>
                  </div>
                  <div className="step-line"></div>
                  <div className="step-node disabled">
                    <div className="node-icon">📄</div>
                    <div className="node-info">
                      <strong>Repayment Due</strong>
                      <span>Est. June 12</span>
                    </div>
                  </div>
                  <div className="step-line"></div>
                  <div className="step-node disabled">
                    <div className="node-icon">✓</div>
                    <div className="node-info">
                      <strong>Closed</strong>
                      <span>--</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <aside className="invoice-summary-sidebar">
              <div className="summary-card">
                <h3>Financing Summary</h3>
                <div className="summary-list">
                  <div className="summary-row">
                    <span>Invoice Value</span>
                    <span className="val">₹50,000.00</span>
                  </div>
                  <div className="summary-row">
                    <span>Advance Rate (90%)</span>
                    <span className="val">₹45,000.00</span>
                  </div>
                  <div className="summary-row tech-fee">
                    <span>Est. Service Fee</span>
                    <span className="val-red">- ₹2,000.00</span>
                  </div>
                </div>
                <div className="summary-total">
                  <span className="total-label">ESTIMATED PAYOUT</span>
                  <h2 className="total-val">₹43,000.00</h2>
                </div>
                <button className="btn-submit-verification" onClick={() => setShowSuccess(true)}>
                  Submit for Verification
                </button>
                <p className="summary-legal">Subject to credit assessment and institutional verification guidelines.</p>
              </div>
            </aside>
          </div>

          <div className="bottom-stats-grid">
            {stats.map((s, i) => (
              <div key={i} className={`stat-box ${s.type}`}>
                {s.type === 'dark' && <div className="stat-icon-glow">⚡</div>}
                <div className="stat-content">
                  <span className="stat-label">{s.label}</span>
                  <h3 className="stat-value">{s.value}</h3>
                  <p className="stat-sub">{s.sub}</p>
                </div>
                {s.label === 'ACTIVE INVOICES' && <div className="stat-bg-icon">📄</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-check">
              <div className="check-icon">✓</div>
            </div>
            <div className="success-content">
              <span className="diamond">🔶</span>
              <h2>Payout Successful</h2>
              <p>Funds have been dispatched to your primary institutional node.</p>
              
              <div className="amount-card">
                <span className="amount-label">TRANSFERRED AMOUNT</span>
                <h2 className="amount-val">₹48,000.00</h2>
              </div>

              <div className="success-details">
                <div className="detail-row">
                  <span>Transaction ID</span>
                  <strong>AF-TXN-882910</strong>
                </div>
                <div className="detail-row">
                  <span>Destination</span>
                  <strong>HDFC Bank •••• 4920</strong>
                </div>
              </div>

              <button className="btn-back-dash" onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </button>
              <button className="btn-link-receipt">Download Receipt</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceUpload;