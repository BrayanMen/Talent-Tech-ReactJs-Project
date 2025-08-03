import { createContext, useContext, useEffect, useState } from 'react';
import toast from '../components/ui/Toast';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

// const API_URL = 'https://6825eaad397e48c913143248.mockapi.io/users';
const BASE_URL = 'https://talentotechnodejs.vercel.app';
const BASE_URL_USERS = `${BASE_URL}/api/users`;
const BASE_URL_AUTH = `${BASE_URL}/auth`;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            sessionActive();
        }
    }, []);

    const sessionActive = async () => {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            logout();
            toast.show('No esta autorizado', 'warning');
            setLoading(false);
            return;
        }
        try {
            const res = await fetch(`${BASE_URL_USERS}/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const userData = await res.json();

            console.log('User Data:', userData.data);

            if (!userData.success) throw new Error('Sesion invalida');

            setUser(userData.data);
            setIsAuth(true);
        } catch (err) {
            logout();
            toast.show('Sesion Expirada', 'warning');
        } finally {
            setLoading(false);
        }
    };

    const login = async ({ email, password }) => {
        setLoading(true);
        if (!email || !password) {
            toast.show('Email y contraseña son requeridos', 'error');
            throw new Error('Email y contraseña son requeridos');
        }
        try {
            const res = await fetch(`${BASE_URL_AUTH}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const user = await res.json();
            console.log('aqui ---->', user.data);

            if (!user.success) throw new Error(user.message);

            localStorage.setItem('token', JSON.stringify(user.token));
            localStorage.setItem('user', JSON.stringify(user.data));

            setUser(user.data);
            setIsAuth(true);
            toast.show('¡Bienvenido!', 'success');
        } catch (err) {
            toast.show('Error Iniciando Sesion.', 'error');
            console.error('Error Iniciando Sesion: ', err.message);
        } finally {
            setLoading(false);
        }
    };

    const register = async ({ name, email, password, avatar }) => {
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL_AUTH}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, avatar }),
            });
            const user = await res.json();
            if (!user.success) throw new Error(user.message);

            toast.show('Registro Exitoso!', 'success');
            return user.data;
        } catch (err) {
            toast.show('Error al registrar usuario.', 'error');
            console.error('Error al registrar usuario: ', err.message);
        } finally {
            setLoading(false);
        }
    };

    // const getUpdatableUserData = (user, updates) => {
    //     if (!user || !updates) {
    //         toast.show('Usuario o actualizaciones no válidas', 'error');
    //         throw new Error('Usuario o actualizaciones no válidas');
    //     }
    //     const { name, email, password, avatar, address } = { ...user, ...updates };
    //     return { name, email, password, avatar, address };
    // };

    const updatedUserInfo = async updates => {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            const res = await fetch(`${BASE_URL_USERS}/profile/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updates),
            });
            const updatedUser = await res.json();
            if (!updatedUser.success) throw new Error(updatedUser.message);

            setUser(updatedUser.data);
            localStorage.setItem('user', JSON.stringify(updatedUser.data));
            toast.show('Perfil Actualizado con Exitoso!', 'success');
        } catch (err) {
            toast.show('Error al actualizar el usuario.', 'error');
            console.error('Error al actualizar el usuario: ', err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleWishlistProduct = async id => {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            const action = Array.isArray(user?.wishlist) && user.wishlist.includes(id) ? 'remove' : 'add';
            const res = await fetch(`${BASE_URL_USERS}/wishlist`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId: id, action }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);

            setUser(prev => ({
                ...prev,
                wishlist: data.wishlist,
            }));
            toast.show('Producto añadido a la lista de deseos', 'success');
        } catch (err) {
            toast.show('Error al añadir el producto a la lista de deseos.', 'error');
            console.error('Error al añadir el producto a la lista de deseos: ', err.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuth(false);
        toast.show('Cerraste Sesion', 'info');
    };

    const values = {
        user,
        isAuth,
        loading,
        login,
        register,
        logout,
        updatedUserInfo,
        handleWishlistProduct,
    };
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;
