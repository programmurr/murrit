import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';

const PasswordResetContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
`;

const HeaderContainer = styled.div`
  width: 95%;
  padding-bottom: 10px;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-bottom: 1px solid white;
`;

const FormContainer = styled.div`
  width: 95%;
  height: 20vh;
  margin-top: 10px;
  padding-bottom: 10px;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ResetForm = styled.form`
  width: 95%;
  height: 100%;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const ResetLabel = styled.label`
  margin-bottom: 0.5rem;
`;

const ResetInput = styled.input`
  width: 50%;
  height: 2rem;
  padding: 0.5rem;
  border-radius: 3px;
  margin-bottom: 0.5rem;
`;

const ResetButton = styled.button`
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


function PasswordReset() {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = (event) => {
    const {name, value} = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };

  const sendResetEmail = (event) => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  }

  return (
    <PasswordResetContainer>
      <HeaderContainer>
        <h1>Reset Your Password</h1>
      </HeaderContainer>
      <FormContainer>
        <ResetForm action="">
          {emailHasBeenSent && (
            <div>An email has been sent to you!</div>
          )}
          {error !== null && (
            <div>{error}</div>
          )}
          <ResetLabel htmlFor="userEmail">Email:</ResetLabel>
          <ResetInput 
            type="email"
            name="userEmail"
            id="userEmail"
            required
            value={email}
            placeholder="Type your email here"
            onChange={onChangeHandler}
          />
          <ResetButton onClick={event => {
            sendResetEmail(event);
          }}
          >
            Send me a reset link
          </ResetButton>
        </ResetForm>
        <Link to="/sign-in">&larr; Back to sign in page</Link>
      </FormContainer>
    </PasswordResetContainer>
  );
};

export default PasswordReset;
