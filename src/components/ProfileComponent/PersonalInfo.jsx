import { User } from "lucide-react";
import './PersonalInfo.css'

export const PersonalInfo = ({ formData, handleInputChange, isEditing }) => (
  <div className="form-section">
    <h3 className="section-title">
      <User size={18} className="section-icon" /> Informacion Personal
    </h3>
    
    <div className="form-grid">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nombre Completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          className="form-input"
          disabled={!isEditing}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Correo
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          className="form-input"
          disabled={true}
          required
        />
        <p className="form-help">Correo no puede ser modificado</p>
      </div>
    </div>
    
    <div className="form-group-full">
      <label htmlFor="avatar" className="form-label">
        Avatar
      </label>
      <input
        id="avatar"
        name="avatar"
        type="text"
        value={formData.avatar}
        onChange={handleInputChange}
        className="form-input"
        placeholder="https://example.com/avatar.png"
        disabled={!isEditing}
      />
    </div>
  </div>
);