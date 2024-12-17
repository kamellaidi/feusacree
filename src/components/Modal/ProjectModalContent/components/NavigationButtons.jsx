import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavigationButtons = ({ onNext, onPrev }) => (
  <>
    <button onClick={onPrev} className="nav-button prev">
      <ChevronLeft size={24} />
    </button>
    <button onClick={onNext} className="nav-button next">
      <ChevronRight size={24} />
    </button>
  </>
);

export default NavigationButtons;