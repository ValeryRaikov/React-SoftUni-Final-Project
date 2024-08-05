import { Link } from 'react-router-dom';

import './Warning.css';

export default function Warning() {
    return (
        <div className="error-box">
            <h1>Login to access admin rights</h1>
            <Link to="/admin-login">
                <button>Login</button>
            </Link>
        </div>
    );
}