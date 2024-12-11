import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Contact</h2>
      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nom</label>
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
              <label htmlFor="email">Email</label>
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
            <label htmlFor="subject">Sujet</label>
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
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Envoyer
          </button>

          {status === 'success' && (
            <div className="status-message success">
              Message envoyé avec succès!
            </div>
          )}
          {status === 'error' && (
            <div className="status-message error">
              Une erreur est survenue. Veuillez réessayer.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;