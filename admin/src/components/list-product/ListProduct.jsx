import { useState } from 'react';
import './ListProduct.css';
import { useEffect } from 'react';
import ListProductItem from '../list-product-item/ListProductItem';

const BASE_URL = 'http://localhost:3030/all-products';

const errMsg = {
    fecthProducts: 'Failed to fetch products.',
    unexpected: 'An unexpected error occurred. Please try again later.',
};

export default function ListProduct() {
    const [allProducts, setAllProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(BASE_URL);

                if (!response.ok) {
                    throw new Error(errMsg.fecthProducts);
                }

                const result = await response.json();

                setAllProducts(result);
            } catch (err) {
                setError(err.message || errMsg.unexpected);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className="list-product">
            <h1>Add Product</h1>
            <div className="list-product-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Edit</p>
                <p>Remove</p>
            </div>
            <div className="list-product-all-products">
                <hr />
                {loading 
                    ? <p className="loading-message">Loading...</p>
                    : error 
                    ? <p className="error-message">{error}</p>
                    : allProducts.length > 0 
                    ? allProducts.map(product => (
                        <ListProductItem key={product.id} {...product} />
                    ))
                    : <p className="no-products-message">No products available.</p>
                }
            </div>
            <hr />
        </div>
    );
}