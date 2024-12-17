import { useState, useCallback } from 'react';

export const useFeatureNavigation = (features) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const next = useCallback(() => {
    setCurrentIndex(prev => prev === features.length - 1 ? 0 : prev + 1);
  }, [features.length]);

  const prev = useCallback(() => {
    setCurrentIndex(prev => prev === 0 ? features.length - 1 : prev - 1);
  }, [features.length]);

  return { currentIndex, next, prev };
};