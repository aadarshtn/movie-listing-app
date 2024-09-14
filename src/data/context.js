import React, { createContext, useState, useContext } from 'react';

// Create the context
const GlobalContext = createContext();

// Create a provider component
export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    theme: 'light', // Example state
  });

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the Context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a ContextProvider');
  }
  return context;
};
