import React from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash, X } from 'lucide-react';

export default function Cart() {
    const {
        addToCart,
        cart,
        isOpenCart,
        clearCart,
        removeItemCart,
        quantityUpdates,
        totalCart,
        itemCount,
        toggleCart,
    } = useCart();
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!isAuth) {
            toggleCart();
            return;
        }
        navigate('/checkout');
        toggleCart();
    };

    if (!isOpenCart) return null;

    return (
        <div className="cart_mask" role="dialog" aria-modal="true" aria-labelledby="cart">
            <div className="cart_backdrop" onClick={toggleCart} aria-label="Close cart"></div>

            <div className="cart_sidebar">
                <div className="cart_header">
                    <h2 className="cart_title">Tu carrito</h2>
                    <button className="cart_btn-close" onClick={toggleCart}>
                        <X size={30} />
                    </button>
                </div>

                {cart.length === 0 ? (
                    <div className="cart_empty">
                        <div>
                            <ShoppingBag size={30} />
                        </div>
                        <p>Tu carrito de compra esta Vacio</p>
                        <p>Agregar productos en tu carrito para verlos aqui</p>
                        <button onClick={toggleCart} className="btn btn-primary">
                            Continua tu compra
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart_content">
                            <div className="cart_items" role="list" aria-label="Cart items">
                                {cart.map(item => (
                                    <div key={item.id} className="cart_item">
                                        <img
                                            src={item.images[0]}
                                            alt={`${item.name} Product image`}
                                            className="cart_item-img"
                                        />
                                        <div className="cart_item-info">
                                            <div className="cart_item-detail">
                                                <h3 className="cart_item-title">{item.name}</h3>
                                                <p className="cart_item-price">
                                                    ${item.price.toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="cart_item-quantity">
                                                <button
                                                    className="btn-quantity"
                                                    onClick={() =>
                                                        quantityUpdates(
                                                            item.id,
                                                            (quantityUpdates[item.id] ||
                                                                item.quantity) - 1
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span className="cart_item-quantity-value">
                                                    {quantityUpdates[item.id] || item.quantity}
                                                </span>
                                                <button
                                                    className="btn-quantity"
                                                    onClick={() =>
                                                        quantityUpdates(
                                                            item.id,
                                                            (quantityUpdates[item.id] ||
                                                                item.quantity) + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeItemCart(item.id)}
                                            className="cart-item-remove"
                                            aria-label={`Remove ${item.name} from cart`}
                                        >
                                            <Trash size={30} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="cart-footer">
                            <div className="cart_totals">
                                <div className="cart_subtotals">
                                    <span>Sub-Total: </span>
                                    <span className="cart_subtotal">$ {totalCart.toFixed(2)} </span>
                                </div>
                                <div className="cart_items-count">
                                    <span>Cantidad de productos: </span>
                                    <span className="cart_item-count">
                                        {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
                                    </span>
                                </div>
                                <div className="cart_actions">
                                    <div className="cart_checkout">
                                        {isAuth
                                            ? 'Debes iniciar sesión antes de realizar el pago.'
                                            : 'Continuar con pago.'}
                                    </div>
                                    <button
                                        className="btn-clear"
                                        onClick={clearCart}
                                        aria-label="Clear cart"
                                    >
                                        Vaciar
                                    </button>
                                    <button
                                        className="btn-checkout"
                                        onClick={handleCheckout}
                                        aria-label="Proceed to checkout"
                                    >
                                        Pagar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
