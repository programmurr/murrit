import React from 'react';
import styled from 'styled-components';

const LoginAreaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const LoginButton = styled.button`
  width: 100px;
  height: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  border: 1px solid #008cff;
  color: #008cff;
  font-weight: bold;
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