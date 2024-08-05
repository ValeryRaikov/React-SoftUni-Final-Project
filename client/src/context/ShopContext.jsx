import { useState, useEffect, createContext, useContext, useMemo } from "react";

import { AuthContext } from "./AuthContext";

const BASE_URL = 'http://localhost:3030';

export const ShopContext = createContext(null);

export default function ShopContextProvider(props) {
    const [allProducts, setAllProducts] = useState([]);
    const { 
        isAuthenticated, 
        showModal, 
        handleLoginClick, 
        handleGoBackClick, 
    } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${BASE_URL}/all-products`);

                if (!response.ok) {
                    throw new Error('Error fetching products from the server');
                }

                const result = await response.json();

                setAllProducts(result);

                if (isAuthenticated) {
                    try {
                        const getCartResponse = await fetch(`${BASE_URL}/get-cart`, {
                            method: 'POST',
                            headers: {
                                Accept: 'application/form-data',
                                'auth-token': `${localStorage.getItem('auth-token')}`,
                                'Content-Type': 'application/json',
                            },
                            body: '',
                        });

                        if (!getCartResponse.ok) {
                            throw new Error('Error fetching cart products for logged in user');
                        }

                        const getCartResult = await getCartResponse.json();

                        setCartItems(getCartResult);
                    } catch (err) {
                        console.error(err.message);
                    }
                }
            } catch (err) {
                console.error(err.message);
            }
        })();
    }, [isAuthenticated]);

    useEffect(() => {
        if (allProducts.length > 0) {
            setCartItems(getDefaultCart());
        }
    }, [allProducts]);

    const clearCart = () => { 
        setCartItems({});
    };

    const getDefaultCart = () => {
        let cart = {}
        for (let product of allProducts) {
            cart[product.id] = 0;
        }
    
        return cart;
    }

    const [cartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = async (itemId) => {
        if (!isAuthenticated) {
            showModal('Login required', (
                <div>
                    <p>Please login to purchase items.</p>
                    <div className="btn-container">
                        <button onClick={() => handleGoBackClick()}>Go Back</button>
                        <button onClick={() => handleLoginClick()}>Login</button>
                    </div>
                </div>
            ));
            return;
        }

        setCartItems(prev => ({...prev, [itemId]: prev[itemId] + 1}));

        if (isAuthenticated) {
            try {
                const response = await fetch(`${BASE_URL}/add-to-cart`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemId }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error: ${errorText}`);
                }
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    const removeFromCart = async (itemId) => {
        if (!isAuthenticated) {
            return;
        }

        setCartItems(prev => ({...prev, [itemId]: prev[itemId] - 1}));

        if (isAuthenticated) {
            try {
                const response = await fetch(`${BASE_URL}/remove-from-cart`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemId }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error: ${errorText}`);
                }
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemData = allProducts.find(product => product.id === Number(item));
                totalAmount += itemData.newPrice * cartItems[item];
            }
        }

        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0)
                totalItems += cartItems[item];
        }

        return totalItems;
    }

    const contextValue = useMemo(() => ({
        allProducts, 
        cartItems, 
        clearCart,
        addToCart, 
        removeFromCart, 
        getTotalCartAmount, 
        getTotalCartItems,
    }), [allProducts, cartItems]);

    return (
        <ShopContext.Provider value={contextValue} >
            {props.children}
        </ShopContext.Provider>
    )
}