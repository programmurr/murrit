import React, { useContext } from 'react';
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
import DeleteProvider from './providers/DeleteProvider';

const GlobalStyles = styled.div`
  font-family: Arial, sans serif;
  line-height: 1;
  height: 100%;
  background-color: #dae0e6;
  display: flex;
  flex-direction: column;
`;

// TODO:
// Make popup modal for delete post/comment
// - Will delete all child comments
// Fix margin bottom on Delete Modal
// Test user deletion
// Update README with features and gifs of action
// Fix bug in Wall.js:
//   - If first, already-appearing, board is selected in the boardPicker is selected,
//   the wall does not refresh. Have to click another board first. 
function App() {
  const user = useUser();

  return (
    <GlobalStyles className="App">
        <Router>
          <UserProvider>
          <DeleteProvider>
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
          </DeleteProvider>
          </UserProvider>
        </Router>
    </GlobalStyles>
  )
}

export default App;
