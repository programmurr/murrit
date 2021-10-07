import React from 'react';
import styled from 'styled-components';
import Title from './Title';
import LoginArea from './LoginArea';
import ProfileArea from './ProfileArea';
import useUser from '../../hooks/useUser';


const OuterNavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #dae0e6;
  height: 6vh;
  min-height: 58px;
`;

const NavContainer = styled.div`
  ${'' /* border-bottom: 1px solid #ffffff; */}
  border-right: 2px solid #c4c4c4;
  border-bottom: 2px solid #c4c4c4;
  border-left: 2px solid #c4c4c4;
  border-radius: 5px;
  background-color: #ffffff;
  width: 95%;
  height: 5vh;
  min-height: 45px;
  max-width: 955.6px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  position: fixed;
  z-index: 1;
`;

function NavBar() {
  const user = useUser();

  return (
    <OuterNavContainer className="OuterNavContainer">
      <NavContainer className="NavContainer" id="nav-bar">
        <Title />
        {user === undefined
          ? <LoginArea />
          : <ProfileArea user={user}/>
        }
      </NavContainer>
    </OuterNavContainer>
  )
};

export default NavBar;