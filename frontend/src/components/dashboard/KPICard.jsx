const KPICard = ({ title, value, subtext, badge, icon, type }) => (
  <div className="kpi-card-v2">
    <div className="kpi-card-header">
      <div className={`kpi-icon-wrap ${type}`}>{icon}</div>
      {badge && <span className={`kpi-badge ${type}`}>{badge}</span>}
    </div>
    <div className="kpi-card-body">
      <p className="kpi-label">{title}</p>
      <h3 className="kpi-value">{value}</h3>
      <p className="kpi-subtext">{subtext}</p>
    </div>
  </div>
);

export default KPICard;
