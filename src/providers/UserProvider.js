import React, { createContext, useEffect, useState } from 'react';
import { auth, generateUserDocument } from '../firebase';

export const UserContext = createContext({ user: null });

function UserProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const posts = [];
    const comments = [];  
    const votedPosts = [];  
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth, { posts, comments, votedPosts });
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

