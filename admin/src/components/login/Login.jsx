import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import './Login.css';

const BASE_URL = 'http://localhost:3030';

export default function Login() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const validateForm = () => {
        if (formData.email.trim() === '') {
            setError('Email is required');
            return false;
        }

        if (formData.password.trim() === '') {
            setError('Password is required');
            return false;
        }

        return true;
    };

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const submitHandler = async (e) => {
        if(!validateForm) {
            return;
        }

        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/admin-login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            } 

            setIsAuthenticated(true);
            navigate('/list-products');
        } catch (err) {
            setError(err.message || 'Server error. Please try again later.');
        }
    };

    return (
        <div className="admin-login">
            <h1>Admin Login</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        value={formData.email} 
                        onChange={changeHandler} 
                        type="email" 
                        name="email"
                        placeholder='Enter email...'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        value={formData.password} 
                        onChange={changeHandler} 
                        type="password" 
                        name="password"
                        placeholder="Enter passwrod..."
                        required 
                    />
                </div>
                <button onClick={submitHandler}>Login</button>
            </form>
        </div>
    );
};