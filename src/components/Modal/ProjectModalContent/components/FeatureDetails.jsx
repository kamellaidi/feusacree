import React from 'react';

const FeatureDetails = ({ feature, view }) => (
  <div className="feature-details">
    <h4 className="feature-title">{feature.name}</h4>
    <p className="feature-description">
      {view.description}
    </p>
  </div>
);

export default FeatureDetails;