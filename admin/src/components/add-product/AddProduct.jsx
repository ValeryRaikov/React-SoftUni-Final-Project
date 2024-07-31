import { useState } from 'react';

import './AddProduct.css';
import upload_area from '../assets/upload_area.svg';

const BASE_URL = 'http://localhost:3030/upload';

export default function AddProduct() {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'women',
        newPrice: '',
        oldPrice: '',
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({
            ...productDetails, 
            [e.target.name]: e.target.value,
        });
    }

    const addProduct = async () => {

    }

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
                        name="old-price" id="Type here..." 
                    />
                </div>
                <div className="add-product-itemfield">
                    <p>Offer Price</p>
                    <input 
                        value={productDetails.newPrice} 
                        onChange={changeHandler} 
                        type="text" 
                        name="new-price" id="Type here..." 
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
                    <img src={image 
                        ? URL.createObjectURL(image) 
                        : upload_area} alt="" className="add-product-thumnail-img" />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>
            <button onClick={() => addProduct()} className="add-product-btn">Add</button>
        </div>
    );
}