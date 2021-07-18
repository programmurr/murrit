import React from 'react';
import styled from 'styled-components';
import Image from '../../img/Logo.png';

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 10vw;
`;

const LogoImage = styled.img`
  max-width: 50px;
  max-height: 50px;
`;

function Logo() {
  return (
    <LogoContainer className="LogoContainer">
      <LogoImage className="LogoImage" src={Image}/>
    </LogoContainer>
  )
};

export default Logo;

