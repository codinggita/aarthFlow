import "../../styles/dashboard-visualizer.css";

const RECEIVABLES = [
  { name: "Reliance Industries", days: 82, amount: "18L", label: "NET 82" },
  { name: "Tata Consultancy", days: 67, amount: "9.4L", label: "NET 67" },
  { name: "Infosys Ltd", days: 90, amount: "15.8L", label: "NET 90" },
];

const OBLIGATIONS = [
  { name: "Supplier A Payment", days: 28, amount: "7L", label: "DUE 28" },
  { name: "Supplier B Payment", days: 30, amount: "5.2L", label: "DUE 30" },
  { name: "Payroll", days: 30, amount: "3.8L", label: "DUE 30" },
];

const MAX_DAYS = 90;

function toPercent(days) {
  return ((days / MAX_DAYS) * 100).toFixed(1) + "%";
}

function BarRow({ item, type }) {
  const barClass = type === "receivable" ? "teal-bar" : "red-bar";
  return (
    <div className="bar-row">
      <div className="bar-name">{item.name}</div>
      <div className="bar-track">
        <div
          className={`bar ${barClass}`}
          style={{ width: toPercent(item.days) }}
        >
          <span className="bar-label">{item.label}</span>
        </div>
      </div>
      <div className="bar-amount">{item.amount}</div>
    </div>
  );
}

export default function PaymentVisualizer() {
  const gapLeft = toPercent(30);
  const gapWidth = ((82 - 30) / MAX_DAYS * 100).toFixed(1) + "%";
  const dayLineLeft = toPercent(30);

  return (
    <div className="visualizer-card">
      <div className="visualizer-header">
        <div>
          <div className="visualizer-title">Payment Gap Visualizer</div>
          <div className="visualizer-sub">
            Your receivables vs your obligations
          </div>
        </div>
        <div className="visualizer-legend">
          <div className="legend-item">
            <span className="legend-dot teal" />
            Receivables
          </div>
          <div className="legend-item">
            <span className="legend-dot red" />
            Obligations
          </div>
        </div>
      </div>

      <div className="visualizer-body">
        {/* Axis Labels */}
        <div className="axis-labels">
          <span>Day 0</span>
          <span>Day 15</span>
          <span>Day 30</span>
          <span>Day 45</span>
          <span>Day 60</span>
          <span>Day 75</span>
          <span>Day 90</span>
        </div>

        {/* Gap Zone Overlay */}
        <div
          className="gap-zone"
          style={{ left: gapLeft, width: gapWidth }}
        >
          <div className="gap-label">43.2L cash gap zone</div>
        </div>

        {/* Day 30 Vertical Line */}
        <div className="day-line" style={{ left: dayLineLeft }}>
          <div className="day-line-label">Your obligations due</div>
        </div>

        {/* Receivables Section */}
        <div className="bars-section">
          <div className="bars-section-label">Receivables</div>
          {RECEIVABLES.map((item) => (
            <BarRow key={item.name} item={item} type="receivable" />
          ))}
        </div>

        {/* Obligations Section */}
        <div className="bars-section">
          <div className="bars-section-label">Obligations</div>
          {OBLIGATIONS.map((item) => (
            <BarRow key={item.name} item={item} type="obligation" />
          ))}
        </div>
      </div>
    </div>
  );
}
