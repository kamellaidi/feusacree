import React, { useState } from 'react';
import ViewToggle from './components/ViewToggle';
import ZoomableImage from './components/ZoomableImage';
import NavigationButtons from './components/NavigationButtons';
import FeatureIndicators from './components/FeatureIndicators';
import FeatureDetails from './components/FeatureDetails';
import { useZoom } from '../../../hooks/useZoom';
import { useFeatureNavigation } from '../../../hooks/useFeatureNavigation';
import './projectmodalcontent.css';

const ProjectModalContent = ({ project }) => {
  const { zoom, setZoom, handleZoomIn, handleZoomOut, resetZoom } = useZoom();
  const { currentIndex, next, prev } = useFeatureNavigation(project.features);
  const [isShowingCode, setIsShowingCode] = useState(false);

  const currentFeature = project.features[currentIndex];
  const currentView = isShowingCode ? currentFeature.code : currentFeature.interface;

  return (
    <div className="project-modal-content">
      <ViewToggle 
        isShowingCode={isShowingCode} 
        onToggle={setIsShowingCode} 
      />

      <div className="project-image-container">
        <ZoomableImage 
          image={currentView.image}
          zoom={zoom}
          onZoom={setZoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          alt={`${project.title} - ${currentFeature.name}`}
        />
        
        <NavigationButtons onNext={next} onPrev={prev} />
        <FeatureIndicators 
          count={project.features.length} 
          currentIndex={currentIndex} 
        />
      </div>

      <FeatureDetails feature={currentFeature} view={currentView} />

      <div className="project-details">
        <p>{project.longDescription}</p>
        <div className="technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectModalContent;