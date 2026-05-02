export const SignupStep1 = ({ formData, handleChange, handleVerifyGST, gstVerified, gstLoading, nextStep }) => (
  <div className="auth-form">
    <div className="form-group">
      <label>Business GST Number</label>
      <div className="input-with-action">
        <input type="text" name="gstNumber" placeholder="24AAAAA0000A1Z5" maxLength={15} value={formData.gstNumber} onChange={(e) => { handleChange(e); }} />
        {!gstVerified ? (
          <button type="button" className="inner-action" onClick={handleVerifyGST} disabled={gstLoading}>{gstLoading ? "..." : "Verify"}</button>
        ) : <span className="inner-success">✓ Verified</span>}
      </div>
    </div>
    <div className="form-group">
      <label>Business Registered Name</label>
      <input type="text" name="businessName" placeholder="Enterprise Name Private Limited" value={formData.businessName} onChange={handleChange} />
    </div>
    <div className="form-row-2">
      <div className="form-group"><label>Owner Name</label><input type="text" name="ownerName" placeholder="Full Name" value={formData.ownerName} onChange={handleChange} /></div>
      <div className="form-group"><label>Mobile</label><input type="tel" name="mobile" placeholder="10-digit" maxLength={10} value={formData.mobile} onChange={handleChange} /></div>
    </div>
    <div className="form-group"><label>Business Email</label><input type="email" name="email" placeholder="name@company.com" value={formData.email} onChange={handleChange} /></div>
    <div className="form-group"><label>Create Password</label><input type="password" name="password" placeholder="Min 6 characters" value={formData.password} onChange={handleChange} /></div>
    <button type="button" className="auth-btn-primary" onClick={nextStep}>Continue to Invoice Setup →</button>
  </div>
);
