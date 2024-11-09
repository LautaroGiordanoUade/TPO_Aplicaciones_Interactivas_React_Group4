import React from 'react';
import './StyledLoadingSpinner.css';

const LoadingSpinner = ({text})  => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
};

export default LoadingSpinner;