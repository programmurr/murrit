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
import ViewPost from './components/post/ViewPost';
import Submit from './components/submit/Submit';
import AuthContextProvider from './contexts/AuthContext';

const GlobalStyles = styled.div`
  font-family: Arial, sans serif;
  line-height: 1;
  height: 100vh;
  min-height: 100vh;
  background-color: #dae0e6;
`;

// TODO: 
// Re-route submit access to Submit if user not logged in
function App() {
  return (
    <GlobalStyles className="App">
      <Router>
        <AuthContextProvider>
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
            <Route path="/p/:postid">
              <ViewPost />  
            </Route>
            <Route path="/submit">
              <Submit />  
            </Route>
          </Switch>
          </AuthContextProvider>
      </Router>
    </GlobalStyles>
  )
}

export default App;
