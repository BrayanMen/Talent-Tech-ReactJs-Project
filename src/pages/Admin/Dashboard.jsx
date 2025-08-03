import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Spinner from '../../components/ui/Spinner';
import { useAuth } from '../../context/AuthContext';
import { useProduct } from '../../context/ProductContext';
import './Dashboard.css';
import ProductTable from '../../components/AdminComponents/ProductTable';
import SearchBar from '../../components/AdminComponents/SearchBar';
import EmptyState from '../../components/AdminComponents/EmptyState';
import ProductModal from '../../components/AdminComponents/ProductModal';

const Dashboard = () => {
  const { user, isAuth } = useAuth();
  const { products, loading, updateProduct, deleteProduct, addProducts } = useProduct();
  const navigate = useNavigate();
  
  const [filterText, setFilterText] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  
  const [formData, setFormData] = useState({
    name: '',
    category:'',
    description: '',
    price: 0,
    stock: 0,
    images: [''],
    tags: '',
    materials: '',
    available: true
  });

  useEffect(() => {
    if (!isAuth || (user && user.role !== 'admin')) {
      navigate('/');
    }
  }, [isAuth, user, navigate]);

  const handleSortClick = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.key === 'price' || sortConfig.key === 'stock') {
      return sortConfig.direction === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const filteredProducts = sortedProducts.filter(product => 
    product.name.toLowerCase().includes(filterText.toLowerCase()) ||
    product.description.toLowerCase().includes(filterText.toLowerCase()) ||
    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(filterText.toLowerCase())))
  );

  const openAddModal = () => {
    setFormData({
      name: '',
      category:[],
      description: '',
      price: 0,
      stock: 0,
      images: [''],
      tags: '',
      materials: '',
      available: true
    });
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (product) => {
    setFormData({
      name: product.name,
      category:product.category,
      description: product.description,
      price: product.price,
      stock: product.stock,
      images: [...product.images],
      tags: product.tags ? product.tags.join(', ') : '',
      materials: product.materials ? product.materials.join(', ') : '',
      available: product.available
    });
    setEditingProduct(product);
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = e.target.checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price' || name === 'stock') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleImageChange = (value, index) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      newImages[index] = value;
      return { ...prev, images: newImages };
    });
  };
  
  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };
  
  const removeImageField = (index) => {
    if (formData.images.length <= 1) return;
    
    setFormData(prev => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const tags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
      
    const materials = formData.materials
      .split(',')
      .map(material => material.trim())
      .filter(material => material !== '');
    
    const images = formData.images.filter(img => img.trim() !== '');
    if (images.length === 0) {
      images.push('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5');
    }
    
    const productData = {
      name: formData.name,
      category:formData.category ,
      description: formData.description,
      price: formData.price,
      stock: formData.stock,
      images,
      tags,
      materials,
      available: formData.available
    };
    
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
    } else {
      await addProducts(productData);
    }
    
    closeModal();
  };

  const handleDeleteProduct = async (product) => {
    if (window.confirm(`¿Estás seguro que deseas eliminar "${product.name}"?`)) {
      await deleteProduct(product.id);
    }
  };

  if (!isAuth || (user && user.role !== 'admin')) {
    return null;
  }

  return (
    <>
      <div className="admin-dashboard">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div className="header-content">
              <h1 className="dashboard-title">Panel de Control</h1>
              <p className="dashboard-subtitle">Administra tus productos</p>
            </div>
            <button 
              onClick={openAddModal}
              className="add-product-btn"
              aria-label="Add new product"
            >
              <Plus size={18} aria-hidden="true" />
              Agregar Producto
            </button>
          </div>
          
          <SearchBar 
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Buscar producto..."
          />
          
          {loading ? (
            <Spinner/>
          ) : filteredProducts.length === 0 ? (
            <EmptyState onAddProduct={openAddModal} />
          ) : (
            <ProductTable 
              products={filteredProducts}
              sortConfig={sortConfig}
              onSort={handleSortClick}
              onEdit={openEditModal}
              onDelete={handleDeleteProduct}
            />
          )}
        </div>
        
        <ProductModal
          isOpen={isAddModalOpen}
          onClose={closeModal}
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleFormSubmit}
          editingProduct={editingProduct}
          onImageChange={handleImageChange}
          onAddImage={addImageField}
          onRemoveImage={removeImageField}
          products={products}
        />
      </div>
    </>
  );
};

export default Dashboard;