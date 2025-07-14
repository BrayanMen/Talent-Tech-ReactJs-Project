import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import MainLayout from './layout/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFound from './pages/NotFound.jsx';
import Products from './pages/Products.jsx';
import Cart from './components/Cart.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ProductsDetail from './pages/ProductsDetail.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';

function App() {
    return (
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <MainLayout>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:id" element={<ProductsDetail />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/admin" element={<Dashboard/>} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        <Cart />
                    </MainLayout>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    );
}

export default App;
