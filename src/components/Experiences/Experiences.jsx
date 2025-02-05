// Experiences.jsx
import React from 'react';
import './experiences.css';
// import Modal from '../Modal/Modal';
// import ProjectModalContent from '../Modal/ProjectModalContent/ProjectModalContent';

const experiences = [
  {
    title: "Développeur Informatique",
    company: "QUALICONSULT Sécurité",
    period: "Décembre 2022 - Présent",
    description: "Développement de solutions informatiques pour l'automatisation et l'optimisation des processus d'audit avec une approche No-Code et des technologies SAP.",
    technologies: ["JavaScript", "SAP HANA", "SQL Server", "SAP Analytics Cloud", "No-Code"],
  },
  {
    title: "Développeur Web Indépendant",
    company: "Projets Personnels",
    period: "2022 - Présent",
    description: "Conception et développement de plusieurs applications web fullstack, allant d'un système de réservation de taxi à une bibliothèque numérique, démontrant ma polyvalence et ma capacité à gérer des projets de bout en bout.",
    technologies: [
        // Frontend
        "React", "Next.js", "Redux", "Tailwind CSS", "Chakra UI", 
        // Backend
        "Node.js", "Express", "MongoDB", "PostgreSQL",
        // Outils et autres
        "TypeScript", "API RESTful", "JWT", "Git"
    ],
},
  {
    title: "Développeur Front-end React",
    company: "O'CLOCK - Projet de fin d'études",
    period: "Août 2022 - Septembre 2022",
    description: "Développeur front-end dans une équipe de 5 personnes pour la création d'une application web complexe lors du projet de fin de formation.",
    technologies: ["React", "Redux", "JavaScript", "Sass", "Git", "Méthodologie Agile"],
  },
  {
    title: "Apprenant Développeur Fullstack JavaScript",
    company: "O'CLOCK",
    period: "Février 2022 - Septembre 2022",
    description: "Formation intensive de 798 heures en développement web, spécialisation React et réalisation de projets concrets.",
    technologies: ["JavaScript", "React", "Node.js", "Express", "PostgreSQL", "Git"],
  },
];
const Experiences = () => {
  return (
    <section id="experiences" className="experiences-section">
      <h2>Expériences</h2>
      <div className="experiences-grid">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="experience-card"
          >
            <h3>{experience.title}</h3>
            <h4 className="company">{experience.company}</h4>
            <p className="period">{experience.period}</p>
            <p>{experience.description}</p>
            <div className="technologies">
              {experience.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiences;