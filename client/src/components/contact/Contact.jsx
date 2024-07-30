import './Contact.css';
import instagram_icon from '../assets/instagram_icon.png';
import pinterest_icon from '../assets/pinterest_icon.png';
import whatsapp_icon from '../assets/whatsapp_icon.png';

export default function Contact() {
    return (
        <div className="contact">
            <h2>Contacts</h2>
            <div className="contact-email">
                <i class="fa-solid fa-envelope"></i>
                <p>shopify-shop@gmail.com</p>
            </div>
            <div className="contact-phone">
                <i class="fa-solid fa-phone"></i>
                <p>+359887111899</p>
            </div>
            <div className="contact-socials-icons">
                <h2>Or follow us...</h2>
                <img src={instagram_icon} alt="" />
                <img src={pinterest_icon} alt="" />
                <img src={whatsapp_icon} alt="" />
            </div>
        </div>
    );
}