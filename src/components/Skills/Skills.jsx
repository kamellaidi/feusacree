import { useTranslation } from 'react-i18next';
import './skills.css';

const SKILL_CATEGORIES = [
  { key: 'frontend', skills: ['JavaScript ES6+', 'React.js', 'Redux', 'HTML5', 'CSS3'] },
  { key: 'backend',  skills: ['Node.js', 'API REST', 'Webhooks', 'Express', 'PHP', 'Laravel'] },
  { key: 'databases', skills: ['SQL Server', 'SAP HANA', 'PostgreSQL', 'MongoDB'] },
  { key: 'sap',      skills: ['SAP Analytics Cloud', 'SAP BAS', 'Daxium'] },
  { key: 'tools',    skills: ['Git', 'GitHub'] },
  { key: 'learning', skills: ['Vue.js', '__capm__'] },
];

const Skills = () => {
  const { t } = useTranslation('skills');

  return (
    <section id="skills" className="skills-section">
      <h2>{t('title')}</h2>
      <div className="skills-container">
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.key} className="skill-category">
            <h3>{t(`categories.${category.key}`)}</h3>
            <div className="skill-list">
              {category.skills.map((skill) => (
                <span key={skill} className="skill-item">
                  {skill === '__capm__' ? t('capm') : skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
