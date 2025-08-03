import { createContext, useContext, useEffect, useState } from 'react';
import toast from '../components/ui/Toast';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

// const API_URL = 'https://6825eaad397e48c913143248.mockapi.io/products';
const BASE_URL = 'https://talentotechnodejs.vercel.app';
const BASE_URL_PRODUCTS = `${BASE_URL}/api/products`;

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [moreItems, setMoreItems] = useState(true);
    const ITEMS_PER_PAGE = 9;
    const limit = 50;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = new URL(BASE_URL_PRODUCTS);
                url.searchParams.append('limitDoc', limit);
                const res = await fetch(url.toString());
                if (!res.ok) throw new Error('Productos no encontrados');

                const data = await res.json();
                if (!data.success) throw new Error(data.message);
                console.log('Data de productos --->: ', data.data);

                setProducts(data.data);
                loadInitialProducts(data.data);
            } catch (err) {
                toast.show('Error de carga de Productos.', 'error');
                console.error('Error cargando productos: ', err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const loadInitialProducts = product => {
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
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            const res = await fetch(`${BASE_URL_PRODUCTS}/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(product),
            });
            const newProduct = await res.json();
            if (!newProduct.success) throw new Error(newProduct.message);

            console.log(newProduct);
            setProducts(prev => [...prev, newProduct]);
            toast.show('¡Producto agregado con exito!', 'success');
        } catch (err) {
            toast.show('Error agregando el producto.', 'error');
            console.error('Error agregando producto: ', err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id, updates) => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            const res = await fetch(`${BASE_URL_PRODUCTS}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(updates),
            });

            const updatedProd = await res.json();
            if (!updatedProd.success) throw new Error(updatedProd.message);

            console.log(updatedProd);

            setProducts(prev => prev.map(p => (p.id === id ? updatedProd : p)));
            toast.show('¡Producto actualizado con exito!', 'success');
        } catch (err) {
            toast.show('Error al actualizar el producto.', 'error');
            console.error('Error al actualizar el producto: ', err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async id => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            const res = await fetch(`${BASE_URL_PRODUCTS}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const deletedProd = await res.json();

            if (!deletedProd.success) throw new Error(deletedProd.message);
            console.log('Elimino producto: ', id);
            

            setProducts(prev => prev.filter(p => p.id !== id));

            toast.show('¡Producto eliminado con exito!', 'success');
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
        loadingMoreProducts,
        ITEMS_PER_PAGE,
    };

    return <ProductContext.Provider value={values}>{children}</ProductContext.Provider>;
};
