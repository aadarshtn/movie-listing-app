import { useRef } from 'react';

// Internal Imports
import './App.css';
import { useRefContext } from './data/context';
import AppRoutes from './routes';

function App() {
  const { rootAppRef } = useRefContext();
  return (
    <div className="root-app" ref={rootAppRef}>
      <AppRoutes />
    </div>
  );
}

export default App;
