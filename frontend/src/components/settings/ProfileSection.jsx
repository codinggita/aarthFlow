const ProfileSection = () => (
  <section className="settings-section-card animate-fade-in">
    <div className="section-head-v2">
      <h3>Profile Information</h3>
      <button className="btn-save-v2">Save Changes</button>
    </div>
    <div className="profile-edit-grid">
      <div className="profile-avatar-upload">
        <div className="avatar-preview">AR</div>
        <button className="btn-change-photo">CHANGE PHOTO</button>
      </div>
      <div className="profile-form-grid">
        <div className="form-group-v3"><label>FULL NAME</label><input type="text" defaultValue="Alex Rivera" /></div>
        <div className="form-group-v3"><label>JOB TITLE</label><input type="text" defaultValue="Treasury Operations" /></div>
        <div className="form-group-v3"><label>EMAIL ADDRESS</label><input type="email" defaultValue="alex.rivera@aarthflow.finance" /></div>
        <div className="form-group-v3"><label>PHONE NUMBER</label><input type="tel" defaultValue="+91 98765 43210" /></div>
        <div className="form-group-v3"><label>DEPARTMENT</label><input type="text" defaultValue="Finance & Strategy" /></div>
        <div className="form-group-v3"><label>EMPLOYEE ID</label><input type="text" defaultValue="AF-2024-TRE-01" /></div>
      </div>
    </div>
  </section>
);

export default ProfileSection;
