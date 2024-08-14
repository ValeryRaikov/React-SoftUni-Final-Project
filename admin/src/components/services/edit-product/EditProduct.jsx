import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

import Warning from '../../warning/Warning';
import { errMsg, BASE_URL } from '../utils';

import '../ProductForm.css';

export default function EditProduct() {
    const { isAuthenticated } = useContext(AuthContext);
    const { productId } = useParams(); 
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
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

    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            if (image) {
                const formData = new FormData();
                formData.append('product', image);

                const imageUploadResponse = await fetch(`${BASE_URL}/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (!imageUploadResponse.ok) {
                    throw new Error('Failed to upload image.');
                }

                const imageUploadResult = await imageUploadResponse.json();
                product.image = imageUploadResult.imageUrl;
            }

            const response = await fetch(`${BASE_URL}/update-product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error(errMsg.updateProduct);
            }

            setSuccessMessage('Product updated successfully!');
            navigate('/list-products');
        } catch (err) {
            setError(err.message || errMsg.unexpected);
        } finally {
            setLoading(false);
        }
    }

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = async (e) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <>
            {!isAuthenticated 
                ? <Warning />
                : (<form className="product" onSubmit={submitHandler}>
                    <div className="product-itemfield">
                        <p>Product name</p>
                        <input
                            value={product.name}
                            onChange={changeHandler}
                            type="text"
                            name="name"
                        />
                    </div>
                    <div className="product-price">
                        <div className="product-itemfield">
                            <p>Price</p>
                            <input
                                value={product.oldPrice}
                                onChange={changeHandler}
                                type="text"
                                name="oldPrice"
                            />
                        </div>
                        <div className="product-itemfield">
                            <p>Offer Price</p>
                            <input
                                value={product.newPrice}
                                onChange={changeHandler}
                                type="text"
                                name="newPrice"
                            />
                        </div>
                    </div>
                    <div className="product-itemfield">
                        <p>Product Category</p>
                        <select
                            value={product.category}
                            onChange={changeHandler}
                            name="category"
                            className="product-selector"
                        >
                            <option value="women">Women</option>
                            <option value="men">Men</option>
                            <option value="kids">Kids</option>
                        </select>
                    </div>
                    <div className="product-itemfield">
                        <label htmlFor="file-input">
                            <img
                                src={image ? URL.createObjectURL(image) : product.image}
                                alt="Product Thumbnail"
                                className="product-thumbnail-img"
                            />
                        </label>
                        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
                    </div>
                    <button 
                        onClick={submitHandler} 
                        className="product-btn" 
                        style={{backgroundColor: "#0f7e09"}}
                        disabled={loading}
                    >
                        {loading ? 'Editting...' : 'Edit'}
                    </button>
        
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </form>)
            }
        </>
    );
}