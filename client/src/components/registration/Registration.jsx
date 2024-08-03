import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Registration.css';

const BASE_URL = 'http://localhost:3030';

export default function Registration() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [state, setState] = useState('Login');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const changeHandler = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value,
        });
    }

    const validateForm = () => {
        if (state === 'Sign Up' && formData.username.trim() === '') {
            setError('Username is required');
            return false;
        }
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

    const login = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Login Error!');
            }

            const result = await response.json();

            if (result.success) {
                localStorage.setItem('auth-token', result.token);
                navigate('/');
            } else {
                setError(result.errors);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    const signup = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('SignUp Error!');
            }

            const result = await response.json();

            if (result.success) {
                localStorage.setItem('auth-token', result.token);
                navigate('/');
            } else {
                setError(result.errors);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="registration">
            <div className="registration-container">
                <div className="registration-header-box">
                    <h1>{state}</h1>
                    {error 
                        ? <p className="error-message">{state === 'Sign Up' 
                            ? 'Error Signing up!'
                            : 'Error Logging in!'
                        }</p> 
                        : <></>
                    }
                </div>
                <div className="registration-fields">
                    {state === 'Sign Up' 
                        ? <input 
                                onChange={changeHandler}
                                value={formData.username}
                                type="text" 
                                name="username" 
                                placeholder="Your name" 
                            />
                        : <></>
                    }
                    <input 
                        onChange={changeHandler}
                        value={formData.email}
                        type="email" 
                        name="email" 
                        placeholder="Email address" 
                    />
                    <input 
                        onChange={changeHandler}
                        value={formData.password}
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                    />
                </div>
                <button onClick={() => state === 'Login' ? login(): signup()}>Continue</button>
                {state === 'Sign Up' 
                    ? <p className="registration-login">Already have an account? <span onClick={() => setState('Login')}>Login here</span></p>
                    : <p className="registration-login">Create an account <span onClick={() => setState('Sign Up')}>Click here</span></p>
                }
                <div className="registration-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, I agree to the terms of use & privacypolicy.</p>
                </div>
            </div>
        </div>
    );
}