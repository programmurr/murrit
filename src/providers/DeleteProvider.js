import React, { createContext, useState } from 'react';

export const DeleteContext = createContext();

function DeleteProvider(props) {
  const [deleteActive, setDeleteActive] = useState(false);
  const [item, setItem] = useState({id: undefined, type: undefined});
  const [refresh, setRefresh] = useState(false);

  return (
    <DeleteContext.Provider value={{
      deleteActive, 
      setDeleteActive, 
      item, 
      setItem,
      refresh,
      setRefresh
    }}>
      {props.children}
    </DeleteContext.Provider>
  );
}

export default DeleteProvider;

