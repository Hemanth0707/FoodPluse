import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [theme, setTheme] = useState('dark');
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="page active" id="page-landing">
      <nav className="navbar" id="mainNav">
        <div className="nav-logo">
          <span className="logo-icon">⚡</span><span>FoodPulse</span>
        </div>
        <ul className={`nav-links ${navOpen ? 'flex' : 'hidden lg:flex'}`} id="navLinks">
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#testimonials">Reviews</a></li>
        </ul>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <Link to="/login" className="btn-ghost hidden sm:inline-flex">Login</Link>
          <Link to="/register" className="btn-primary hidden sm:inline-flex">Register</Link>
        </div>
        <button className="nav-hamburger lg:hidden" onClick={() => setNavOpen(!navOpen)}>☰</button>
      </nav>

      <section className="hero">
        <div className="hero-blobs">
          <div className="blob blob1"></div>
          <div className="blob blob2"></div>
          <div className="blob blob3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">🚀 The Future of Campus Dining</div>
          <h1 className="hero-heading">Smart Campus <br/><span className="gradient-text">Food Ecosystem</span></h1>
          <p className="hero-sub">Report food issues in seconds and earn Food Points. Spend them at verified campus stalls. Clean, fast, and transparent.</p>
          
          <div className="hero-btns">
            <Link to="/register" className="btn-primary btn-lg">Get Started Now</Link>
            <a href="#how-it-works" className="btn-outline btn-lg">How It Works</a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">5k+</div>
              <div className="stat-label">Active Students</div>
            </div>
            <div className="stat-div"></div>
            <div className="stat">
              <div className="stat-num">24/7</div>
              <div className="stat-label">AI Validation</div>
            </div>
            <div className="stat-div"></div>
            <div className="stat">
              <div className="stat-num">12+</div>
              <div className="stat-label">Campus Stalls</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="pm-header">
                <div className="pm-dot red"></div>
                <div className="pm-dot yellow"></div>
                <div className="pm-dot green"></div>
              </div>
              <div className="pm-card pulse-card">
                <div className="pm-icon">📸</div>
                <div className="pm-title">Issue Auto-Verified</div>
                <div className="pm-sub">AI detected: Undercooked Roti</div>
              </div>
              <div className="pm-card green-card" style={{ marginTop: '10px' }}>
                <div className="pm-icon">💸</div>
                <div className="pm-title">Wallet Updated</div>
                <div className="pm-sub">+150 Food Points added</div>
                <div className="pm-bar"><div className="pm-fill" style={{ width: '85%' }}></div></div>
                <div className="pm-points">450 pts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adding a placeholder for other sections to keep it short but visually identical to the template */}
      <section id="features" className="section bg-alt">
        <h2 className="section-heading text-center">Platform <span className="gradient-text">Features</span></h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="fc-icon">🤖</div>
            <h3>AI-Powered Verification</h3>
            <p>Our system uses NLP and computer vision to instantly verify food complaints, reducing manual checks.</p>
          </div>
          <div className="feature-card featured">
            <div className="fc-icon">🪙</div>
            <h3>Food Point Economy</h3>
            <p>Get compensated automatically for verified bad meals with points valid across campus.</p>
          </div>
          <div className="feature-card">
            <div className="fc-icon">🏪</div>
            <h3>Stall Marketplace</h3>
            <p>Browse verified menus, order ahead, and skip the queues at your favorite campus outlets.</p>
          </div>
        </div>
      </section>
      
      <footer className="footer">
        <div className="footer-bottom text-center">
          <p>© 2026 LPU FoodPulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
