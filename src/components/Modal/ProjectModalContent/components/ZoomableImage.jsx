import React, { useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

const ZoomableImage = ({ 
  image, 
  zoom, 
  onZoom, 
  onZoomIn, 
  onZoomOut,
  alt 
}) => {
  const imageRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (zoom <= 1) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    imageRef.current.style.transformOrigin = `${x * 100}% ${y * 100}%`;
  }, [zoom]);

  const handleImageClick = useCallback((e) => {
    if (zoom >= 2.5) {
      onZoom(1);
      return;
    }

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    imageRef.current.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    onZoom(2.5);
  }, [zoom, onZoom]);

  return (
    <>
      <div className="zoom-controls">
        <button onClick={onZoomOut} className="zoom-button">
          <ZoomOut size={20} />
        </button>
        <button onClick={onZoomIn} className="zoom-button">
          <ZoomIn size={20} />
        </button>
      </div>

      <div 
        className="image-wrapper"
        onMouseMove={handleMouseMove}
      >
        <img 
          ref={imageRef}
          src={image} 
          alt={alt}
          onClick={handleImageClick}
          style={{
            transform: `scale(${zoom})`,
            transition: 'transform 0.2s ease'
          }}
          className={zoom > 1 ? 'zoomed' : 'zoomable'}
        />
      </div>
    </>
  );
};

export default ZoomableImage;