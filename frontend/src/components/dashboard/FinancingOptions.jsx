import "../../styles/dashboard-financing.css";

const OPTIONS = [
  {
    title: "Invoice Discounting",
    rate: "1.2%",
    period: "per month",
    available: "38.4L",
    approval: "Instant",
    badge: "Best Rate",
    badgeColor: "teal",
    borderColor: "teal-border",
  },
  {
    title: "Supply Chain Finance",
    rate: "1.5%",
    period: "per month",
    available: "43.2L",
    approval: "24 hours",
    badge: "Most Popular",
    badgeColor: "blue",
    borderColor: "blue-border",
  },
  {
    title: "Working Capital Loan",
    rate: "1.8%",
    period: "per month",
    available: "50L",
    approval: "2-3 days",
    badge: "Highest Limit",
    badgeColor: "amber",
    borderColor: "amber-border",
  },
];

export default function FinancingOptions() {
  return (
    <div className="dash-card">
      <div className="dash-card-title">Instant Financing Options</div>
      <div className="dash-card-sub">Based on your confirmed invoices</div>
      <div className="financing-list">
        {OPTIONS.map((opt) => (
          <div key={opt.title} className={`financing-item ${opt.borderColor}`}>
            <div className="financing-top">
              <div className="financing-title">{opt.title}</div>
              <span className={`fin-badge ${opt.badgeColor}`}>
                {opt.badge}
              </span>
            </div>
            <div className="financing-rate">
              {opt.rate}
              <span>{opt.period}</span>
            </div>
            <div className="financing-meta">
              <div>
                Available: <strong>{opt.available}</strong>
              </div>
              <div>
                Approval: <strong>{opt.approval}</strong>
              </div>
            </div>
            <button className="apply-btn">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
