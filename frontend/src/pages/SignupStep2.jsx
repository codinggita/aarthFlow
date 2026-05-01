import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBuyer, getBuyers } from "../utils/api";
import "../styles/Signup.css";

const SUGGESTED_BUYERS = [
  { name: "Tata Motors Ltd", eligible: "TReDS Eligible" },
  { name: "Mahindra & Mahindra", eligible: "TReDS Eligible" },
  { name: "Infosys Ltd", eligible: "Direct Network" },
  { name: "L&T Construction", eligible: "TReDS Eligible" },
  { name: "Reliance Industries", eligible: "Direct Network" },
  { name: "HUL", eligible: "TReDS Eligible" },
];

const SignupStep2 = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [addedBuyers, setAddedBuyers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const filtered = SUGGESTED_BUYERS.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) &&
      !addedBuyers.find((a) => a.name === b.name)
  );

  const handleAddBuyer = (buyer) => {
    setAddedBuyers([...addedBuyers, buyer]);
    setSearch("");
    setShowDropdown(false);
  };

  const handleRemoveBuyer = (name) => {
    setAddedBuyers(addedBuyers.filter((b) => b.name !== name));
  };

  const handleContinue = async () => {
    setFormError("");
    if (addedBuyers.length === 0) {
      return setFormError("Add at least one buyer to continue");
    }

    setLoading(true);
    try {
      for (const buyer of addedBuyers) {
        await addBuyer({
          name: buyer.name,
          isTReDSEligible: buyer.eligible === "TReDS Eligible",
          paymentTermsDays: 60,
          riskLevel: "Low",
        });
      }
      navigate("/signup/step3");
    } catch (err) {
      setFormError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="signup-page">
      {/* Left Panel */}
      <div className="signup-left">
        <div className="signup-logo">AarthFlow</div>
        <p className="signup-tagline">
          Add the large corporates you invoice regularly
        </p>
      </div>

      {/* Right Panel */}
      <div className="signup-right">
        {/* Step Indicator */}
        <div className="step-indicator">
          <div className="step done">
            <span className="step-circle">✓</span>
            <span className="step-label">Business Info</span>
          </div>
          <div className="step-line filled"></div>
          <div className="step active">
            <span className="step-circle">2</span>
            <span className="step-label">Invoice Setup</span>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <span className="step-circle">3</span>
            <span className="step-label">Bank Details</span>
          </div>
        </div>

        <h2 className="signup-title">Who are your buyers?</h2>
        <p className="signup-subtitle">
          Add the large corporates you invoice — we'll verify eligibility
        </p>

        {formError && <p className="form-error">{formError}</p>}

        {/* Buyer Search */}
        <div className="buyer-search-wrap">
          <input
            type="text"
            placeholder="Search buyer name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
          />
          {showDropdown && search && filtered.length > 0 && (
            <div className="buyer-dropdown">
              {filtered.map((buyer) => (
                <div
                  key={buyer.name}
                  className="buyer-option"
                  onClick={() => handleAddBuyer(buyer)}
                >
                  <span>{buyer.name}</span>
                  <span
                    className={`badge ${
                      buyer.eligible === "TReDS Eligible"
                        ? "badge-teal"
                        : "badge-amber"
                    }`}
                  >
                    {buyer.eligible}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Added Buyers as chips */}
        <div className="buyer-chips">
          {addedBuyers.map((buyer) => (
            <div key={buyer.name} className="buyer-chip">
              {buyer.name}
              <span
                className="chip-remove"
                onClick={() => handleRemoveBuyer(buyer.name)}
              >
                ×
              </span>
            </div>
          ))}
        </div>

        <div className="signup-actions">
          <button
            className="btn-ghost"
            onClick={() => navigate("/signup")}
          >
            ← Back
          </button>
          <button
            className="btn-primary"
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? "Saving..." : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupStep2;