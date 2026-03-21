import { useState } from 'react';
import ViewToggle from './components/ViewToggle';
import ZoomableImage from './components/ZoomableImage';
import CodeBlock from './components/CodeBlock';
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

  const handleToggle = (val) => {
    setIsShowingCode(val);
    resetZoom();
  };

  const renderView = () => {
    if (currentView.type === 'snippet') {
      return (
        <CodeBlock
          snippet={currentView.snippet}
          language={currentView.language}
        />
      );
    }
    if (currentView.type === 'description') {
      return (
        <div className="description-card">
          <p>{currentView.content}</p>
        </div>
      );
    }
    return (
      <ZoomableImage
        image={currentView.image}
        zoom={zoom}
        onZoom={setZoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        alt={`${project.title} - ${currentFeature.name}`}
      />
    );
  };

  return (
    <div className="project-modal-content">
      <ViewToggle
        isShowingCode={isShowingCode}
        onToggle={handleToggle}
      />

      <div className="project-image-container">
        {renderView()}
        <NavigationButtons onNext={next} onPrev={prev} />
        <FeatureIndicators
          count={project.features.length}
          currentIndex={currentIndex}
        />
      </div>

      <FeatureDetails feature={currentFeature} view={currentView} />

      <div className="project-details">
        <p>{project.longDescription}</p>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            Voir sur GitHub →
          </a>
        )}
        <div className="technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-badge">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectModalContent;