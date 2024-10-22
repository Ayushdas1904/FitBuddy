import React, {useState} from "react";
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

// function AppWrapper() {
//   const location = useLocation();

  // // Hide the NavBar on login and signup pages
  // const hideNavBar = location.pathname === '/login' || location.pathname === '/signup';

//   return (
//     <>
//       {!hideNavBar && <NavBar />} {/* Conditionally render NavBar */}
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/" element={<Navigate to="/home" />} /> {/* Default redirect to Home */}
//         <Route path="/home" element={<Home />} />
//         <Route path="/food" element={<Food />} />
//         <Route path="/store" element={<Store />} />
//         <Route path="/profile" element={<MyProfile />} />
//       </Routes>
//     </>
//   );
// }

function App() {
  // const { currentUser } = useSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState(false);

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
            <Route path="/profile" exact element={<MyProfile/>} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp/>} />
            <Route path="/ai" exact element={<Ai/>} />
            <Route path="/home" exact element={<Home/>} />
            <Route path="/food" exact element={<Food/>} />
            <Route path="/store" exact element={<Store/>} />
          </Routes>
          {!hideNavBar && <Footer currentUser={currentUser} />}

        </>
      ) : (
        <Authentication setCurrentUser={setCurrentUser} />
      )}
    </BrowserRouter>
  );
}

export default App;
