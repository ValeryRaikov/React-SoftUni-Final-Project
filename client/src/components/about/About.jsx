import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './About.css';

const sidebarLinks = [
    { path: "company", label: "Company" },
    { path: "products", label: "Products" },
    { path: "offices", label: "Offices" },
    { path: "about-us", label: "About" },
    { path: "contact", label: "Contact" }
];

export default function About() {
    const location = useLocation();
    const currentPath = location.pathname.split("/").pop() || "company";

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
        </div>
    );
}
