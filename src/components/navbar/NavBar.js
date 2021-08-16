import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Title from './Title';
import LoginArea from './LoginArea';

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
  position: ${props => props.sticky ? "fixed" : ""};
  z-index: 1;
`;

function NavBar() {
  const navContainer = useRef(null);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const sticky = navContainer.current.offsetTop;
    document.addEventListener('scroll', () => {
      if (window.pageYOffset > sticky) {
        if (isMounted) setSticky(true);
      } else {
        if (isMounted) setSticky(false);
      }
    });
    return () => { isMounted = false };
  });

  return (
    <OuterNavContainer className="NavBarContainer">
      <NavContainer className="NavBar" id="nav-bar" ref={navContainer} sticky={sticky}>
        <Logo />
        <Title />
        <LoginArea />
      </NavContainer>
    </OuterNavContainer>
  )
};

export default NavBar;