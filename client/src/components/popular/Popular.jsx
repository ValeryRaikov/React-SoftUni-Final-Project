import './Popular.css';
import data_product from '../assets/data'
import Item from '../item/Item';

export default function Popular() {
    return (
        <div className="popular">
            <h1>Popular In Women</h1>
            <hr />
            <div className="popular-item">
                {data_product.map((item) => <Item key={item.id} {...item} />)}
            </div>
        </div>
    );
}