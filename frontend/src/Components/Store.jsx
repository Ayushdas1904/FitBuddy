import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import '../Style/store.css';
import '../Style/navbar.css';
import '../index.css';
import Search from './Search';
import Menu from '../assets/menu.png';
import cross from '../assets/cross.svg';
import logo from '../assets/fitbuddy-logo-black.png';

export default function Store() {
    const [products, setProducts] = useState([]);
    const [cartClicked, setCartClicked] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        fetch("/products.json")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const images = [
        'https://img6.hkrtcdn.com/31201/prd_3120015-MuscleBlaze-Biozyme-Whey-Protein-4.4-lb-Ice-Cream-Chocolate_o.jpg',
        'https://m.media-amazon.com/images/I/81UQGYWDs1L.jpg',
        'https://darvideo.tv/wp-content/uploads/2021/02/ENJOY-VITAMINS-3.jpg',
    ];

    const Toast = ({ message, visible }) => {
        return (
            <div className={`toast ${visible ? 'show' : ''}`}>
                {message}
            </div>
        );
    };

    const [toastVisible, setToastVisible] = useState(false);
    const addToCart = (product) => {
        // Add the product to the cart
        setCartItems((prevItems) => [...prevItems, product]);

        // Show the toast
        setToastVisible(true);

        // Hide the toast after 3 seconds
        setTimeout(() => {
            setToastVisible(false);
        }, 3000);
    };

    const goToCart = () => {
        setCartClicked(true); // Open cart details
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState('');

    // Automatically change the image every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            slideNext();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const slideNext = () => {
        setSlideDirection('right');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const slidePrev = () => {
        setSlideDirection('left');
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const toggleCart = () => {
        setCartClicked((prev) => !prev);
    };


    const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_STRIPE_KEY);

    const payment = async () => {
        // setPopup(true);
        const stripe = await stripePromise;

        // Call your backend to create the checkout session
        const response = await fetch('http://localhost:3000/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({cartItems}),
        });

        const session = await response.json();

        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (error) {
            console.error('Stripe Checkout Error:', error);
        }
    };
    useEffect(() => {
        document.body.style.background = `white`;

        return () => {
            document.body.style.background = ``;
        };
    }, []);

    return (
        <div className="store">
            <div className="store-nav">
                <div>
                    <div className="store-logo">
                        {/* <img className='invert' width={'80px'} src={logo} alt="" /> */}

                        <h1 className='product-title'> FB Store</h1></div>
                    {/* <Search /> */}
                </div>
                <div className="cart">
                    <img onClick={toggleCart} className="cart-img" src="../src/assets/cart.png" alt="" />
                    {cartClicked ? (
                        <div className="cart-details">
                            <h3>CART</h3>
                            <ul className='cart-list'>
                                {cartItems.map((item, index) => (
                                    <li key={index}>
                                        <img src={item.imgSrc} alt="" />
                                        <span>{item.name} - ₹{item.price}</span>
                                        <button
                                            onClick={() => {
                                                payment();
                                                toggleCart();
                                            }}
                                        >CHECKOUT</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        null
                    )}
                </div>
                {/* {popup && (
                    <>
                        <div className="backdrop" onClick={() => setPopup(false)}></div>

                        <div className="payment">
                            <h3>Payment Processing</h3>
                            <button className='cross-btn' onClick={() => setPopup(false)}>
                                <img src={cross} alt="" />
                            </button>
                        </div>
                    </>
                )} */}

            </div>
            <div className="slideshow-container">
                <div className={`slideshow ${slideDirection}`}>
                    <img
                        src={images[currentIndex]}
                        alt="Store item"
                        className={`slide-image ${slideDirection}`}
                    />
                </div>

                <button onClick={slidePrev} className="prev-button">❮</button>
                <button onClick={slideNext} className="next-button">❯</button>
            </div>

            <div className="items-list">
                <Toast message="Item added to cart!" visible={toastVisible} />

                {products.map((product) => (
                    <div key={product.id} className={`card card${product.id}`}>
                        <div className="item-img">
                            <img src={product.imgSrc} alt={product.name} />
                        </div>
                        <div className="item-details">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <h3>₹{product.price}</h3>
                            <div onClick={() => addToCart(product)} className="add-to-cart">ADD TO CART</div>
                            {/* <div onClick={goToCart} className="add-to-cart">GO TO CART</div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
