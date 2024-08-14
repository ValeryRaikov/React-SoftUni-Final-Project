import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../context/ShopContext';

import './Category.css';

import Item from '../item/Item';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

export default function Category({ 
    banner,
    category,
}) {
    const { allProducts } = useContext(ShopContext);
    const [loading, setLoading] = useState(true);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortOption, setSortOption] = useState('id-asc');
    const [searchQuery, setSearchQuery] = useState('');  
    const [searchTrigger, setSearchTrigger] = useState('');  

    useEffect(() => {
        (async () => {
            setLoading(true);
            if (allProducts.length > 0) {
                sortProducts(sortOption, searchTrigger);  
            }
            setLoading(false);
        })();
    }, [allProducts, category, sortOption, searchTrigger]);  

    const sortProducts = (option, searchQuery) => {
        let sorted = [...allProducts]
            .filter(item => item.category === category)
            .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));  
        
        sorted.sort((a, b) => {
            if (option === 'id-asc') {
                return a._id.localeCompare(b._id);
            } else if (option === 'id-desc') {
                return b._id.localeCompare(a._id);
            } else if (option === 'newPrice-asc') {
                return a.newPrice - b.newPrice;
            } else if (option === 'newPrice-desc') {
                return b.newPrice - a.newPrice;
            }
        });

        setSortedProducts(sorted);
    };

    const onSortChange = (value) => {
        setSortOption(value);
    };

    const onSearchChange = (e) => {
        setSearchQuery(e.target.value);  
    };

    const onSearchClick = () => {
        setSearchTrigger(searchQuery); 
    };

    return (
        <div className="category">
            <img className='category-banner' src={banner} alt="" />
            <div className='category-indexSort'>
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="search-bar">
                    <input 
                        value={searchQuery} 
                        onChange={onSearchChange} 
                        type="text" 
                        placeholder="Enter product name..."  
                    />
                    <button onClick={onSearchClick}>Search</button>  
                </div>
                <div className='category-sort'>
                    <label htmlFor="sort">Sort by: </label>
                    <select 
                        id="sort" 
                        value={sortOption} 
                        onChange={(e) => onSortChange(e.target.value)}
                    >
                        <option value="id-asc">ID [ASC]</option>
                        <option value="id-desc">ID [DESC]</option>
                        <option value="newPrice-asc">Price [ASC]</option>
                        <option value="newPrice-desc">Price [DESC]</option>
                    </select>
                </div>
            </div>
            {loading 
                ? <div className="loading-spinner"><LoadingSpinner /></div>
                : !sortedProducts.length 
                    ? <p className="error-message">No products found</p>
                    : <div className="category-products">
                        {sortedProducts.map(item => (
                            <Item key={item.id} {...item} />
                        ))}
                    </div>
            }
            <div className="category-loadmore">
                Explore More
            </div>
        </div>
    );
}
