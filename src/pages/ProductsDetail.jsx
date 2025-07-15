import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from '../components/ui/Toast';
import Spinner from '../components/ui/Spinner';
import './ProductsDetail.css';
import ProductBreadcrumb from '../components/ProductsDetailsComponents/ProductBreadcrumb';
import ProductImageGallery from '../components/ProductsDetailsComponents/ProductImageGallery';
import ProductInfo from '../components/ProductsDetailsComponents/ProductInfo';
import RelatedProducts from '../components/RelatedProducts';

const ProductsDetail = () => {
    const { id } = useParams();
    const { products, loading } = useProduct();
    const { isAuth, user, handleWishlistProduct } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loaded, setLoaded] = useState([]);

    useEffect(() => {
        if (id && products.length > 0) {
            const foundProduct = products.find(p => p.id === id);
            if (foundProduct) {
                setProduct(foundProduct);
                setLoaded(new Array(foundProduct.images.length).fill(false));
                const related = products
                    .filter(
                        p =>
                            p.id !== id &&
                            ((foundProduct.tags &&
                                p.tags &&
                                p.tags.some(tag => foundProduct.tags.includes(tag))) ||
                                (foundProduct.category &&
                                    foundProduct.category &&
                                    p.category === foundProduct.category))
                    )
                    .slice(0, 4);

                setRelatedProducts(related);
            } else {
                toast.show('Productos no encontrado', 'error');
                navigate('/products');
            }
        }
    }, [id, products, navigate]);

    const handleImageChange = index => {
        setSelectedImage(index);
    };

    const navigateImage = direction => {
        if (!product) return;

        if (direction === 'next') {
            setSelectedImage(prev => (prev + 1) % product.images.length);
        } else {
            setSelectedImage(prev => (prev - 1 + product.images.length) % product.images.length);
        }
    };

    const handleQuantityChange = amount => {
        setQuantity(prev => {
            const newQuantity = prev + amount;
            return newQuantity >= 1 ? newQuantity : 1;
        });
    };

    const handleAddToCart = () => {
        if (product && product.stock > 0 && product.available) {
            for (let i = 0; i < quantity; i++) {
                addToCart(product);
            }
        }
    };

    const handleImageLoad = index => {
        setLoaded(prev => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
        });
    };

    const isInWishlist = isAuth && user?.wishlist?.includes(id || '');
    const isOutOfStock = product && (product.stock === 0 || !product.available);

    if (loading || !product) {
        return <Spinner />;
    }

    return (
        <div className="product-detail">
            <div className="product-detail__container">
                <ProductBreadcrumb onBackClick={() => navigate('/products')} />

                <div className="product-detail__content">
                    <ProductImageGallery
                        product={product}
                        selectedImage={selectedImage}
                        loaded={loaded}
                        onImageChange={handleImageChange}
                        onNavigateImage={navigateImage}
                        onImageLoad={handleImageLoad}
                    />

                    <ProductInfo
                        product={product}
                        quantity={quantity}
                        isInWishlist={isInWishlist}
                        isOutOfStock={isOutOfStock}
                        isAuth={isAuth}
                        onQuantityChange={handleQuantityChange}
                        onAddToCart={handleAddToCart}
                        onToggleWishlist={() =>
                            isAuth
                                ? handleWishlistProduct(product.id)
                                : toast.show(
                                      'Por favor, inicia sesión para añadir a la lista de deseos',
                                      'error'
                                  )
                        }
                    />
                </div>

                <RelatedProducts
                    products={relatedProducts}
                    title={`Productos relacionados con ${product.name}`}
                />
            </div>
        </div>
    );
};

export default ProductsDetail;
