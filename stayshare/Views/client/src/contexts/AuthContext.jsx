import { createContext, useContext, useState, useEffect } from 'react';
import {authService} from "../api/apiCalls.js";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateSession = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                // Making a request to a protected endpoint that validates the session
                const response = await authService.validate();
                if (response.data.statusText === '401') {
                    // If we get 401 Unauthorized, the cookie is invalid/expired
                    setUser(null);
                    localStorage.removeItem('user');
                }
            } catch (error) {
                setUser(null);
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };

        validateSession();

    }, [user]);
    

    const login = async (email, password, rememberMe = false) => {
        const response = await authService.login({ email, password, rememberMe });
        console.log('Authcontext response string:' + JSON.stringify(response));
        if (response.status === 200) {
            setUser(response.data.userName);
        }
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    const register = async (userData) => {
        return await authService.register(userData);
    };
    
    

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);