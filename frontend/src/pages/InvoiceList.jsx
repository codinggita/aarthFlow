import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard-layout.css";
import "../styles/invoice-list.css";

const SidebarItem = ({ to, icon, label, active }) => (
  <Link to={to} className={`side-nav-item ${active ? 'active' : ''}`}>
    <span className="nav-icon">{icon}</span>
    <span className="nav-label">{label}</span>
  </Link>
);

const InvoiceList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Invoices");

  const kpis = [
    { label: "TOTAL INVOICES", value: "1,284", icon: "📄", type: "default" },
    { label: "PENDING REVIEW", value: "47", icon: "⏳", type: "warning", badge: "IN REVIEW" },
    { label: "FUNDED THIS MONTH", value: "₹2.4M", icon: "💵", type: "success", badge: "HEALTHY" },
    { label: "OVERDUE", value: "12", icon: "⚠️", type: "danger", badge: "ATTENTION" },
  ];

  const invoices = [
    { id: 'INV-2024-0892', client: 'TechSystems Inc.', service: 'Software & Services', amount: '₹42,500.00', advance: '85%', fee: '₹637.50', payout: '₹35,487.50', date: 'Oct 24, 2024', status: 'FUNDED', initial: 'TS' },
    { id: 'INV-2024-1044', client: 'Global Media Co.', service: 'Entertainment', amount: '₹12,400.00', advance: '90%', fee: '₹186.00', payout: '₹10,974.00', date: 'Oct 26, 2024', status: 'REVIEW', initial: 'GM' },
    { id: 'INV-2024-0712', client: 'Apex Ventures', service: 'Venture Capital', amount: '₹158,000.00', advance: '80%', fee: '₹2,370.00', payout: '₹124,030.00', date: 'Oct 28, 2024', status: 'PENDING', initial: 'AV' },
    { id: 'INV-2024-1102', client: 'Lunar Logistics', service: 'Shipping', amount: '₹8,920.00', advance: '85%', fee: '₹133.80', payout: '₹7,448.20', date: 'Oct 29, 2024', status: 'FUNDED', initial: 'LL' },
    { id: 'INV-2024-0655', client: 'Skyward Kraft', service: 'Manufacturing', amount: '₹22,100.00', advance: '85%', fee: '₹331.50', payout: '₹18,453.50', date: 'Oct 30, 2024', status: 'DELAYED', initial: 'SK' },
  ];

  const tabs = ["All Invoices", "Funded", "In Review", "Pending", "Delayed", "Rejected"];

  return (
    <div className="dash-container-v2">
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
          <button className="btn-new-invoice" onClick={() => navigate("/invoices/upload")}>
            <span className="plus">+</span> New Invoice
          </button>
        </div>
      </aside>

      <div className="main-viewport">
        <header className="top-bar-v2">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search transactions..." />
          </div>
          <div className="top-bar-actions">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn" onClick={() => navigate("/settings")}>⚙️</button>
            <div className="user-profile-v2" onClick={() => navigate("/settings")} style={{ cursor: 'pointer' }}>
              <div className="user-text">
                <span className="user-name">{user?.ownerName || "Alex Rivera"}</span>
                <span className="user-role">ADMIN</span>
              </div>
              <div className="user-avatar-v2">A</div>
            </div>
          </div>
        </header>

        <div className="content-body">
          <div className="page-header-v2">
            <div>
              <h2>Invoices</h2>
              <p>Manage and track all invoice financing applications in real-time.</p>
            </div>
            <div className="header-actions">
              <button className="btn-secondary">🔍 Filter</button>
              <button className="btn-secondary">📅 Last 30 Days</button>
              <button className="btn-secondary">📥 Export</button>
              <button className="btn-primary-v2" onClick={() => navigate("/invoices/upload")}>+ New Invoice</button>
            </div>
          </div>

          <div className="kpi-row-v2">
            {kpis.map((kpi, i) => (
              <div key={i} className="kpi-card-simple">
                <div className="kpi-header">
                  <div className={`kpi-icon-wrap ${kpi.type}`}>{kpi.icon}</div>
                  <div className="kpi-label-wrap">
                    <span className="kpi-label">{kpi.label}</span>
                    {kpi.badge && <span className={`kpi-badge-v2 ${kpi.type}`}>{kpi.badge}</span>}
                  </div>
                </div>
                <h3 className="kpi-value-v2">{kpi.value}</h3>
              </div>
            ))}
          </div>

          <div className="table-wrapper-v2">
            <div className="table-controls-v2">
              <div className="table-tabs">
                {tabs.map(tab => (
                  <button 
                    key={tab} 
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="table-actions-right">
                <div className="table-search">
                  <input type="text" placeholder="Search by name or #" />
                </div>
                <button className="btn-icon">📅</button>
                <select className="bulk-select">
                  <option>Bulk Action</option>
                </select>
              </div>
            </div>

            <table className="invoices-list-table">
              <thead>
                <tr>
                  <th>COUNTERPARTY</th>
                  <th>INVOICE #</th>
                  <th>AMOUNT</th>
                  <th>ADVANCE %</th>
                  <th>FEE</th>
                  <th>NET PAYOUT</th>
                  <th>SUBMITTED</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} onClick={() => navigate(`/invoices/${inv.id}`)}>
                    <td className="client-cell">
                      <div className="client-avatar">{inv.initial}</div>
                      <div className="client-info">
                        <strong>{inv.client}</strong>
                        <span>{inv.service}</span>
                      </div>
                    </td>
                    <td className="mono-cell">{inv.id}</td>
                    <td className="bold-cell">{inv.amount}</td>
                    <td>{inv.advance}</td>
                    <td className="muted-cell">{inv.fee}</td>
                    <td className="payout-cell">{inv.payout}</td>
                    <td className="muted-cell">{inv.date}</td>
                    <td>
                      <span className={`status-pill ${inv.status.toLowerCase()}`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="table-footer-v2">
              <p>Showing <strong>1-10</strong> of <strong>1,284</strong> invoices</p>
              <div className="pagination">
                <button className="pg-btn">←</button>
                <button className="pg-btn active">1</button>
                <button className="pg-btn">2</button>
                <button className="pg-btn">3</button>
                <span>...</span>
                <button className="pg-btn">128</button>
                <button className="pg-btn">→</button>
              </div>
              <div className="display-limit">
                Display: <select><option>10 per page</option></select>
              </div>
            </div>
          </div>

          <div className="promo-grid-v2">
            <div className="promo-card dark">
              <h3>Need higher credit limits?</h3>
              <p>Institutional partners can unlock up to ₹50M in immediate liquidity with specialized financing rates.</p>
              <button className="btn-primary-v2">Talk to Institutional Desk</button>
            </div>
            <div className="promo-card light">
              <div className="insight-header">
                <div className="insight-icon">⚡</div>
                <h3>Optimization Insight</h3>
              </div>
              <p>Your average review time has dropped by 14% this month. Consolidating Global Media invoices could further reduce processing fees.</p>
              <div className="promo-actions">
                <button className="text-link">View Analytics</button>
                <button className="text-link muted">Dismiss</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;