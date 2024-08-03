import { useState, useEffect, createContext } from "react";

const BASE_URL = 'http://localhost:3030';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${BASE_URL}/all-products`);

                if (!response.ok) {
                    throw new Error('Error fetching products from the server');
                }

                const result = await response.json();

                setAllProducts(result);
            } catch (err) {
                console.error(err.message);
            }
        })();
    }, []);

    useEffect(() => {
        if (allProducts.length > 0) {
            setCartItems(getDefaultCart());
        }
    }, [allProducts]);

    const getDefaultCart = () => {
        let cart = {}
        for (let product of allProducts) {
            cart[product.id] = 0;
        }
    
        return cart;
    }

    const [cartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId) => {
        setCartItems(prev => ({...prev, [itemId]: prev[itemId] + 1}));
    }

    const removeFromCart = (itemId) => {
        setCartItems(prev => ({...prev, [itemId]: prev[itemId] - 1}));
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

    const contextValue = {
        allProducts, 
        cartItems, 
        addToCart, 
        removeFromCart, 
        getTotalCartAmount, 
        getTotalCartItems,
    };

    return (
        <ShopContext.Provider value={contextValue} >
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;