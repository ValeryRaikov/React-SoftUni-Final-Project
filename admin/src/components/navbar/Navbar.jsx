import './Navbar.css';
import nav_logo from '../assets/nav-logo.svg';
import nav_profile from '../assets/nav-profile.svg';

export default function Navbar() {
    return (
        <div className="navbar">
            <img src={nav_logo} alt="" className="nav-logo" />
            <img src={nav_profile} alt="" className="nav-profile" />
        </div>
    );
}