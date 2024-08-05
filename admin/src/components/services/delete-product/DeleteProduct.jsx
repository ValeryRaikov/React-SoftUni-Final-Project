import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

import Warning from '../../warning/Warning';
import { errMsg, BASE_URL } from '../utils';

import '../ProductForm.css';

export default function DeleteProduct() {
    const { isAuthenticated } = useContext(AuthContext);
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        image: '',
        category: '',
        newPrice: '',
        oldPrice: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${BASE_URL}/product/${productId}`);

                if (!response.ok) {
                    throw new Error(errMsg.fetchProduct);
                }

                const result = await response.json();
                setProduct(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [productId]);

    const deleteHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BASE_URL}/remove-product/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(errMsg.deleteProduct);
            }

            setSuccessMessage('Product deleted successfully!');
            navigate('/list-products');
        } catch (err) {
            setError(err.message || errMsg.unexpected);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!isAuthenticated 
                ? <Warning />
                : (<form className="product" onSubmit={deleteHandler}>
                    <div className="product-itemfield">
                        <p>Product name</p>
                        <input
                            value={product.name}
                            type="text"
                            name="name"
                            placeholder="Type here..."
                            disabled
                        />
                    </div>
                    <div className="product-price">
                        <div className="product-itemfield">
                            <p>Price</p>
                            <input
                                value={product.oldPrice}
                                type="number"
                                name="oldPrice"
                                placeholder="Type here..."
                                disabled
                            />
                        </div>
                        <div className="product-itemfield">
                            <p>Offer Price</p>
                            <input
                                value={product.newPrice}
                                type="number"
                                name="newPrice"
                                placeholder="Type here..."
                                disabled
                            />
                        </div>
                    </div>
                    <div className="product-itemfield">
                        <p>Product Category</p>
                        <select
                            value={product.category}
                            name="category"
                            className="product-selector"
                            disabled
                        >
                            <option value="women">Women</option>
                            <option value="men">Men</option>
                            <option value="kids">Kids</option>
                        </select>
                    </div>
                    <div className="product-itemfield">
                        <label htmlFor="file-input">
                            <img
                                src={product.image}
                                alt="Product Thumbnail"
                                className="product-thumbnail-img"
                            />
                        </label>
                        <input type="file" name="image" id="file-input" hidden disabled />
                    </div>
                    <button 
                        onClick={deleteHandler} 
                        className="product-btn" 
                        style={{backgroundColor: "#ff0000"}}
                        disabled={loading}
                    >
                        {loading ? 'Removing...' : 'Remove'}
                    </button>
        
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </form>)
            }
        </>
    );
}
