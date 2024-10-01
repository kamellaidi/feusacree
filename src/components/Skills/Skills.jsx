import './skills.css';

const skillCategories = [
  {
    name: "Technologies Front-End",
    skills: ["React", "Redux", "Next.js", "Vue.js", "Svelte", "Bootstrap", "Tailwind CSS"]
  },
  {
    name: "Technologies Back-End",
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL"]
  },
  {
    name: "Langages de Programmation",
    skills: ["JavaScript", "TypeScript"]
  },
  {
    name: "Bases de Données",
    skills: ["MongoDB", "PostgreSQL", "SAP HANA"]
  },
  {
    name: "Outils et Environnement",
    skills: ["Git", "GitHub", "GitLab", "Ubuntu", "Kubernetes"]
  },
  {
    name: "Méthodologies et Pratiques",
    skills: ["Agile/Scrum", "Jest", "API RESTful", "WebSocket"]
  },
  {
    name: "Outils Spécifiques",
    skills: ["SAP Analytics Cloud", "SQL Server"]
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