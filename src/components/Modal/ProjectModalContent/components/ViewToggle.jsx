import React from 'react';
import { Code, Layout } from 'lucide-react';

const ViewToggle = ({ isShowingCode, onToggle }) => (
  <div className="view-toggle">
    <button 
      className={`toggle-button ${!isShowingCode ? 'active' : ''}`}
      onClick={() => onToggle(false)}
    >
      <Layout size={20} />
      Interface
    </button>
    <button 
      className={`toggle-button ${isShowingCode ? 'active' : ''}`}
      onClick={() => onToggle(true)}
    >
      <Code size={20} />
      Code
    </button>
  </div>
);

export default ViewToggle;