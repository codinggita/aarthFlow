const Features = ({ visibleSections }) => {
  return (
    <section className="features-section" id="features">
      <div className={`section-inner reveal ${visibleSections.features ? 'visible' : ''}`}>
        <div className="features-header">
          <span className="tag">PRODUCT ECOSYSTEM</span>
          <h2>Built for Enterprise Speed</h2>
          <p>Every feature is engineered to remove the friction between delivery and payment.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrap">⚡</div>
            <span className="feature-tag">FINANCING</span>
            <h3>Accept Payments Instantly</h3>
            <p>Turn your long-dated receivables into same-day cash. Our automated risk engine approves your invoices in seconds, not weeks.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">⚙️</div>
            <span className="feature-tag">OPERATIONS</span>
            <h3>Smart Automated Billing</h3>
            <p>Direct integration with ERPs like SAP and Oracle. Generate GST compliant invoices that are automatically tracked for financing eligibility.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">📊</div>
            <span className="feature-tag">REPORTING</span>
            <h3>Treasury Intelligence</h3>
            <p>Visualize your DSO (Days Sales Outstanding) and working capital cycle with mathematical precision through our proprietary dashboard.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">🛡️</div>
            <span className="feature-tag">GOVERNANCE</span>
            <h3>Institutional Governance</h3>
            <p>Built-in KYC/AML protocols that meet global standards. We handle the heavy lifting of compliance so your finance team doesn't have to.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
