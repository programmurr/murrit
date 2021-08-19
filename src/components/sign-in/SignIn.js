import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { auth, signInWithGoogle } from '../../firebase';

const SignInContainer = styled.div`
  margin-top: 7vh
`;

const SignInElements = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
`;

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError("Error signing in with password and email");
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
    } catch (error) {
      console.error("Error signing in with Google", error)
    }
  };

  return (
    <SignInContainer>
      <h1>Sign In</h1>
      <SignInElements>
        {error !== null && <div>{error}</div>}
        <SignInForm className="">
          <label htmlFor="userEmail">Email: </label>
          <input
            type="email"
            name="userEmail"
            value={email}
            placeholder="youremail@email.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword">Password:</label>
          <input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <button 
            onClick={(event) => {
              signInWithEmailAndPasswordHandler(event, email, password)
            }}
          >
          Sign In
          </button>
        </SignInForm>
        <p>or</p>
        <button
          onClick={handleSignInWithGoogleClick}
        >Sign in with Google</button>
        <p>Don't have an account?
          <Link to="/sign-up">Sign up here</Link>
          <Link to="/password-reset">Forgot Password?</Link>
        </p>
      </SignInElements>
    </SignInContainer>
  );
};

export default SignIn;