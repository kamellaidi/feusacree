import { useState, useCallback } from 'react';
import { ZOOM_CONFIG } from '../constants/zoom';

export const useZoom = (initialZoom = ZOOM_CONFIG.DEFAULT) => {
  const [zoom, setZoom] = useState(initialZoom);
  
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + ZOOM_CONFIG.STEP, ZOOM_CONFIG.MAX));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - ZOOM_CONFIG.STEP, ZOOM_CONFIG.MIN));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(ZOOM_CONFIG.DEFAULT);
  }, []);

  return { zoom, setZoom, handleZoomIn, handleZoomOut, resetZoom };
};