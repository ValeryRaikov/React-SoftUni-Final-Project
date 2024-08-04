import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const contextValue = {
        isAuthenticated,
        setIsAuthenticated,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};