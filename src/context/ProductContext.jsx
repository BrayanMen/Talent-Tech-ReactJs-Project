import { createContext, useContext, useEffect, useState } from 'react';
import toast from '../components/ui/Toast';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

const API_URL = 'https://6825eaad397e48c913143248.mockapi.io/products';

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [moreItems, setMoreItems] = useState(true);
    const ITEMS_PER_PAGE = 9;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error('Productos no encontrados');
                const data = await res.json();
                setProducts(data);
                loadInitialProducts(data)
            } catch (err) {
                toast.show('Error de carga de Productos.', 'error');
                console.error('Error cargando productos: ', err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const loadInitialProducts = (product) => {
        const init = product.slice(0, ITEMS_PER_PAGE);        
        setDisplayProducts(init);
        setPage(1);
        setMoreItems(product.length > ITEMS_PER_PAGE);
    };

    const loadingMoreProducts = () => {
        if (loading || !moreItems) return;
        setTimeout(() => {
            const next = page + 1;
            const startIndex = (next - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const newProducts = products.slice(startIndex, endIndex);

            if (newProducts.length > 0) {
                setDisplayProducts(p => [...p, ...newProducts]);
                setPage(next);
                setMoreItems(endIndex < products.length);
            } else {
                setMoreItems(false);
            }
            setLoading(false);
        }, 800);
    };

    const addProducts = async product => {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });

            if (!res.ok) throw new Error('No se pudo agregar el producto');

            const newProduct = await res.json();
            setProducts(prev => [...prev, newProduct]);

            toast.show('¡Producto agregado con exito!', 'success');
            return newProduct;
        } catch (err) {
            toast.show('Error agregando el producto.', 'error');
            console.error('Error agregando producto: ', err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id, updates) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });

            if (!res.ok) throw new Error('No se puedo actualizar el Producto.');

            const updatedProd = await res.json();
            setProducts(prev => prev.map(p => (p.id === id ? updatedProd : p)));
            toast.show('¡Producto actualizado con exito!', 'success');
            return updatedProd;
        } catch (err) {
            toast.show('Error al actualizar el producto.', 'error');
            console.error('Error al actualizar el producto: ', err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async id => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('No se pudo eliminar el producto');

            setProducts(prev => prev.filter(p => p.id !== id));
            toast.show('¡Producto eliminado con exito!', 'success');
            return true;
        } catch (err) {
            toast.show('Error al eliminar el producto.', 'error');
            console.error('Error al eliminar el producto: ', err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const values = {
        products,
        displayProducts,
        loading,
        addProducts,
        updateProduct,
        deleteProduct,
        moreItems,
        loadInitialProducts,
        loadingMoreProducts
    };

    return <ProductContext.Provider value={values}>{children}</ProductContext.Provider>;
};
