import { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:3030';

export default function useProductLikes(productId, isAuthenticated) {
    const [likes, setLikes] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await fetch(`${BASE_URL}/product/${productId}`);
                const data = await response.json();
                setLikes(data.likes);
            } catch (err) {
                setError('Failed to fetch likes');
            }
        };

        fetchLikes();
    }, [productId]);

    const likeProduct = async () => {
        if (!isAuthenticated) {
            setError('Please log in to like the product.');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/product/${productId}/like`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to like the product');
            }

            const data = await response.json();
            setLikes(data.likes);
        } catch (err) {
            setError(err.message);
        }
    };

    const dislikeProduct = async () => {
        if (!isAuthenticated) {
            setError('Please log in to dislike the product.');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/product/${productId}/dislike`, {
                method: 'POST',
                credentials: 'include', 
            });

            if (!response.ok) {
                throw new Error('Failed to dislike the product');
            }

            const data = await response.json();
            setLikes(data.likes);
        } catch (err) {
            setError(err.message);
        }
    };

    return { likes, likeProduct, dislikeProduct, error };
}