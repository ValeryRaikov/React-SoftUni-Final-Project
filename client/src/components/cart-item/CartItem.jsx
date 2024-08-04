import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../context/ShopContext';
import './CartItem.css';
import remove_icon from '../assets/cart_cross_icon.png';

const promocodes = {
    LOYAL5: 0.95,  // 5% discount
    HappY10: 0.90,  // 10% discount
    MaGiC20_: 0.80,  // 20% discount
}

export default function CartItem() {
    const { allProducts, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
    const [promocode, setPromocode] = useState('');
    const [discount, setDiscount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(getTotalCartAmount());

    useEffect(() => {
        setTotalPrice(getTotalCartAmount() * discount);
    }, [discount, getTotalCartAmount]);

    const handlePromocodeChange = (e) => {
        setPromocode(e.target.value);
    };

    const handlePromocodeSubmit = () => {
        let isValidCode = false;

        for (let code in promocodes) {
            if (promocode === code) {
                setDiscount(promocodes[code]);
                isValidCode = true;
                break;
            }
        }

        if (!isValidCode) {
            setPromocode('Invalid promo code!');
            setDiscount(1);
        }
    }

    return (
        <div className="cart-items">
            <div className="cart-items-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {allProducts.map(item => {
                const quantity = cartItems[item.id];
                if (quantity > 0) {
                    return (
                        <div key={item.id}>
                            <div className="cart-items-format cart-items-format-main">
                                <img src={item.image} alt={item.name} className="cart-items-product-icon" />
                                <p>{item.name}</p>
                                <p>${item.newPrice}</p>
                                <button className="cart-items-quantity">{quantity}</button>
                                <p>${item.newPrice * quantity}</p>
                                <img 
                                    src={remove_icon} 
                                    alt="" 
                                    className="cart-items-remove-icon" 
                                    onClick={() => removeFromCart(item.id)} 
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }

                return null;
            })}
            <div className="cart-items-down">
                <div className="cart-items-total">
                    <h1>Cart Totals:</h1>
                    <div>
                        <div className="cart-items-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-items-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cart-items-total-item">
                            <h3>Total</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                    </div>
                    <button>Proceed to checkout</button>
                </div>
                <div className="cart-items-promocode">
                    <p>If you have a promo code, Enter it here...</p>
                    <div className="cart-items-promobox">
                        <input 
                            value={promocode} 
                            onChange={handlePromocodeChange} 
                            type="text" 
                            name="promocode"
                            placeholder="Promo Code"
                        />
                        <button onClick={handlePromocodeSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
