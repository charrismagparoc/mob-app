// InsightToggle.jsx — Interactive ML Insight Toggle Component (Task 3 - UI Interaction)
// Uses props: title, insights

import { useState } from "react";

function InsightToggle({ title, insights }) {
  const [showInsights, setShowInsights] = useState(false);

  return (
    <section className="insight-toggle">
      <div className="insight-toggle-header">
        <div>
          <span className="insight-dot" />
          <span className="insight-title">{title}</span>
        </div>
        <button
          className={`toggle-btn ${showInsights ? "toggle-btn--active" : ""}`}
          onClick={() => setShowInsights(!showInsights)}
        >
          {showInsights ? "Hide Insights ↑" : "Show Insights ↓"}
        </button>
      </div>

      {showInsights && (
        <ul className="insights-list">
          {insights.map((insight, idx) => (
            <li key={idx} className="insight-item">
              <span className="insight-bullet">◆</span>
              {insight}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default InsightToggle;