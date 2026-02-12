// Navbar.jsx – Navigation Component with Logout
function Navbar({ activePage, onNavigate, currentUser, onLogout }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "⬡" },
    { id: "residents", label: "Residents", icon: "◈" },
    { id: "segments", label: "Segments", icon: "◉" },
    { id: "predictions", label: "ML Insights", icon: "◆" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">◈</span>
        <div className="brand-text">
          <span className="brand-title">IRPSS</span>
          <span className="brand-subtitle">Resident Intelligence</span>
        </div>
      </div>

      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className={`nav-btn ${activePage === item.id ? "nav-btn--active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="navbar-footer">
        <div className="user-badge">
          <span className="user-avatar">
            {currentUser?.name?.split(" ").map(n => n[0]).join("").slice(0, 2) || "BH"}
          </span>
          <div className="user-info">
            <span className="user-name">{currentUser?.name || "Barangay Hall"}</span>
            <span className="user-role">{currentUser?.role || "Admin"}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          Logout →
        </button>
      </div>
    </nav>
  );
}

export default Navbar;