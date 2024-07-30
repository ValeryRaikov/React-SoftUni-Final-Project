import './Company.css';
import logo from '../assets/logo.png';

export default function Company() {
    return (
        <div className="company">
            <div className="company-header">
                <img src={logo} alt="" />
                <h2>Our Company</h2>
            </div>
            <div className="company-description">
            <p>Welcome to Shopify, your one-stop destination for the latest in fashion and lifestyle. We are dedicated to providing you with the best of what the fashion world has to offer, with a focus on dependability, customer service, and uniqueness. Whether you’re looking for trendy clothing, stylish accessories, or home decor, we’ve got something for everyone.</p>
            <h3>Our Journey</h3>
            <p>Founded in 2020, Shopify has come a long way from its beginnings. What started as a small operation with a passion for fashion has grown into a bustling online marketplace. Our commitment to quality and style has helped us expand our offerings and reach customers all over the world. We are proud of our diverse range of products, carefully curated to meet the needs and tastes of our global clientele.</p>
            <h3>Our Mission</h3>
            <p>At Shopify, our mission is to inspire and empower individuals to express themselves through fashion. We believe that clothing and accessories are more than just items; they are a way to tell your story and showcase your personality. Our collections are designed to be versatile and inclusive, offering something for every style and occasion.</p>
            <h3>Our Values</h3>
            <div className="company-list-display">
                <ol>
                    <li><span>Quality:</span> We prioritize quality in every aspect of our business, from the materials we use to the customer service we provide. We believe that good fashion should not only look good but also feel good.</li>
                    <li><span>Innovation:</span> The fashion world is constantly evolving, and so are we. We are always on the lookout for the latest trends and innovative products to add to our store.</li>
                    <li><span>Sustainability:</span> We are committed to sustainable practices and strive to reduce our environmental impact. From eco-friendly packaging to supporting brands that prioritize sustainability, we are doing our part to protect our planet.</li>
                    <li><span>Customer Satisfaction:</span> Our customers are at the heart of everything we do. We aim to provide a seamless shopping experience and are always here to help with any questions or concerns.</li>
                </ol>
            </div>
            <h3>Our team</h3>
            <p>Our dedicated team is a mix of passionate fashion enthusiasts, creative designers, and experienced professionals. We work tirelessly to bring you the best products and keep our website up-to-date with the latest trends. Our customer service team is always ready to assist you with any inquiries, ensuring that your shopping experience is smooth and enjoyable.</p>
            <h3>Join Us on Our Journey</h3>
            <p>We are grateful for the love and support from our customers and look forward to continuing our journey with you. Whether you are a fashion-forward individual or someone looking for a wardrobe refresh, we invite you to explore our collections and find pieces that make you feel your best.</p>
            <p>Thank you for choosing Shopify. Happy shopping!</p>
            </div>        
        </div>
    );
}