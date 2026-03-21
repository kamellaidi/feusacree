import { useTranslation } from 'react-i18next';
import { Code, Layout } from 'lucide-react';

const ViewToggle = ({ isShowingCode, onToggle }) => {
  const { t } = useTranslation('common');

  return (
    <div className="view-toggle">
      <button
        className={`toggle-button ${!isShowingCode ? 'active' : ''}`}
        onClick={() => onToggle(false)}
        aria-pressed={!isShowingCode}
      >
        <Layout size={20} />
        {t('modal.view_interface')}
      </button>
      <button
        className={`toggle-button ${isShowingCode ? 'active' : ''}`}
        onClick={() => onToggle(true)}
        aria-pressed={isShowingCode}
      >
        <Code size={20} />
        {t('modal.view_code')}
      </button>
    </div>
  );
};

export default ViewToggle;
