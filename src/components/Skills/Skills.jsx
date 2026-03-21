import './skills.css';

const skillCategories = [
  {
    name: "Front-End",
    skills: ["JavaScript ES6+", "React.js", "Redux", "HTML5", "CSS3"]
  },
  {
    name: "Back-End & API",
    skills: ["Node.js", "API REST", "Webhooks", "Express"]
  },
  {
    name: "Bases de données",
    skills: ["SQL Server", "SAP HANA", "PostgreSQL", "MongoDB"]
  },
  {
    name: "Écosystème SAP & Métier",
    skills: ["SAP Analytics Cloud", "SAP BAS", "Daxium"]
  },
  {
    name: "Outils",
    skills: ["Git", "GitHub"]
  },
  {
    name: "En acquisition",
    skills: ["PHP", "Laravel", "Vue.js", "CAPM PMI (en cours)"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <h2>Compétences</h2>
      <div className="skills-container">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3>{category.name}</h3>
            <div className="skill-list">
              {category.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="skill-item">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
