import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import './DescriptionBox.css';

export default function DescriptionBox({
    name,
    image,
    category,
    newPrice,
    oldPrice,
    available,
    date,
}) {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="description-box">
            <div className="description-box-navigator">
                <div className="description-box-nav-box">Description</div>
                <div className="description-box-nav-box fade">Reviews (122)</div>
            </div>
            <div className="description-box-description">
            {!isAuthenticated
                ? <p className="warning-message">You need to be logged in to see this.</p>
                : (
                    <>
                        <p><span className="title">Product:</span> {name}</p>
                        <p><span className="title">Category:</span> {category}</p>
                        <p><span className="title">Price:</span> <span className="old-price">${oldPrice}</span> <span className="new-price">${newPrice}</span></p>
                        {available ? <p className="in-stock">In Stock</p> : <p className="out-of-stock">Out of Stock</p>}
                        <p><span className="title">Year:</span> {new Date(date).getFullYear()}</p>
                    </>
                )
            }
            </div>
        </div>
    );
}