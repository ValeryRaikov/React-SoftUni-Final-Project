import { Link } from 'react-router-dom';

import './ProductsAbout.css';
import product_1 from '../assets/product_1.png';
import product_4 from '../assets/product_4.png';
import product_5 from '../assets/product_5.png';
import product_14 from '../assets/product_14.png';
import product_24 from '../assets/product_24.png';
import product_28 from '../assets/product_28.png';
import product_30 from '../assets/product_30.png';

export default function ProductsAbout() {
    return (
        <div className="products-about">
            <h2>Our Products</h2>
            <p>At Shopify, we offer a curated selection of high-quality products that cater to all your fashion and lifestyle needs. From trendy apparel and stylish accessories to chic home decor, our collections are designed to inspire and empower you. Each item is carefully chosen for its quality, craftsmanship, and unique style, ensuring that you find something special every time you shop with us. Whether you're looking for the latest fashion trends or timeless pieces, Shopify has you covered.</p>
            <h2>Bestsellers</h2>
            <div className="products-about-gallery">
                <img src={product_1} alt="" />
                <div className="gallery-right">
                    <div className="up">
                        <img src={product_14} alt="" />
                        <img src={product_4} alt="" />
                        <img src={product_30} alt="" />
                    </div>
                    <div className="down">
                        <img src={product_28} alt="" />
                        <img src={product_24} alt="" />
                        <img src={product_5} alt="" />
                    </div>
                </div>
            </div>
            <div className="products-about-shop">
                <h2>Shop Now</h2>
                <div className="shop-links">
                    <ul>
                        <li><Link to='/men'>Men</Link></li>
                        <li><Link to='/women'>Women</Link></li>
                        <li><Link to='/kids'>Kids</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}