import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Authentication from './Authentication.jsx'
import NavBar from "./NavBar.jsx";

import Home from "./Components/Home.jsx";
import Ai from "./Components/Ai.jsx";
import Login from "./Components/Login.jsx";
import SignUp from './Components/SignUp.jsx';
import Food from "./Components/Food.jsx";
import Store from "./Components/Store.jsx";
import MyProfile from "./Components/MyProfile.jsx";
import Footer from './Footer.jsx'
import Cursor from "./Components/Cursor.jsx";
import Payment from "./Components/Payment.jsx";
import Success from "./Components/Success.jsx";
import Cancel from "./Components/Cancel.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser === 'true'; // This will return `true` if the user is logged in
  });

  useEffect(() => {
    // Update the currentUser state from localStorage whenever it changes
    const userStatus = localStorage.getItem('currentUser');
    if (userStatus === 'true') {
      setCurrentUser(true);
    } else {
      setCurrentUser(false);
    }
  }, []);


  // Hide the NavBar on login and signup pages
  const hideNavBar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <BrowserRouter>
      {/* <AppWrapper /> */}
      {currentUser ? (
        <>
          {!hideNavBar && <NavBar currentUser={currentUser} />}
          <Routes>
            <Route path="/" element={<Navigate to='/home' />} />
            <Route path="/profile" exact element={<MyProfile setCurrentUser={setCurrentUser}/>} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp/>} />
            <Route path="/ai" exact element={<Ai/>} />
            <Route path="/home" exact element={<Home/>} />
            <Route path="/food" exact element={<Food/>} />
            <Route path="/store" exact element={<Store/>} />
            <Route path="/success" exact element={<Success/>} />
            <Route path="/cancel" exact element={<Cancel/>} />
          </Routes>
          {!hideNavBar && <Footer currentUser={currentUser} />}

          <Cursor/>
        </>
      ) : (
        <Authentication setCurrentUser={setCurrentUser} />
      )}
    </BrowserRouter>
  );
}

export default App;
