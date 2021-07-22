import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TitleHeader = styled.h2`
`;

const linkStyle = {
  color: "black"
}

function Title() {
  return (
    <TitleContainer className="TitleContainer">
      <NavLink to="/" activeStyle={linkStyle}>
        <TitleHeader className="TitleHeader">murrit</TitleHeader>
      </NavLink>
    </TitleContainer>
  );
};

export default Title;