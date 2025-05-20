import { createContext, useContext, useEffect, useState } from 'react';
import toast from '../components/ui/Toast';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const API_URL = 'https://6825eaad397e48c913143248.mockapi.io/users';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storageUser = JSON.parse(localStorage.getItem('user'));
        if (storageUser) {
            sessionActive(storageUser.id);
        }
    }, []);

    const sessionActive = async userID => {
        try {
            const res = await fetch(`${API_URL}/${userID}`);
            if (!res.ok) throw new Error('Sesion invalida');
            const userData = await res.json();
            delete userData.password;
            setUser(userData);
            setIsAuth(true);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
            logout();
            toast.show('Sesion Expirada', 'warning');
        } finally {
            setLoading(false);
        }
    };

    const login = async ({ email, password }) => {
        try {
            const res = await fetch(`${API_URL}?email=${email}`);
            if (!res.ok) throw new Error('Error al buscar el usuario');

            const users = await res.json();
            const userFound = users.find(u => u.password === password);

            if (!userFound) {
                toast.show('Credenciales Invalidas', 'error');
                throw new Error('Credenciales incorrectas!');
            }

            delete userFound.password;
            setUser(userFound);
            setIsAuth(true);
            localStorage.setItem('user', JSON.stringify(userFound));
            toast.show('¡Bienvenido!', 'success');
            return userFound;
        } catch (err) {
            toast.show('Error Iniciando Sesion.', 'error');
            console.error('Error Iniciando Sesion: ', err.message);
        } finally {
            setLoading(false);
        }
    };

    const register = async ({ name, email, password, avatar }) => {
        try {
            const res = await fetch(`${API_URL}?email=${email}`);
            const userExist = await res.json();
            if (userExist.length > 0) {
                toast.show('Este correo ya esta registrado', 'error');
                throw new Error('Correo registrado')};

            const newUser = {
                name,
                email,
                password,
                role: 'custumer',
                avatar: avatar || 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
                address: {},
                wishlist: [],
                createdAt: new Date().toISOString(),
            };

            const createRes = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            if (!createRes.ok) throw new Error('Error al crear el usuario');
            toast.show('Registro Exitoso!', 'success');
            return await createRes.json();
        } catch (err) {
            toast.show('Error al registrar usuario.', 'error');
            console.error('Error al registrar usuario: ', err.message);
        } finally {
            setLoading(false);
        }
    };

    const getUpdatableUserData = (user, updates) => {
        const { name, email, password, avatar, address } = { ...user, ...updates };
        return { name, email, password, avatar, address };
    };

    const updatedUserInfo = async updates => {
        if (!user) {
            toast.show('Debes estar conectado', 'error');
            throw new Error('No iniciaste Sesion')};
        try {
            const res = await fetch(`${API_URL}/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(getUpdatableUserData(user, updates)),
            });
            if (!res.ok) throw new Error('Error de modificacion');

            const updatedUser = await res.json();
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            toast.show('Perfil Actualizado con Exitoso!', 'success');
            return updatedUser;
        } catch (err) {
            toast.show('Error al actualizar el usuario.', 'error');
            console.error('Error al actualizar el usuario: ', err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleWishlistProduct = async (id) => {
        if(!user){
            toast.show("Iniciar Sesion para agregar item a la lista.", "info")
            return false
        }

        const wishList = [...(user.wishlist || [])];
        const indexProduct = wishList.indexOf(id);
        if(indexProduct > -1){
            wishList.splice(indexProduct,1)
            toast.show("Eliminado de lista","info")
        }else{
            wishList.push(id);
            toast.show("Agregado a la lista", "success")
        }
        return await updatedUserInfo({wishList})
    }
 

    const logout = () => {
        setUser(null);
        setIsAuth(false);
        localStorage.removeItem('user');
        toast.show("Cerraste Sesion", "info")
    };

    const values = {
        user,
        isAuth,
        loading,
        login,
        register,
        logout,
        updatedUserInfo,
        handleWishlistProduct
    };
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;
