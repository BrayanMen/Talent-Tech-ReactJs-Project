import { Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import './ProductTable.css';

const ProductTable = ({ 
  products, 
  sortConfig, 
  onSort, 
  onEdit, 
  onDelete 
}) => {
  const getHeaderCell = (key, label) => {
    const isSorted = sortConfig?.key === key;
    const sortDirection = isSorted ? sortConfig.direction : undefined;
    
    return (
      <th 
        className={`sortable-header ${isSorted ? 'sorted' : ''}`}
        onClick={() => onSort(key)}
      >
        <div className="header-content">
          <span>{label}</span>
          {isSorted ? (
            sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
          ) : (
            <ChevronDown size={16} className="sort-icon-inactive" />
          )}
        </div>
      </th>
    );
  };

  return (
    <div className="table-container">
      <table className="products-table" role="table" aria-label="Tabla de productos">
        <thead className="table-header">
          <tr role="row">
            <th className="index-column" scope="col">#</th>
            {getHeaderCell('name', 'Productos')}
            {getHeaderCell('category', 'Categoria')}
            {getHeaderCell('price', 'Precio')}
            {getHeaderCell('stock', 'Stock')}
            {getHeaderCell('available', 'Status')}
            <th className="actions-column" scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {products.map((product, index) => (
            <tr key={product.id} className="product-row" role="row">
              <td className="index-cell">{index + 1}</td>
              <td className="product-cell">
                <div className="product-info">
                  <img 
                    src={product.images[0] || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'} 
                    alt={`${product.name} product image`} 
                    className="product-image"
                  />
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">
                      {product.description.substring(0, 60)}...
                    </p>
                    <div className="product-tags">
                      {product.tags && product.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="tag">
                          {tag}
                        </span>
                      ))}
                      {product.tags && product.tags.length > 2 && (
                        <span className="tag">
                          +{product.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="price-cell">
                <span className="category" aria-label={`${product.category}`}>
                  {product.category}
                </span>
              </td>
              <td className="price-cell">
                <span className="price" aria-label={`Price: $${product.price.toFixed(2)}`}>
                  ${product.price.toFixed(2)}
                </span>
              </td>
              <td className="stock-cell">{product.stock}</td>
              <td className="status-cell">
                {product.stock > 0 && product.available ? (
                  <span className="status-badge available">
                    Disponible
                  </span>
                ) : (
                  <span className="status-badge unavailable">
                    No Disponible
                  </span>
                )}
              </td>
              <td className="actions-cell">
                <div className="action-buttons">
                  <button 
                    onClick={() => onEdit(product)}
                    className="action-btn edit-btn"
                    aria-label={`Editar ${product.name}`}
                  >
                    <Edit size={18} aria-hidden="true" />
                  </button>
                  <button 
                    onClick={() => onDelete(product)}
                    className="action-btn delete-btn"
                    aria-label={`Eliminar ${product.name}`}
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;