import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/myProfile.css'
import CalorieIntake from './calorieIntake';

function MyProfile({
  setCurrentUser}) {
  const navigate = useNavigate();
  const [isLoggedOut, setLoggedOut] = useState(false);
  

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    setLoggedOut(true);
    localStorage.removeItem('currentUser'); // Remove the login status from localStorage
    setCurrentUser(false); //

    navigate('/login');
    window.location.reload(); // Reload the page to update navbar
  };

  return (
    <div className='profile-wrapper'>
      <h1>My Profile</h1>
      <div className="profile-page">
        {!isLoggedOut && <div className="logout" onClick={handleLogout}>Logout</div>}
      </div>
    </div>
  );
}

export default MyProfile;
