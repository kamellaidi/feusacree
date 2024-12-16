// Modal.jsx
import React from 'react';
import { X } from 'lucide-react';
import './modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;