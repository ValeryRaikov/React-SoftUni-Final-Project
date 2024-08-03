import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import AuthContextProvider from './context/AuthContext.jsx';
import ShopContextProvider from './context/ShopContext.jsx';

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <ShopContextProvider>
                    <App />
                </ShopContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
