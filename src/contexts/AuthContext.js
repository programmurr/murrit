import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [authState, setAuthState] = useState(false);
  return <AuthContext.Provider value={{ authState, setAuthState }}>{props.children}</AuthContext.Provider>;
}

export default AuthContextProvider;