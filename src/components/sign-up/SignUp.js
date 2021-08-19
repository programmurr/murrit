import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { generateUserDocument, signInWithGoogle } from '../../firebase';
import { auth } from '../../firebase';

const SignUpContainer = styled.div`
  margin-top: 7vh
`;

const SignUpElements = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;

function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const posts = [];
  const comments = [];

  const verifyPasswords = () => {
    // verify passwords
  }

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    const verified = verifyPasswords();
    if (verified) {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        generateUserDocument(user, { displayName, posts, comments });
      } catch (error) {
        setError("Error signing up with email and password");
      }
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setDisplayName("");
    } else {
      setError("Passwords do not match");
      setPassword("");
      setConfirmPassword("");
    }
  };

  const onChangeHandler = (event) => {
    const {name, value} = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
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
    <SignUpContainer>
      <h1>Sign Up</h1>
      <SignUpElements>
        {error !== null && (
          <div>{error}</div>
        )}
        <SignUpForm>
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            name="displayName"
            value={displayName}
            placeholder="E.g. ElaineSmith1"
            id="displayName"
            required
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            name="userEmail"
            value={email}
            placeholder="elaine-smith01@gmail.com"
            id="userEmail"
            required
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userPassword">Password:</label>
          <input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your password"
            id="userPassword"
            required
            minLength="16"
            maxLength="40"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Your password"
            id="confirmPassword"
            required
            minLength="16"
            maxLength="40"
            onChange={event => onChangeHandler(event)}
          />
          <button
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign Up
          </button>
        </SignUpForm>
        <p>or</p>
        <button onClick={handleSignInWithGoogleClick}>
          Sign in with Google
        </button>
        <p>Already have an account?
          <Link to="/sign-in">Sign in here</Link>
        </p>
      </SignUpElements>
    </SignUpContainer>
  );
};

export default SignUp;