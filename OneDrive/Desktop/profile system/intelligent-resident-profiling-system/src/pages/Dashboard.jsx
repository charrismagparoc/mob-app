// Dashboard.jsx — Main Dashboard Page
import StatCard from "../components/StatCard";
import PredictionCard from "../components/PredictionCard";
import InsightToggle from "../components/InsightToggle";
import { dashboardStats, mlPredictions, segments } from "../data/residents";

function Dashboard() {
  const systemInsights = [
    "47 residents in Purok 1-2 are predicted to need financial assistance next quarter.",
    "School dropout risk elevated for 12 youths in Purok 4 — recommend outreach.",
    "3 families flagged for anomalous assistance claims — review pending.",
    "4Ps beneficiaries with case management show 90% school attendance vs 70% without.",
  ];

  return (
    <main className="page dashboard-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Command Dashboard</h1>
          <p className="page-subtitle">Barangay Intelligence Overview · Feb 12, 2026</p>
        </div>
        <div className="header-badge">
          <span className="live-dot" />
          Live Data
        </div>
      </header>

      {/* Stat Cards Row */}
      <section className="stats-grid">
        {dashboardStats.map((stat, idx) => (
          <StatCard
            key={idx}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            change={stat.change}
          />
        ))}
      </section>

      {/* ML Predictions */}
      <section className="section-block">
        <h2 className="section-title">
          <span className="section-icon">◆</span> ML Predictions
        </h2>
        <div className="predictions-grid">
          {mlPredictions.map((pred) => (
            <PredictionCard
              key={pred.id}
              label={pred.label}
              result={pred.result}
              confidence={pred.confidence}
              purok={pred.purok}
            />
          ))}
        </div>
      </section>

      {/* Segment Overview */}
      <section className="section-block">
        <h2 className="section-title">
          <span className="section-icon">◉</span> Resident Segments
        </h2>
        <ul className="segments-list">
          {segments.map((seg) => (
            <li key={seg.id} className="segment-row">
              <span className="seg-dot" style={{ background: seg.color }} />
              <span className="seg-name">{seg.name}</span>
              <div className="seg-bar-wrap">
                <div
                  className="seg-bar"
                  style={{
                    width: `${(seg.count / 213) * 100}%`,
                    background: seg.color,
                  }}
                />
              </div>
              <span className="seg-count">{seg.count}</span>
              <span className="seg-conf">{seg.confidence}% conf.</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Interactive Insight Toggle — Task 3 interaction */}
      <section className="section-block">
        <h2 className="section-title">
          <span className="section-icon">◈</span> AI Recommendations
        </h2>
        <InsightToggle
          title="System-generated insights for this period"
          insights={systemInsights}
        />
      </section>
    </main>
  );
}

export default Dashboard;