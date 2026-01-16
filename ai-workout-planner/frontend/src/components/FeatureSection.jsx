import React from 'react';
import './FeatureSection.css';

const FeatureSection = ({ 
  title, 
  subtitle, 
  description, 
  imageSrc, 
  imageAlt, 
  videoSrc, 
  backgroundImage,
  reverse = false 
}) => {
  return (
    <section className={`feature-section ${reverse ? 'reverse' : ''}`}>
      {backgroundImage && (
        <img 
          src={backgroundImage} 
          className="feature-background"
          alt="Feature background"
        />
      )}
      <div className="feature-content">
        <div className="feature-text">
          <h2 className="feature-title">{title}</h2>
          <p className="feature-subtitle">{subtitle}</p>
          <p className="feature-description">{description}</p>
        </div>
        <div className="feature-media">
          {videoSrc ? (
            <video 
              title={imageAlt}
              playsInline 
              muted 
              autoPlay 
              loop 
              className="feature-video"
              src={videoSrc}
            />
          ) : (
            <img 
              className="feature-image" 
              src={imageSrc} 
              alt={imageAlt}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection; 