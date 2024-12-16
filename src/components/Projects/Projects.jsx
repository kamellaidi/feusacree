import React, { useState } from 'react';
import './projects.css';
import Modal from '../Modal/Modal';
import ProjectModalContent from '../Modal/ProjectModalContent/ProjectModalContent';

const projects = [
  {
    title: "LocStore",
    description: "Site e-commerce de location de matériel événementiel. Développé en équipe comme projet de fin d'études.",
    longDescription: "LocStore est une plateforme innovante de location de matériel événementiel, développée en équipe dans le cadre de notre projet de fin d'études. Cette application propose une interface intuitive permettant aux utilisateurs de parcourir le catalogue, réserver du matériel, et gérer leurs locations.",
    technologies: ["React", "Redux", "Node.js", "Express", "PostgreSQL"],
    images: [
      '/src/assets/screenshots_projects/test1.png',
      '/src/assets/screenshots_projects/test1 copy.png',
      '/src/assets/screenshots_projects/test1 copy 2.png'
    ]
  },
  {
    title: "RecipesKamel",
    description: "Site de recettes de cuisine avec navigation dynamique et gestion d'état complexe.",
    longDescription: "RecipesKamel est une application web moderne dédiée aux passionnés de cuisine. Elle offre une expérience utilisateur fluide avec une navigation dynamique entre les recettes et une gestion d'état avancée via Redux.",
    technologies: ["React", "Redux", "React Router", "Sass"],
    images: [
      '/src/assets/screenshots_projects/test1 copy 3.png',
      '/src/assets/screenshots_projects/test1 copy 4.png',
      '/src/assets/screenshots_projects/test1 copy 5.png'
    ]
  },
  {
    title: "DubaiHome",
    description: "Site de recherche immobilière utilisant l'API Bayut pour du contenu dynamique.",
    longDescription: "DubaiHome est une plateforme immobilière sophistiquée qui exploite l'API Bayut pour fournir des informations immobilières en temps réel à Dubai. Développée avec Next.js pour des performances optimales et un excellent référencement.",
    technologies: ["Next.js", "Chakra UI", "API Integration"],
    images: [
      '/src/assets/screenshots_projects/test1 copy 5.png',
      '/src/assets/screenshots_projects/test1 copy 6.png',
      '/src/assets/screenshots_projects/test1 copy 7.png'
    ]
  },
  {
    title: "Portfolio",
    description: "Site personnel de présentation professionnelle avec design responsive et moderne.",
    longDescription: "Ce portfolio personnel est une vitrine de mes compétences et réalisations en développement web. Construit avec une approche minimaliste mais efficace, il utilise Tailwind CSS pour un design responsive et moderne.",
    technologies: ["HTML", "Tailwind CSS", "JavaScript"],
    images: [
      '/src/assets/screenshots_projects/test1 copy.png',
      '/src/assets/screenshots_projects/test1 copy 2.png',
      '/src/assets/screenshots_projects/test1 copy 3.png'
    ]
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