import './AboutUs.css';
import hero_image from '../assets/hero_image.png';

export default function AboutUs() {
    return (
        <div className="about-us">
            <h2>About Us</h2>
            <div className="about-us-container">
                <div className="container-description">
                    <p>At Shopify, we believe in empowering every individual to express themselves through fashion and lifestyle choices. Our journey began with a simple mission: to curate high-quality, stylish products that inspire confidence and joy. From our humble beginnings to becoming a beloved brand, we’ve remained committed to our core values of quality, innovation, and customer satisfaction.</p>
                    <p>With a passionate team dedicated to excellence, we strive to create a unique shopping experience where every product tells a story. Our carefully selected collections reflect our belief in sustainability, craftsmanship, and timeless style. Join us on this exciting journey as we continue to redefine fashion and lifestyle, one trend at a time.</p>
                    <p>Thank you for being a part of our story. Let’s make something amazing together!</p>
                </div>
                <img src={hero_image} alt="" />
            </div>
        </div>
    );
}