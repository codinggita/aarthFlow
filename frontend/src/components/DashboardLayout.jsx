import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard-layout.css";
import "../styles/sidebar.css";
import "../styles/topbar.css";

const SidebarItem = ({ to, icon, label, active }) => (
  <Link to={to} className={`side-nav-item ${active ? 'active' : ''}`}>
    <span className="nav-icon">{icon}</span>
    <span className="nav-label">{label}</span>
  </Link>
);

const DashboardLayout = ({ children, activePage, pageTitle, pageSubtitle, headerActions }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dash-container-v2">
      {/* SIDEBAR */}
      <aside className="sidebar-v2">
        <div className="sidebar-brand">
          <div className="brand-logo">AarthFlow</div>
          <p className="brand-sub">INSTITUTIONAL FINANCE</p>
        </div>

        <nav className="sidebar-nav">
          <SidebarItem to="/dashboard" icon="📊" label="Dashboard" active={activePage === 'dashboard'} />
          <SidebarItem to="/invoices" icon="📄" label="Invoices" active={activePage === 'invoices'} />
          <SidebarItem to="/financing" icon="🏛️" label="Financing" active={activePage === 'financing'} />
          <SidebarItem to="/customers" icon="👥" label="Customers" active={activePage === 'customers'} />
          <SidebarItem to="/reports" icon="📈" label="Reports" active={activePage === 'reports'} />
          <SidebarItem to="/settings" icon="⚙️" label="Settings" active={activePage === 'settings'} />
        </nav>

        <div className="sidebar-footer">
          <button className="btn-new-invoice" onClick={() => navigate("/invoices/upload")}>
            <span className="plus">+</span> New Invoice
          </button>
          <div className="sidebar-links-bottom">
            <Link to="/support">❓ Support</Link>
            <button onClick={handleLogout} className="btn-logout" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '13px', fontWeight: '600', textAlign: 'left', padding: '0' }}>🚪 Logout</button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="main-viewport">
        {/* TOP BAR */}
        <header className="top-bar-v2">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search invoices, clients, or transactions..." />
          </div>
          <div className="top-bar-actions">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">❓</button>
            <button className="icon-btn" onClick={() => navigate("/settings")}>⚙️</button>
            <div className="user-profile-v2" onClick={() => navigate("/settings")} style={{ cursor: 'pointer' }}>
              <div className="user-text">
                <span className="user-name">{user?.ownerName || "Alex Rivera"}</span>
                <span className="user-role">TREASURY OPS</span>
              </div>
              <div className="user-avatar-v2">
                {user?.ownerName?.charAt(0) || "A"}
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT BODY */}
        <div className="content-body">
          {pageTitle && (
            <div className="page-header-v2">
              <div>
                <h2>{pageTitle}</h2>
                <p>{pageSubtitle}</p>
              </div>
              {headerActions && <div className="header-actions">{headerActions}</div>}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
