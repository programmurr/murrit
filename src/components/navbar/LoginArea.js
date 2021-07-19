import React from 'react';
import styled from 'styled-components';

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
  return (
    <LoginAreaContainer className="LoginContainer">
      <LoginButton>Login</LoginButton>
      <SignUpButton>Sign Up</SignUpButton>
    </LoginAreaContainer>
  );
};

export default LoginArea;