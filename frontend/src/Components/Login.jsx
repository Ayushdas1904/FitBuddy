import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/login.css';


export default function Login({ setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.background = `linear-gradient(135deg, rgba(160, 160, 160, 0.8), rgba(7, 42, 111, 0.8))`;
    document.body.style.display = `flex`;
    document.body.style.alignItems = `center`;
    document.body.style.justifyItems = `center`;

    return () => {
      document.body.style.background = '';
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and calorieIntake in localStorage or state
        localStorage.setItem('token', data.token);
        localStorage.setItem('calorieIntake', data.calorieIntake); // Store calorieIntake
        alert('Login successful!');
        localStorage.setItem('currentUser', 'true');
        setCurrentUser(true); 
        navigate('/home'); // Redirect to home or another page
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="input-field">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Enter your email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Enter your password</label>
          </div>
          <div className="forget">
            <label htmlFor="remember">
              <input type="checkbox" id="remember" />
              <p>Remember me</p>
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Log In</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </>
  );
}
