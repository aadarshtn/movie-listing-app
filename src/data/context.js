import React, { createContext, useState, useContext, useRef } from 'react';

// Create the context
const GlobalContext = createContext();
const RefContext = createContext(null);

// Create a provider component
export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState(null);

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const RefProvider = ({ children }) => {
  // Create a ref
  const rootAppRef = useRef(null);
  const currentPageRef = useRef(null);
  
  return (
    <RefContext.Provider value={{rootAppRef, currentPageRef}}>
      {children}
    </RefContext.Provider>
  );
};

// Custom hooks to use the Contexts
export const useRefContext = () => useContext(RefContext);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a ContextProvider');
  }
  return context;
};
