import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Image from '../../img/Logo.png';

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LogoImage = styled.img`
  max-width: 40px;
  max-height: 40px;
`;

function Logo() {
  return (
    <LogoContainer className="LogoContainer">
      <Link to="/">
        <LogoImage className="LogoImage" src={Image}/>
      </Link>
    </LogoContainer>
  )
};

export default Logo;

