import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { signInWithGoogle } from '../../firebase';

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
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = (event) => {
    const {name, value} = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
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
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            name="userEmail"
            value={email}
            placeholder="elaine-smith01@gmail.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userPassword">Password:</label>
          <input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your password"
            id="userPassword"
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
        <button onClick={() => {
          try {
            signInWithGoogle();
          } catch (error) {
            console.error("Error signing in with Google", error)
          }
        }}>
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