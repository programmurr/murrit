import React from 'react';
import styled from 'styled-components';
import NavBar from './components/navbar/NavBar';
import Home from './components/home/Home';

const GlobalStyles = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  line-height: 1;
`;

function App() {
  return (
    <GlobalStyles className="App">
      <NavBar />
      <Home />
    </GlobalStyles>
  )
}

export default App;
