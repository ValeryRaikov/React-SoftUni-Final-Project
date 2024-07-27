import './Registration.css';

export default function Registration() {
    return (
        <div className="registration">
            <div className="registration-container">
                <h1>Sign Up</h1>
                <div className="registration-fields">
                    <input type="text" name="name" placeholder="Your name" />
                    <input type="email" name="email" placeholder="Email address" />
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <button>Continue</button>
                <p className="registration-login">Already have an account? <span>Login here</span></p>
                <div className="registration-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, I agree to the terms of use & privacypolicy.</p>
                </div>
            </div>
        </div>
    );
}