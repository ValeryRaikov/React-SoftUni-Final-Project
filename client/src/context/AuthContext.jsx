import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import WarningModal from "../components/warning-modal/WarningModal";

export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth-token'));
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', children: null });

    const handleLogin = () => {
        setIsAuthenticated(true);
        setIsModalVisible(false);
    }
    
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setIsAuthenticated(false);
    }

    const handleLoginClick = () => {
        navigate('/login');
        setIsModalVisible(false);
    };

    const handleGoBackClick = () => {
        navigate(-1);
        setIsModalVisible(false);
    };

    const showModal = (title, children) => {
        setModalContent({ title, children });
        setIsModalVisible(true);
    };

    const contextValue = {
        isAuthenticated,
        handleLogin,
        handleLogout,
        handleLoginClick,
        handleGoBackClick,
        showModal,
    }

    return (
        <AuthContext.Provider value={contextValue} >
            {props.children}
            <WarningModal 
                isVisible={isModalVisible} 
                title={modalContent.title}
            >
                {modalContent.children}
            </WarningModal>
        </AuthContext.Provider>
    );
}