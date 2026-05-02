export const SignupStep2 = ({ formData, handleChange, setStep, nextStep }) => (
  <div className="auth-form">
    <div className="form-group">
      <label>Average Monthly Revenue (₹)</label>
      <input type="text" name="avgMonthlyRevenue" placeholder="e.g. 50,00,000" value={formData.avgMonthlyRevenue} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Top 3 Buyers (Corporates)</label>
      <textarea name="topBuyers" placeholder="e.g. Reliance, Tata Motors" value={formData.topBuyers} onChange={handleChange} rows="3" className="auth-textarea" />
    </div>
    <div className="form-group">
      <label>Business Type</label>
      <select name="businessType" className="auth-select" value={formData.businessType} onChange={handleChange}>
        <option value="Manufacturer">Manufacturer</option>
        <option value="Trader">Trader</option>
        <option value="Service Provider">Service Provider</option>
      </select>
    </div>
    <div className="form-row-2">
      <button type="button" className="auth-btn-secondary" onClick={() => setStep(1)}>← Back</button>
      <button type="button" className="auth-btn-primary" onClick={nextStep}>Verify Bank Details →</button>
    </div>
  </div>
);

export const SignupStep3 = ({ formData, handleChange, setStep, handleSubmit, loading }) => (
  <div className="auth-form">
    <div className="form-group">
      <label>Business Bank Account Number</label>
      <input type="text" name="accountNumber" placeholder="000000000000" value={formData.accountNumber} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>IFSC Code</label>
      <input type="text" name="ifscCode" placeholder="SBIN0000000" value={formData.ifscCode} onChange={handleChange} />
    </div>
    <div className="bank-verification-notice"><p>We will send ₹1.00 to verify this account instantly.</p></div>
    <div className="form-row-2">
      <button type="button" className="auth-btn-secondary" onClick={() => setStep(2)}>← Back</button>
      <button type="button" className="auth-btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? "Verifying..." : "Complete Registration"}</button>
    </div>
  </div>
);
