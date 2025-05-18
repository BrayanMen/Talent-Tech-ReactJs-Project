import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const API_URL = 'https://6825eaad397e48c913143248.mockapi.io/users';

    useEffect(() => {
        const storageUser = JSON.parse(localStorage.getItem('user'));
        if (storageUser) {
            sessionActive(storageUser.id);
        }
    }, []);

    const sessionActive = async userID => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/${userID}`);
            if (!res.ok) throw new Error('Sesion invalida');
            const userData = await res.json();
            setUser(userData);
            setIsAuth(true);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async ({ email, password }) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}?email=${email}`);
            if (!res.ok) throw new Error('Error al buscar el usuario');

            const users = await res.json();
            const userFound = users.find(u => u.password === password);

            if (!userFound) throw new Error('Credenciales incorrectas!');

            setUser(userFound);
            setIsAuth(true);
            localStorage.setItem('user', JSON.stringify(userFound));
            return userFound;
        } catch (err) {
            console.log('Error: ', err);
        } finally {
            setLoading(false);
        }
    };

    const register = async ({ name, email, password, avatar }) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}?email=${email}`);
            const userExist = await res.json();
            if (userExist.length > 0) throw new Error('Correo registrado');

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

            const createResponse = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            if (!createResponse.ok) throw new Error('Error al crear el usuario');
            return await createResponse.json();
        } catch (err) {
            console.log('Error: ', err);
        } finally {
            setLoading(false);
        }
    };

    const updatedUserInfo = async updates => {
        if(!user) throw new Error("No iniciaste Sesion");
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/${user.id}`,{
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...user, ...updates})
            });
            if(!res.ok) throw new Error("Error de modificacion");

            const updatedUser = await res.json();
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            return updatedUser
        } catch (err) {
            console.log("Error: ", err); 
        } finally{
            setLoading(false)
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuth(false);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        isAuth,
        loading,
        login,
        register,
        logout,
        updatedUserInfo
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
