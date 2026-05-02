import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard-layout.css";
import "../styles/financing.css";

const SidebarItem = ({ to, icon, label, active }) => (
  <Link to={to} className={`side-nav-item ${active ? 'active' : ''}`}>
    <span className="nav-icon">{icon}</span>
    <span className="nav-label">{label}</span>
  </Link>
);

const Financing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [advanceRate, setAdvanceRate] = useState(90);
  const [invoiceAmount, setInvoiceAmount] = useState(25000);

  const kpis = [
    { label: "TOTAL FACILITY", value: "$10.0M", sub: "Approved credit limit", type: "default" },
    { label: "UTILIZED", value: "$4.28M", sub: "42.8% of facility", type: "info", progress: 42.8 },
    { label: "AVG ADVANCE RATE", value: "91.2%", sub: "Across active portfolio", type: "default" },
    { label: "AVAILABLE CREDIT", value: "$5.72M", sub: "Ready to deploy", type: "default" },
  ];

  return (
    <div className="dash-container-v2">
      <aside className="sidebar-v2">
        <div className="sidebar-brand">
          <div className="brand-logo">AarthFlow</div>
          <p className="brand-sub">INSTITUTIONAL FINANCE</p>
        </div>
        <nav className="sidebar-nav">
          <SidebarItem to="/dashboard" icon="📊" label="Dashboard" />
          <SidebarItem to="/invoices" icon="📄" label="Invoices" />
          <SidebarItem to="/financing" icon="🏛️" label="Financing" active />
          <SidebarItem to="/customers" icon="👥" label="Customers" />
          <SidebarItem to="/reports" icon="📈" label="Reports" />
          <SidebarItem to="/settings" icon="⚙️" label="Settings" />
        </nav>
        <div className="sidebar-footer">
          <button className="btn-new-invoice" onClick={() => navigate("/invoices/upload")}>
            <span className="plus">+</span> New Invoice
          </button>
        </div>
      </aside>

      <div className="main-viewport">
        <header className="top-bar-v2">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search facilities, transactions..." />
          </div>
          <div className="top-bar-actions">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn" onClick={() => navigate("/settings")}>❓</button>
            <div className="user-profile-v2" onClick={() => navigate("/settings")} style={{ cursor: 'pointer' }}>
              <div className="user-text">
                <span className="user-name">{user?.ownerName || "Alex Rivera"}</span>
                <span className="user-role">FINANCIAL DIRECTOR</span>
              </div>
              <div className="user-avatar-v2">A</div>
            </div>
          </div>
        </header>

        <div className="content-body">
          <div className="page-header-v2">
            <div>
              <h2>Financing</h2>
              <p>Manage funding facilities and advance settings</p>
            </div>
          </div>

          <div className="financing-kpi-grid">
            {kpis.map((kpi, i) => (
              <div key={i} className="f-kpi-card">
                <span className="f-label">{kpi.label}</span>
                <h3 className="f-value">{kpi.value}</h3>
                <p className="f-sub">{kpi.sub}</p>
                {kpi.progress && (
                  <div className="f-progress-bar">
                    <div className="f-progress-fill" style={{ width: `${kpi.progress}%` }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="financing-main-grid">
            <div className="f-primary-col">
              <section className="f-section">
                <div className="f-section-header">
                  <h3>Financing Facilities</h3>
                  <button className="text-link">View Agreements</button>
                </div>
                
                <div className="facility-list">
                  <div className="facility-card">
                    <div className="facility-head">
                      <div className="facility-icon">⚡</div>
                      <div>
                        <strong>Working Capital Line</strong>
                        <span className="status-badge-green">ACTIVE</span>
                      </div>
                      <button className="btn-manage-sm">Manage</button>
                    </div>
                    <div className="facility-body">
                      <div className="fac-stat">
                        <span>Used: $2.4M</span>
                        <span>Limit: $5.0M</span>
                      </div>
                      <div className="fac-progress"><div className="fac-fill" style={{width: '48%'}}></div></div>
                      <div className="fac-meta">
                        <div><span>RATE</span><strong>Prime + 1.25%</strong></div>
                        <div><span>TENOR</span><strong>Revolving</strong></div>
                      </div>
                    </div>
                  </div>

                  <div className="facility-card">
                    <div className="facility-head">
                      <div className="facility-icon">📄</div>
                      <div>
                        <strong>Invoice Discounting</strong>
                        <span className="status-badge-green">ACTIVE</span>
                      </div>
                      <button className="btn-manage-sm">Manage</button>
                    </div>
                    <div className="facility-body">
                      <div className="fac-stat">
                        <span>Used: $1.88M</span>
                        <span>Limit: $3.0M</span>
                      </div>
                      <div className="fac-progress"><div className="fac-fill" style={{width: '62.6%'}}></div></div>
                      <div className="fac-meta">
                        <div><span>RATE</span><strong>Fixed 4.5%</strong></div>
                        <div><span>TENOR</span><strong>90 Days</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="f-section">
                <div className="f-section-header">
                  <h3>Advance Settings</h3>
                  <p>Set the default advance percentage for incoming invoices.</p>
                </div>
                <div className="advance-rate-grid">
                  {[80, 90, 100].map(rate => (
                    <div 
                      key={rate} 
                      className={`rate-card ${advanceRate === rate ? 'active' : ''}`}
                      onClick={() => setAdvanceRate(rate)}
                    >
                      {rate === 90 && <span className="recommended">RECOMMENDED</span>}
                      <h3>{rate}%</h3>
                      <p>{rate === 80 ? 'Conservative liquidity with maximum capital protection.' : 
                          rate === 90 ? 'Optimal balance between cash flow and safety margins.' : 
                          'Maximum liquidity extraction for high-velocity growth.'}</p>
                    </div>
                  ))}
                </div>
                <button className="btn-save-pref">Save Preference</button>
              </section>
            </div>

            <aside className="f-sidebar">
              <div className="calculator-card">
                <h3>Fee Calculator</h3>
                <div className="calc-group">
                  <label>INVOICE AMOUNT</label>
                  <div className="calc-input">
                    <span>$</span>
                    <input 
                      type="number" 
                      value={invoiceAmount} 
                      onChange={(e) => setInvoiceAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="calc-group">
                  <label>ADVANCE RATE</label>
                  <div className="rate-selector">
                    {[80, 90, 100].map(r => (
                      <button 
                        key={r} 
                        className={advanceRate === r ? 'active' : ''}
                        onClick={() => setAdvanceRate(r)}
                      >{r}%</button>
                    ))}
                  </div>
                </div>
                <div className="calc-result">
                  <span className="res-label">ESTIMATED NET PAYOUT</span>
                  <h2 className="res-value">${(invoiceAmount * advanceRate / 100).toLocaleString()}</h2>
                  <div className="res-meta">
                    <span>Effective APR</span>
                    <strong>5.82%</strong>
                  </div>
                </div>
                <button className="btn-calculate">Calculate</button>
              </div>

              <div className="history-card">
                <h3>Funding History</h3>
                <div className="mini-chart">
                  <div className="chart-bars">
                    {[30, 45, 60, 40, 70, 90].map((h, i) => (
                      <div key={i} className="bar" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="chart-labels">
                    <span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span><span>DEC</span><span>JAN</span>
                  </div>
                </div>
                <p className="chart-sub">Monthly disbursement volume (Last 6 months)</p>
              </div>

              <div className="rate-schedule">
                <h3>RATE SCHEDULE</h3>
                <table className="schedule-table">
                  <thead><tr><th>ADVANCE</th><th>FEE</th><th>APR</th></tr></thead>
                  <tbody>
                    <tr><td>80%</td><td>0.85%</td><td>4.2%</td></tr>
                    <tr className="active"><td>90%</td><td>1.25%</td><td>5.8%</td></tr>
                    <tr><td>100%</td><td>2.10%</td><td>8.4%</td></tr>
                  </tbody>
                </table>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financing;
