// ProjectModalContent.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './projectModalContent.css';

const ProjectModalContent = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="project-modal-content">
      <div className="project-image-container">
        <img 
          src={project.images[currentImageIndex]} 
          alt={`${project.title} screenshot ${currentImageIndex + 1}`}
        />
        
        <button 
          onClick={prevImage}
          className="nav-button prev"
          aria-label="Image précédente"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextImage}
          className="nav-button next"
          aria-label="Image suivante"
        >
          <ChevronRight size={24} />
        </button>

        <div className="image-indicators">
          {project.images.map((_, index) => (
            <div 
              key={index}
              className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

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