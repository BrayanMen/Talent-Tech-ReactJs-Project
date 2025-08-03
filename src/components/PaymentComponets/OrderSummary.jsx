const OrderSummary = ({ cart, totalCart }) => {
    return (
        <div className="order-summary">
            <h2 className="summary-title">Resumen de Pedido</h2>

            <div className="cart-items">
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <div className="item-image">
                            <img src={item.images[0]} alt={item.name} className="item-img" />
                        </div>
                        <div className="item-info">
                            <h4 className="item-name">{item.name}</h4>
                            <p className="item-quantity">Cantidad: {item.quantity}</p>
                        </div>
                        <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                ))}
            </div>

            <div className="summary-totals">
                <div className="total-line">
                    <span className="total-label">Subtotal</span>
                    <span className="total-value">${totalCart.toFixed(2)}</span>
                </div>
                <div className="total-line">
                    <span className="total-label">Envio</span>
                    <span className="total-value">$4.99</span>
                </div>
                <div className="total-line">
                    <span className="total-label">IVA</span>
                    <span className="total-value">${(totalCart * 0.08).toFixed(2)}</span>
                </div>
                <div className="total-line total-final">
                    <span className="total-label">Total</span>
                    <span className="total-value total-amount">
                        ${(totalCart + 4.99 + totalCart * 0.08).toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
