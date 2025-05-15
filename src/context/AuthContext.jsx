import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const API_URL = 'https://6825eaad397e48c913143248.mockapi.io/users';

    useEffect(() => {
        const storageUser = JSON.parse(localStorage.getItem('user'));
        if (storageUser) {
            setUser(storageUser);
            setIsAuth(true);
        }
    }, []);

    const login = async ({ email, password }) => {
        try {
            const res = await fetch(`${API_URL}?email=${email}`);
            if (!res.ok) throw new Error('Error al buscar el usuario');
            const users = res.json();
            const userFound = users.find(u => u.email === email && u.password === password);
            if (!userFound) throw new Error('Usuario o Contraseña incorrecta!');
            setUser(userFound);
            setIsAuth(true);
            localStorage.setItem('user', JSON.stringify(userFound));
        } catch (err) {
            console.log('Error: ', err);
        }
    };
    
    const register = ({ name, email, password, avatar }) => {
        const apiUsers = JSON.parse(localStorage.getItem('apiUser')) || [];
        const userExist = apiUsers.find(u => u.email === email);
        if (userExist) {
            throw new Error('Usuario Existente');
        }
        const newUser = {
            id: apiUsers.length + 1,
            name,
            email,
            password,
            role: 'Customer',
            avatar: avatar || 'https://i.pravatar.cc/150?img=12',
            creationAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const userUpdated = [...apiUsers, newUser];
        localStorage.setItem('apiUser', JSON.stringify(userUpdated));
        setUsersApi(userPrev => [...userPrev, newUser]);
    };
    const logout = () => {
        setUser(null);
        setIsAuth(false);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        isAuth,
        login,
        register,
        logout,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
