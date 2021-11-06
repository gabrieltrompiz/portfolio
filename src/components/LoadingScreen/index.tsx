import React from 'react';

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <div id="loading-screen">
      <span>{progress}</span>
    </div>
  )
};

export default LoadingScreen;

interface LoadingScreenProps {
  progress: number;
};