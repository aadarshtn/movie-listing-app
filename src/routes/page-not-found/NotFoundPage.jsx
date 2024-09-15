import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className="not-found-actions">
        <Link to="/" className="not-found-button">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage