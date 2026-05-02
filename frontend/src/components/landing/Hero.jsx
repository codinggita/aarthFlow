import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = ({ liveStats }) => {
  return (
    <section className="hero" id="hero">
      <div className="hero-mesh"></div>
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="hero-title">
          Stop waiting 90 days <span className="gradient-text">to get paid.</span>
        </h1>
        <p className="hero-sub">
          AarthFlow provides instant liquidity for your outstanding B2B invoices. Bridge the working capital gap with institutional-grade financing powered by India's leading banks.
        </p>
        <div className="hero-actions">
          <Link to="/signup" className="btn btn-primary">Get Funded Now</Link>
          <a href="#features" className="btn btn-ghost-white">View Case Studies</a>
        </div>
      </motion.div>

      <motion.div 
        className="hero-analysis-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <div className="analysis-header">
          <div>
            <div className="analysis-title">Cash Flow Gap Analysis</div>
            <div className="analysis-sub">FY 2023-24 Q3 Revenue Projection</div>
          </div>
          <div className="analysis-badge">STRATEGIC</div>
        </div>
        
        <div className="analysis-row">
          <div className="row-label">
            <span>UNPAID INVOICES (RELIANCE/TATA/L&T)</span>
            <span>₹10,50,000</span>
          </div>
          <div className="bar-container">
            <motion.div className="bar-fill orange" initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1, delay: 0.8 }}></motion.div>
          </div>
        </div>

        <div className="analysis-row">
          <div className="row-label">
            <span>AARTHFLOW INSTANT LIQUIDITY AVAILABLE</span>
            <span>₹8,40,000</span>
          </div>
          <div className="bar-container">
            <motion.div className="bar-fill teal" initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 1, delay: 1.0 }}></motion.div>
          </div>
        </div>

        <div className="analysis-stats">
          <div className="stat-item">
            <h4>AVG APPROVAL</h4>
            <p>24 Hours</p>
          </div>
          <div className="stat-item">
            <h4>ADVANCE RATE</h4>
            <p>1.2% Flat</p>
          </div>
          <div className="stat-item">
            <h4>LIMIT INCREASE</h4>
            <p>₹4.2 Cr</p>
          </div>
        </div>
      </motion.div>

      <div className="hero-live-marquee">
        <div className="marquee-content">
          {[...liveStats, ...liveStats].map((stat, i) => (
            <span key={i} className="marquee-item">
              <span className="dot"></span> {stat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
