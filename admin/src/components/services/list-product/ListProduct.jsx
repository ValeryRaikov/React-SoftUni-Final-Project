import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ListProductItem from '../list-product-item/ListProductItem';
import { errMsg, BASE_URL } from '../utils';

import '../ProductDisplay.css';

export default function ListProduct() {
    const [allProducts, setAllProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${BASE_URL}/all-products`);

                if (!response.ok) {
                    throw new Error(errMsg.fetchProducts);
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

    const editClickHandler = (id) => {
        navigate(`/update-product/${id}`);
    }

    const deleteClickHandler = (id) => {
        navigate(`/remove-product/${id}`);
    }

    return (
        <div className="list-product">
            <h1>All Products</h1>
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
                        <ListProductItem 
                            key={product.id} 
                            {...product} 
                            onEdit={editClickHandler}
                            onDelete={deleteClickHandler}
                        />
                    ))
                    : <p className="no-products-message">No products available.</p>
                }
            </div>
            <hr />
        </div>
    );
}