import React, { useState, useEffect } from 'react';
import '../Style/home.css';
import logo from '../assets/fitbuddy-logo-black.png';
import test from '../assets/test.png';
import cart from '../assets/cart.png';
import ai from '../assets/ai_home.png';

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
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.background = `linear-gradient(145deg, #0e0e0e, #121212)`;
    return () => document.body.style.background = '';
  }, []);

  return (
    <div className="home">
      {loading ? (
        <div className="splash-screen">
          <div className="logo">
            <img src={logo} style={{ filter: 'invert(1)' }} alt="FitBuddy Logo" />
          </div>
          <div className="quote">
            <h4>{quote}</h4>
          </div>
        </div>
      ) : (
        <div className="sections">
          <section className="section">
            <div className="text">
              <h1>I'm <span className="highlight">FitBuddy</span> 👋</h1>
              <h5>Your Personal Health & Fitness Companion</h5>
            </div>
            <img src={test} alt="Food" />
          </section>

          <section className="section dark">
            <div className="text">
              <h1>AI-Based Meal Plans & Health Tips</h1>
              <p>Get personalized AI-powered insights to stay on track!</p>
            </div>
            <img src={ai} alt="AI Section" />
          </section>

          <section className="section">
            <div className="text">
              <h1>Supplements & E-Commerce</h1>
              <p>Buy premium gym & health supplements at the best prices.</p>
            </div>
            <img src={cart} alt="E-commerce" />
          </section>
        </div>
      )}
    </div>
  );
}
