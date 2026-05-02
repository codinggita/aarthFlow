const Pathway = ({ visibleSections, pathwayProgress, pathwayRef }) => {
  return (
    <section className="pathway-section" id="pathway" ref={pathwayRef}>
      <div className={`section-inner reveal ${visibleSections.pathway ? 'visible' : ''}`}>
        <div className="features-header">
          <h2>The Pathway to Liquidity</h2>
        </div>
        
        <div className="pathway-grid">
          <div className="pathway-progress-line">
            <div className="progress-fill" style={{ width: `${pathwayProgress}%` }}></div>
          </div>
          
          <div className={`pathway-item ${pathwayProgress > 10 ? 'active' : ''}`}>
            <div className="pathway-step">01</div>
            <h3>Sync ERP Data</h3>
            <p>Connect your accounting software or upload invoice batches directly through our API.</p>
          </div>
          <div className={`pathway-item ${pathwayProgress > 45 ? 'active' : ''}`}>
            <div className="pathway-step">02</div>
            <h3>Select Invoices</h3>
            <p>Choose which invoices to fund based on real-time pricing and your current cash needs.</p>
          </div>
          <div className={`pathway-item ${pathwayProgress > 80 ? 'active' : ''}`}>
            <div className="pathway-step">03</div>
            <h3>Instant Payout</h3>
            <p>Funds are transferred to your business account within 24 hours of invoice verification.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pathway;
