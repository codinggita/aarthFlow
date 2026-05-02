import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import ReportCharts from "../components/reports/ReportCharts";
import ReportTable from "../components/reports/ReportTable";
import "../styles/reports.css";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const kpis = [
    { label: "TOTAL VOLUME", value: "$4.28M", delta: "+12.5% vs last period", type: "success", icon: "📊" },
    { label: "AVG YIELD (APR)", value: "14.2%", sub: "Across portfolio", type: "info", icon: "📈" },
    { label: "FUNDED INVOICES", value: "89", sub: "This period", type: "success", icon: "✓" },
    { label: "PORTFOLIO AT RISK", value: "$42.3K", sub: "0.98% of total", type: "danger", icon: "⚠️" },
  ];

  const headerActions = (
    <>
      <button className="btn-secondary">📅 Last 30 Days</button>
      <button className="btn-secondary">Schedule Report</button>
      <button className="btn-primary-v2">📥 Export Report</button>
    </>
  );

  return (
    <DashboardLayout 
      activePage="reports" 
      pageTitle="Reports" 
      pageSubtitle="Analytics and performance reporting across your institutional portfolio."
      headerActions={headerActions}
    >
      <div className="report-tabs-v2">
        {["Overview", "Cash Flow", "Customer Analysis", "Risk Report", "Custom"].map(tab => (
          <button key={tab} className={`report-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className="report-kpi-grid">
        {kpis.map((kpi, i) => (
          <div key={i} className="r-kpi-card">
            <div className="r-kpi-head">
              <span className="r-label">{kpi.label}</span>
              <div className={`r-icon-wrap ${kpi.type}`}>{kpi.icon}</div>
            </div>
            <h3 className="r-value">{kpi.value}</h3>
            <p className={`r-sub ${kpi.type}`}>{kpi.delta || kpi.sub}</p>
          </div>
        ))}
      </div>

      <ReportCharts />

      <div className="report-stats-row">
        <div className="small-stat-card">
          <span className="s-label">AVG PROCESSING TIME</span>
          <div className="s-value-row">
            <h3 className="s-value">31.4 <small>hrs</small></h3>
            <span className="s-delta success">-4.2 hrs from last month</span>
          </div>
          <div className="s-bar-chart">
            {[20, 35, 30, 45, 60, 55].map((h, i) => <div key={i} className="s-bar" style={{height: `${h}%`}}></div>)}
          </div>
          <div className="s-benchmark">INDUSTRY BENCHMARK <span>48.0 hrs</span></div>
        </div>

        <div className="small-stat-card">
          <span className="s-label">FEE REVENUE</span>
          <h3 className="s-value">$86,400</h3>
          <div className="revenue-breakdown">
            <div className="rev-row"><span>80% ADVANCE REVENUE</span> <strong>$52,100</strong></div>
            <div className="rev-line"><div className="fill" style={{width: '65%'}}></div></div>
            <div className="rev-row"><span>90% ADVANCE REVENUE</span> <strong>$24,300</strong></div>
            <div className="rev-line"><div className="fill" style={{width: '25%'}}></div></div>
            <div className="rev-row"><span>100% ADVANCE REVENUE</span> <strong>$10,000</strong></div>
            <div className="rev-line"><div className="fill" style={{width: '10%'}}></div></div>
          </div>
        </div>
      </div>

      <ReportTable />
    </DashboardLayout>
  );
};

export default Reports;
