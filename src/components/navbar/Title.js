import React from 'react';
import styled from 'styled-components';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TitleHeader = styled.h2`
`;

function Title() {
  return (
    <TitleContainer className="TitleContainer">
      <TitleHeader className="TitleHeader">murrit</TitleHeader>
    </TitleContainer>
  );
};

export default Title;