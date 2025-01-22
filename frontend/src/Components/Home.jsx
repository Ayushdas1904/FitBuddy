import React, { useState, useEffect } from 'react'
import '../Style/home.css'
import '../Style/navbar.css'
import '../index.css'
import test from '../assets/test.png'
import cart from '../assets/cart.png'
import ai from '../assets/ai_home.png'
import back4 from '../assets/back4.jpg'
import logo from '../assets/fitbuddy-logo-black.png'



export default function Home() {

  const quotes = [
    "Push yourself, because no one else is going to do it for you.",
    "Success starts with self-discipline.",
    "Fitness is not a destination, it’s a way of life.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Don’t stop when you’re tired. Stop when you’re done."
  ];
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show splash screen for 3 seconds

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  useEffect(() => {
    document.body.style.background = `linear-gradient(90deg, rgba(23,33,121,1) 22%, rgba(210,41,41,1) 100%)`;
    // document.body.style.background = `rgba(100, 100, 200, 1)`;
    document.querySelector(".indicator").style.border = ` 5px solid #172179`;


    document.querySelector(".navbar").style.position = 'relative';
    document.querySelector(".navbar").style.left = `19px`;

    document.querySelector("footer").style.position = 'relative';
    document.querySelector("footer").style.left = `19px`;
    document.querySelector("footer").style.margin = `0px`;

    return () => {
      document.querySelector(".indicator").style.border = '';
      document.body.style.background = '';

      document.querySelector(".navbar").style.position = '';
      document.querySelector(".navbar").style.left = ``;

      document.querySelector("footer").style.position = '';
      document.querySelector("footer").style.left = ``;
    document.querySelector("footer").style.margin = ``;

    }
  }, [])



  return (

    <div className="home">
      {loading ? (
        <div className="splash-screen">
          <div className="logo">
            <img src={logo} alt="FitBuddy Logo" />
          </div>
          <div className="quote">
            <h4>{quote}</h4>
          </div>
        </div>
      ) : (
        <>
          <div className="intro slide">
            <div className="title">
            <h1>I am FITBUDDY👋</h1>
            <h5>YOUR PERSONAL HEALTH & FITNESS COMPANION!</h5>
            </div>
            <img id='food' src={test} alt="" />
          </div>
          <div className="ai slide">
            <div className="title"><h1>GET PERSONALISED AI-BASED MEAL PLANS & TIPS!</h1></div>
            <img className='invert' id='food' src={ai} alt="" />
          </div>
          <div className="e-commerce slide">
          <img id='cart' src={cart} alt="" />
            <div className='title'><h1>EXPLORE OUR E-COMMERCE SECTION FOR HEALTH & GYM SUPPLEMENTS!</h1></div>
            
          </div>
        </>

      )}
    </div >

  )
}
