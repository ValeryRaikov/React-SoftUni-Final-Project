import { useState, useEffect, createContext } from "react";
import all_products from '../components/assets/all_product';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        setAllProducts(all_products);
    }, []);

    const contextValue = { allProducts };

    return (
        <ShopContext.Provider value={contextValue} >
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;