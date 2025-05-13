import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [usersApi, setUsersApi] = useState([]);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const storageUser = JSON.parse(localStorage.getItem('user'));
        const apiUsers = JSON.parse(localStorage.getItem('apiUser')) || [];

        fetch('https://api.escuelajs.co/api/v1/users')
            .then(res => res.json())
            .then(dataApi => {
                setUsersApi([...dataApi, ...apiUsers]);
            })
            .catch(err => console.log('Error de Data: ', err));
        if (storageUser) {
            setUser(storageUser);
            setIsAuth(true);
        }
    }, []);

    const login = ({ email, password }) => {
        const apiUserStorage = JSON.parse(localStorage.getItem('apiUser')) || [];
        const usersCombined = [...usersApi, ...apiUserStorage];

        const userFound = usersCombined.find(u => u.email === email && u.password === password);
        if (!userFound) {
            throw new Error('Usuario Invalido');
        }
        setUser(userFound);
        setIsAuth(true);
        localStorage.setItem('user', JSON.stringify(userFound));
    };
    const register = ({name, email, password, avatar})=>{
        const apiUsers = JSON.parse(localStorage.getItem('apiUser')) || [];
        const userExist = apiUsers.find(u => u.email === email);
        if(userExist){
            throw new Error("Usuario Existente")
        }
        const newUser = {
            id: apiUsers.length + 1,
            name,
            email,
            password,
            role: "Customer",
            avatar: avatar || 'https://i.pravatar.cc/150?img=12',
            creationAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        const userUpdated = [...apiUsers, newUser];
        localStorage.setItem('apiUser', JSON.stringify(userUpdated))
        setUsersApi(userPrev => [...userPrev, newUser])
    }
    const logout = () => {
        setUser(null);
        setIsAuth(false);
        localStorage.removeItem('user')
    }
    return (
        <AuthProvider.Provider value={{user,isAuth,login,register, logout}}>
            {children}
        </AuthProvider.Provider>
    )
};

export default AuthContext;