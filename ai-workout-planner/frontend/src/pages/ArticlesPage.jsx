import React, { useState } from 'react';
import SharedHeader from '../components/SharedHeader';
import './ArticlesPage.css';

const ArticlesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showShareForm, setShowShareForm] = useState(false);

  const categories = [
    { id: 'all', name: 'All Drops' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'fitness', name: 'Fitness Science' },
    { id: 'health', name: 'Recovery' },
    { id: 'recipes', name: 'Meal Prep' },
    { id: 'wellness', name: 'Mindset' },
    { id: 'tips', name: 'Hacks & Cues' }
  ];

  const articles = [
    {
      id: 1,
      title: '10 Essential Nutrients for Maximum Muscle Hypertrophy',
      author: 'Sarah Johnson, MS RD',
      category: 'nutrition',
      date: '2024-01-15',
      readTime: '5 min read',
      excerpt: 'Discover the exact micro & macronutrient ratios your body requires to repair muscle tears and spike protein synthesis.',
      content: 'Building muscle requires more than just lifting weights. Your body needs the right nutrients to repair and grow muscle tissue. Protein is essential, but you also need carbohydrates for glycogen replenishment, healthy fats for hormone production, and key electrolytes.',
      tags: ['Hypertrophy', 'Protein Synthesis', 'Nutrition'],
      likes: 342,
      comments: 28
    },
    {
      id: 2,
      title: 'The Biohacking Guide to HIIT & Mitochondrial Health',
      author: 'Mike Chen, CSCS',
      category: 'fitness',
      date: '2024-01-12',
      readTime: '8 min read',
      excerpt: 'High-Intensity Interval Training is a cheat code for VO2 max, EPOC calorie afterburn, and cardiovascular power.',
      content: 'HIIT workouts combine short bursts of maximal effort with calculated rest intervals. This training method triggers cellular mitochondrial biogenesis, burning calories long after your session concludes.',
      tags: ['HIIT', 'VO2 Max', 'Fat Burn'],
      likes: 289,
      comments: 34
    },
    {
      id: 3,
      title: 'High-Protein Meal Prep: 7-Day Macro Masterplan',
      author: 'Emma Davis',
      category: 'recipes',
      date: '2024-01-10',
      readTime: '12 min read',
      excerpt: 'Cook once, eat clean all week. Complete shopping list, macro breakdowns, and delicious recipes that taste gourmet.',
      content: 'Meal prepping removes friction from staying dialed into your caloric deficit or surplus. This blueprint provides a foolproof 7-day plan with high bio-availability protein and complex carbs.',
      tags: ['Meal Prep', 'Clean Eating', 'Recipes'],
      likes: 512,
      comments: 49
    },
    {
      id: 4,
      title: 'Decoding Central Nervous System Fatigue & Deload Weeks',
      author: 'Dr. James Wilson',
      category: 'health',
      date: '2024-01-08',
      readTime: '6 min read',
      excerpt: 'Why training to failure every day sabotages gains. How to strategically deload to trigger rapid supercompensation.',
      content: 'Recovery is where muscle adaptation happens. When training stress exceeds systemic recovery capabilities, hormone profiles crash. Learn how to identify CNS fatigue and implement deload protocols.',
      tags: ['CNS Recovery', 'Deload', 'Supercompensation'],
      likes: 198,
      comments: 17
    },
    {
      id: 5,
      title: 'Mindful Eating & Dopamine: Destroying Late-Night Binging',
      author: 'Lisa Thompson',
      category: 'wellness',
      date: '2024-01-05',
      readTime: '7 min read',
      excerpt: 'Rewire your relationship with cravings, regulate leptin and ghrelin, and achieve effortless dietary discipline.',
      content: 'Cravings are neurochemical signals, not moral failures. By understanding dopamine triggers and eating without phone screens, you can eliminate unconscious snacking and stay on track.',
      tags: ['Mindset', 'Dopamine', 'Habits'],
      likes: 276,
      comments: 22
    },
    {
      id: 6,
      title: 'The Minimalist Home Gym: Full Gains with Dumbbells Only',
      author: 'Alex Rodriguez',
      category: 'tips',
      date: '2024-01-03',
      readTime: '4 min read',
      excerpt: 'No crowded commercial gym membership required. How to generate mechanical tension with adjustable weights at home.',
      content: 'Muscle tissue responds to mechanical tension and metabolic stress, not fancy gym machines. Learn how to manipulate tempo, paused reps, and angles to stimulate equal hypertrophy at home.',
      tags: ['Home Workouts', 'Minimalism', 'Dumbbells'],
      likes: 421,
      comments: 39
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
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="articles-page">
      <SharedHeader />
      
      <div className="articles-ambient-glow glow-1"></div>
      <div className="articles-ambient-glow glow-2"></div>

      <div className="articles-hero">
        <div className="articles-header">
          <div className="genz-pill pink">
            <span>✦ RESEARCH-BACKED GAINS • GYM LORE</span>
          </div>
          <h1>The Fit Knowledge <span className="holo-pink">Vault</span></h1>
          <p className="articles-subtitle">
            Science-backed nutrition, cutting-edge training methodologies, and macro recipes curated for modern athletes.
          </p>
          <button 
            className="share-article-btn spatial-btn-primary"
            onClick={() => setShowShareForm(true)}
          >
            <span>✍️ Submit Story</span>
          </button>
        </div>
      </div>

      <div className="articles-content">
        <div className="articles-controls">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search topics, hacks, or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

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
        </div>

        <div className="articles-grid">
          {filteredArticles.map(article => (
            <article key={article.id} className="article-card glass-panel">
              <div className="article-top-bar">
                <span className="article-category-badge">
                  {categories.find(cat => cat.id === article.category)?.name || article.category}
                </span>
                <span className="read-time-pill">{article.readTime}</span>
              </div>
              
              <div className="article-body">
                <h2 className="article-title">{article.title}</h2>
                <p className="article-excerpt">{article.excerpt}</p>
                
                <div className="article-author-row">
                  <div className="author-circle">{article.author.charAt(0)}</div>
                  <div className="author-info">
                    <span className="author-name">{article.author}</span>
                    <span className="article-date">{formatDate(article.date)}</span>
                  </div>
                </div>

                <div className="article-tags">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="tag-pill">#{tag}</span>
                  ))}
                </div>

                <div className="article-engagement-bar">
                  <span className="engagement-pill">❤️ {article.likes}</span>
                  <span className="engagement-pill">💬 {article.comments}</span>
                  <span className="read-more-link">Read Drop →</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="no-results glass-panel">
            <span className="no-results-icon">🛸</span>
            <h3>No articles found</h3>
            <p>No posts match "{searchTerm}". Try another search keyword.</p>
            <button 
              className="spatial-btn-primary"
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
            <div className="share-modal-content glass-panel">
              <div className="share-modal-header">
                <h2>Share Your Fitness Story</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowShareForm(false)}
                >
                  ×
                </button>
              </div>
              
              <form className="share-form" onSubmit={(e) => { e.preventDefault(); setShowShareForm(false); }}>
                <div className="form-group">
                  <label htmlFor="article-title">Article Title</label>
                  <input
                    type="text"
                    id="article-title"
                    placeholder="e.g. How I Smashed My Bench Press Plateau"
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
                  <label htmlFor="article-excerpt">Key Takeaway / Hook</label>
                  <textarea
                    id="article-excerpt"
                    placeholder="Brief 2-sentence summary that grabs readers"
                    rows="2"
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="article-content">Full Story / Content</label>
                  <textarea
                    id="article-content"
                    placeholder="Drop your knowledge, tips, routine, or workout log here..."
                    rows="6"
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="article-tags">Tags (comma separated)</label>
                  <input
                    type="text"
                    id="article-tags"
                    placeholder="hypertrophy, chest, motivation"
                  />
                </div>
                
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowShareForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="spatial-btn-primary">
                    Publish Drop 🚀
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
