import { Plus } from 'lucide-react';
import './EmptyState.css';

const EmptyState = ({ onAddProduct }) => {
  return (
    <div className="empty-state">
      <p className="empty-title">No se encontraron productos</p>
      <p className="empty-description">Intente ajustar su búsqueda o agregue un nuevo producto</p>
      <button 
        onClick={onAddProduct}
        className="empty-action-btn"
        aria-label="Add your first product"
      >
        <Plus size={30} aria-hidden="true" />
        Añade tu primer producto
      </button>
    </div>
  );
};

export default EmptyState;