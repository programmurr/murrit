import React, { useState } from 'react';
import styled from 'styled-components';

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


function SortBox() {

  const [category, setCategory] = useState("New");

  const handleChange = (event) => {
    setCategory(event.target.value);
  }

  return (
    <SortContainer className="SortContainer">
      <SortElements className="SortElements" >
        <label htmlFor="SortSelect">Sort by:
          <select value={category} onChange={handleChange}>
            <option value="new">New</option>
            <option value="best">Best</option>
          </select>
        </label>
      </SortElements>
    </SortContainer>
  );
}

export default SortBox;