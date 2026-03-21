import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './contact.css';

const Contact = () => {
  const { t } = useTranslation('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const mailtoLink = `mailto:kamellaidi@outlook.fr?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `De: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2>{t('title')}</h2>

      <div className="contact-info">
        <a href="mailto:kamellaidi@outlook.fr" className="contact-info-item">
          kamellaidi@outlook.fr
        </a>
        <span className="contact-info-separator">·</span>
        <span className="contact-info-item">Saint-Maur-des-Fossés (94)</span>
        <span className="contact-info-separator">·</span>
        <a
          href="https://www.linkedin.com/in/kamellaidi"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-info-item"
          aria-label="LinkedIn de Kamel Laidi"
        >
          LinkedIn
        </a>
        <span className="contact-info-separator">·</span>
        <a
          href="https://github.com/kamellaidi"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-info-item"
          aria-label="GitHub de Kamel Laidi"
        >
          GitHub
        </a>
      </div>

      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">{t('form.name')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('form.email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">{t('form.subject')}</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">{t('form.message')}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            {t('form.submit')}
          </button>

          {status === 'success' && (
            <div className="status-message success">{t('form.success')}</div>
          )}
          {status === 'error' && (
            <div className="status-message error">{t('form.error')}</div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
