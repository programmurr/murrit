import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
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

  const { authState, setAuthState } = useContext(AuthContext);

  const handleLogin = () => {
    setAuthState(prev => !authState);
  }

  const handleSignUpClick = () => {
    if (authState) {
      history.push(`/submit`);
    }
    // TODO:
    // Else - launch the login feature
  }
  
  return (
    <LoginAreaContainer className="LoginContainer">
      <LoginButton onClick={handleLogin}>
        {
          authState
          ? "Log Out"
          : "Login"
        }
      </LoginButton>
      <SignUpButton onClick={handleSignUpClick}>
        {
          authState
          ? "+ Create"
          : "Sign up"
        }
      </SignUpButton>
    </LoginAreaContainer>
  );
};

export default LoginArea;