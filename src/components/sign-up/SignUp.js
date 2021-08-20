import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { generateUserDocument, signInWithGoogle } from '../../firebase';
import { auth } from '../../firebase';

const SignUpContainer = styled.div`
  margin-top: 7vh;
  width: 100vw;
  max-width: 100%;
  height: 100vh%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
`;

const SignUpHeaderContainer = styled.div`
  width: 95%;
  margin-top: 10px;
  padding-bottom: 10px;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-bottom: 1px solid white;
`;

const SignUpElements = styled.div`
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

const SignUpForm = styled.form`
  width: 95%;
  height: 100%;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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

const SignUpLabel = styled.label`
  margin-bottom: 0.5rem;
`;

const SignUpInput = styled.input`
  width: 50%;
  height: 2rem;
  padding: 0.5rem;
  border-radius: 3px;
  margin-bottom: 0.5rem;
`;
const SignUpButton = styled.button`
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

const GoogleSignInButton = styled(SignUpButton)`
  background-color: #ffffff;
  color: #008cff;
  &:hover {
    background-color: #f7f8fd;
    cursor: pointer;
  }
`;

function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const posts = [];
  const comments = [];

  // TODO:
  // Set up password verification
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
      <SignUpHeaderContainer>
        <h1>Sign Up</h1>
      </SignUpHeaderContainer>
      <SignUpElements>
        {error !== null && (
          <div>{error}</div>
        )}
        <SignUpForm>
          <SignUpLabel htmlFor="displayName">Display Name:</SignUpLabel>
          <SignUpInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="E.g. ElaineSmith1"
            id="displayName"
            required
            onChange={event => onChangeHandler(event)}
          />
          <SignUpLabel htmlFor="userEmail">Email:</SignUpLabel>
          <SignUpInput
            type="email"
            name="userEmail"
            value={email}
            placeholder="elaine-smith01@gmail.com"
            id="userEmail"
            required
            onChange={event => onChangeHandler(event)}
          />
          <SignUpLabel htmlFor="userPassword">Password:</SignUpLabel>
          <SignUpInput
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
          <SignUpLabel htmlFor="confirmPassword">Confirm password:</SignUpLabel>
          <SignUpInput
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
          <SignUpButton
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign Up
          </SignUpButton>
        </SignUpForm>
        <GoogleAuthContainer>
          <p>or</p>
          <GoogleSignInButton onClick={handleSignInWithGoogleClick}>
            Sign in with Google
          </GoogleSignInButton>
          <p>Already have an account?</p>
          <Link to="/sign-in">Sign in here</Link>
        </GoogleAuthContainer>
      </SignUpElements>
    </SignUpContainer>
  );
};

export default SignUp;