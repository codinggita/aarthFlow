import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/landing/Hero";
import Metrics from "../components/landing/Metrics";
import Features from "../components/landing/Features";
import Pathway from "../components/landing/Pathway";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";
import "../styles/tokens.css";
import "../styles/navbar.css";
import "../styles/hero.css";
import "../styles/sections.css";
import "../styles/logo-wall.css";
import "../styles/landing-metrics.css";
import "../styles/landing-features.css";
import "../styles/landing-pathway.css";
import "../styles/landing-cta.css";
import "../styles/footer.css";

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [pathwayProgress, setPathwayProgress] = useState(0);
  const pathwayRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = document.querySelectorAll("section");
      let currentTheme = "dark";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          if (section.classList.contains("features-section") || 
              section.classList.contains("split-cta-section")) {
            currentTheme = "light";
          }
        }
      });
      setIsLightTheme(currentTheme === "light");

      if (pathwayRef.current) {
        const rect = pathwayRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionTop = rect.top;
        const startTrigger = viewportHeight * 0.7;
        const endTrigger = viewportHeight * 0.3;
        const totalDistance = startTrigger - endTrigger;
        const currentDistance = startTrigger - sectionTop;
        let progress = (currentDistance / totalDistance) * 100;
        setPathwayProgress(Math.max(0, Math.min(100, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
      });
    }, { threshold: 0.1 });

    document.querySelectorAll("section").forEach((s) => s.id && revealObserver.observe(s));
    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  const logos = ["INFOSYS", "HDFC BANK", "MAHINDRA", "ADANI ENT", "ICICI GROUP", "LARSEN & TOUBRO"];
  const liveStats = [
    "LIVE: ₹1.2 Cr advanced to Ankleshwar Cluster",
    "NEW: 14 Invoices verified in last 2 hours",
    "LIVE: ₹85L Liquidity unlocked for Vapi SME",
    "STATUS: RBI Compliant Node Online",
    "LIVE: 450+ Active Institutional Lenders"
  ];

  return (
    <div className="landing-root">
      <nav className={`navbar ${scrolled ? "scrolled" : ""} ${isLightTheme ? "light-theme" : ""}`}>
        <div className="navbar-inner">
          <Link to="/" className="nav-logo">AarthFlow</Link>
          <div className="nav-links">
            <a href="#features" className="nav-link">Product</a>
            <a href="#solutions" className="nav-link">Solutions</a>
            <a href="#developers" className="nav-link">Developers</a>
            <a href="#pricing" className="nav-link">Resources</a>
          </div>
          <Link to="/signup" className="btn btn-primary nav-btn">Get funded</Link>
        </div>
      </nav>

      <Hero liveStats={liveStats} />

      <section className="logo-wall-stripe">
        <div className="logo-wall-grid">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="logo-wall-item">{logo}</div>
          ))}
        </div>
      </section>

      <Metrics visibleSections={visibleSections} />
      <Features visibleSections={visibleSections} />
      <Pathway visibleSections={visibleSections} pathwayProgress={pathwayProgress} pathwayRef={pathwayRef} />
      <CTA visibleSections={visibleSections} />
      <Footer />
    </div>
  );
};

export default Landing;