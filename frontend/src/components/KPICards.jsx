import "../styles/Dashboard.css";

const KPICards = ({ stats }) => {
  const cards = [
    {
      label: "Available Credit Limit",
      value: `₹${stats.creditLimit?.toLocaleString("en-IN") || 0}`,
      sub: "Based on invoice history",
      trend: "Updated today",
      accent: "teal",
    },
    {
      label: "Pending Invoices",
      value: stats.pendingCount || 0,
      sub: "Awaiting buyer confirmation",
      trend: `${stats.underReviewCount || 0} under review`,
      accent: "amber",
    },
    {
      label: "Funded This Month",
      value: `₹${stats.totalFunded?.toLocaleString("en-IN") || 0}`,
      sub: `Across ${stats.fundedCount || 0} invoices`,
      trend: "Total funded",
      accent: "green",
    },
    {
      label: "Avg. Advance Rate",
      value: `${stats.avgAdvanceRate || 0}%`,
      sub: "Last 90 days",
      trend: "FlowPay fee",
      accent: "white",
    },
  ];

  return (
    <div className="kpi-grid">
      {cards.map((card, index) => (
        <div key={index} className={`kpi-card accent-${card.accent}`}>
          <p className="kpi-label">{card.label}</p>
          <h2 className="kpi-value">{card.value}</h2>
          <p className="kpi-sub">{card.sub}</p>
          <p className="kpi-trend">{card.trend}</p>
        </div>
      ))}
    </div>
  );
};

export default KPICards;