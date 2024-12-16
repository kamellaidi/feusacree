// Experiences.jsx
import React, { useState } from 'react';
import './experiences.css';
import Modal from '../Modal/Modal';
import ProjectModalContent from '../Modal/ProjectModalContent/ProjectModalContent';

const experiences = [
  {
    title: "Développeur Full Stack",
    company: "Tech Innovate",
    period: "2022 - 2024",
    description: "Développement et maintenance d'applications web pour des clients internationaux. Chef de projet sur plusieurs missions critiques.",
    longDescription: "En tant que développeur full stack chez Tech Innovate, j'ai dirigé le développement de plusieurs applications web complexes, gérant à la fois le front-end et le back-end. J'ai mis en place des architectures scalables et performantes, tout en assurant la formation de développeurs juniors. J'ai également participé à l'amélioration continue des processus de développement.",
    technologies: ["React", "Node.js", "AWS", "Docker", "MongoDB"],
    images: [
      '/src/assets/screenshots_projects/test1.png',
      '/src/assets/screenshots_projects/test1 copy.png',
      '/src/assets/screenshots_projects/test1 copy 2.png'
    ],
    achievements: ["Réduction de 40% du temps de chargement", "Migration réussie vers le cloud", "Formation de 5 développeurs juniors"]
  },
  {
    title: "Lead Developer",
    company: "StartupVision",
    period: "2021 - 2022",
    description: "Direction technique d'une équipe de développement sur un projet de plateforme e-commerce innovante.",
    longDescription: "À la tête d'une équipe de développeurs chez StartupVision, j'ai piloté la création d'une plateforme e-commerce de nouvelle génération. J'ai géré l'intégralité du cycle de développement, de la conception à la mise en production, tout en assurant la coordination avec les différentes parties prenantes.",
    technologies: ["Vue.js", "Python", "PostgreSQL", "Redis", "Kubernetes"],
    images: [
      '/src/assets/screenshots_projects/test1 copy 3.png',
      '/src/assets/screenshots_projects/test1 copy 4.png',
      '/src/assets/screenshots_projects/test1 copy 5.png'
    ],
    achievements: ["Lancement réussi en 6 mois", "Acquisition de 10000 utilisateurs", "Taux de satisfaction client de 95%"]
  },
  {
    title: "Développeur Backend",
    company: "DataFlow Systems",
    period: "2020 - 2021",
    description: "Conception et développement de microservices pour une application de traitement de données en temps réel.",
    longDescription: "Chez DataFlow Systems, j'ai contribué au développement d'une architecture microservices complexe pour le traitement de données en temps réel. J'ai implémenté des solutions robustes pour gérer des flux de données massifs, tout en assurant la haute disponibilité et la scalabilité du système.",
    technologies: ["Java", "Spring Boot", "Kafka", "Elasticsearch", "Kubernetes"],
    images: [
      '/src/assets/screenshots_projects/test1 copy 5.png',
      '/src/assets/screenshots_projects/test1 copy 6.png',
      '/src/assets/screenshots_projects/test1 copy 7.png'
    ],
    achievements: ["Traitement de 1M de requêtes/jour", "Amélioration de 60% des performances", "Zéro downtime sur 12 mois"]
  }
];

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