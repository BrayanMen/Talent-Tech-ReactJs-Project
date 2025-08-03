import { CreditCard, Truck } from 'lucide-react';

const PaymentForm = ({ formData, onInputChange, onSubmit, onPrevious, isProcessing }) => {
    return (
        <div className="form-step">
            <h2 className="form-title">
                <CreditCard size={18} className="form-icon" /> Detalles de Pago
            </h2>

            <form onSubmit={onSubmit} className="form-content">
                <div className="form-group">
                    <label htmlFor="cardName" className="form-label">
                        Nombre de Tarjeta*
                    </label>
                    <input
                        id="cardName"
                        name="cardName"
                        type="text"
                        value={formData.cardName}
                        onChange={onInputChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cardNumber" className="form-label">
                        Numero de Tarjeta*
                    </label>
                    <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        value={formData.cardNumber}
                        onChange={onInputChange}
                        className="form-input"
                        placeholder="1234 5678 9012 3456"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="cardExpiry" className="form-label">
                            Fecha de Expiracion*
                        </label>
                        <input
                            id="cardExpiry"
                            name="cardExpiry"
                            type="text"
                            value={formData.cardExpiry}
                            onChange={onInputChange}
                            className="form-input"
                            placeholder="MM/YY"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardCVV" className="form-label">
                            Codigo de Seguridad (CVV)*
                        </label>
                        <input
                            id="cardCVV"
                            name="cardCVV"
                            type="text"
                            value={formData.cardCVV}
                            onChange={onInputChange}
                            className="form-input"
                            placeholder="123"
                            maxLength={4}
                            required
                        />
                    </div>
                </div>

                <div className="shipping-section">
                    <h3 className="shipping-title">
                        <Truck size={18} className="form-icon" /> Metodo de Envio
                    </h3>

                    <div className="shipping-options">
                        <label className="shipping-option selected">
                            <input
                                type="radio"
                                name="shipping"
                                className="shipping-radio"
                                defaultChecked
                            />
                            <div className="shipping-info">
                                <p className="shipping-name">Envio Estandar</p>
                                <p className="shipping-time">3-5 días hábiles</p>
                            </div>
                            <span className="shipping-price">$4.99</span>
                        </label>

                        <label className="shipping-option">
                            <input type="radio" name="shipping" className="shipping-radio" />
                            <div className="shipping-info">
                                <p className="shipping-name">Envio Express</p>
                                <p className="shipping-time">1-2 días hábiles</p>
                            </div>
                            <span className="shipping-price">$12.99</span>
                        </label>
                    </div>
                </div>

                <div className="form-actions form-actions-row">
                    <button type="button" onClick={onPrevious} className="btn btn-outline btn-flex">
                        Atras
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary btn-flex"
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <>
                                <div className="loading-spinner"></div>
                                Procesando...
                            </>
                        ) : (
                            'Completar Pedido'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentForm;
