import React from 'react';
import styled from 'styled-components';

const SortContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SortElements = styled.div`
  display: flex;
  background-color: #ffffff;
  border-radius: 5px;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const SortLabel = styled.label`
  padding: 0.25rem 1rem 0.25rem 1rem;
`;

const SortSelect = styled.select`
  background-color: #ffffff;
`;

function SortBox(props) {

  const { order } = props;

  const handleChange = (event) => {
    props.handleOrderChange(event.target.value);
  }

  return (
    <SortContainer className="SortContainer">
      <SortElements className="SortElements" >
        <SortLabel htmlFor="SortSelect">Sort by:</SortLabel>
          <SortSelect value={order} onChange={handleChange}>
            <option value="time">New</option>
            <option value="votes">Best</option>
          </SortSelect>
      </SortElements>
    </SortContainer>
  );
}

export default SortBox;