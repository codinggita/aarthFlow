export const BusinessSection = () => (
  <section className="settings-section-card animate-fade-in">
    <div className="section-head-v2">
      <h3>Business Information</h3>
      <p>Official registry details for compliance</p>
    </div>
    <div className="business-info-form">
      <div className="form-group-v3 full"><label>LEGAL BUSINESS NAME</label><input type="text" defaultValue="AarthFlow Finance Pvt. Ltd." /></div>
      <div className="form-row-v3">
        <div className="form-group-v3"><label>GSTIN</label><div className="verified-input"><input type="text" defaultValue="27AAACA1234A1Z5" /><span className="tag-verified">✓ VERIFIED</span></div></div>
        <div className="form-group-v3"><label>PAN</label><div className="verified-input"><input type="text" defaultValue="AAACA1234A" /><span className="tag-verified">✓ VERIFIED</span></div></div>
      </div>
      <div className="form-group-v3 full"><label>REGISTERED ADDRESS</label><textarea defaultValue="12th Floor, Sky Tower, BKC, Mumbai, Maharashtra 400051"></textarea></div>
    </div>
  </section>
);

export const SecuritySection = () => (
  <div className="settings-footer-grid animate-fade-in">
    <section className="settings-section-card mini">
      <div className="section-head-v2"><h3>Security & 2FA</h3><span className="tag-active-v2">ACTIVE</span></div>
      <button className="btn-action-wide">Change Password <span>›</span></button>
      <div className="active-sessions">
        <p className="session-label">ACTIVE SESSIONS</p>
        <div className="session-item"><span className="session-icon">💻</span><div><strong>MacBook Pro M2 • Mumbai</strong><span>Current Session</span></div></div>
      </div>
    </section>
    <section className="settings-section-card mini">
      <h3>Device Permissions</h3>
      <p className="sub-text">Manage hardware keys and biometric access.</p>
      <button className="btn-secondary">Setup FaceID / TouchID</button>
    </section>
  </div>
);
