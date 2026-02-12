// ResidentCard.jsx — Reusable Resident Profile Card Component (Task 1 - Reusable Component #4)
// Uses props: resident, onViewProfile

function ResidentCard({ resident, onViewProfile }) {
  const getRiskClass = (risk) => {
    if (risk === "High") return "risk--high";
    if (risk === "Medium") return "risk--medium";
    return "risk--low";
  };

  const getStatusClass = (status) => {
    return status === "Active" ? "status--active" : "status--followup";
  };

  return (
    <article className="resident-card">
      <div className="resident-card-top">
        <div className="resident-avatar">
          {resident.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        <div className="resident-meta">
          <h3 className="resident-name">{resident.name}</h3>
          <span className="resident-detail">
            {resident.age}y · {resident.sex} · {resident.purok}
          </span>
          <span className={`resident-status ${getStatusClass(resident.status)}`}>
            {resident.status}
          </span>
        </div>
      </div>

      <div className="resident-scores">
        <div className="score-item">
          <span className="score-label">Engagement</span>
          <div className="score-bar-wrap">
            <div className="score-bar score-bar--engagement" style={{ width: `${resident.engagementScore}%` }} />
          </div>
          <span className="score-num">{resident.engagementScore}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Vulnerability</span>
          <div className="score-bar-wrap">
            <div className="score-bar score-bar--vulnerability" style={{ width: `${resident.vulnerabilityScore}%` }} />
          </div>
          <span className="score-num">{resident.vulnerabilityScore}</span>
        </div>
      </div>

      <div className="resident-card-footer">
        <span className="segment-tag">{resident.segment}</span>
        <span className={`risk-badge ${getRiskClass(resident.riskLevel)}`}>
          {resident.riskLevel} Risk
        </span>
      </div>

      <button className="view-profile-btn" onClick={() => onViewProfile(resident)}>
        View Profile →
      </button>
    </article>
  );
}

export default ResidentCard;