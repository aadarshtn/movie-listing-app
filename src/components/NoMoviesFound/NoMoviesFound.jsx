import React from 'react';
import './NoMoviesFound.css';

const NoMoviesFound = () => {
  return (
    <div className="no-movies-found">
      <div className="no-movies-icon">🔍</div>
      <p className="no-movies-message">No movies found matching your search.</p>
      <p className="no-movies-suggestion">Try searching for something else.</p>
    </div>
  );
};

export default NoMoviesFound;
