import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="section-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="nav-logo">AarthFlow</Link>
            <p>Institutional-grade liquidity solutions for the Indian supply chain ecosystem. Licensed and regulated.</p>
            <div className="footer-socials">
              <span className="social-icon">𝕏</span>
              <span className="social-icon">in</span>
              <span className="social-icon">🌐</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Solutions</h4>
            <ul>
              <li><a href="#">Invoice Discounting</a></li>
              <li><a href="#">Vendor Financing</a></li>
              <li><a href="#">PO Treasury</a></li>
              <li><a href="#">Channel Financing</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">Analysis</a></li>
              <li><a href="#">Partner Banks</a></li>
              <li><a href="#">Trust & Security</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="newsletter-title">Newsletter</h4>
            <p className="newsletter-sub">Monthly insights into India's credit landscape.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Email address" />
              <button className="newsletter-btn">→</button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 AARTHFLOW TECHNOLOGIES PRIVATE LIMITED. ALL RIGHTS RESERVED.</p>
          <div className="footer-legal">
            <a href="#">PRIVACY POLICY</a>
            <a href="#">TERMS OF SERVICE</a>
            <a href="#">REGULATORY DISCLOSURES</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
