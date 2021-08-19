import React from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase';

const ProfileAreaContainer = styled.div`
  display: flex;
`;

function ProfileArea(props) {
  const { displayName, email } = props.user;

  return (
    <ProfileAreaContainer>
      <p>{displayName}</p>
      <p>{email}</p>
      <button onClick={() => {auth.signOut()}}>
        Sign out
      </button>
      <button>+ Create</button>
    </ProfileAreaContainer>
  );
};

export default ProfileArea;