import React from 'react';
import styled from 'styled-components';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
 } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Wall from './components/wall/Wall';
import User from './components/user/User';
import ViewPost from './components/post/ViewPost';
import Submit from './components/submit/Submit';
import SignUp from './components/sign-up/SignUp';
import SignIn from './components/sign-in/SignIn';
import PasswordReset from './components/password-reset/PasswordReset';
import UserProvider from './providers/UserProvider';
import useUser from './hooks/useUser';

const GlobalStyles = styled.div`
  font-family: Arial, sans serif;
  line-height: 1;
  height: 100%;
  background-color: #dae0e6;
  display: flex;
  flex-direction: column;
`;

// TODO:
// Test 'nullAuthor' by deleting a user
// Let users delete their own posts/comments/accounts
// Update README with features and gifs of action
// Resolve conflict in board data between Submit.js and BoardPicker
//   Make a useBoards hook?
function App() {
  const user = useUser();

  return (
    <GlobalStyles className="App">
        <Router>
          <UserProvider>
            <NavBar />
            <Switch>
              <Route exact path="/">
                <Wall />  
              </Route>
              <Route exact path="/m/:boardName">
                <Wall />  
              </Route>
              <Route path="/u/:username">
                <User />  
              </Route>
              <Route path="/password-reset">
                <PasswordReset />  
              </Route>
              <Route path="/p/:postid">
                <ViewPost />  
              </Route>
              <Route path="/sign-in">
                <SignIn />  
              </Route>
              <Route path="/sign-up">
                <SignUp />  
              </Route>
              <Route path="/submit">
                {user === undefined ? <Redirect to="/" /> : <Submit />}
              </Route>
            </Switch>
          </UserProvider>
        </Router>
    </GlobalStyles>
  )
}

export default App;
