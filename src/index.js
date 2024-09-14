import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GlobalContextProvider, RefProvider } from './data/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RefProvider>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </RefProvider>
);
