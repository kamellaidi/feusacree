import React from 'react';

const FeatureIndicators = ({ count, currentIndex }) => (
  <div className="image-indicators">
    {Array.from({ length: count }, (_, index) => (
      <div 
        key={index}
        className={`indicator ${index === currentIndex ? 'active' : ''}`}
      />
    ))}
  </div>
);

export default FeatureIndicators;