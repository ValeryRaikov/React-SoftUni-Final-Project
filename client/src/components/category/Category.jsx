import { useContext, useState, useEffect } from 'react';

import { ShopContext } from '../../context/ShopContext';
import './Category.css'
import dropdown_icon from '../assets/dropdown_icon.png';
import Item from '../item/Item';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

export default function Category({ 
    banner,
    category,
}) {
    const {allProducts} = useContext(ShopContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);

        return () => clearTimeout(timer);
    }, []);

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
            {!allProducts.length > 0 
                ? (loading 
                    ? <div className="loading-spinner"><LoadingSpinner /></div>
                    : <p className="error-message">Failed to fecth products</p>
                )
                : (<div className="category-products">
                    {allProducts.map(item => (
                        category === item.category 
                            ? <Item key={item.id} {...item} />
                            : null
                    ))}
                </div>
                )
            }
            <div className="category-loadmore">
                Explore More
            </div>
        </div>
    );
}