import { useEffect, useState } from 'react';

import './NewCollections.css';

import Item from '../item/Item';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

const BASE_URL = 'http://localhost:3030';

export default function NewCollections() {
    const [allProducts, setAllProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${BASE_URL}/all-products`);

                if (!response.ok) {
                    throw new Error('Error fetching products from the server!');
                }

                const result = await response.json();

                setAllProducts(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className="new-collections">
            <h1>New collections</h1>
            <hr />
            {loading ? <LoadingSpinner /> :
                error ? <p className="error-message">{error}</p> : (
                <div className="popular-item">
                    {allProducts.map((item) => <Item key={item.id} {...item} />)}
                </div>
            )}
        </div>
    );
}