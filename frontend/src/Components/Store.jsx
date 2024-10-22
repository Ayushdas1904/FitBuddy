import React, { useState, useEffect } from 'react'
import '../Style/store.css'
import '../Style/navbar.css'
import Search from './Search'

export default function Store() {
    const images = [
        '../src/assets/image1.jpg',
        '../src/assets/image2.jpg',
        '../src/assets/image3.jpg',
        // Add more images as needed
    ];

    const Toast = ({ message, visible }) => {
        return (
            <div className={`toast ${visible ? 'show' : ''}`}>
                {message}
            </div>
        );
    };

    const [toastVisible, setToastVisible] = useState(false);
    const addToCart = () => {
        // Show the toast
        setToastVisible(true);

        // Hide the toast after 3 seconds
        setTimeout(() => {
            setToastVisible(false);
        }, 3000);
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState(''); // 'left' or 'right'

    // Automatically change the image every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            slideNext(); // Automatically move to the next image
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Clean up on component unmount
    }, []);


    const slideNext = () => {
        setSlideDirection('right');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Wrap around with %
    };

    const slidePrev = () => {
        setSlideDirection('left');
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Wrap around in reverse
    };

    return (
        <div className="store">
            <div className="store-nav">
                <div className='store-logo' >FitBuddy Store</div>
                <Search />
                <div className='cart'><img src="../src/assets/cart.svg" alt="" /></div>
            </div>
            <div className="slideshow-container">
                <div className={`slideshow ${slideDirection}`}>
                    <img
                        src={images[currentIndex]}
                        alt="Store item"
                        className={`slide-image ${slideDirection}`}
                    />
                </div>

                {/* Navigation buttons */}
                <button onClick={slidePrev} className="prev-button">❮</button>
                <button onClick={slideNext} className="next-button">❯</button>
            </div>

            <div className="items-list">

                {/* TOAST */}
                <Toast message="Item added to cart!" visible={toastVisible} />

                <div className="card card1">
                    <div className="item-img"><img src="https://img8.hkrtcdn.com/35865/prd_3586407-MuscleBlaze-Creatine-Monohydrate-CreAMP-0.55-lb-Unflavoured_c_m.jpg" alt="" /></div>
                    <div className="item-details">
                        <h3>Creatine Monohydrate CreAMP</h3>
                        <>0.55 lb Unflavoured</>
                        <h3>₹899</h3>
                        <div onClick={() => addToCart()} className="add-to-cart">ADD TO CART</div>
                        <div onClick={() => goToCart()} className="add-to-cart">GO TO CART</div>
                    </div>

                </div>
                <div className="card card2">
                    <div className="item-img"><img src="https://img8.hkrtcdn.com/35865/prd_3586407-MuscleBlaze-Creatine-Monohydrate-CreAMP-0.55-lb-Unflavoured_c_m.jpg" alt="" /></div>
                    <div className="item-details">
                        <h3>Creatine Monohydrate CreAMP</h3>
                        <h4>0.55 lb Unflavoured</h4>
                        <h3>₹899</h3>
                        <div onClick={() => addToCart()} className="add-to-cart">ADD TO CART</div>
                    </div>
                </div>
                <div className="card card3">
                    <div className="item-img"><img src="https://img8.hkrtcdn.com/35865/prd_3586407-MuscleBlaze-Creatine-Monohydrate-CreAMP-0.55-lb-Unflavoured_c_m.jpg" alt="" /></div>
                    <div className="item-details">
                        <h3>Creatine Monohydrate CreAMP</h3>
                        <h4>0.55 lb Unflavoured</h4>
                        <h3>₹899</h3>
                        <div onClick={() => addToCart()} className="add-to-cart">ADD TO CART</div>
                    </div>
                </div>
                <div className="card card4">
                    <div className="item-img"><img src="https://img8.hkrtcdn.com/35865/prd_3586407-MuscleBlaze-Creatine-Monohydrate-CreAMP-0.55-lb-Unflavoured_c_m.jpg" alt="" /></div>
                    <div className="item-details">
                        <h3>Creatine Monohydrate CreAMP</h3>
                        <h4>0.55 lb Unflavoured</h4>
                        <h3>₹899</h3>
                        <div onClick={() => addToCart()} className="add-to-cart">ADD TO CART</div>
                    </div>
                </div>
                <div className="card card5">
                    <div className="item-img"><img src="https://img8.hkrtcdn.com/35865/prd_3586407-MuscleBlaze-Creatine-Monohydrate-CreAMP-0.55-lb-Unflavoured_c_m.jpg" alt="" /></div>
                    <div className="item-details">
                        <h3>Creatine Monohydrate CreAMP</h3>
                        <h4>0.55 lb Unflavoured</h4>
                        <h3>₹899</h3>
                        <div onClick={() => addToCart()} className="add-to-cart">ADD TO CART</div>
                    </div>
                </div>
                <div className="card card6">
                    <div className="item-img"><img src="https://img8.hkrtcdn.com/35865/prd_3586407-MuscleBlaze-Creatine-Monohydrate-CreAMP-0.55-lb-Unflavoured_c_m.jpg" alt="" /></div>
                    <div className="item-details">
                        <h3>Creatine Monohydrate CreAMP</h3>
                        <h4>0.55 lb Unflavoured</h4>
                        <h3>₹899</h3>
                        <div onClick={() => addToCart()} className="add-to-cart">ADD TO CART</div>
                    </div>
                </div>
                <div className="card card7">
                    <div className="item-img"><img src="https://img8.hkrtcdn.com/35865/prd_3586407-MuscleBlaze-Creatine-Monohydrate-CreAMP-0.55-lb-Unflavoured_c_m.jpg" alt="" /></div>
                    <div className="item-details">
                        <h3>Creatine Monohydrate CreAMP</h3>
                        <h4>0.55 lb Unflavoured</h4>
                        <h3>₹899</h3>
                        <div onClick={() => addToCart()} className="add-to-cart">ADD TO CART</div>
                    </div>
                </div>
                <div className="card card8">
                    <div className="item-img"><img src="https://img8.hkrtcdn.com/35865/prd_3586407-MuscleBlaze-Creatine-Monohydrate-CreAMP-0.55-lb-Unflavoured_c_m.jpg" alt="" /></div>
                    <div className="item-details">
                        <h3>Creatine Monohydrate CreAMP</h3>
                        <h4>0.55 lb Unflavoured</h4>
                        <h3>₹899</h3>
                        <div onClick={() => addToCart()} className="add-to-cart">ADD TO CART</div>
                    </div>
                </div>
                <div className="card card9">
                    <div className="item-img"><img src="https://img8.hkrtcdn.com/35865/prd_3586407-MuscleBlaze-Creatine-Monohydrate-CreAMP-0.55-lb-Unflavoured_c_m.jpg" alt="" /></div>
                    <div className="item-details">
                        <h3>Creatine Monohydrate CreAMP</h3>
                        <h4>0.55 lb Unflavoured</h4>
                        <h3>₹899</h3>
                        <div onClick={() => addToCart()} className="add-to-cart">ADD TO CART</div>
                    </div>
                </div>
                <div className="card card10">
                    <div className="item-img"><img src="https://img8.hkrtcdn.com/35865/prd_3586407-MuscleBlaze-Creatine-Monohydrate-CreAMP-0.55-lb-Unflavoured_c_m.jpg" alt="" /></div>
                    <div className="item-details">
                        <h3>Creatine Monohydrate CreAMP</h3>
                        <h4>0.55 lb Unflavoured</h4>
                        <h3>₹899</h3>
                        <div onClick={() => addToCart()} className="add-to-cart">ADD TO CART</div>
                    </div>
                </div>
                <div className="card card11">
                    <div className="item-img"><img src="https://img8.hkrtcdn.com/35865/prd_3586407-MuscleBlaze-Creatine-Monohydrate-CreAMP-0.55-lb-Unflavoured_c_m.jpg" alt="" /></div>
                    <div className="item-details">
                        <h3>Creatine Monohydrate CreAMP</h3>
                        <h4>0.55 lb Unflavoured</h4>
                        <h3>₹899</h3>
                        <div onClick={() => addToCart()} className="add-to-cart">ADD TO CART</div>
                    </div>
                </div>
                <div className="card card12">
                    <div className="item-img"><img src="https://img8.hkrtcdn.com/35865/prd_3586407-MuscleBlaze-Creatine-Monohydrate-CreAMP-0.55-lb-Unflavoured_c_m.jpg" alt="" /></div>
                    <div className="item-details">
                        <h3>Creatine Monohydrate CreAMP</h3>
                        <h4>0.55 lb Unflavoured</h4>
                        <h3>₹899</h3>
                        <div onClick={() => addToCart()} className="add-to-cart">ADD TO CART</div>
                    </div>
                </div>
                <div className="card card13">
                    <div className="item-img"><img src="https://img8.hkrtcdn.com/35865/prd_3586407-MuscleBlaze-Creatine-Monohydrate-CreAMP-0.55-lb-Unflavoured_c_m.jpg" alt="" /></div>
                    <div className="item-details">
                        <h3>Creatine Monohydrate CreAMP</h3>
                        <h4>0.55 lb Unflavoured</h4>
                        <h3>₹899</h3>
                        <div onClick={() => addToCart()} className="add-to-cart">ADD TO CART</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
