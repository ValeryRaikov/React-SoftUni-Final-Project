import { useNavigate } from 'react-router-dom';

import './NotFound.css';
import not_found from '../assets/404.png';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="not-found">
            <div className="not-found-box">
                <img src={not_found} alt="" />
                <h3>Oops, the page you are looking for doesn't exist!</h3>
                <button onClick={() => navigate('/add-product')}>Go back</button>
                <hr />
            </div>
        </div>
    );
}