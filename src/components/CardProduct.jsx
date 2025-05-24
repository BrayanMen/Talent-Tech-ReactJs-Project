import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import "./CardProduct.css"
import { LucideEye } from 'lucide-react';

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
            <div className='product_card-imgContainer'>
                <img src={product.images[0]} alt={product.name} className='product_card-img' />
                {isHover&& product.images.length > 1 && !outStock &&(
                    <img src={product.images[1]}
                    alt={product.name}
                    className='product_card-img-hover'
                    />
                )}
                {product.tags && product.tags.length > 0 &&(
                    <div className='product_card-tags'>
                        {product.tags.slice(0.2).map((tag, i)=>(
                            <span key={i} className='product_card-tag'>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {outStock&&(
            <div>
                <h2>Agotado</h2>
            </div>
            )}

            <div className='product_card-btns'>
                <Link to={`/product/${product.id}`}
                className='product_card-btn btn-view'>
                    <LucideEye size={30}/>
                </Link>
            </div>
            </Link>
        </div>
    );
}
