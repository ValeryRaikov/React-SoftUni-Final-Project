import { useState } from 'react';
import './Registration.css';

export default function Registration() {
    const [state, setState] = useState('Login');

    return (
        <div className="registration">
            <div className="registration-container">
                <h1>{state}</h1>
                <div className="registration-fields">
                    {state === 'Sign Up' 
                        ? <input type="text" name="name" placeholder="Your name" />
                        : <></>
                    }
                    <input type="email" name="email" placeholder="Email address" />
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <button>Continue</button>
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