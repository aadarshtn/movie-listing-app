import React from 'react';
import './MovieCard.css';
import fallbackPoster from '../../assets/missing-poster.png';

const MovieCard = ({ title, poster }) => {
  console.log({ poster });
  return (
    <div id='movie-card'>
      <img src={poster ?? fallbackPoster} alt={title} />
      <div id='movie-label'>{title}</div>
    </div>
  );
};

export default MovieCard;
