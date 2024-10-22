import React, { useState } from "react";
import styled from "styled-components";
import LogoImage from "./assets/fitbuddy-logo-black.png";
import AuthImage from "./assets/fitbuddy-logo-black.png";
import Login from "./Components/Login.jsx";
import SignUp from "./Components/SignUp";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 1;
  position: relative;
  @media (max-width: 700px) {
    display: none;
  }
`;
const Logo = styled.img`
  position: absolute;
  width: 70px;
  top: 40px;
  left: 60px;
  z-index: 10;
`;
const Image = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Right = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 0px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;
const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

function Authentication({setCurrentUser}){
  const [login, setLogin] = useState(false);
  return (
    <Container>
      {/* <Left>
        <Logo src={LogoImage} />
        <Image src={AuthImage} />
      </Left> */}
      <Right>
        {!login ? (
          <>
            <Text>
              <h1>Welcome to FitBuddy👋</h1>
              <p>Enter your login details.!</p>
            </Text>
            <Login setCurrentUser={setCurrentUser} />
            <Text>
              Don't have an account?{" "}
              <TextButton onClick={() => setLogin(true)}>SignUp</TextButton>
            </Text>
          </>
        ) : (
          <>
            <Text>
              <h1>Create New Account😊</h1>
              <p>Please enter details to create a new account.!</p>
            </Text>
            <SignUp setLogin={setLogin} /> {/* Pass setLogin prop */}
            <Text>
              Already have an account?{" "}
              <TextButton onClick={() => setLogin(false)}>Login</TextButton>
            </Text>
          </>
        )}
      </Right>
    </Container>
  );
};


export default Authentication;