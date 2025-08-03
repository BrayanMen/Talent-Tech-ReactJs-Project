import { User } from 'lucide-react';

const CheckoutForm = ({ formData, onInputChange, onNext }) => {
    return (
        <div className="form-step">
            <h2 className="form-title">
                <User size={18} className="form-icon" /> Informacion de Compra
            </h2>

            <form className="form-content">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">
                            Nombre*
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={onInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName" className="form-label">
                            Apellido*
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={onInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Correo*
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={onInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">
                            Telefono*
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={onInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="address" className="form-label">
                        Dirección de la calle*
                    </label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={onInputChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="city" className="form-label">
                            Ciudad*
                        </label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            value={formData.city}
                            onChange={onInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state" className="form-label">
                            Estado/Provincia*
                        </label>
                        <input
                            id="state"
                            name="state"
                            type="text"
                            value={formData.state}
                            onChange={onInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="zipCode" className="form-label">
                            ZIP/Codigo Postal*
                        </label>
                        <input
                            id="zipCode"
                            name="zipCode"
                            type="text"
                            value={formData.zipCode}
                            onChange={onInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country" className="form-label">
                            Pais*
                        </label>
                        <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={onInputChange}
                            className="form-input"
                            required
                        >
                            <option value="">Selecciona el Pais</option>
                            <option value="AR">Argentina</option>
                            <option value="VE">Venezuela</option>
                            <option value="US">EEUU</option>
                            <option value="CA">Canada</option>
                            <option value="UK">Reino Unido</option>
                            <option value="AU">Australia</option>
                            <option value="DE">Alemania</option>
                            <option value="FR">Francia</option>
                            <option value="JP">Japon</option>
                        </select>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onNext} className="btn btn-primary btn-full">
                        Continuar con el pago
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
