import React, { useState } from 'react';
import SharedHeader from '../components/SharedHeader';
import './ArticlesPage.css';
import api from '../services/api'; // Assuming api service is needed for login
import { useNavigate } from 'react-router-dom';

const ArticlesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showShareForm, setShowShareForm] = useState(false);

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'health', name: 'Health' },
    { id: 'recipes', name: 'Recipes' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'tips', name: 'Tips & Tricks' }
  ];

  const articles = [
    {
      id: 1,
      title: '10 Essential Nutrients for Muscle Building',
      author: 'Sarah Johnson',
      category: 'nutrition',
      date: '2024-01-15',
      readTime: '5 min read',
      excerpt: 'Discover the key nutrients your body needs to build lean muscle mass and improve your fitness performance.',
      content: 'Building muscle requires more than just lifting weights. Your body needs the right nutrients to repair and grow muscle tissue. Protein is essential, but you also need carbohydrates for energy, healthy fats for hormone production, and various vitamins and minerals. This article covers the 10 most important nutrients for muscle building and how to incorporate them into your diet.',
      tags: ['Muscle Building', 'Protein', 'Nutrition'],
      likes: 124,
      comments: 18
    },
    {
      id: 2,
      title: 'The Complete Guide to HIIT Workouts',
      author: 'Mike Chen',
      category: 'fitness',
      date: '2024-01-12',
      readTime: '8 min read',
      excerpt: 'High-Intensity Interval Training (HIIT) is one of the most effective ways to burn fat and improve cardiovascular fitness.',
      content: 'HIIT workouts combine short bursts of intense exercise with periods of rest or lower-intensity activity. This training method has been shown to burn more calories in less time compared to steady-state cardio. Learn how to structure your HIIT workouts, choose the right exercises, and progress safely to avoid injury while maximizing results.',
      tags: ['HIIT', 'Cardio', 'Fat Loss'],
      likes: 89,
      comments: 12
    },
    {
      id: 3,
      title: 'Healthy Meal Prep: 7-Day Plan',
      author: 'Emma Davis',
      category: 'recipes',
      date: '2024-01-10',
      readTime: '12 min read',
      excerpt: 'Save time and eat healthy with this comprehensive meal prep guide that includes shopping lists and recipes.',
      content: 'Meal prepping is the key to maintaining a healthy diet when you\'re busy. This guide provides a complete 7-day meal plan with shopping lists, prep instructions, and delicious recipes that are both nutritious and satisfying. Learn how to batch cook, store meals properly, and create variety in your weekly menu.',
      tags: ['Meal Prep', 'Healthy Eating', 'Recipes'],
      likes: 156,
      comments: 23
    },
    {
      id: 4,
      title: 'Understanding Your Body\'s Recovery Process',
      author: 'Dr. James Wilson',
      category: 'health',
      date: '2024-01-08',
      readTime: '6 min read',
      excerpt: 'Learn how your body recovers from exercise and why rest days are crucial for your fitness progress.',
      content: 'Recovery is just as important as your workouts. When you exercise, you create micro-tears in your muscle fibers. During recovery, your body repairs these tears and builds stronger muscles. Understanding the recovery process helps you optimize your training schedule, prevent overtraining, and achieve better results.',
      tags: ['Recovery', 'Rest Days', 'Muscle Growth'],
      likes: 67,
      comments: 8
    },
    {
      id: 5,
      title: 'Mindful Eating: Transform Your Relationship with Food',
      author: 'Lisa Thompson',
      category: 'wellness',
      date: '2024-01-05',
      readTime: '7 min read',
      excerpt: 'Develop a healthier relationship with food through mindful eating practices and techniques.',
      content: 'Mindful eating is about being present and aware during meals. It involves paying attention to hunger cues, eating slowly, and savoring each bite. This practice can help you develop a healthier relationship with food, prevent overeating, and enjoy your meals more. Learn practical techniques to incorporate mindful eating into your daily routine.',
      tags: ['Mindful Eating', 'Wellness', 'Mental Health'],
      likes: 92,
      comments: 15
    },
    {
      id: 6,
      title: '5 Simple Ways to Stay Active at Home',
      author: 'Alex Rodriguez',
      category: 'tips',
      date: '2024-01-03',
      readTime: '4 min read',
      excerpt: 'No gym membership? No problem! Here are 5 effective ways to stay active and fit at home.',
      content: 'You don\'t need expensive equipment or a gym membership to stay fit. Bodyweight exercises, household items, and simple routines can provide an effective workout. This article shares 5 practical ways to stay active at home, including workout routines, equipment alternatives, and tips for staying motivated.',
      tags: ['Home Workouts', 'Bodyweight Exercises', 'Fitness Tips'],
      likes: 134,
      comments: 19
    },
    {
      id: 7,
      title: 'The Truth About Supplements: What You Need to Know',
      author: 'Dr. Maria Garcia',
      category: 'nutrition',
      date: '2024-01-01',
      readTime: '9 min read',
      excerpt: 'Navigate the confusing world of supplements with evidence-based information about what works and what doesn\'t.',
      content: 'The supplement industry is filled with claims and confusion. This article provides evidence-based information about popular supplements, their benefits, risks, and when they might be helpful. Learn which supplements are worth considering, how to choose quality products, and when to consult with a healthcare professional.',
      tags: ['Supplements', 'Nutrition', 'Health'],
      likes: 78,
      comments: 11
    },
    {
      id: 8,
      title: 'Building a Sustainable Fitness Routine',
      author: 'Chris Anderson',
      category: 'fitness',
      date: '2023-12-28',
      readTime: '6 min read',
      excerpt: 'Create a fitness routine that fits your lifestyle and helps you achieve long-term health goals.',
      content: 'The best fitness routine is one you can stick to. This guide helps you build a sustainable routine that fits your schedule, preferences, and goals. Learn how to set realistic expectations, create variety in your workouts, and develop habits that last. Discover strategies for staying motivated and overcoming common obstacles.',
      tags: ['Fitness Routine', 'Motivation', 'Habits'],
      likes: 103,
      comments: 14
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="articles-page">
      <SharedHeader />
      
      <div className="articles-hero">
        <div className="articles-header">
          <h1>Health & Fitness Articles</h1>
          <button 
            className="share-article-btn"
            onClick={() => setShowShareForm(true)}
          >
            Share Your Article
          </button>
        </div>
      </div>

      <div className="articles-content">

      <div className="articles-controls">
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="articles-grid">
        {filteredArticles.map(article => (
          <article key={article.id} className="article-card">
            <div className="article-header">
              <div className="article-meta">
                <span className="article-category">{categories.find(cat => cat.id === article.category)?.name}</span>
                <span className="article-date">{formatDate(article.date)}</span>
              </div>
              <div className="article-stats">
                <span className="read-time">{article.readTime}</span>
              </div>
            </div>
            
            <div className="article-content">
              <h2 className="article-title">{article.title}</h2>
              <p className="article-excerpt">{article.excerpt}</p>
              
              <div className="article-author">
                <span>By {article.author}</span>
              </div>

              <div className="article-tags">
                {article.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>

              <div className="article-engagement">
                <div className="engagement-item">
                  <span className="likes-count">❤️ {article.likes}</span>
                </div>
                <div className="engagement-item">
                  <span className="comments-count">💬 {article.comments}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="no-results">
          <p>No articles found matching your criteria.</p>
          <button 
            className="reset-filters"
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {showShareForm && (
        <div className="share-modal">
          <div className="share-modal-content">
            <div className="share-modal-header">
              <h2>Share Your Article</h2>
              <button 
                className="close-btn"
                onClick={() => setShowShareForm(false)}
              >
                ×
              </button>
            </div>
            
            <form className="share-form">
              <div className="form-group">
                <label htmlFor="article-title">Article Title</label>
                <input
                  type="text"
                  id="article-title"
                  placeholder="Enter your article title"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="article-category">Category</label>
                <select id="article-category" required>
                  <option value="">Select a category</option>
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="article-excerpt">Brief Description</label>
                <textarea
                  id="article-excerpt"
                  placeholder="Write a brief description of your article"
                  rows="3"
                  required
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="article-content">Article Content</label>
                <textarea
                  id="article-content"
                  placeholder="Write your article content here..."
                  rows="10"
                  required
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="article-tags">Tags (comma separated)</label>
                <input
                  type="text"
                  id="article-tags"
                  placeholder="e.g., fitness, nutrition, health"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowShareForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Share Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ArticlesPage; 