import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './CardProduct.css';
import { HeartPlus, LucideEye, Plus } from 'lucide-react';

export default function CardProduct({ product }) {
    const { isAuth, user, handleWishlistProduct } = useAuth();
    const { addToCart } = useCart();
    const [isHover, setIsHover] = useState(false);

    const outStock = product.stock === 0 || !product.available;
    const inWishList = isAuth && user?.wishlist?.includes(product.id);

    const handleAddCart = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!outStock) addToCart(product);
    };

    const handleWishList = e => {
        e.preventDefault();
        e.stopPropagation();
        if (isAuth) {
            handleWishlistProduct(product.id);
        }
    };

    return (
        <div
            className={`product_card ${outStock ? 'out_stock' : ''}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <Link to={`/product/${product.id}`} className="product_card-link">
                <div className="product_card-imgContainer">
                    <img src={product.images[0]} alt={product.name} className="product_card-img" />
                    {isHover && product.images.length > 1 && !outStock && (
                        <img
                            src={product.images[1]}
                            alt={product.name}
                            className="product_card-img-hover"
                        />
                    )}
                    {product.tags && product.tags.length > 0 && (
                        <div className="product_card-tags">
                            {product.tags.slice(0.2).map((tag, i) => (
                                <span key={i} className="product_card-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    {outStock && (
                        <div>
                            <h2>Agotado</h2>
                        </div>
                    )}

                    <div className="product_card-btns">
                        <div className="product_card-btns-content">
                            <Link
                                to={`/product/${product.id}`}
                                className="product_card-btn btn-view"
                                aria-label="Ver detalles"
                            >
                                <LucideEye size={30} />
                            </Link>
                            <button
                                onClick={handleWishList}
                                className={`product_card-btn ${inWishList ? 'active' : ''}`}
                                aria-label={
                                    inWishList ? 'Remover de favoritos' : 'Agregar a favoritos'
                                }
                                disabled={!isAuth}
                            >
                                <HeartPlus size={30} />
                            </button>
                            <button
                                onClick={handleAddCart}
                                className={`product_card-btn cart-btn ${outStock ? 'disable' : ''}`}
                                disabled={outStock}
                                aria-label={outStock ? 'Agotado' : 'Agregar al carrito'}
                            >
                                <Plus size={30} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='product_card-info'>
                    <h3 className='product_card-title'>{product.name}</h3>
                    <p className='product_card-price'>${product.price.toFixed(2)}</p>
                    <p className='product_card-descrip'>{product.description.substring(0, 70)}...</p>
                </div>
            </Link>
        </div>
    );
}
