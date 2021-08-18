import React, { useContext } from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Title from './Title';
import LoginArea from './LoginArea';
import ProfileArea from './ProfileArea';
import { UserContext } from '../../providers/UserProvider';


const OuterNavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #dae0e6;
`;

const NavContainer = styled.div`
  height: 6vh;
  min-height: 50px;
  border-bottom: 1px solid #ffffff;
  border-radius: 5px;
  background-color: #ffffff;
  width: 95%;
  max-width: 955.6px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  position: fixed;
  z-index: 1;
`;

function NavBar() {
  const user = useContext(UserContext);

  return (
    <OuterNavContainer className="NavBarContainer">
      <NavContainer className="NavBar" id="nav-bar">
        <Logo />
        <Title />
        {user === null
          ? <LoginArea />
          : <ProfileArea /> 
        }
      </NavContainer>
    </OuterNavContainer>
  )
};

export default NavBar;