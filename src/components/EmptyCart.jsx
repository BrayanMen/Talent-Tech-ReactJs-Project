const EmptyCart = ({ onBrowseProducts }) => {
    return (
        <div className="empty-cart">
            <div className="empty-cart-container">
                <div className="empty-cart-content">
                    <h1 className="empty-cart-title">Su carrito está vacío</h1>
                    <p className="empty-cart-message">
                        Añade productos a tu carrito antes de proceder al pago.
                    </p>
                    <button onClick={onBrowseProducts} className="btn btn-primary">
                        Ver más productos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmptyCart;
