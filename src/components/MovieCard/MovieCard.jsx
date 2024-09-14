import React from 'react';
import './MovieCard.css';
import poster from '../../assets/poster1.jpg';

const MovieCard = ({ title }) => {
  return (
    <div id='movie-card'>
      <img src={poster} alt={title} />
      <div id='movie-label'>{title ?? 'Dome Movie'}</div>
    </div>
  );
};

export default MovieCard;
