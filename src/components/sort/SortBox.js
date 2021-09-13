import React from 'react';
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

function SortBox(props) {

  const { order } = props;

  const handleChange = (event) => {
    props.handleOrderChange(event.target.value);
  }

  return (
    <SortContainer className="SortContainer">
      <SortElements className="SortElements" >
        <label htmlFor="SortSelect">Sort by:
          <select value={order} onChange={handleChange}>
            <option value="time">New</option>
            <option value="votes">Best</option>
          </select>
        </label>
      </SortElements>
    </SortContainer>
  );
}

export default SortBox;