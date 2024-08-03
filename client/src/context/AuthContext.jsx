import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth-token'));

    const handleLogin = () => {
        setIsAuthenticated(true);
    }
    
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setIsAuthenticated(false);
    }

    const contextValue = {
        isAuthenticated,
        handleLogin,
        handleLogout,
    }

    return (
        <AuthContext.Provider value={contextValue} >
            {props.children}
        </AuthContext.Provider>
    );
}