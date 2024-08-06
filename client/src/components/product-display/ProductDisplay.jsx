import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { AuthContext } from '../../context/AuthContext';
import useProductLikes  from '../../hooks/useProductLikes';

import './ProductDisplay.css';
import star_icon from '../assets/star_icon.png';
import star_dull_icon from '../assets/star_dull_icon.png';

export default function ProductDisplay({ 
    id,
    name,
    image,
    category,
    newPrice,
    oldPrice,
}) {
    const { addToCart } = useContext(ShopContext);
    const { isAuthenticated } = useContext(AuthContext);
    const { 
        likes,
        likeProduct, 
        dislikeProduct, 
        error,
    } = useProductLikes(id, isAuthenticated);

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
                    <p>({likes})</p>
                </div>
                <div className="display-right-prices">
                    <div className="display-right-price-old">${oldPrice}</div>
                    <div className="display-right-price-new">${newPrice}</div>
                </div>
                <div className="display-right-description">
                    {`${name} is the perfect ${category} clothing for everyday. Made of fine materials and 100% cotton, our clothes are suitable for everyone. Now, don't miss the opportunity and get it for only ${newPrice}!`}
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
                <div className="display-right-btn-box">
                <button className="add-btn" onClick={() => addToCart(id)}>Add to cart</button>
                    <div className="display-right-likes">
                        {isAuthenticated && 
                        <div className="likes-btn-box">
                            <button className="like-btn" onClick={likeProduct}>Like</button>
                            <button className="dislike-btn" onClick={dislikeProduct}>Dislike</button>
                        </div>
                        }
                    </div>
                </div>

                {error && <p className="error-message">{error}</p>}

                <p className="likes">Total likes: <span>{likes}</span></p>
                <p className="display-right-category"><span>Category: </span>{category} clothing</p>
                <p className="display-right-category"><span>Tags: </span>{category} clothing</p>
            </div>
        </div>
    );
}