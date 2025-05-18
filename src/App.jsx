import HomePage from './pages/HomePage.jsx';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <MainLayout />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
