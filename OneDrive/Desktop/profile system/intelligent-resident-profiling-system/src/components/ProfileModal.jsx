// ProfileModal.jsx – 360° Resident Profile View with Tabs & History
import { useState } from "react";

function ProfileModal({ resident, onClose, onEdit, onDelete }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "demographics", label: "Demographics" },
    { id: "economic", label: "Economic Data" },
    { id: "programs", label: "Programs & Benefits" },
    { id: "analytics", label: "AI Analytics" },
    { id: "history", label: "Activity History" }
  ];

  // Simulated activity history
  const activityHistory = [
    {
      date: "Feb 10, 2026",
      title: "Profile Updated",
      description: "Income information updated from ₱14,000 to ₱15,000"
    },
    {
      date: "Feb 5, 2026",
      title: "Program Enrollment",
      description: "Enrolled in Livelihood Training Program"
    },
    {
      date: "Jan 28, 2026",
      title: "Assistance Claimed",
      description: "Received financial assistance for education (₱5,000)"
    },
    {
      date: "Jan 15, 2026",
      title: "Health Check",
      description: "Annual health screening completed at Barangay Health Center"
    },
    {
      date: "Dec 20, 2025",
      title: "Document Request",
      description: "Barangay clearance issued"
    },
    {
      date: "Dec 1, 2025",
      title: "Community Event",
      description: "Participated in Barangay Clean-up Drive"
    }
  ];

  // Simulated programs & benefits
  const programs = [
    { name: "4Ps (Pantawid Pamilyang Pilipino Program)", status: "Active", since: "2023" },
    { name: "Senior Citizen Benefits", status: "Eligible", since: "2024" },
    { name: "PhilHealth", status: "Active", since: "2020" },
    { name: "DSWD Assistance", status: "Eligible", since: "2023" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="modal-section">
            <h3 className="modal-section-title">
              <span className="modal-section-icon">◈</span>
              Basic Information
            </h3>
            <div className="modal-grid">
              <div className="modal-field">
                <span className="mf-label">Full Name</span>
                <span className="mf-value">{resident.name}</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Age</span>
                <span className="mf-value">{resident.age} years old</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Sex</span>
                <span className="mf-value">{resident.sex}</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Civil Status</span>
                <span className="mf-value">Married</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Purok</span>
                <span className="mf-value">{resident.purok}</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Household Role</span>
                <span className="mf-value">{resident.role}</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Occupation</span>
                <span className="mf-value">{resident.occupation}</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Monthly Income</span>
                <span className="mf-value">₱{resident.income.toLocaleString()}</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Contact Number</span>
                <span className="mf-value">0912-345-6789</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Email Address</span>
                <span className="mf-value">resident@email.com</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Last Interaction</span>
                <span className="mf-value">{resident.lastInteraction}</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Status</span>
                <span className={`mf-value ${resident.status === "Active" ? "status--active" : "status--followup"}`}>
                  {resident.status}
                </span>
              </div>
            </div>
          </div>
        );

      case "demographics":
        return (
          <div className="modal-section">
            <h3 className="modal-section-title">
              <span className="modal-section-icon">👥</span>
              Household & Family Information
            </h3>
            <div className="modal-grid">
              <div className="modal-field">
                <span className="mf-label">Household Size</span>
                <span className="mf-value">5 members</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Number of Children</span>
                <span className="mf-value">3 children</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Children in School</span>
                <span className="mf-value">2 students</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Elderly Members</span>
                <span className="mf-value">1 senior citizen</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">PWD Members</span>
                <span className="mf-value">None</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Working Members</span>
                <span className="mf-value">2 members</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Housing Type</span>
                <span className="mf-value">Owned House & Lot</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Residential Years</span>
                <span className="mf-value">15 years</span>
              </div>
            </div>
          </div>
        );

      case "economic":
        return (
          <div className="modal-section">
            <h3 className="modal-section-title">
              <span className="modal-section-icon">💰</span>
              Economic Profile
            </h3>
            <div className="modal-grid">
              <div className="modal-field">
                <span className="mf-label">Primary Income Source</span>
                <span className="mf-value">{resident.occupation}</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Monthly Household Income</span>
                <span className="mf-value">₱{resident.income.toLocaleString()}</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Secondary Income</span>
                <span className="mf-value">₱3,000 (Part-time)</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Income Classification</span>
                <span className="mf-value">Low Income</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Employment Status</span>
                <span className="mf-value">Employed</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Business Owned</span>
                <span className="mf-value">None</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Assets</span>
                <span className="mf-value">1 Motorcycle</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Outstanding Loans</span>
                <span className="mf-value">₱25,000</span>
              </div>
            </div>
          </div>
        );

      case "programs":
        return (
          <div className="modal-section">
            <h3 className="modal-section-title">
              <span className="modal-section-icon">📋</span>
              Government Programs & Benefits
            </h3>
            <div className="timeline">
              {programs.map((program, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-date">{program.since}</div>
                  <div className="timeline-content">
                    <div className="timeline-title">{program.name}</div>
                    <div className="timeline-desc">
                      Status: <strong>{program.status}</strong> · 
                      Enrolled since {program.since}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="modal-section">
            <h3 className="modal-section-title">
              <span className="modal-section-icon">◆</span>
              AI-Powered Analytics
            </h3>
            <div className="modal-grid">
              <div className="modal-field">
                <span className="mf-label">Segment Classification</span>
                <span className="mf-value">{resident.segment}</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Risk Level</span>
                <span className={`mf-value risk--${resident.riskLevel.toLowerCase()}`}>
                  {resident.riskLevel}
                </span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Engagement Score</span>
                <span className="mf-value">{resident.engagementScore}/100</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Vulnerability Score</span>
                <span className="mf-value">{resident.vulnerabilityScore}/100</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">ML Confidence</span>
                <span className="mf-value">89% High Confidence</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Predicted Needs</span>
                <span className="mf-value">Financial Assistance</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Program Fit Score</span>
                <span className="mf-value">85/100</span>
              </div>
              <div className="modal-field">
                <span className="mf-label">Community Participation</span>
                <span className="mf-value">Medium Activity</span>
              </div>
            </div>

            <h3 className="modal-section-title" style={{ marginTop: "32px" }}>
              <span className="modal-section-icon">💡</span>
              AI Recommendations
            </h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-title">Livelihood Training</div>
                  <div className="timeline-desc">
                    Recommend enrollment in upcoming skills training program to increase income potential.
                  </div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-title">Financial Literacy</div>
                  <div className="timeline-desc">
                    Based on spending patterns, financial management workshop would be beneficial.
                  </div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-title">Health Program</div>
                  <div className="timeline-desc">
                    Eligible for free health screening program next month.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "history":
        return (
          <div className="modal-section">
            <h3 className="modal-section-title">
              <span className="modal-section-icon">📅</span>
              Activity Timeline
            </h3>
            <div className="timeline">
              {activityHistory.map((activity, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-date">{activity.date}</div>
                  <div className="timeline-content">
                    <div className="timeline-title">{activity.title}</div>
                    <div className="timeline-desc">{activity.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <div className="modal-avatar">
            {resident.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <h2 className="modal-name">{resident.name}</h2>
          <p className="modal-segment">{resident.segment}</p>
        </div>

        <div className="modal-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "tab-btn--active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="modal-content">
          {renderTabContent()}
        </div>

        <div className="modal-actions">
          <button className="btn-edit" onClick={() => onEdit(resident)}>
            ✏️ Edit Profile
          </button>
          <button className="btn-history" onClick={() => setActiveTab("history")}>
            📅 View History
          </button>
          <button className="btn-delete" onClick={() => onDelete(resident.id)}>
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;