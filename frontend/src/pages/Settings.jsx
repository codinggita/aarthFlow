import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import ProfileSection from "../components/settings/ProfileSection";
import { BusinessSection, SecuritySection } from "../components/settings/SettingsSections";
import "../styles/settings.css";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("Profile");
  const sections = ["Profile", "Business Details", "Bank Accounts", "Notification Preferences", "Security & 2FA", "Team Members", "API Keys", "Billing"];

  const renderContent = () => {
    switch (activeSection) {
      case "Profile": return <ProfileSection />;
      case "Business Details": return <BusinessSection />;
      case "Security & 2FA": return <SecuritySection />;
      case "Bank Accounts":
        return (
          <section className="settings-section-card animate-fade-in">
            <div className="section-head-v2"><h3>Linked Bank Accounts</h3><button className="btn-add-bank">+ Add New Bank Account</button></div>
            <div className="bank-list-v2">
              <div className="bank-card-v2">
                <div className="bank-icon-v2">🏦</div>
                <div className="bank-details-v2"><strong>HDFC Bank •••• 4421</strong><span>PRIMARY DISBURSEMENT ACCOUNT</span></div>
                <span className="status-badge-v3">ACTIVE</span>
              </div>
            </div>
          </section>
        );
      case "Team Members":
        return (
          <section className="settings-section-card animate-fade-in">
            <div className="section-head-v2"><h3>Team Members</h3><button className="btn-invite-v2">INVITE +</button></div>
            <div className="team-list-v2">
              <div className="team-member-v2">
                <div className="tm-avatar">AR</div>
                <div className="tm-info"><strong>Alex Rivera</strong><span>Admin</span></div>
                <span className="tm-tag">YOU</span>
              </div>
            </div>
          </section>
        );
      default:
        return (
          <div className="settings-empty-state animate-fade-in">
            <div className="empty-icon">⚙️</div>
            <h3>{activeSection} Coming Soon</h3>
            <p>This module is currently being finalized for your enterprise tier.</p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout activePage="settings" pageTitle="Settings" pageSubtitle="Manage your account and preferences">
      <div className="settings-main-layout">
        <aside className="settings-nav">
          {sections.map(s => (
            <button key={s} className={`settings-nav-btn ${activeSection === s ? 'active' : ''}`} onClick={() => setActiveSection(s)}>
              {s}
            </button>
          ))}
        </aside>
        <div className="settings-content-pane">
          {renderContent()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
