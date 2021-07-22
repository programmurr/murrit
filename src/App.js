import React from 'react';
import styled from 'styled-components';
import { 
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import All from './components/all/All';
import Board from './components/board/Board';
import User from './components/user/User';

const GlobalStyles = styled.div`
  font-family: Arial, sans serif;
  line-height: 1;
  height: 100vh;
`;

// TODO:
// Finish adapting All board to be generic
// So same board template can be used for Home and all Boards
function App() {
  return (
    <GlobalStyles className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <All />  
          </Route>
          <Route path="/m/:boardName">
            <Board />  
          </Route>
          <Route path="/u/:username">
            <User />  
          </Route>
        </Switch>
      </Router>
    </GlobalStyles>
  )
}

export default App;
