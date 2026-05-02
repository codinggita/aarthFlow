import "../../styles/dashboard-kpi.css";

const DEFAULT_KPI_DATA = [
  {
    label: "Cash Gap Exposure",
    value: "43.2L",
    sub: "Next 30 days",
    type: "danger",
  },
  {
    label: "Avg Days Sales Outstanding",
    value: "78 days",
    sub: "Industry avg 45 days",
    type: "warning",
  },
  {
    label: "Invoices Confirmed",
    value: "1.2Cr",
    sub: "Eligible for financing",
    type: "success",
  },
  {
    label: "Active Buyer Relationships",
    value: "6 buyers",
    sub: "3 delayed payers",
    type: "info",
  },
];

export default function KPIStrip({ data = DEFAULT_KPI_DATA }) {
  return (
    <div className="kpi-strip">
      {data.map((kpi) => (
        <div key={kpi.label} className={`kpi-card ${kpi.type}`}>
          <div className="kpi-label">{kpi.label}</div>
          <div className={`kpi-value ${kpi.type}`}>{kpi.value}</div>
          <div className="kpi-sub">{kpi.sub}</div>
        </div>
      ))}
    </div>
  );
}
