import { ArrowLeft } from 'lucide-react';
import './ProductArrowBack.css';

const ProductArrowBack = ({ onBackClick }) => {
  return (
    <div className="product-arrow-back">
      <button 
        onClick={onBackClick}
        className="product-arrow-back__button"
      >
        <ArrowLeft size={30} className="product-arrow-back__icon" />
        Volver a Productos
      </button>
    </div>
  );
};

export default ProductArrowBack;