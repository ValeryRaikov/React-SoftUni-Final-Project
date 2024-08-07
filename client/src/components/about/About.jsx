import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";

import './About.css';
import hand_icon from '../assets/hand_icon.png';

const sidebarLinks = [
    { path: "company", label: "Company" },
    { path: "products", label: "Products" },
    { path: "offices", label: "Offices" },
    { path: "about-us", label: "About Us" },
    { path: "contact", label: "Contact" },
];

export default function About() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname.split("/").pop() || 'company';
    const isSidebarLinkSelected = sidebarLinks.some(link => link.path === currentPath);

    return (
        <div className="about">
            <div className="about-sidenav">
                {sidebarLinks.map((link) => (
                    <span
                        key={link.path}
                        className={currentPath === link.path ? 'active' : ''}
                    >
                        <Link to={link.path}>{link.label}</Link>
                    </span>
                ))}
            </div>

            <div className="about-content-container">
                {!isSidebarLinkSelected
                    ? (
                        <div className="about-content">
                            <h1>All About Shopify</h1>

                            <div className="about-content-description">
                                <img src={hand_icon} alt="" />
                                <div className="about-text">
                                    <p>This is the <span>About</span> section of Shopify.</p>
                                    <p>Use the navigation to the left to navigate to different sections and find everything you want to know about us!</p>
                                </div>
                            </div>
                            <div className="about-btn">
                                <button onClick={() => navigate('/')}>Go back</button>
                            </div>
                        </div>
                    )
                    : <Outlet />
                }
            </div>
        </div>
    );
}
