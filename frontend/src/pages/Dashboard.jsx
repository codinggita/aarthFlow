import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getDashboardStats,
  getRecentInvoices,
  getDashboardSummary,
} from "../utils/api";
import KPICards from "../components/KPICards";
import RecentInvoices from "../components/RecentInvoices";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError("");
      try {
        const [statsRes, invoicesRes, summaryRes] = await Promise.all([
          getDashboardStats(),
          getRecentInvoices(),
          getDashboardSummary(),
        ]);
        setStats(statsRes.stats);
        setRecentInvoices(invoicesRes.invoices);
        setSummary(summaryRes.summary);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>⚠️ {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">AarthFlow</div>
          {user && (
            <div className="sidebar-user">
              <p className="sidebar-business">{user.businessName}</p>
              <p className="sidebar-gst">GST: {user.gstNumber}</p>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <div className="nav-label">MAIN</div>
          <div className="nav-item active">🏠 Dashboard</div>
          <div
            className="nav-item"
            onClick={() => navigate("/invoices")}
          >
            📄 My Invoices
          </div>
          <div
            className="nav-item"
            onClick={() => navigate("/invoices/upload")}
          >
            ⬆️ Upload Invoice
          </div>
          <div
            className="nav-item"
            onClick={() => navigate("/payouts")}
          >
            💰 Payouts
          </div>
          <div
            className="nav-item"
            onClick={() => navigate("/buyers")}
          >
            🏢 Buyers
          </div>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-profile">
            <div className="avatar">
              {user?.ownerName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="profile-name">{user?.ownerName}</p>
              <p className="profile-role">Owner</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Bar */}
        <div className="topbar">
          <h1 className="page-title">Dashboard</h1>
          <div className="topbar-right">
            <button
              className="btn-upload"
              onClick={() => navigate("/invoices/upload")}
            >
              + Upload Invoice
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        {stats && <KPICards stats={stats} />}

        {/* Middle Row */}
        <div className="dashboard-middle">
          {/* Recent Invoices */}
          <div className="recent-invoices-wrap">
            <RecentInvoices
              invoices={recentInvoices}
              onViewAll={() => navigate("/invoices")}
            />
          </div>

          {/* Payout Summary */}
          <div className="payout-summary-card">
            <p className="card-label">SAVINGS THIS MONTH</p>
            <h2 className="savings-amount">
              ₹{summary?.totalSavings?.toLocaleString("en-IN") || 0}
            </h2>
            <p className="savings-sub">
              vs taking a bank loan at 20% p.a.
            </p>
            <div className="summary-row">
              <span>Total Advanced</span>
              <span>
                ₹{summary?.totalAdvanced?.toLocaleString("en-IN") || 0}
              </span>
            </div>
            <div className="summary-row">
              <span>Total Invoices</span>
              <span>{summary?.totalInvoices || 0}</span>
            </div>
            <div className="status-breakdown">
              {summary?.statusBreakdown &&
                Object.entries(summary.statusBreakdown).map(
                  ([status, count]) => (
                    <div key={status} className="status-row">
                      <span className={`status-dot ${status.toLowerCase().replace(" ", "-")}`}></span>
                      <span>{status}</span>
                      <span>{count}</span>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>

        {/* Savings Banner */}
        {summary?.totalSavings > 0 && (
          <div className="savings-banner">
            <span className="banner-icon">💡</span>
            <div>
              <p className="banner-text">
                AarthFlow saved you{" "}
                <strong>
                  ₹{summary.totalSavings.toLocaleString("en-IN")}
                </strong>{" "}
                in loan interest this month.
              </p>
              <p className="banner-sub">
                At 20% p.a. bank rate vs AarthFlow advance fee.
              </p>
            </div>
            <button
              className="btn-primary"
              onClick={() => navigate("/invoices/upload")}
            >
              Upload More Invoices
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;