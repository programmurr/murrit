import React, { createContext, useEffect, useState } from 'react';
import { auth, generateUserDocument } from '../firebase';

export const UserContext = createContext({ user: undefined });

function UserProvider(props) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const posts = [];
    const comments = [];  
    const votes = [];  
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth !== null) {
        const id = userAuth.uid;
        const user = await generateUserDocument(userAuth, { id, posts, comments, votes });
        setUser(user);
        return;
      }
      setUser(undefined);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;

