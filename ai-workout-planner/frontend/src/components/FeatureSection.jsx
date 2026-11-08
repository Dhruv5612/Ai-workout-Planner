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
    <section className={`spatial-feature-section ${reverse ? 'reverse' : ''}`}>
      <div className="spatial-feature-container">
        <div className="spatial-feature-card glass-panel">
          <div className="feature-text-block">
            <div className="genz-pill">
              <span>✦ {subtitle}</span>
            </div>
            <h2 className="feature-heading">{title}</h2>
            <p className="feature-desc">{description}</p>
            
            <div className="feature-highlights">
              <div className="highlight-pill">
                <span className="pill-check">✓</span>
                <span>Hyper-Adaptive Neural Engine</span>
              </div>
              <div className="highlight-pill">
                <span className="pill-check">✓</span>
                <span>Spatial 3D Motion Analysis</span>
              </div>
              <div className="highlight-pill">
                <span className="pill-check">✓</span>
                <span>Calibrated Progressive Overload</span>
              </div>
            </div>
          </div>

          <div className="feature-visual-block">
            <div className="spatial-media-pod">
              <div className="pod-shine"></div>
              {videoSrc ? (
                <video 
                  title={imageAlt}
                  playsInline 
                  muted 
                  autoPlay 
                  loop 
                  className="spatial-feature-media"
                  src={videoSrc}
                />
              ) : (
                <img 
                  className="spatial-feature-media" 
                  src={imageSrc} 
                  alt={imageAlt}
                  onError={(e) => {
                    // Fallback visual pod if local image isn't available
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <div className="media-floating-chip">
                <span className="chip-sparkle">✦</span>
                <span>AI OPTIMIZED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
