import React, { useState } from 'react';
import './projects.css';
import Modal from '../Modal/Modal';
import ProjectModalContent from '../Modal/ProjectModalContent/ProjectModalContent';
import { projects } from '../../data/index';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="projects-section">
      <h2>Projets</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            onClick={() => setSelectedProject(project)}
            className="project-card"
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="technologies">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
      >
        {selectedProject && (
          <ProjectModalContent project={selectedProject} />
        )}
      </Modal>
    </section>
  );
};

export default Projects;