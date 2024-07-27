import './Newsletter.css';

export default function Newsletter() {
    return (
        <div className="newsletter">
            <h1>Get Exclusive Offers On Your Email</h1>
            <p>Subscribe to our newsletter to stay updated</p>
            <div>
                <input type="email" placeholder='Your Email' />
                <button>Subscribe</button>
            </div>
        </div>
    );
}