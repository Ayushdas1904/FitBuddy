import React, { useEffect } from 'react'
import '../Style/home.css'

export default function Home() {
  
  
  return (
    <div className="home border">
      <div className="intro">
        <h1>I AM FITBUDDY👋</h1>
        <h4>YOUR PERSONAL HEALTH & FITNESS COMPANION!</h4>
      </div>
      <div className="ai">
        <h1>GET PERSONALISED AI-BASED MEAL PLANS & TIPS!</h1>
      </div>
      <div className="e-commerce">
        <h1>EXPLORE OUR E-COMMERCE SECTION FOR HEALTH & GYM SUPPLEMENTS!</h1>
      </div>
    </div>
  )
}
