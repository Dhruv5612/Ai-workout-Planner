import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import SocialProofSection from '../components/SocialProofSection';
import FeatureSection from '../components/FeatureSection';
import ReviewSection from '../components/ReviewSection';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user, isPremium } = useAuth();
  
  return (
    <div className="home">
      <Header />
      <HeroSection />
      <SocialProofSection />
      
      <FeatureSection
        title="AI-powered personal training"
        subtitle="Personalized Workout Plans"
        description="Get personalized workout plans tailored to your fitness level, goals, and available equipment. Our AI trainer adapts to your progress and provides real-time guidance."
        imageSrc="/images/Photo 2.jpg"
        imageAlt="AI personal training interface"
      />
      
      <FeatureSection
        title="Track your progress"
        subtitle="Progress Monitoring"
        description="Monitor your fitness journey with detailed analytics, progress photos, and performance metrics. Stay motivated with visual progress tracking and achievement milestones."
        imageSrc="/images/Photo3.png"
        imageAlt="Progress tracking dashboard"
        reverse={true}
      />
      
      <FeatureSection
        title="Expert exercise library"
        subtitle="Comprehensive Exercise Database"
        description="Access thousands of exercises with detailed instructions, video demonstrations, and form tips. Perfect for beginners and advanced users alike."
        imageSrc="/images/exercise-library.png"
        imageAlt="Exercise library interface"
      />
      
      <ReviewSection />
    </div>
  );
}

export default Home; 