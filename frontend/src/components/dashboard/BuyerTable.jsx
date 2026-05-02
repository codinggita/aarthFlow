import "../../styles/dashboard-table.css";

const BUYERS = [
  {
    name: "Reliance Industries",
    invoice: "18L",
    terms: "NET 82",
    delay: "+12 days",
    risk: "HIGH",
  },
  {
    name: "Tata Consultancy",
    invoice: "9.4L",
    terms: "NET 67",
    delay: "+4 days",
    risk: "MEDIUM",
  },
  {
    name: "Infosys Ltd",
    invoice: "15.8L",
    terms: "NET 90",
    delay: "+21 days",
    risk: "HIGH",
  },
];

function riskClass(risk) {
  if (risk === "HIGH") return "high";
  if (risk === "MEDIUM") return "medium";
  return "low";
}

export default function BuyerTable() {
  return (
    <div className="dash-card">
      <div className="dash-card-title">Buyer Payment Behavior</div>
      <div className="dash-card-sub">Tracked payment patterns from buyers</div>
      <table className="buyer-table">
        <thead>
          <tr>
            <th>Buyer</th>
            <th>Invoice</th>
            <th>Terms</th>
            <th>Avg Delay</th>
            <th>Risk</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {BUYERS.map((b) => (
            <tr key={b.name}>
              <td>{b.name}</td>
              <td className="mono">{b.invoice}</td>
              <td className="mono">{b.terms}</td>
              <td className="danger-text">{b.delay}</td>
              <td>
                <span className={`risk-pill ${riskClass(b.risk)}`}>
                  {b.risk}
                </span>
              </td>
              <td>
                <button className="finance-btn">Finance Now</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
