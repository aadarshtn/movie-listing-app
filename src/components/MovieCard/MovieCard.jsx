import React, { useState } from 'react';
import './MovieCard.css';
import fallbackPoster from '../../assets/missing-poster.png';

const MovieCard = ({ title, poster }) => {

  const [showTooltip, setShowTooltip] = useState(false);

  const handleTouchStart = () => {
    setShowTooltip(true);
    // Hide the tooltip after 2 seconds (or adjust as needed)
    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  return (
    <div id='movie-card'
      title={title}
      onTouchStart={handleTouchStart} // Show tooltip on touch
      onMouseEnter={() => setShowTooltip(true)} // Show tooltip on hover
      onMouseLeave={() => setShowTooltip(false)} // Hide tooltip when mouse leaves
    >
      <img src={poster ?? fallbackPoster} alt={title} />
      <div id='movie-label' title={title}>{title}</div>

      {/* Tooltip */}
      {showTooltip && (
        <div id='movie-title-tooltip'>
          {title}
        </div>
      )}
    </div>
  );
};

export default MovieCard;
