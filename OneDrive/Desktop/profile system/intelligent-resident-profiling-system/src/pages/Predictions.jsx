// Predictions.jsx — ML Insights & Predictions Page
import PredictionCard from "../components/PredictionCard";
import InsightToggle from "../components/InsightToggle";
import { mlPredictions, residents } from "../data/residents";

function Predictions() {
  // Render ML predictions from an array (as shown in SLM Step 3)
  const anomalies = [
    { id: 1, label: "Duplicate Assistance Claims", result: "3 flagged", confidence: 94 },
    { id: 2, label: "Income-Benefit Mismatch", result: "2 flagged", confidence: 89 },
    { id: 3, label: "Inactive Enrollees", result: "7 flagged", confidence: 91 },
  ];

  const impactInsights = [
    "Residents who completed vocational training increased income by 35% on average.",
    "4Ps families with case management show 90% child school attendance vs 70% without.",
    "Elderly residents with assigned health workers visited clinic 2x more frequently.",
    "Barangay clearance average processing time reduced from 4 hrs to 1.5 hrs.",
  ];

  // Confidence styling based on score — SLM Step 5
  const getConfidenceLabel = (score) => {
    if (score >= 85) return { label: "High Confidence", cls: "confidence--high" };
    if (score >= 70) return { label: "Medium Confidence", cls: "confidence--medium" };
    return { label: "Low Confidence", cls: "confidence--low" };
  };

  return (
    <main className="page predictions-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">ML Insights</h1>
          <p className="page-subtitle">Simulated machine learning predictions · Data is frontend-only</p>
        </div>
        <span className="ml-badge">◆ ML Engine</span>
      </header>

      {/* Main Predictions */}
      <section className="section-block">
        <h2 className="section-title">
          <span className="section-icon">◆</span> Prediction Models
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

      {/* Resident Risk List — Array rendering (SLM Step 3) */}
      <section className="section-block">
        <h2 className="section-title">
          <span className="section-icon">◈</span> Resident Risk Assessment
        </h2>
        <div className="risk-table">
          <div className="risk-table-header">
            <span>Resident</span>
            <span>Segment</span>
            <span>Vulnerability</span>
            <span>Risk</span>
            <span>Confidence</span>
          </div>
          <ul className="risk-rows">
            {residents.map((r) => {
              const { label, cls } = getConfidenceLabel(r.engagementScore);
              return (
                <li key={r.id} className="risk-row">
                  <span className="risk-name">{r.name}</span>
                  <span className="risk-seg">{r.segment}</span>
                  <span className="risk-vuln">{r.vulnerabilityScore}/100</span>
                  <span className={`risk-level risk--${r.riskLevel.toLowerCase()}`}>
                    {r.riskLevel}
                  </span>
                  <span className={`risk-conf ${cls}`}>{label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Anomaly Detection */}
      <section className="section-block">
        <h2 className="section-title">
          <span className="section-icon">⬡</span> Anomaly Detection
        </h2>
        <div className="predictions-grid">
          {anomalies.map((item) => (
            <PredictionCard
              key={item.id}
              label={item.label}
              result={item.result}
              confidence={item.confidence}
              purok="System-wide"
            />
          ))}
        </div>
      </section>

      {/* Program Impact */}
      <section className="section-block">
        <h2 className="section-title">
          <span className="section-icon">◉</span> Program Impact Analysis
        </h2>
        <InsightToggle
          title="AI-measured program effectiveness"
          insights={impactInsights}
        />
      </section>
    </main>
  );
}

export default Predictions;