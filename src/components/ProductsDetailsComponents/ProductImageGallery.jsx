import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';

const ProductImageGallery = ({ 
  product, 
  selectedImage, 
  loaded, 
  onImageChange, 
  onNavigateImage, 
  onImageLoad 
}) => {
  return (
    <div className="product-image-gallery">
      <div className="product-image-gallery__main">
        {!loaded[selectedImage] && (
          <div className="product-image-gallery__loading">
            <Loader size={32} className="product-image-gallery__loading-icon" />
          </div>
        )}
        <img 
          src={product.images[selectedImage]} 
          alt={product.name} 
          className={`product-image-gallery__image ${
            loaded[selectedImage] 
              ? 'product-image-gallery__image--visible' 
              : 'product-image-gallery__image--hidden'
          }`}
          onLoad={() => onImageLoad(selectedImage)}
        />
        {product.images.length > 1 && (
          <>
            <button 
              onClick={() => onNavigateImage('prev')}
              className="product-image-gallery__nav product-image-gallery__nav--prev"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => onNavigateImage('next')}
              className="product-image-gallery__nav product-image-gallery__nav--next"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
      {product.images.length > 1 && (
        <div className="product-image-gallery__thumbnails">
          {product.images.map((image, index) => (
            <button
              key={index}
              className={`product-image-gallery__thumbnail ${
                index === selectedImage ? 'product-image-gallery__thumbnail--active' : ''
              }`}
              onClick={() => onImageChange(index)}
            >
              <img 
                src={image} 
                alt={`${product.name} thumbnail ${index + 1}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;