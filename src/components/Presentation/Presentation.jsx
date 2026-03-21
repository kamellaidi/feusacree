import { useTranslation } from 'react-i18next';
import './Presentation.css';

const Presentation = () => {
  const { t } = useTranslation('home');

  return (
    <section id="presentation" className="presentation-section">
      <div className="text-block">
        <h1>{t('title')}</h1>
        <h2>{t('subtitle')}</h2>
        <p>{t('p1')}</p>
        <p>{t('p2')}</p>
        <p>{t('p3')}</p>
      </div>
    </section>
  );
};

export default Presentation;
