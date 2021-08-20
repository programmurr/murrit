import React from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase';
import { useHistory } from 'react-router';

const ProfileAreaContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SignOutButton = styled.button`
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

const CreateButton = styled(SignOutButton)`
  background-color: #008cff;
  color: #ffffff;
  &:hover {
    background-color: #0099ff;
  }
`;

function ProfileArea(props) {
  let history = useHistory();

  const { displayName } = props.user;

  const handleCreateClick = () => {
    history.push('/submit')
  }

  return (
    <ProfileAreaContainer className="ProfileArea">
      <p>{displayName}</p>
      <SignOutButton onClick={() => {auth.signOut()}}>
        Sign out
      </SignOutButton>
      <CreateButton onClick={handleCreateClick}>+ Create</CreateButton>
    </ProfileAreaContainer>
  );
};

export default ProfileArea;