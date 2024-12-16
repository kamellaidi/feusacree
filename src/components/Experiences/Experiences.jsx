// Experiences.jsx
import React, { useState } from 'react';
import './experiences.css';
import Modal from '../Modal/Modal';
import ProjectModalContent from '../Modal/ProjectModalContent/ProjectModalContent';

// Imports des images
import techInnovate1 from '../../assets/screenshots_projects/test1.png';
import techInnovate2 from '../../assets/screenshots_projects/test1 copy.png';
import techInnovate3 from '../../assets/screenshots_projects/test1 copy 2.png';

import startupVision1 from '../../assets/screenshots_projects/test1 copy 3.png';
import startupVision2 from '../../assets/screenshots_projects/test1 copy 4.png';
import startupVision3 from '../../assets/screenshots_projects/test1 copy 5.png';

import dataFlow1 from '../../assets/screenshots_projects/test1 copy 5.png';
import dataFlow2 from '../../assets/screenshots_projects/test1 copy 6.png';
import dataFlow3 from '../../assets/screenshots_projects/test1 copy 7.png';

const experiences = [
  {
    title: "Développeur Full Stack",
    company: "Tech Innovate",
    period: "2022 - 2024",
    description: "Développement et maintenance d'applications web pour des clients internationaux. Chef de projet sur plusieurs missions critiques.",
    longDescription: "En tant que développeur full stack chez Tech Innovate, j'ai dirigé le développement de plusieurs applications web complexes...",
    technologies: ["React", "Node.js", "AWS", "Docker", "MongoDB"],
    images: [techInnovate1, techInnovate2, techInnovate3],
    achievements: ["Réduction de 40% du temps de chargement", "Migration réussie vers le cloud", "Formation de 5 développeurs juniors"]
  },
  {
    title: "Lead Developer",
    company: "StartupVision",
    period: "2021 - 2022",
    description: "Direction technique d'une équipe de développement sur un projet de plateforme e-commerce innovante.",
    longDescription: "À la tête d'une équipe de développeurs chez StartupVision...",
    technologies: ["Vue.js", "Python", "PostgreSQL", "Redis", "Kubernetes"],
    images: [startupVision1, startupVision2, startupVision3],
    achievements: ["Lancement réussi en 6 mois", "Acquisition de 10000 utilisateurs", "Taux de satisfaction client de 95%"]
  },
  {
    title: "Développeur Backend",
    company: "DataFlow Systems",
    period: "2020 - 2021",
    description: "Conception et développement de microservices pour une application de traitement de données en temps réel.",
    longDescription: "Chez DataFlow Systems, j'ai contribué au développement d'une architecture microservices complexe...",
    technologies: ["Java", "Spring Boot", "Kafka", "Elasticsearch", "Kubernetes"],
    images: [dataFlow1, dataFlow2, dataFlow3],
    achievements: ["Traitement de 1M de requêtes/jour", "Amélioration de 60% des performances", "Zéro downtime sur 12 mois"]
  }
];

// Le reste du composant reste identique...

const Experiences = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);

  return (
    <section id="experiences" className="experiences-section">
      <h2>Expériences</h2>
      <div className="experiences-grid">
        {experiences.map((experience, index) => (
          <div
            key={index}
            onClick={() => setSelectedExperience(experience)}
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

      <Modal 
        isOpen={!!selectedExperience}
        onClose={() => setSelectedExperience(null)}
        title={selectedExperience?.title || ''}
      >
        {selectedExperience && (
          <ProjectModalContent project={selectedExperience} />
        )}
      </Modal>
    </section>
  );
};

export default Experiences;