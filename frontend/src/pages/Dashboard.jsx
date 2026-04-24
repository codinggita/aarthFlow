import "../styles/dashboard-layout.css";
import "../styles/dashboard-kpi.css";
import "../styles/dashboard-visualizer.css";
import "../styles/dashboard-table.css";
import "../styles/dashboard-financing.css";
import KPIStrip from "../components/dashboard/KPIStrip";
import PaymentVisualizer from "../components/dashboard/PaymentVisualizer";
import BuyerTable from "../components/dashboard/BuyerTable";
import FinancingOptions from "../components/dashboard/FinancingOptions";

const NAV_ITEMS = [
  "Overview",
  "Buyers",
  "Invoices",
  "Financing",
  "Analytics",
  "Settings",
];

export default function Dashboard() {
  return (
    <div className="dashboard-root">
      <aside className="dash-sidebar">
        <div className="dash-logo">AarthFlow</div>
        <nav className="dash-nav">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              className={`dash-nav-item ${item === "Overview" ? "active" : ""}`}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="dash-user">
          <div className="dash-avatar">PN</div>
          <div>
            <div className="dash-user-name">Prince Nayakpara</div>
            <div className="dash-user-role">CFO, AarthFlow</div>
          </div>
        </div>
      </aside>

      <main className="dash-main">
        <div className="dash-topbar">
          <div>
            <div className="dash-page-title">Overview</div>
            <div className="dash-page-sub">
              Working capital health &middot; April 2026
            </div>
          </div>
          <div className="dash-topbar-right">
            <span className="alert-badge">3 invoices at risk</span>
            <button className="btn-teal">Get Financing &rarr;</button>
          </div>
        </div>
        <KPIStrip />
        <PaymentVisualizer />
        <div className="dash-bottom-grid">
          <BuyerTable />
          <FinancingOptions />
        </div>
      </main>
    </div>
  );
}