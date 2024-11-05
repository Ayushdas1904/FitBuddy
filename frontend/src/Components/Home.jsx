import React, { useState, useEffect } from 'react'
import '../Style/home.css'
import '../Style/navbar.css'
import back1 from '../assets/back1.jpg'
import back3 from '../assets/back3.png'
import back2 from '../assets/back2.jpg'
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
    document.body.style.background = `linear-gradient(135deg, rgba(140, 170, 200, 0.9), rgba(7, 42, 111, 0.8))`;

    // document.body.style.backgroundImage = `url(${back1}) `
    // document.body.style.backgroundSize = "cover"
    // document.body.style.backgroundPosition = "center"
    // document.body.style.backgroundAttachment = "fixed"
    // document.body.style.backdropFilter = `blur(3px)`
    // document.querySelector(".indicator").style.border = `5px solid #667270`

    return () => {
      document.querySelector(".indicator").style.border = ''
      document.body.style.backgroundImage = '';

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
            <h1>I am FITBUDDY👋</h1>
            <h5>YOUR PERSONAL HEALTH & FITNESS COMPANION!</h5>
          </div>
          <div className="ai slide">
            <h1>GET PERSONALISED AI-BASED MEAL PLANS & TIPS!</h1>
          </div>
          <div className="e-commerce slide">
            <h1>EXPLORE OUR E-COMMERCE SECTION FOR HEALTH & GYM SUPPLEMENTS!</h1>
          </div>
        </>

      )}
    </div >

  )
}
