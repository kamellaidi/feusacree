import './experiences.css';

const experiences = [
  {
    title: "Chef de Projet & Développeur",
    company: "QUALICONSULT Sécurité",
    period: "Décembre 2022 — Présent",
    axes: [
      {
        label: "Gestion de projet",
        description: "Pilotage de dossiers CEE et Sécurité Incendie : coordination DSI, terrain et prestataires, suivi COFRAC, reporting direction."
      },
      {
        label: "Développement",
        description: "Conception d'outils métier : formulaires dynamiques Daxium, automatisation via webhooks, bases SAP HANA et SQL Server, tableaux de bord SAP Analytics Cloud."
      }
    ],
    technologies: ["SAP HANA", "SQL Server", "SAP Analytics Cloud", "SAP BAS", "Daxium", "Webhooks", "JavaScript"]
  },
  {
    title: "Développeur Full Stack — Formation",
    company: "O'Clock",
    period: "Février 2022 — Septembre 2022",
    description: "Formation intensive 798h en développement web. Spécialisation React. RNCP Bac+2. Projet de fin d'études en équipe de 5 : application full stack livrée en mode Agile.",
    technologies: ["JavaScript", "React", "Redux", "Node.js", "PostgreSQL", "Git", "Agile/Scrum"]
  }
];

const Experiences = () => {
  return (
    <section id="experiences" className="experiences-section">
      <h2>Expériences</h2>
      <div className="experiences-grid">
        {experiences.map((experience, index) => (
          <div key={index} className="experience-card">
            <h3>{experience.title}</h3>
            <h4 className="company">{experience.company}</h4>
            <p className="period">{experience.period}</p>

            {experience.axes ? (
              <div className="axes">
                {experience.axes.map((axe, axeIndex) => (
                  <div key={axeIndex} className="axe">
                    <span className="axe-label">{axe.label}</span>
                    <p>{axe.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>{experience.description}</p>
            )}

            <div className="technologies">
              {experience.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiences;
