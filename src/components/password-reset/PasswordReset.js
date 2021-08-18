import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PasswordResetContainer = styled.div`
  margin-top: 7vh;
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ResetForm = styled.form`
  display: flex;
  flex-direction: column;
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
  }

  return (
    <PasswordResetContainer>
      <h1>Reset Your Password</h1>
      <FormContainer>
        <ResetForm action="">
          {emailHasBeenSent && (
            <div>An email has been sent to you!</div>
          )}
          <label htmlFor="userEmail">Email:</label>
          <input 
            type="email"
            name="userEmail"
            id="userEmail"
            value={email}
            placeholder="Type your email here"
            onChange={onChangeHandler}
          />
          <button>Send me a reset link</button>
        </ResetForm>
        <Link to="/sign-in">&larr; Back to sign in page</Link>
      </FormContainer>
    </PasswordResetContainer>
  );
};

export default PasswordReset;
