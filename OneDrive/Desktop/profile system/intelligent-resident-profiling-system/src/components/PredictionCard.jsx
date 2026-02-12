// PredictionCard.jsx — Reusable ML Prediction Display Component (Task 1 - Reusable Component #3)
// Uses props: label, result, confidence, purok

function PredictionCard({ label, result, confidence, purok }) {
  const getConfidenceClass = (score) => {
    if (score >= 85) return "confidence--high";
    if (score >= 70) return "confidence--medium";
    return "confidence--low";
  };

  return (
    <section className="prediction-card">
      <div className="prediction-header">
        <span className="prediction-label">{label}</span>
        <span className="prediction-purok">{purok}</span>
      </div>
      <div className="prediction-result">{result}</div>
      <div className="prediction-footer">
        <span className="confidence-label">Confidence</span>
        <div className="confidence-bar-wrap">
          <div
            className="confidence-bar"
            style={{ width: `${confidence}%` }}
          />
        </div>
        <span className={`confidence-value ${getConfidenceClass(confidence)}`}>
          {confidence}%
        </span>
      </div>
    </section>
  );
}

export default PredictionCard;