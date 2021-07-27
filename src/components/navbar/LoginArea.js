import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthContext';

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

  const { authState, setAuthState } = useContext(AuthContext);

  const handleLogin = () => {
    setAuthState(prev => !authState);
  }
  
  return (
    <LoginAreaContainer className="LoginContainer">
      <LoginButton onClick={handleLogin}>
        {
          authState
          ? "Yer in!"
          : "Login"
        }
      </LoginButton>
      <SignUpButton>Sign Up</SignUpButton>
    </LoginAreaContainer>
  );
};

export default LoginArea;