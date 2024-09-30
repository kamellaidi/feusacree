import React from 'react';
import './projects.css';

const projects = [
  {
    title: "Projet 1",
    description: "Description du projet 1. Un exemple de réalisation significative.",
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Projet 2",
    description: "Description du projet 2. Une autre réalisation importante dans mon parcours.",
    technologies: ["Vue.js", "Express", "PostgreSQL"],
  },
  {
    title: "Projet 3",
    description: "Description du projet 3. Un projet qui démontre mes compétences techniques.",
    technologies: ["Angular", "Django", "MySQL"],
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