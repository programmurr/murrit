import React from 'react';
import styled from 'styled-components';
import DownTriangle from '../../img/downward-triangle.svg'

const SortContainer = styled.div`
  width: 97%;
  margin-top: 10px;
  margin-bottom: 10px;
  max-width: 955.6px;
  display: flex;
  align-items: center;
`;

const SortElements = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const SortHeader = styled.h4`
`;

const DropIcon = styled.img`
  width: 10px;
  margin-top: 2px;
  margin-left: 4px;
`;

function SortBox() {
  return (
    <SortContainer className="SortContainer">
      <SortElements className="SortElements">
        <SortHeader>Sort by: New</SortHeader>
        <DropIcon src={DownTriangle} />
      </SortElements>
    </SortContainer>
  );
}

export default SortBox;