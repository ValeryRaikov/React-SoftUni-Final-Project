import { useContext } from 'react';

import { ShopContext } from '../../context/ShopContext';
import './Category.css'
import dropdown_icon from '../assets/dropdown_icon.png';
import Item from '../item/Item';

export default function Category({ 
    banner,
    category,
}) {
    const {allProducts} = useContext(ShopContext);

    return (
        <div className="category">
            <img className='category-banner' src={banner} alt="" />
            <div className='category-indexSort'>
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className='category-sort'>
                    Sort by <img src={dropdown_icon} alt=""/>
                </div>
            </div>
            <div className="category-products">
                {allProducts.map(item => (
                    category === item.category 
                        ? <Item key={item.id} {...item} />
                        : null
                ))}
            </div>
            <div className="category-loadmore">
                Explore More
            </div>
        </div>
    );
}