import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { auth, signInWithGoogle } from '../../firebase';

const SignInContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
`;

const SignInHeaderContainer = styled.div`
  width: 95%;
  margin-top: 10px;
  padding-bottom: 10px;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-bottom: 1px solid white;
`;

const SignInElements = styled.div`
  width: 95%;
  height: 50vh;
  margin-top: 10px;
  padding-bottom: 10px;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SignInForm = styled.form`
  width: 95%;
  height: 100%;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const ErrorSpan = styled.span`
  color: red;
  font-weight: 600;
`;

const GoogleAuthContainer = styled.div`
  width: 95%;
  height: 100%;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const SignInLabel = styled.label`
  margin-bottom: 0.5rem;
`;

const SignInInput = styled.input`
  width: 50%;
  height: 2rem;
  padding: 0.5rem;
  border-radius: 3px;
  margin-bottom: 0.5rem;
`;
const SignInButton = styled.button`
  width: 52%;
  height: 2rem;
  border-radius: 3px;
  background-color: #008cff;
  color: #ffffff;
  &:hover {
    background-color: #0099ff;
    cursor: pointer;
  }
`;

const GoogleSignInButton = styled(SignInButton)`
  background-color: #ffffff;
  color: #008cff;
  &:hover {
    background-color: #f7f8fd;
    cursor: pointer;
  }
`;


function SignIn() {
  let history= useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error signing in with password and email", error);
      });
  };

  const onChangeHandler = (event) => {
    const {name, value} = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  const handleSignInWithGoogleClick = () => {
    try {
      signInWithGoogle();
      history.push('/');
    } catch (error) {
      console.error("Error signing in with Google", error)
    }
  };

  return (
    <SignInContainer className="SignInContainer">
      <SignInHeaderContainer className="HeaderContainer">
        <h1>Sign In</h1>
      </SignInHeaderContainer>
      <SignInElements className="SignInElements">
      <div>{error !== null && <ErrorSpan>{error}</ErrorSpan>}</div>
        <SignInForm className="SignInForm">
          <SignInLabel htmlFor="userEmail">Email: </SignInLabel>
          <SignInInput
            type="email"
            name="userEmail"
            required
            value={email}
            placeholder="youremail@email.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <SignInLabel htmlFor="userPassword">Password:</SignInLabel>
          <SignInInput
            type="password"
            name="userPassword"
            required
            value={password}
            placeholder="Your password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <SignInButton 
            onClick={(event) => {
              signInWithEmailAndPasswordHandler(event, email, password)
            }}
          >
          Sign In
          </SignInButton>
        </SignInForm>
        <GoogleAuthContainer className="GoogleAuthContainer">
          <p>or</p>
          <GoogleSignInButton
            onClick={handleSignInWithGoogleClick}
          >Sign in with Google</GoogleSignInButton>
          <p>Don't have an account?</p>
          <Link to="/sign-up">Sign up here</Link>
          <Link to="/password-reset">Forgot Password?</Link>
        </GoogleAuthContainer>
      </SignInElements>
    </SignInContainer>
  );
};

export default SignIn;