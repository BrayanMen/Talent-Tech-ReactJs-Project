import HomePage from './pages/HomePage.jsx';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';

function App() {
    return (
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <MainLayout />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    );
}

export default App;
