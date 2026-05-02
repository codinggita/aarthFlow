import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard-layout.css";
import "../styles/customers.css";

const SidebarItem = ({ to, icon, label, active }) => (
  <Link to={to} className={`side-nav-item ${active ? 'active' : ''}`}>
    <span className="nav-icon">{icon}</span>
    <span className="nav-label">{label}</span>
  </Link>
);

const Customers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const kpis = [
    { label: "TOTAL CUSTOMERS", value: "284", delta: "+12%", type: "default" },
    { label: "TREDS ELIGIBLE", value: "156", sub: "55% of Total", type: "success" },
    { label: "AVG RISK SCORE", value: "A-", progress: 75, type: "default" },
    { label: "HIGH RISK", value: "8", icon: "⚠️", type: "danger" },
  ];

  const customers = [
    { name: 'TechSystems Inc.', industry: 'Technology', invoices: 24, volume: '$842,000', risk: 'A+', location: 'San Francisco, CA' },
    { name: 'Global Media Co.', industry: 'Media', invoices: 18, volume: '$650,400', risk: 'A', location: 'New York, NY' },
    { name: 'Apex Ventures', industry: 'Finance', invoices: 31, volume: '$1.2M', risk: 'A-', location: 'Palo Alto, CA' },
    { name: 'Lunar Logistics', industry: 'Logistics', invoices: 12, volume: '$310,000', risk: 'B+', location: 'Chicago, IL' },
    { name: 'Nexus Core', industry: 'Manufacturing', invoices: 4, volume: '$85,200', risk: 'B', location: 'Detroit, MI' },
    { name: 'PrimeTech Retail', industry: 'Retail', invoices: 42, volume: '$450,000', risk: 'A', location: 'London, UK' },
    { name: 'MegaBuild Corp', industry: 'Construction', invoices: 7, volume: '$1.8M', risk: 'A-', location: 'Dubai, UAE' },
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
          <SidebarItem to="/financing" icon="🏛️" label="Financing" />
          <SidebarItem to="/customers" icon="👥" label="Customers" active />
          <SidebarItem to="/reports" icon="📈" label="Reports" />
          <SidebarItem to="/settings" icon="⚙️" label="Settings" />
        </nav>
        <div className="sidebar-footer">
          <button className="btn-new-facility">
            <span className="plus">+</span> New Facility
          </button>
        </div>
      </aside>

      <div className="main-viewport">
        <header className="top-bar-v2">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search facilities or buyers..." />
          </div>
          <div className="top-bar-actions">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn" onClick={() => navigate("/settings")}>❓</button>
            <div className="user-profile-v2" onClick={() => navigate("/settings")} style={{ cursor: 'pointer' }}>
              <div className="user-text">
                <span className="user-name">{user?.ownerName || "Alex Thorne"}</span>
                <span className="user-role">RISK MANAGER</span>
              </div>
              <div className="user-avatar-v2">AT</div>
            </div>
          </div>
        </header>

        <div className="content-body">
          <div className="page-header-v2">
            <div>
              <h2>Customers</h2>
              <p>Manage buyer relationships and counterparty risk</p>
            </div>
            <div className="header-actions">
              <button className="btn-secondary">Import CSV</button>
              <button className="btn-primary-v2">+ Add Customer</button>
            </div>
          </div>

          <div className="customer-kpi-grid">
            {kpis.map((kpi, i) => (
              <div key={i} className="c-kpi-card">
                <span className="c-label">{kpi.label}</span>
                <div className="c-value-row">
                  <h3 className="c-value">{kpi.value}</h3>
                  {kpi.delta && <span className="c-delta">{kpi.delta}</span>}
                  {kpi.sub && <span className="c-sub-val">{kpi.sub}</span>}
                </div>
                {kpi.progress && (
                  <div className="c-progress-bar"><div className="c-fill" style={{width: `${kpi.progress}%`}}></div></div>
                )}
                {kpi.type === 'danger' && <span className="c-danger-icon">{kpi.icon}</span>}
              </div>
            ))}
          </div>

          <div className="customers-main-grid">
            <div className="c-primary-col">
              <div className="filter-bar-v2">
                <div className="search-box">
                  <span className="search-icon">🔍</span>
                  <input type="text" placeholder="Search customers..." />
                </div>
                <select className="filter-select">
                  <option>Risk Level: All</option>
                </select>
                <select className="filter-select">
                  <option>Industry: All</option>
                </select>
                <div className="toggle-group">
                  <span>TReDS Eligible</span>
                  <div className="toggle-switch"></div>
                </div>
                <button className="btn-icon">☰</button>
              </div>

              <table className="customers-table">
                <thead>
                  <tr>
                    <th>CUSTOMER</th>
                    <th>INDUSTRY</th>
                    <th>INVOICES</th>
                    <th>TOTAL VOLUME</th>
                    <th>RISK</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c, i) => (
                    <tr key={i} onClick={() => setSelectedCustomer(c)} className={selectedCustomer?.name === c.name ? 'active' : ''}>
                      <td className="c-name-cell">
                        <div className="c-avatar">{c.name.charAt(0)}</div>
                        <strong>{c.name}</strong>
                      </td>
                      <td>{c.industry}</td>
                      <td>{c.invoices}</td>
                      <td className="bold-cell">{c.volume}</td>
                      <td>
                        <span className={`risk-pill ${c.risk.toLowerCase().replace('+', 'p').replace('-', 'm')}`}>
                          {c.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="table-footer-simple">
                <p>Showing 1-7 of 284 customers</p>
                <div className="simple-pagination">
                  <button className="p-btn">←</button>
                  <button className="p-btn active">1</button>
                  <button className="p-btn">2</button>
                  <button className="p-btn">3</button>
                  <button className="p-btn">→</button>
                </div>
              </div>
            </div>

            <aside className="c-sidebar">
              {selectedCustomer ? (
                <div className="risk-side-panel">
                  <div className="risk-panel-header">
                    <div className="risk-avatar-large">{selectedCustomer.name.charAt(0)}</div>
                    <div className="risk-score-badge">A+ RISK SCORE</div>
                    <h3>{selectedCustomer.name}</h3>
                    <p>📍 {selectedCustomer.location}</p>
                    <button className="btn-more">⋮</button>
                  </div>

                  <div className="risk-stats-row">
                    <div className="risk-stat-box">
                      <span>TOTAL VOLUME</span>
                      <strong>{selectedCustomer.volume}</strong>
                    </div>
                    <div className="risk-stat-box">
                      <span>ACTIVE INVOICES</span>
                      <strong>{selectedCustomer.invoices}</strong>
                    </div>
                  </div>

                  <div className="payment-cycle-card">
                    <span>AVG PAYMENT CYCLE</span>
                    <strong>45 Days</strong>
                  </div>

                  <div className="risk-breakdown">
                    <h4>RISK BREAKDOWN</h4>
                    <div className="risk-line">
                      <div className="risk-line-label"><span>Payment History</span> <strong>95%</strong></div>
                      <div className="risk-line-bar"><div className="fill" style={{width: '95%'}}></div></div>
                    </div>
                    <div className="risk-line">
                      <div className="risk-line-label"><span>Credit Rating</span> <strong>98%</strong></div>
                      <div className="risk-line-bar"><div className="fill" style={{width: '98%'}}></div></div>
                    </div>
                  </div>

                  <div className="market-pos-card">
                    <h4>MARKET POSITIONING</h4>
                    <div className="circular-chart-v2">
                      <div className="chart-inner">
                        <strong>82%</strong>
                        <span>RELIABILITY</span>
                      </div>
                    </div>
                    <div className="chart-legend-v2">
                      <span><i className="dot tech"></i> Tech</span>
                      <span><i className="dot retail"></i> Retail</span>
                      <span><i className="dot other"></i> Other</span>
                    </div>
                  </div>

                  <button className="btn-full-profile">👁️ View Full Profile</button>
                </div>
              ) : (
                <div className="empty-side-panel">
                  <div className="empty-icon">👥</div>
                  <p>Select a customer to view risk profile</p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
