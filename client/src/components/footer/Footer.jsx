import { useNavigate } from 'react-router-dom';

import './Footer.css';
import footer_logo from '../assets/logo_big.png';
import instagram_icon from '../assets/instagram_icon.png';
import pinterest_icon from '../assets/pinterest_icon.png';
import whatsapp_icon from '../assets/whatsapp_icon.png';

export default function Footer() {
    const navigate = useNavigate();

    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>Shopify</p>
            </div>
            <ul className="footer-links">
                <li onClick={() => navigate('/about/company')}>Company</li>
                <li onClick={() => navigate('/about/products')}>Products</li>
                <li onClick={() => navigate('/about/offices')}>Offices</li>
                <li onClick={() => navigate('/about/about-us')}>About Us</li>
                <li onClick={() => navigate('/about/contact')}>Contact</li>
            </ul>
            <div className="footer-socials-icons">
                <div className="footer-icons-container">
                    <img src={instagram_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={pinterest_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={whatsapp_icon} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Rights Reserved</p>
            </div>
        </div>
    );
}
