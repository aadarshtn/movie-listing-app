import React from 'react';
import './EndOfPage.css';

const EndOfPage = () => {
  return (
    <div className="end-of-page">
      <div className="line-separator"></div>
      <p className="end-message">You have reached the end of the results</p>
      <div className="end-icon">🌟</div>
    </div>
  );
};

export default EndOfPage;