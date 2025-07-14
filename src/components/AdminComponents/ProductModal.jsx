import { Trash2 } from 'lucide-react';
import './00007504.css';

const ProductModal = ({ 
  isOpen, 
  onClose, 
  formData, 
  onInputChange, 
  onSubmit, 
  editingProduct,
  onImageChange,
  onAddImage,
  onRemoveImage 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <h2 id="modal-title" className="modal-title">
          {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </h2>
        
        <form onSubmit={onSubmit} className="product-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nombre de Producto*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={onInputChange}
                className="form-input"
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Precio*
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={onInputChange}
                min="0"
                step="0.01"
                className="form-input"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Descripcion*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={onInputChange}
              rows={4}
              className="form-textarea"
              placeholder="Enter product description"
              required
            />
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="stock" className="form-label">
                Stock*
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={onInputChange}
                min="0"
                step="1"
                className="form-input"
                placeholder="0"
                required
              />
            </div>
            
            <div className="form-group availability-group">
              <label className="availability-label">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={onInputChange}
                  className="availability-checkbox"
                />
                <div className={`toggle-switch ${formData.available ? 'active' : ''}`}>
                  <div className="toggle-thumb"></div>
                </div>
                <span className="availability-text">Disponible para comprar</span>
              </label>
            </div>
          </div>
          
          <div className="form-group">
            <div className="images-header">
              <label className="form-label">
                Imagenes*
              </label>
              <button 
                type="button"
                onClick={onAddImage}
                className="add-image-btn"
              >
                + Agregar Imagen
              </button>
            </div>
            <div className="images-container">
              {formData.images.map((image, index) => (
                <div key={index} className="image-input-group">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => onImageChange(e.target.value, index)}
                    className="form-input"
                    placeholder="Image URL"
                  />
                  {formData.images.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => onRemoveImage(index)}
                      className="remove-image-btn"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="form-help">
              Introduce las URL de las imágenes del producto. La primera imagen será la principal.
            </p>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="tags" className="form-label">
                Etiquetas
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={onInputChange}
                className="form-input"
                placeholder="jacket, waterproof, black (comma separated)"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="materials" className="form-label">
                Materiales
              </label>
              <input
                id="materials"
                name="materials"
                type="text"
                value={formData.materials}
                onChange={onInputChange}
                className="form-input"
                placeholder="cotton, polyester (comma separated)"
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="btn btn-primary"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;