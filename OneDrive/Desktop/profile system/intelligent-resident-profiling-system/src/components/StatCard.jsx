// StatCard.jsx — Reusable Dashboard Stat Card Component (Task 1 - Reusable Component #2)
// Uses props: icon, label, value, change

function StatCard({ icon, label, value, change }) {
  const isPositive = change && change.startsWith("+");
  const isNegative = change && change.startsWith("-");

  return (
    <article className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-body">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
        {change && (
          <span
            className={`stat-change ${
              isPositive ? "stat-change--up" : isNegative ? "stat-change--down" : ""
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </article>
  );
}

export default StatCard;