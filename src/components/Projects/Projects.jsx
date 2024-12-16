import React, { useState } from 'react';
import './projects.css';
import Modal from '../Modal/Modal';
import ProjectModalContent from '../Modal/ProjectModalContent/ProjectModalContent';

import locStore1 from '../../assets/screenshots_projects/test1.png';
import locStore2 from '../../assets/screenshots_projects/test1 copy.png';
import locStore3 from '../../assets/screenshots_projects/test1 copy 2.png';

import recipesKamel1 from '../../assets/screenshots_projects/test1 copy 3.png';
import recipesKamel2 from '../../assets/screenshots_projects/test1 copy 4.png';
import recipesKamel3 from '../../assets/screenshots_projects/test1 copy 5.png';

import dubaiHome1 from '../../assets/screenshots_projects/test1 copy 5.png';
import dubaiHome2 from '../../assets/screenshots_projects/test1 copy 6.png';
import dubaiHome3 from '../../assets/screenshots_projects/test1 copy 7.png';

import portfolio1 from '../../assets/screenshots_projects/test1 copy.png';
import portfolio2 from '../../assets/screenshots_projects/test1 copy 2.png';
import portfolio3 from '../../assets/screenshots_projects/test1 copy 3.png';

const projects = [
  {
    title: "LocStore",
    description: "Site e-commerce de location de matériel événementiel. Développé en équipe comme projet de fin d'études.",
    longDescription: "LocStore est une plateforme innovante de location de matériel événementiel...",
    technologies: ["React", "Redux", "Node.js", "Express", "PostgreSQL"],
    images: [locStore1, locStore2, locStore3]
  },
  {
    title: "RecipesKamel",
    description: "Site de recettes de cuisine avec navigation dynamique et gestion d'état complexe.",
    longDescription: "RecipesKamel est une application web moderne dédiée aux passionnés de cuisine...",
    technologies: ["React", "Redux", "React Router", "Sass"],
    images: [recipesKamel1, recipesKamel2, recipesKamel3]
  },
  {
    title: "DubaiHome",
    description: "Site de recherche immobilière utilisant l'API Bayut pour du contenu dynamique.",
    longDescription: "DubaiHome est une plateforme immobilière sophistiquée...",
    technologies: ["Next.js", "Chakra UI", "API Integration"],
    images: [dubaiHome1, dubaiHome2, dubaiHome3]
  },
  {
    title: "Portfolio",
    description: "Site personnel de présentation professionnelle avec design responsive et moderne.",
    longDescription: "Ce portfolio personnel est une vitrine de mes compétences...",
    technologies: ["HTML", "Tailwind CSS", "JavaScript"],
    images: [portfolio1, portfolio2, portfolio3]
  }
];
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