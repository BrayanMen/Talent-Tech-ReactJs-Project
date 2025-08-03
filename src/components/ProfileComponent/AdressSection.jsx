import { MapPin } from "lucide-react";

export const AddressSection = ({ formData, handleInputChange, isEditing }) => (
  <div className="form-section">
    <h3 className="section-title">
      <MapPin size={18} className="section-icon" /> Dirección
    </h3>
    
    <div className="form-grid">
      <div className="form-group-full">
        <label htmlFor="street" className="form-label">
          Calle
        </label>
        <input
          id="street"
          name="address.street"
          type="text"
          value={formData.address.street}
          onChange={handleInputChange}
          className="form-input"
          disabled={!isEditing}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="city" className="form-label">
          Ciudad
        </label>
        <input
          id="city"
          name="address.city"
          type="text"
          value={formData.address.city}
          onChange={handleInputChange}
          className="form-input"
          disabled={!isEditing}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="state" className="form-label">
          Estado o Provincia
        </label>
        <input
          id="state"
          name="address.state"
          type="text"
          value={formData.address.state}
          onChange={handleInputChange}
          className="form-input"
          disabled={!isEditing}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="zipCode" className="form-label">
          Zip/Codigo Postal
        </label>
        <input
          id="zipCode"
          name="address.zipCode"
          type="text"
          value={formData.address.zipCode}
          onChange={handleInputChange}
          className="form-input"
          disabled={!isEditing}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="country" className="form-label">
          Pais
        </label>
        <input
          id="country"
          name="address.country"
          type="text"
          value={formData.address.country}
          onChange={handleInputChange}
          className="form-input"
          disabled={!isEditing}
        />
      </div>
    </div>
  </div>
);