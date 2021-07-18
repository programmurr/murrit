import React from 'react';
import styled from 'styled-components';
import NavBar from './components/navbar/NavBar';

const GlobalStyles = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  line-height: 1;
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <GlobalStyles className="App">
      <NavBar />
    </GlobalStyles>
  )
}

export default App;
