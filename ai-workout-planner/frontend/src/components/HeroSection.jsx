import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <img 
        src="/images/photo1.jpg" 
        className="hero-background" 
        alt="Hero background"
      />
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            AI-powered personal training app for gym beginners
          </h1>
          <p className="hero-description">
            Get personalized workout plan and personal training by AI trainer. 
            Easy-to-use, effective workout planner.
          </p>
        </div>
       
      </div>
    </section>
  );
};

export default HeroSection; 