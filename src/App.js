// Node Imports
import { useEffect, useState } from 'react';

// Static Imports
import noPosterImage from './assets/missing-poster.png';

// Internal Imports
import './App.css';
import { fetchMovieData } from "./api/data.api";
import MovieCard from './components/MovieCard';

function App() {

  const [pageTitle, setPageTitle] = useState(null);

  useEffect(() => {
    fetchMovieData(1);
  }, []);

  return (
    <div className="App">
      <MovieCard title={"A Tale Of Two Cities"} poster={noPosterImage}/>
    </div>
  );
}

export default App;
