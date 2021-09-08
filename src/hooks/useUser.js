import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../providers/UserProvider';

export default function useUser() {
  const user = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return currentUser;
}