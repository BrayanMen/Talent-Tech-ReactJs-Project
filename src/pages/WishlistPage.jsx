import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function WishlistPage() {
    const { user, isAuth, handleWishlistProduct } = useAuth();
    const { products, loading } = useProduct();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [wishlistProducts, setWishlistProducts] = useState([]);
    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    useEffect(() => {
        if (isAuth && user && products.length > 0) {
            const wishlistItems = products.filter(
                product => user.wishlist && user.wishlist.includes(product.id)
            );
            setWishlistProducts(wishlistItems);
            !loading;
        } else if (!loading) {
            !loading;
        }
    }, [user, products, isAuth, loading]);

    const handlerWishlistChange = id => {
        if (isAuth && user?.wishlist?.includes(id)) handleWishlistProduct(id);
    };

    const handleAddCart = product => {
        if (product.stock > 0 || product.available) addToCart(product);
    };

    const handleProductsDetail = id => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="wishlist-page">
            <div className="wishlist-container">
                <WishlistHeader itemCount={wishlistProducts.length} />

                {wishlistProducts.length === 0 ? (
                    <EmptyWishlist />
                ) : (
                    <>
                        <WishlistTable
                            products={wishlistProducts}
                            onAddToCart={handleAddCart}
                            onRemoveFromWishlist={handlerWishlistChange}
                            onProductClick={handleProductsDetail}
                        />
                        <WishlistFooter itemCount={wishlistProducts.length} />
                    </>
                )}
            </div>
        </div>
    );
}
