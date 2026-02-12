// ResidentFormModal.jsx – Add/Edit Resident Form
import { useState } from "react";

function ResidentFormModal({ resident, onClose, onSave }) {
  const isEditing = !!resident;
  
  const [formData, setFormData] = useState(resident || {
    name: "",
    age: "",
    sex: "Male",
    purok: "Purok 1",
    role: "Household Head",
    occupation: "",
    income: "",
    segment: "Middle-Income Professionals",
    engagementScore: 50,
    vulnerabilityScore: 50,
    riskLevel: "Low"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert string numbers to integers
    const processedData = {
      ...formData,
      age: parseInt(formData.age),
      income: parseInt(formData.income),
      engagementScore: parseInt(formData.engagementScore),
      vulnerabilityScore: parseInt(formData.vulnerabilityScore)
    };
    
    onSave(processedData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="form-modal-header">
          <h2 className="form-modal-title">
            {isEditing ? "Edit Resident Profile" : "Add New Resident"}
          </h2>
          <p className="form-modal-subtitle">
            {isEditing ? "Update resident information" : "Enter resident details"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-modal-content">
            {/* Personal Information */}
            <h3 className="modal-section-title">
              <span className="modal-section-icon">◈</span>
              Personal Information
            </h3>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Juan Dela Cruz"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Age *</label>
                <input
                  type="number"
                  name="age"
                  className="form-input"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="25"
                  min="1"
                  max="120"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Sex *</label>
                <select
                  name="sex"
                  className="form-input"
                  value={formData.sex}
                  onChange={handleChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Purok *</label>
                <select
                  name="purok"
                  className="form-input"
                  value={formData.purok}
                  onChange={handleChange}
                  required
                >
                  <option value="Purok 1">Purok 1</option>
                  <option value="Purok 2">Purok 2</option>
                  <option value="Purok 3">Purok 3</option>
                  <option value="Purok 4">Purok 4</option>
                  <option value="Purok 5">Purok 5</option>
                </select>
              </div>
            </div>

            {/* Household Information */}
            <h3 className="modal-section-title" style={{ marginTop: "32px" }}>
              <span className="modal-section-icon">🏠</span>
              Household & Economic Data
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Household Role *</label>
                <select
                  name="role"
                  className="form-input"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="Household Head">Household Head</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Senior Citizen">Senior Citizen</option>
                  <option value="Youth">Youth</option>
                  <option value="Single Parent">Single Parent</option>
                  <option value="Community Leader">Community Leader</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Occupation *</label>
                <input
                  type="text"
                  name="occupation"
                  className="form-input"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Driver, Vendor, Student, etc."
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Monthly Income (₱) *</label>
                <input
                  type="number"
                  name="income"
                  className="form-input"
                  value={formData.income}
                  onChange={handleChange}
                  placeholder="15000"
                  min="0"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Segment Classification *</label>
                <select
                  name="segment"
                  className="form-input"
                  value={formData.segment}
                  onChange={handleChange}
                  required
                >
                  <option value="Middle-Income Professionals">Middle-Income Professionals</option>
                  <option value="Elderly High-Risk">Elderly High-Risk</option>
                  <option value="Young Families Needing Support">Young Families Needing Support</option>
                  <option value="At-Risk Youth">At-Risk Youth</option>
                  <option value="Active Community Members">Active Community Members</option>
                  <option value="Near-Poor Households">Near-Poor Households</option>
                </select>
              </div>
            </div>

            {/* AI Scores */}
            <h3 className="modal-section-title" style={{ marginTop: "32px" }}>
              <span className="modal-section-icon">◆</span>
              AI Assessment Scores
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Engagement Score (0-100)</label>
                <input
                  type="number"
                  name="engagementScore"
                  className="form-input"
                  value={formData.engagementScore}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Vulnerability Score (0-100)</label>
                <input
                  type="number"
                  name="vulnerabilityScore"
                  className="form-input"
                  value={formData.vulnerabilityScore}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Risk Level *</label>
                <select
                  name="riskLevel"
                  className="form-input"
                  value={formData.riskLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {isEditing ? "💾 Update Resident" : "➕ Add Resident"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResidentFormModal;