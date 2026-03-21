import { useTranslation } from 'react-i18next';
import './experiences.css';

const Experiences = () => {
  const { t } = useTranslation('experience');

  const experiences = [
    {
      id: 'qualiconsult',
      title: t('qualiconsult.title'),
      company: t('qualiconsult.company'),
      period: t('qualiconsult.period'),
      axes: [
        {
          label: t('qualiconsult.axis_management_label'),
          description: t('qualiconsult.axis_management_desc'),
        },
        {
          label: t('qualiconsult.axis_dev_label'),
          description: t('qualiconsult.axis_dev_desc'),
        },
      ],
      technologies: ['SAP HANA', 'SQL Server', 'SAP Analytics Cloud', 'SAP BAS', 'Daxium', 'Webhooks', 'JavaScript'],
    },
    {
      id: 'oclock',
      title: t('oclock.title'),
      company: t('oclock.company'),
      period: t('oclock.period'),
      description: t('oclock.description'),
      technologies: ['JavaScript', 'React', 'Redux', 'Node.js', 'PostgreSQL', 'Git', 'Agile/Scrum'],
    },
  ];

  return (
    <section id="experiences" className="experiences-section">
      <h2>{t('title')}</h2>
      <div className="experiences-grid">
        {experiences.map((experience) => (
          <div key={experience.id} className="experience-card">
            <h3>{experience.title}</h3>
            <h4 className="company">{experience.company}</h4>
            <p className="period">{experience.period}</p>

            {experience.axes ? (
              <div className="axes">
                {experience.axes.map((axe) => (
                  <div key={axe.label} className="axe">
                    <span className="axe-label">{axe.label}</span>
                    <p>{axe.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>{experience.description}</p>
            )}

            <div className="technologies">
              {experience.technologies.map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiences;
