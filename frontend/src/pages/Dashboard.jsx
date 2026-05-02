import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import KPICard from "../components/dashboard/KPICard";
import "../styles/dashboard-kpi.css";
import "../styles/dashboard-table.css";
import "../styles/dashboard-widgets.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-v2"></div>
      </div>
    );
  }

  const invoices = [
    { id: 'INV-84920', client: 'TechSystems Inc.', amount: '₹42,500.00', status: 'Funded', initial: 'TS' },
    { id: 'INV-84921', client: 'Global Media Co.', amount: '₹12,400.00', status: 'Review', initial: 'GM' },
    { id: 'INV-84922', client: 'Apex Ventures', amount: '₹158,000.00', status: 'Pending', initial: 'AV' },
    { id: 'INV-84923', client: 'Lunar Logistics', amount: '₹8,250.00', status: 'Funded', initial: 'LL' },
    { id: 'INV-84924', client: 'Nexus Core', amount: '₹22,100.00', status: 'Delayed', initial: 'NC' },
  ];

  const headerActions = (
    <>
      <button className="btn-secondary">📅 Last 30 Days</button>
      <button className="btn-secondary">📥 Export Report</button>
    </>
  );

  return (
    <DashboardLayout 
      activePage="dashboard" 
      pageTitle="Finance Overview" 
      pageSubtitle="Institutional dashboard for real-time invoice liquidity monitoring."
      headerActions={headerActions}
    >
      <div className="kpi-grid-v2">
        <KPICard title="TOTAL FUNDED" value="₹4.28M" subtext="v.s last month ₹3.81M" badge="+1.2%" icon="💵" type="success" />
        <KPICard title="PENDING VOLUME" value="₹842.0k" subtext="14 active applications" badge="IN REVIEW" icon="⏳" type="warning" />
        <KPICard title="YIELD (APR)" value="1.2%" subtext="Average across portfolio" badge="HEALTHY" icon="📈" type="info" />
        <KPICard title="EXPOSURE AT RISK" value="₹42.3k" subtext="3 past-due counterparties" badge="ATTENTION" icon="⚠️" type="danger" />
      </div>

      <div className="dashboard-main-grid">
        <div className="table-container-v2">
          <div className="table-header-v2">
            <h3>Recent Invoices</h3>
            <Link to="/invoices" className="view-all">View all invoices</Link>
          </div>
          <table className="invoices-table-v2">
            <thead>
              <tr>
                <th>COUNTERPARTY</th>
                <th>INVOICE #</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="counterparty-cell">
                    <div className="client-initial">{inv.initial}</div>
                    <span>{inv.client}</span>
                  </td>
                  <td className="id-cell">{inv.id}</td>
                  <td className="amount-cell">{inv.amount}</td>
                  <td>
                    <span className={`status-pill ${inv.status.toLowerCase()}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="action-cell">
                    <Link to={`/invoices/${inv.id}`}>View →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="widgets-column">
          <div className="widget-card portfolio-health">
            <p className="widget-label">PORTFOLIO HEALTH</p>
            <div className="health-value-row">
              <span className="health-value">98.2%</span>
              <span className="health-delta">+0.4%</span>
            </div>
            <p className="widget-sub">Your institutional liquidity ratio is currently exceeding target thresholds.</p>
            <div className="progress-bar-v2">
              <div className="progress-fill-v2" style={{ width: '98.2%' }}></div>
            </div>
          </div>

          <div className="widget-card insights-card">
            <div className="insight-header">
              <span className="insight-icon">📈</span>
              <h4>Market Insights</h4>
            </div>
            <ul className="insights-list">
              <li><strong>Yield Alert:</strong> SaaS receivables are currently trading at 4.2% premium above baseline.</li>
              <li><strong>Action:</strong> Liquidity pool #44 is now open for direct institutional participation.</li>
            </ul>
            <button className="btn-deep-dive">Deep Dive Analysis</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;