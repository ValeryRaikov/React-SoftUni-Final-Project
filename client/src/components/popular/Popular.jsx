import { useEffect, useState } from 'react';

import './Popular.css';

import Item from '../item/Item';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

const BASE_URL = 'https://react-softuni-final-project.onrender.com';  // 'http://localhost:3030';

export default function Popular() {
    const [popularProducts, setPopularProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${BASE_URL}/popular-in-women`);

                if (!response.ok) {
                    throw new Error('Error fetching products from the server!');
                }

                const result = await response.json();

                setPopularProducts(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className="popular">
            <h1>Popular In Women</h1>
            <hr />
            {loading ? <LoadingSpinner /> :
                error ? <p className="error-message">{error}</p> : (
                <div className="popular-item">
                    {popularProducts.map((item) => <Item key={item.id} {...item} />)}
                </div>
            )}
        </div>
    );
}