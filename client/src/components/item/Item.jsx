import { Link } from 'react-router-dom';

import './Item.css';

export default function Item({
    id,
    name,
    image,
    newPrice,
    oldPrice,
}) {
    return (
        <div className="item">
            <Link to={`/product/${id}`}><img src={image} alt="" /></Link>
            <p>{name}</p>
            <div className="item-prices">
                <div className="item-price-new">
                    ${newPrice}
                </div>
                <div className="item-price-old">
                    ${oldPrice}
                </div>
            </div>
        </div>
    );
}