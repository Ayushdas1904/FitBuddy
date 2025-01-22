import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/login.css';
import CalorieIntake from './calorieIntake';

export default function SignUp({ setLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCalorieForm, setShowCalorieForm] = useState(false);
  const [calorieIntake, setCalorieIntake] = useState(''); // New state for calorie intake
  const calorieSectionRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setShowCalorieForm(true); // Show the Calorie Intake form
  };

  useEffect(() => {
    if (showCalorieForm && calorieSectionRef.current) {
      calorieSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showCalorieForm]); // This effect will run when showCalorieForm becomes true
  

  const handleCalorieSubmit = async (calorieIntake) => {
    setCalorieIntake(calorieIntake); // Save calorie intake from CalorieIntake component

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, calorieIntake }), // Include calorie intake in the request
      });

      const data = await response.json();
      // console.log(data)

      if (response.ok) {
        alert(`User registered successfully with calorie intake of ${calorieIntake} KCal`);
        setLogin(false); // Set login to false after successful signup
        
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error registering user');
    }
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  useEffect(() => {
    document.body.style.background = `linear-gradient(135deg, rgba(160, 160, 160, 0.8), rgba(7, 42, 111, 0.8))`;

    return () => {
      document.body.style.background = ''; // Reset to default
    };
  }, []);

  return (
    <>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>SignUp</h2>
          <div className="input-field">
            <input
              value={name}
              onChange={handleChange(setName)}
              type="text"
              name="name"
              required
            />
            <label>Enter your name</label>
          </div>
          <div className="input-field">
            <input
              value={email}
              onChange={handleChange(setEmail)}
              type="email"
              name="email"
              required
            />
            <label>Enter your email</label>
          </div>
          <div className="input-field">
            <input
              value={password}
              onChange={handleChange(setPassword)}
              type="password"
              name="password"
              required
            />
            <label>Enter your password</label>
          </div>
          <div className="input-field">
            <input
              value={confirmPassword}
              onChange={handleChange(setConfirmPassword)}
              type="password"
              name="confirmPassword"
              required
            />
            <label>Confirm your password</label>
          </div>
          <button type="submit">Create Account</button>
        </form>
      </div>

      {/* Calorie Intake Section */}
      {showCalorieForm && (
        <div ref={calorieSectionRef} style={{ marginTop: '100px' }}>
          <CalorieIntake onSubmit={handleCalorieSubmit} onComplete={() => setLogin(false)} />
        </div>
      )}
    </>
  );
}
