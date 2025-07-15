import { ArrowLeft } from 'lucide-react';

const ProductBreadcrumb = ({ onBackClick }) => {
  return (
    <div className="product-breadcrumb">
      <button 
        onClick={onBackClick}
        className="product-breadcrumb__button"
      >
        <ArrowLeft size={30} className="product-breadcrumb__icon" />
        Volver a Productos
      </button>
    </div>
  );
};

export default ProductBreadcrumb;