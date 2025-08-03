import { Check } from 'lucide-react';

const OrderComplete = ({ email, onContinueShopping }) => {
    const orderNumber = `#TW${Math.floor(100000 + Math.random() * 900000)}`;

    return (
        <div className="order-complete">
            <div className="order-complete-container">
                <div className="order-complete-content">
                    <div className="success-icon">
                        <Check size={30} className="check-icon" />
                    </div>

                    <h1 className="complete-title">Pedido completo!</h1>
                    <p className="complete-message">
                        Gracias por su compra. Su pedido ha sido recibido y está siendo procesado.
                    </p>

                    <div className="order-number">
                        <p className="order-number-label">Numero de Pedido</p>
                        <p className="order-number-value">{orderNumber}</p>
                    </div>

                    <p className="confirmation-message">
                        Se ha enviado un correo electrónico de confirmación a {email}.
                    </p>

                    <button onClick={onContinueShopping} className="btn btn-primary btn-full">
                        Seguir comprando
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderComplete;
