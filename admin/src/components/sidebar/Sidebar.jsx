import { Link } from 'react-router-dom';

import './Sidebar.css';
import add_product_icon from '../assets/Product_Cart.svg';
import list_product_icon from '../assets/Product_list_icon.svg';

const sidebarLinks = [
    { path: "/add-product", label: "Add Product", icon: add_product_icon },
    { path: "/list-products", label: "List Products", icon: list_product_icon},
];

export default function Sidebar() {
    return (
        <div className="sidebar">
            {sidebarLinks.map(link => (
                <Link to={link.path} key={link.path} style={{textDecoration: "none"}}>
                    <div className="sidebar-item">
                        <img src={link.icon} alt="" />
                        <p>{link.label}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}