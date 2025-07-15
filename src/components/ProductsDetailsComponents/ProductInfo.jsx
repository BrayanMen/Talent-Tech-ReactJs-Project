import { Heart, ShoppingBag, Tag } from 'lucide-react';
import  './ProductInfo.css';

const ProductInfo = ({ 
  product, 
  quantity, 
  isInWishlist, 
  isOutOfStock, 
  isAuth,
  onQuantityChange, 
  onAddToCart, 
  onToggleWishlist 
}) => {
  return (
    <div className="product-info">
      <h1 className="product-info__title">{product.name}</h1>    
      <div className="product-info__price-section">
        <span className="product-info__price">
          ${product.price.toFixed(2)}
        </span>
        {isOutOfStock ? (
          <span className="product-info__stock product-info__stock--out-of-stock">
            Agotado
          </span>
        ) : (
          <span className="product-info__stock product-info__stock--in-stock">
            Disponible ({product.stock})
          </span>
        )}
      </div>
      
      <p className="product-info__description">
        {product.description}
      </p>
 
      {product.materials && product.materials.length > 0 && (
        <div className="product-info__section">
          <h3 className="product-info__section-title">Materials</h3>
          <ul className="product-info__materials">
            {product.materials.map((material, idx) => (
              <li key={idx}>{material}</li>
            ))}
          </ul>
        </div>
      )}

      {product.tags && product.tags.length > 0 && (
        <div className="product-info__section">
          <div className="product-info__tags-header">
            <Tag size={16} className="product-info__tags-icon" />
            <h3 className="product-info__section-title">Etiquetas</h3>
          </div>
          <div className="product-info__tags">
            {product.tags.map((tag, idx) => (
              <span key={idx} className="product-info__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="product-info__quantity">
        <h3 className="product-info__section-title">Quantity</h3>
        <div className="product-info__quantity-controls">
          <button 
            onClick={() => onQuantityChange(-1)}
            className="product-info__quantity-btn product-info__quantity-btn--left"
            disabled={isOutOfStock}
          >
            -
          </button>
          <input 
            type="text" 
            value={quantity} 
            onChange={(e) => onQuantityChange(Math.max(1, parseInt(e.target.value) || 1) - quantity)}
            className="product-info__quantity-input"
            disabled={isOutOfStock}
          />
          <button 
            onClick={() => onQuantityChange(1)}
            className="product-info__quantity-btn product-info__quantity-btn--right"
            disabled={isOutOfStock}
          >
            +
          </button>
        </div>
      </div>
      
      <div className="product-info__actions">
        <button 
          onClick={onAddToCart}
          className={`product-info__btn ${
            isOutOfStock ? 'product-info__btn--disabled' : 'product-info__btn--primary'
          }`}
          disabled={isOutOfStock}
        >
          <ShoppingBag size={28} />
          {isOutOfStock ? 'Agotado' : 'Agregar al Carrito'}
        </button>
        
        <button 
          onClick={onToggleWishlist}
          className={`product-info__btn ${
            isInWishlist 
              ? 'product-info__btn--wishlist-active' 
              : 'product-info__btn--wishlist'
          }`}
        >
          <Heart 
            size={28} 
            className={isInWishlist ? 'product-info__wishlist-icon--filled' : ''} 
          />
          {isInWishlist ? 'En Favoritos' : 'Agregar a Favoritos'}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;