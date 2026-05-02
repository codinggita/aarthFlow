import { Link } from "react-router-dom";

const CTA = ({ visibleSections }) => {
  return (
    <section className="split-cta-section" id="cta">
      <div className={`split-cta-inner reveal ${visibleSections.cta ? 'visible' : ''}`}>
        <div className="split-cta-content">
          <h2>Ready to accelerate your growth?</h2>
          <p>Join 18,000+ businesses using AarthFlow to unlock billions in trapped capital.</p>
          <div className="cta-btns">
            <Link to="/signup" className="btn btn-primary">Create Account</Link>
            <a href="#advisor" className="talk-link">Talk to an Advisor <span>→</span></a>
          </div>
        </div>
        <div className="split-cta-visual"></div>
      </div>
    </section>
  );
};

export default CTA;
