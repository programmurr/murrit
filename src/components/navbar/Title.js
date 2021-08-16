import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const linkStyle = {
  color: "black"
}

function Title() {
  return (
    <TitleContainer className="TitleContainer">
      <NavLink to="/" activeStyle={linkStyle}>
        <h2 className="TitleHeader">murrit</h2>
      </NavLink>
    </TitleContainer>
  );
};

export default Title;