import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../providers/UserProvider';
import { auth } from '../../firebase';

const ProfileAreaContainer = styled.div`
  display: flex;
`;

function ProfileArea() {
  const user = useContext(UserContext);
  const { displayName, email } = user;

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