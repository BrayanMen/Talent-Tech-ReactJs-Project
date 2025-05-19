import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isOpenCart, setIsOpenCart] = useState(false);
    

    const toggleCart = () => {
        setIsOpenCart(!isOpenCart);
    }

    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        if(localCart.length >0){
            setCart(localCart);
        } 
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = product => {
        setCart(prevCart => {
            const existItem = prevCart.find(item => item.id === product.id);
            if (existItem) {
                return prevCart.map(item => {
                    return item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item;
                });
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeItemCart = productID => {
        setCart(prevCart => prevCart.filter(item => item.id !== productID));
    };

    const quantityUpdates = (productID, newQuantity) => {
        if (newQuantity < 1) {
            removeItemCart(productID);
            return
        };
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productID ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const totalCart = cart.reduce((sum, item)=> sum + (item.price * item.quantity), 0);

    const itemCount = cart.reduce((sum,item) =>sum +item.quantity,0);

    const clearCart = ()=>{
        setCart([]);
    }

    const values = {
        cart, // Estado del carrito
        isOpenCart,// State booleano para abrir o cerrar el carrito
        addToCart,
        removeItemCart, // Eliminar un producto del carrito
        quantityUpdates,// Actualizar la cantidad de un producto en el carrito
        totalCart,// Total del carrito
        itemCount,// Cantidad total de productos en el carrito
        clearCart,// Limpiar el carrito
        toggleCart,//Abrir el carrito
    };

    return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
