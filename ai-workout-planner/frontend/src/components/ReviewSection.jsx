import React, { useState } from 'react';
import './ReviewSection.css';

const ReviewSection = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      name: "Felipe1983",
      text: "This app has revolutionized the way I approach my fitness regimen. With the novelty of fresh routines, clear video instructions, and invaluable respiration and weight suggestions, Planfit has invigorated my commitment to a healthier lifestyle.",
      date: "Aug 11, 2023"
    },
    {
      name: "Griffin Ehlers 5",
      text: "I was doubtful of getting a good workout with this app, but when I did those side kick burpees HOLY COW!! Loved personalized workout and can't wait for the next!",
      date: "Aug 9, 2023"
    },
    {
      name: "Abubuver",
      text: "It recommends workout routines that are challenging enough, manages breaks with a timer, has a clean UI, allows you to modify your workouts, and shares your workouts after you're done! It's a great workout app and I highly recommend it!",
      date: "Sep 7, 2022"
    },
    {
      name: "Jeoyong",
      text: "It's been 6 weeks since I started with Planfit and I'm on day 50 of my diet. ... As a result, in 50 days, I've gone from 31% body fat to 23% body fat, gained 0.7kg of muscle, and lost 6.5kg of body fat. Thank you so much.",
      date: "Dec, 2022"
    }
  ];

  const StarRating = () => (
    <div className="star-container">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i}
          stroke="currentColor" 
          fill="#1bedc7" 
          strokeWidth="0" 
          viewBox="0 0 16 16" 
          className="star-icon" 
          height="1em" 
          width="1em" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
        </svg>
      ))}
    </div>
  );

  return (
    <section className="review-section">
      <div className="review-content">
        <img 
          src="/images/quoteIcon.png" 
          className="quote-icon" 
          alt="quote mark"
        />
        <h2 className="review-title">
          Join more than 1m success stories
        </h2>
        <div className="review-cards">
          <div className="review-card">
            <StarRating />
            <div className="review-main">
              <p className="review-text">{reviews[currentReview].text}</p>
              <div className="review-meta">
                <span className="review-name">{reviews[currentReview].name}</span>
                <span className="review-date">{reviews[currentReview].date}</span>
              </div>
            </div>
          </div>
        </div>
        <ul className="review-pagination">
          {reviews.map((_, index) => (
            <li 
              key={index}
              className={`pagination-dot ${index === currentReview ? 'active' : ''}`}
              onClick={() => setCurrentReview(index)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ReviewSection; 