import React from 'react'
import { Link } from 'react-router-dom';
import { HeartPlus, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './ProductListItem.css';

export default function ProductListItem({ product, showFilters }) {
    const { isAuth, user, handleWishlistProduct } = useAuth();
    const { addToCart } = useCart();

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
    <div className={`products_card-list ${showFilters ? 'filter_panel' : ''}`}>
            <div>
                <Link to={`/product/${product.id}`}>
                    <img src={product.images[0]} alt={product.name} />
                </Link>
            </div>
            <div>
                <div>
                    <Link to={`/product/${product.id}`}>
                        <h2>{product.name}</h2>
                    </Link>
                    <p>${product.price.toFixed(2)}</p>
                    <p className="product_description">{product.description}</p>
                    <div>
                        {product.tags &&
                            product.tags.map((tag, i) => (
                                <span key={i} className="product-tag">
                                    {tag}
                                </span>
                            ))}
                    </div>
                    <div className="product-card-actions">
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
                            className={`product_card-btn ${outStock ? 'disabled' : ''}`}
                            disabled={outStock}
                            aria-label={outStock ? 'Agotado' : 'Agregar al carrito'}
                        >
                            <Plus size={30} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
  )
}
