import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const LoginAreaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const LoginButton = styled.button`
  width: 90px;
  height: 25px;
  background-color: #ffffff;
  border-radius: 15px;
  border: 1px solid #008cff;
  color: #008cff;
  font-weight: 600;
  &:hover {
    background-color: #f7f8fd;
    cursor: pointer;
  }
`;

const SignUpButton = styled(LoginButton)`
  background-color: #008cff;
  color: #ffffff;
  &:hover {
    background-color: #0099ff;
  }
`;

function LoginArea() {
  let history = useHistory();

  const handleLoginClick = () => {
    history.push(`/sign-in`);
  }

  const handleSignUpClick = () => {
    history.push(`/sign-up`);
  }
  
  return (
    <LoginAreaContainer className="LoginContainer">
      <LoginButton onClick={handleLoginClick}>
        Sign In
      </LoginButton>
      <SignUpButton onClick={handleSignUpClick}>
        Sign Up
      </SignUpButton>
    </LoginAreaContainer>
  );
};

export default LoginArea;