import React, { createContext, useState } from 'react';

export const DeleteContext = createContext(false);

function DeleteProvider(props) {
  const [deleteActive, setDeleteActive] = useState(false);

  return (
    <DeleteContext.Provider value={{deleteActive, setDeleteActive}}>
      {props.children}
    </DeleteContext.Provider>
  );
}

export default DeleteProvider;

