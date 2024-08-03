import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { ShopContext } from '../../context/ShopContext';

import './Navbar.css';
import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png';

export default function Navbar() {
    const { isAuthenticated } = useContext(AuthContext);
    const { clearCart, getTotalCartItems } = useContext(ShopContext);

    const navigate = useNavigate();
    const [menu, setMenu] = useState('shop');

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        clearCart(); 
        navigate('/');
    };

    return (
         <div className='navbar'>
            <div className='nav-logo'>
                <Link style={{textDecoration: 'none'}} to='/'>
                    <img src={logo} alt="" />
                </Link>
                    <p>Shopify</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => setMenu('shop')}>
                    <Link style={{textDecoration: 'none'}} to='/'>Shop</Link>
                    {menu === 'shop' ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu('men')}>
                    <Link style={{textDecoration: 'none'}} to='/men'>Men</Link>
                    {menu === 'men' ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu('women')}>
                    <Link style={{textDecoration: 'none'}} to='/women'>Women</Link>
                    {menu === 'women' ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu('kids')}>
                    <Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link>
                    {menu === 'kids' ? <hr /> : <></>}
                </li>
            </ul>
            <div className="nav-login-cart">
                <li onClick={() => setMenu('about')}>
                    <Link style={{textDecoration: 'none'}} to='/about'>About</Link>
                    {menu === 'about' ? <hr /> : <></>}
                </li>
                {localStorage.getItem('auth-token')
                    ? (<button onClick={handleLogout}>
                        Logout
                    </button>
                    )
                    : (<Link to='/login'>
                        <button>Login</button>
                    </Link>
                    )
                }
                {isAuthenticated && (<>
                <Link to='/cart'>
                    <img src={cart_icon} alt="" />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                </>)}
            </div>
         </div>
    );
}