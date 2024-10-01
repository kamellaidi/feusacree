import React from 'react';
import './projects.css';

const projects = [
  {
    title: "LocStore",
    description: "Site e-commerce de location de matériel événementiel. Développé en équipe comme projet de fin d'études.",
    technologies: ["React", "Redux", "Node.js", "Express", "PostgreSQL"],
  },
  {
    title: "RecipesKamel",
    description: "Site de recettes de cuisine avec navigation dynamique et gestion d'état complexe.",
    technologies: ["React", "Redux", "React Router", "Sass"],
  },
  {
    title: "DubaiHome",
    description: "Site de recherche immobilière utilisant l'API Bayut pour du contenu dynamique.",
    technologies: ["Next.js", "Chakra UI", "API Integration"],
  },
  {
    title: "Portfolio",
    description: "Site personnel de présentation professionnelle avec design responsive et moderne.",
    technologies: ["HTML", "Tailwind CSS", "JavaScript"],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <h2>Projets</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="technologies">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;