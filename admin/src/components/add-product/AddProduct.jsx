import { useState } from 'react';

import './AddProduct.css';
import upload_area from '../assets/upload_area.svg';

const BASE_URL = 'http://localhost:3030';

const errMsg = {
    createProduct: 'Failed to create product.',
    uploadImage: 'Failed to upload product image to the server.',
    unexpected: 'An unexpected error occurred. Please try again later.',
};

export default function AddProduct() {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'women',
        newPrice: '',
        oldPrice: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value,
        });
    };

    const clearForm = () => {
        setProductDetails({
            name: '',
            image: '',
            category: 'women',
            newPrice: '',
            oldPrice: '',
        });
        setImage(null);
    };

    const addProduct = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('product', image);

        try {
            const uploadResponse = await fetch(`${BASE_URL}/upload`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            const uploadResult = await uploadResponse.json();

            if (!uploadResponse.ok) {
                throw new Error(errMsg.uploadImage);
            }

            const product = {
                ...productDetails,
                image: uploadResult.imageUrl,
            };

            const productResponse = await fetch(`${BASE_URL}/add-product`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            const productResult = await productResponse.json();

            if (!productResponse.ok) {
                throw new Error(errMsg.createProduct);
            }

            if (productResult.success) {
                setSuccessMessage('Product added successfully!');
                clearForm();
            } else {
                throw new Error(productResult.message || errMsg.createProduct);
            }
        } catch (err) {
            setError(err.message || errMsg.unexpected);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-product">
            <div className="add-product-itemfield">
                <p>Product title</p>
                <input
                    value={productDetails.name}
                    onChange={changeHandler}
                    type="text"
                    name="name"
                    placeholder="Type here..."
                />
            </div>
            <div className="add-product-price">
                <div className="add-product-itemfield">
                    <p>Price</p>
                    <input
                        value={productDetails.oldPrice}
                        onChange={changeHandler}
                        type="text"
                        name="oldPrice"
                        placeholder="Type here..."
                    />
                </div>
                <div className="add-product-itemfield">
                    <p>Offer Price</p>
                    <input
                        value={productDetails.newPrice}
                        onChange={changeHandler}
                        type="text"
                        name="newPrice"
                        placeholder="Type here..."
                    />
                </div>
            </div>
            <div className="add-product-itemfield">
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name="category"
                    className="add-product-selector"
                >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                </select>
            </div>
            <div className="add-product-itemfield">
                <label htmlFor="file-input">
                    <img
                        src={image ? URL.createObjectURL(image) : upload_area}
                        alt="Product Thumbnail"
                        className="add-product-thumnail-img"
                    />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>
            <button onClick={addProduct} className="add-product-btn" disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
            </button>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
}