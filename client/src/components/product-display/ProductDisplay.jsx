import './ProductDisplay.css';
import star_icon from '../assets/star_icon.png';
import star_dull_icon from '../assets/star_dull_icon.png';
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';

export default function ProductDisplay({ 
    id,
    name,
    image,
    category,
    newPrice,
    oldPrice,
}) {
    const { addToCart } = useContext(ShopContext);

    return (
        <div className="display">
            <div className="display-left">
                <div className="display-img-list">
                    <img src={image} alt="" />
                    <img src={image} alt="" />
                    <img src={image} alt="" />
                    <img src={image} alt="" />
                </div>
                <div className="display-img">
                    <img src={image} alt="" className="display-main-img" />
                </div>
            </div>
            <div className="display-right">
                <h1>{name}</h1>
                <div className="display-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="display-right-prices">
                    <div className="display-right-price-old">${oldPrice}</div>
                    <div className="display-right-price-new">${newPrice}</div>
                </div>
                <div className="display-right-description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam quaerat dignissimos quis, nihil sit perspiciatis neque. Nostrum nisi reprehenderit sit labore animi ipsum provident, deserunt, placeat ut corporis rem? Delectus!
                </div>
                <div className="display-right-size">
                    <h1>Select Size</h1>
                    <div className="display-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                    </div>
                </div>
                <button onClick={() => addToCart(id)}>Add to cart</button>
                <p className="display-right-category"><span>Category: </span>{category} clothing</p>
                <p className="display-right-category"><span>Tags: </span>{category} clothing</p>
            </div>
        </div>
    );
}