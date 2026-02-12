// Residents.jsx – Resident Directory with CRUD Operations & 360° Profile View
import { useState } from "react";
import ResidentCard from "../components/ResidentCard";
import ProfileModal from "../components/ProfileModal";
import ResidentFormModal from "../components/ResidentFormModal";
import { residents as initialResidents } from "../data/residents";

function Residents() {
  const [residents, setResidents] = useState(initialResidents);
  const [search, setSearch] = useState("");
  const [filterRisk, setFilterRisk] = useState("All");
  const [selectedResident, setSelectedResident] = useState(null);
  const [editingResident, setEditingResident] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Filter residents based on search and risk filter
  const filtered = residents.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.purok.toLowerCase().includes(search.toLowerCase()) ||
      r.segment.toLowerCase().includes(search.toLowerCase());
    const matchRisk = filterRisk === "All" || r.riskLevel === filterRisk;
    return matchSearch && matchRisk;
  });

  // CRUD Operations
  const handleAddResident = (newResident) => {
    const resident = {
      ...newResident,
      id: Math.max(...residents.map(r => r.id)) + 1,
      status: "Active",
      lastInteraction: "Just now"
    };
    setResidents([...residents, resident]);
    setIsAddingNew(false);
  };

  const handleUpdateResident = (updatedResident) => {
    setResidents(residents.map(r => 
      r.id === updatedResident.id ? updatedResident : r
    ));
    setEditingResident(null);
    setSelectedResident(updatedResident);
  };

  const handleDeleteResident = (id) => {
    if (window.confirm("Are you sure you want to delete this resident? This action cannot be undone.")) {
      setResidents(residents.filter(r => r.id !== id));
      setSelectedResident(null);
    }
  };

  const handleEdit = (resident) => {
    setSelectedResident(null);
    setEditingResident(resident);
  };

  return (
    <main className="page residents-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Resident Directory</h1>
          <p className="page-subtitle">{residents.length} total residents · {filtered.length} shown</p>
        </div>
      </header>

      {/* Search & Filter */}
      <section className="search-bar-section">
        <input
          className="search-input"
          type="text"
          placeholder="Search by name, purok, or segment…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-group">
          {["All", "Low", "Medium", "High"].map((level) => (
            <button
              key={level}
              className={`filter-btn ${filterRisk === level ? "filter-btn--active" : ""}`}
              onClick={() => setFilterRisk(level)}
            >
              {level === "All" ? "All Risks" : `${level} Risk`}
            </button>
          ))}
        </div>
      </section>

      {/* Action Bar */}
      <div className="action-bar">
        <button className="btn btn-primary" onClick={() => setIsAddingNew(true)}>
          ➕ Add New Resident
        </button>
      </div>

      {/* Resident Cards Grid */}
      <section className="residents-grid">
        {filtered.length > 0 ? (
          filtered.map((resident) => (
            <ResidentCard
              key={resident.id}
              resident={resident}
              onViewProfile={setSelectedResident}
            />
          ))
        ) : (
          <div className="empty-state">
            <span className="empty-icon">◈</span>
            <p>No residents match your search.</p>
          </div>
        )}
      </section>

      {/* 360° Profile Modal */}
      {selectedResident && (
        <ProfileModal
          resident={selectedResident}
          onClose={() => setSelectedResident(null)}
          onEdit={handleEdit}
          onDelete={handleDeleteResident}
        />
      )}

      {/* Add/Edit Form Modal */}
      {(isAddingNew || editingResident) && (
        <ResidentFormModal
          resident={editingResident}
          onClose={() => {
            setIsAddingNew(false);
            setEditingResident(null);
          }}
          onSave={editingResident ? handleUpdateResident : handleAddResident}
        />
      )}
    </main>
  );
}

export default Residents;