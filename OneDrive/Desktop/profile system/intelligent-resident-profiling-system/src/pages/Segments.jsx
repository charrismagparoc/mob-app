// Segments.jsx — Resident Segmentation Page
import { useState } from "react";
import { segments, residents } from "../data/residents";
import InsightToggle from "../components/InsightToggle";

function Segments() {
  const [activeSegment, setActiveSegment] = useState(null);

  const segmentInsights = {
    "Elderly High-Risk": [
      "87 senior citizens identified — 34 live alone with no caregiver.",
      "Recommend monthly wellness visits and priority health program enrollment.",
      "Average vulnerability score: 78/100 — highest among all segments.",
    ],
    "Young Families Needing Support": [
      "213 families with young children — 45% are near-poor households.",
      "Livelihood training programs recommended for primary earners.",
      "School feeding program should be extended to cover all children in this segment.",
    ],
    "At-Risk Youth": [
      "96 youths aged 15-24 with declining engagement scores.",
      "Recommend SK livelihood and skills training outreach.",
      "12 flagged for potential school dropout — immediate intervention needed.",
    ],
    "Middle-Income Professionals": [
      "124 residents with stable income and high engagement.",
      "Good candidates for community volunteer programs.",
      "Likely to benefit from business permit streamlining initiatives.",
    ],
    "Active Community Members": [
      "65 residents with engagement score above 90.",
      "Key contacts for community programs and information dissemination.",
      "Recommend recognition programs to sustain engagement.",
    ],
    "Near-Poor Households": [
      "178 households just above the 4Ps threshold.",
      "Highly vulnerable to economic shocks — monitor closely.",
      "Prioritize for emergency cash assistance programs.",
    ],
  };

  return (
    <main className="page segments-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Resident Segments</h1>
          <p className="page-subtitle">ML-generated clusters · {segments.reduce((a, b) => a + b.count, 0)} residents classified</p>
        </div>
      </header>

      {/* Segments List with click-to-expand interaction (Task 3) */}
      <section className="segments-detail-list">
        {segments.map((seg) => {
          const isActive = activeSegment === seg.id;
          const insights = segmentInsights[seg.name] || [];
          // Residents in this segment
          const segResidents = residents.filter((r) => r.segment === seg.name);

          return (
            <div
              key={seg.id}
              className={`segment-detail-card ${isActive ? "segment-detail-card--active" : ""}`}
              style={{ "--seg-color": seg.color }}
            >
              <div
                className="segment-detail-header"
                onClick={() => setActiveSegment(isActive ? null : seg.id)}
              >
                <div className="seg-detail-left">
                  <span className="seg-circle" style={{ background: seg.color }} />
                  <div>
                    <h3 className="seg-detail-name">{seg.name}</h3>
                    <span className="seg-detail-meta">
                      {seg.count} residents · {seg.confidence}% confidence
                    </span>
                  </div>
                </div>
                <div className="seg-detail-right">
                  <div className="seg-conf-bar-wrap">
                    <div
                      className="seg-conf-bar"
                      style={{ width: `${seg.confidence}%`, background: seg.color }}
                    />
                  </div>
                  <span className="seg-expand-icon">{isActive ? "▲" : "▼"}</span>
                </div>
              </div>

              {/* Expandable content — visible UI change (Task 3) */}
              {isActive && (
                <div className="segment-detail-body">
                  {/* Residents in this segment */}
                  {segResidents.length > 0 && (
                    <div className="seg-residents-preview">
                      <p className="seg-residents-label">Residents in this segment:</p>
                      <div className="seg-residents-chips">
                        {segResidents.map((r) => (
                          <span key={r.id} className="resident-chip">
                            {r.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Insights for this segment */}
                  <InsightToggle
                    title="AI recommendations for this segment"
                    insights={insights}
                  />
                </div>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Segments;