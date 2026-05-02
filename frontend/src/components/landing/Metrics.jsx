import { useState, useEffect } from "react";

const Counter = ({ value, trigger }) => {
  const [count, setCount] = useState(0);
  const isDecimal = value.includes('.');
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");

  useEffect(() => {
    if (trigger) {
      let start = 0;
      const end = numericValue;
      const duration = 2000;
      const step = end / (duration / 16);

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [trigger, numericValue]);

  const displayValue = isDecimal ? count.toFixed(1) : Math.floor(count);
  return <>{displayValue}{suffix}</>;
};

const Metrics = ({ visibleSections }) => {
  return (
    <section className="metrics-section" id="metrics">
      <div className="section-inner">
        <div className={`metrics-header reveal ${visibleSections.metrics ? 'visible' : ''}`}>
          <h2>The backbone of <br />Indian MSME growth</h2>
        </div>
        <div className={`metrics-grid reveal ${visibleSections.metrics ? 'visible' : ''}`}>
          <div className="metric-item">
            <h3><Counter value="₹20L Cr" trigger={visibleSections.metrics} /></h3>
            <p>total liquidity pool across partner banks</p>
          </div>
          <div className="metric-item">
            <h3><Counter value="450+" trigger={visibleSections.metrics} /></h3>
            <p>institutional lending partners active today</p>
          </div>
          <div className="metric-item">
            <h3><Counter value="1.2%" trigger={visibleSections.metrics} /></h3>
            <p>market leading advance rate for A-grade buyers</p>
          </div>
          <div className="metric-item">
            <h3>Zero</h3>
            <p>hidden fees or collateral requirements</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Metrics;
