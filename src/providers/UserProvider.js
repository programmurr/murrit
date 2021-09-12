import React, { createContext, useEffect, useState } from 'react';
import { auth, generateUserDocument } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

export const UserContext = createContext({ user: undefined });

function UserProvider(props) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const posts = [];
    const comments = [];  
    const votes = [];  
    auth.onAuthStateChanged(async userAuth => {
      const id = `usr_${uuidv4()}`;
      const user = await generateUserDocument(userAuth, { id, posts, comments, votes });
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;

