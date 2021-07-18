import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Title from './Title';
import LoginArea from './LoginArea';

const NavContainer = styled.div`
  height: 7vh;
  min-height: 55px;
  border-bottom: 1px solid black;
  background-color: #ffffff;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
`;

function NavBar() {
  return (
    <NavContainer className="NavBar">
      <Logo />
      <Title />
      <LoginArea />
    </NavContainer>
  )
};

export default NavBar;