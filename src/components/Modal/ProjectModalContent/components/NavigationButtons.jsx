import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavigationButtons = ({ onNext, onPrev }) => (
  <>
    <button onClick={onPrev} className="nav-button prev" aria-label="Feature précédente">
      <ChevronLeft size={24} />
    </button>
    <button onClick={onNext} className="nav-button next" aria-label="Feature suivante">
      <ChevronRight size={24} />
    </button>
  </>
);

export default NavigationButtons;
