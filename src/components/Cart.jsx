import React from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
    const {
        addToCart,
        cart,
        clearCart,
        removeItemCart,
        quantityUpdates,
        totalCart,
        itemCount,
        toggleCart,
    } = useCart();

    return (
        <>
            <div>Carrito</div>
        </>
    );
}
