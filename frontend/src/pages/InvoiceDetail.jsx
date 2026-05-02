import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard-layout.css";
import "../styles/invoice-detail.css";

const SidebarItem = ({ to, icon, label, active }) => (
  <Link to={to} className={`side-nav-item ${active ? 'active' : ''}`}>
    <span className="nav-icon">{icon}</span>
    <span className="nav-label">{label}</span>
  </Link>
);

const InvoiceDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="dash-container-v2">
      <aside className="sidebar-v2">
        <div className="sidebar-brand">
          <div className="brand-logo">AarthFlow</div>
          <p className="brand-sub">ENTERPRISE FINANCE</p>
        </div>
        <nav className="sidebar-nav">
          <SidebarItem to="/dashboard" icon="📊" label="Dashboard" />
          <SidebarItem to="/invoices" icon="📄" label="Invoices" active />
          <SidebarItem to="/financing" icon="🏛️" label="Financing" />
          <SidebarItem to="/customers" icon="👥" label="Customers" />
          <SidebarItem to="/reports" icon="📈" label="Reports" />
          <SidebarItem to="/settings" icon="⚙️" label="Settings" />
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-links-bottom">
            <Link to="/support">❓ Support</Link>
            <Link to="/settings">⚙️ Settings</Link>
          </div>
        </div>
      </aside>

      <div className="main-viewport">
        <header className="top-bar-v2">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search transactions, customers, or metrics..." />
          </div>
          <div className="top-bar-actions">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn" onClick={() => navigate("/settings")}>❓</button>
            <div className="user-profile-v2" onClick={() => navigate("/settings")} style={{ cursor: 'pointer' }}>
              <div className="user-text">
                <span className="user-name">{user?.ownerName || "Alex Rivera"}</span>
                <span className="user-role">INSTITUTIONAL ADMIN</span>
              </div>
              <div className="user-avatar-v2">AR</div>
            </div>
          </div>
        </header>

        <div className="content-body">
          <div className="breadcrumb-v2">
            <Link to="/invoices">Invoices</Link> <span>/</span> <strong>{id || "INV-84922"}</strong>
          </div>

          <div className="invoice-header-v2">
            <div className="h-left">
              <div className="inv-icon-large">📄</div>
              <div className="inv-title-wrap">
                <h2>{id || "INV-84922"}</h2>
                <p>Apex Ventures • Submitted: Jan 16, 2025 • Due: Mar 17, 2025</p>
                <div className="inv-tags">
                  <span className="tag-status pending">PENDING</span>
                  <span className="tag-label">Invoice Value</span>
                </div>
                <h3 className="inv-amount-v2">$158,000.00</h3>
              </div>
            </div>
            <div className="h-right">
              <button className="btn-secondary">✏️ Edit</button>
              <button className="btn-primary-v2">📥 Download PDF</button>
            </div>
          </div>

          <div className="invoice-tracker-v2">
            <div className="track-step completed">
              <div className="step-circle">✓</div>
              <span>Submitted</span>
            </div>
            <div className="track-line completed"></div>
            <div className="track-step completed">
              <div className="step-circle">✓</div>
              <span>Buyer Notified</span>
            </div>
            <div className="track-line active"></div>
            <div className="track-step active">
              <div className="step-circle ripple"></div>
              <span>Under Review</span>
            </div>
            <div className="track-line"></div>
            <div className="track-step disabled">
              <div className="step-circle"></div>
              <span>Funded</span>
            </div>
          </div>

          <div className="invoice-detail-grid">
            <div className="detail-main-col">
              <section className="detail-card">
                <div className="card-head-v2">
                  <h3>Invoice Details</h3>
                  <button className="btn-icon">ⓘ</button>
                </div>
                <div className="info-grid-v2">
                  <div className="info-item"><span>Invoice Number</span> <strong>{id || "INV-84922"}</strong></div>
                  <div className="info-item"><span>Counterparty</span> <strong className="text-primary">Apex Ventures LLC</strong></div>
                  <div className="info-item"><span>Buyer GST</span> <strong>27AAACT2727Q1ZW</strong></div>
                  <div className="info-item"><span>Total Amount</span> <strong>$158,000.00</strong></div>
                  <div className="info-item"><span>Issue Date</span> <strong>January 16, 2025</strong></div>
                  <div className="info-item"><span>Due Date</span> <strong>March 17, 2025 (60 Days)</strong></div>
                  <div className="info-sep"></div>
                  <div className="info-item"><span>Advance Rate</span> <strong className="text-success">100%</strong></div>
                  <div className="info-item"><span>Financing Fee</span> <strong>2.8% per annum</strong></div>
                </div>
              </section>

              <section className="detail-card">
                <h3>Activity Log</h3>
                <div className="activity-list-v2">
                  <div className="activity-item-v2">
                    <div className="a-dot active"></div>
                    <div className="a-content">
                      <strong>Invoice Under Review</strong>
                      <p>Institutional verification team is processing the collateral documents.</p>
                      <span>TODAY, 11:24 AM</span>
                    </div>
                  </div>
                  <div className="activity-item-v2">
                    <div className="a-dot"></div>
                    <div className="a-content">
                      <strong>Buyer Opened Invoice</strong>
                      <p>Apex Ventures accounts payable team viewed the invoice portal.</p>
                      <span>JAN 16, 03:45 PM</span>
                    </div>
                  </div>
                  <div className="activity-item-v2">
                    <div className="a-dot"></div>
                    <div className="a-content">
                      <strong>Buyer Notified</strong>
                      <p>Automated dispatch of notification to apex.ventures@ap.finance</p>
                      <span>JAN 16, 10:15 AM</span>
                    </div>
                  </div>
                  <div className="activity-item-v2">
                    <div className="a-dot"></div>
                    <div className="a-content">
                      <strong>Invoice Submitted</strong>
                      <p>Initial submission received via AarthFlow Dashboard.</p>
                      <span>JAN 16, 09:02 AM</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <aside className="detail-sidebar-col">
              <div className="payout-breakdown-card">
                <h3>PAYOUT BREAKDOWN</h3>
                <div className="p-list">
                  <div className="p-row"><span>Total Invoice Value</span> <strong>$158,000.00</strong></div>
                  <div className="p-row"><span>Financing Fee (2.8%)</span> <strong className="text-danger">-$4,424.00</strong></div>
                </div>
                <div className="p-total">
                  <span>NET PAYOUT</span>
                  <h2>$153,576.00</h2>
                </div>
                <div className="p-est">
                  <div className="est-icon">📅</div>
                  <div>
                    <span>Estimated Arrival</span>
                    <strong>January 18, 2025</strong>
                  </div>
                </div>
                <button className="btn-payout-action">Confirm & Receive →</button>
                <button className="btn-cancel-link">Cancel Invoice</button>
              </div>

              <div className="risk-card-mini">
                <div className="risk-head-v2">
                  <div>
                    <span>COUNTERPARTY RISK</span>
                    <h4>Apex Ventures</h4>
                  </div>
                  <div className="risk-badge-large">A+</div>
                </div>
                <div className="risk-meter-v2">
                  <div className="meter-head"><span>Reliability Score</span> <strong>94%</strong></div>
                  <div className="meter-bar"><div className="fill" style={{width: '94%'}}></div></div>
                </div>
                <div className="risk-metrics-v2">
                  <div className="rm-box"><span>PAYMENT HISTORY</span> <strong>Excellent</strong></div>
                  <div className="rm-box"><span>CREDIT RATING</span> <strong>AAA</strong></div>
                </div>
              </div>

              <div className="attachments-card">
                <div className="att-head">
                  <h3>Attached Documents</h3>
                  <button className="btn-link-sm">+ Attach</button>
                </div>
                <div className="att-list">
                  <div className="att-item">
                    <div className="att-icon">PDF</div>
                    <div className="att-info">
                      <strong>Invoice_APX_Jan2025.pdf</strong>
                      <span>2.4 MB • Jan 16, 2025</span>
                    </div>
                  </div>
                  <div className="att-item">
                    <div className="att-icon">PO</div>
                    <div className="att-info">
                      <strong>PO_Reference_4521.pdf</strong>
                      <span>1.1 MB • Jan 16, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;