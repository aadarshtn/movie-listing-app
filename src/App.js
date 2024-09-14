// Internal Imports
import './App.css';
import AppRoutes from './routes';
import { GlobalContextProvider } from './data/context';

function App() {

  return (
    <div className="root-app">
      <GlobalContextProvider>
        <AppRoutes/>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
