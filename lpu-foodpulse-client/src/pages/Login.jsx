import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Eye, EyeOff, ShieldAlert, ChevronRight, Zap, MapPin, Wallet, ShieldCheck, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, loading, error, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/report-food');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    const success = await login(email, password);
    if (success) {
      navigate('/report-food');
    }
  };

  const isFormValid = email.length > 0 && password.length > 0;

  return (
    <div className="auth-split-layout">
      
      {/* LEFT PANEL: BRANDING & FEATURES (40%) */}
      <div className="auth-split-left" style={{ justifyContent: 'center' }}>
        
        {/* Abstract Floating Blobs */}
        <div style={{ position: 'absolute', top: '-5%', left: '-10%', width: '600px', height: '600px', background: 'rgba(147,51,234,0.15)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'rgba(236,72,153,0.1)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }}></div>
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #9333ea, #db2777)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 0 30px rgba(168,85,247,0.4)' }}>
              <Zap size={24} fill="currentColor" />
            </div>
            <span style={{ fontSize: '1.875rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'white' }}>Food<span style={{ background: 'linear-gradient(to right, #c084fc, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pulse</span></span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="auth-hero-title" style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Smart Campus<br/>
              <span style={{ background: 'linear-gradient(to right, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Food Ecosystem.</span>
            </h1>
            
            <p className="auth-hero-sub" style={{ fontSize: '1.1rem', marginBottom: '3rem' }}>
              Skip queues, report food issues, unlock premium stalls, and track your wallet seamlessly.
            </p>
          </motion.div>
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="auth-feature-box" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
            <div className="auth-feature-icon" style={{ background: 'rgba(168,85,247,0.15)', color: '#c084fc', marginBottom: '1rem' }}>
              <ShieldCheck size={20} />
            </div>
            <h4 className="auth-feature-title" style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>AI Verification</h4>
            <p className="auth-feature-desc" style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>Computer vision food issue tracking.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="auth-feature-box" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
            <div className="auth-feature-icon" style={{ background: 'rgba(236,72,153,0.15)', color: '#f472b6', marginBottom: '1rem' }}>
              <Wallet size={20} />
            </div>
            <h4 className="auth-feature-title" style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Smart Wallet</h4>
            <p className="auth-feature-desc" style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>Manage points & view transactions.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="auth-feature-box" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
            <div className="auth-feature-icon" style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', marginBottom: '1rem' }}>
              <MapPin size={20} />
            </div>
            <h4 className="auth-feature-title" style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Live Tracking</h4>
            <p className="auth-feature-desc" style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>Real-time order prep tracking.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="auth-feature-box" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
            <div className="auth-feature-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', marginBottom: '1rem' }}>
              <ShoppingBag size={20} />
            </div>
            <h4 className="auth-feature-title" style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Marketplace</h4>
            <p className="auth-feature-desc" style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>Access premium campus stalls.</p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT PANEL: FORM (60%) */}
      <div className="auth-split-right" style={{ padding: '4rem 8rem', display: 'flex', alignItems: 'center' }}>
        
        <div className="auth-form-container" style={{ maxWidth: '480px', width: '100%' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            
            <div style={{ marginBottom: '3.5rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>Sign In</h2>
              <p style={{ color: '#9ca3af', fontSize: '1.1rem' }}>
                New to FoodPulse? <Link to="/register" style={{ color: '#c084fc', fontWeight: 700, transition: 'color 0.2s hover:text-purple-400' }}>Create an account</Link>
              </p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ marginBottom: '2.5rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', padding: '1.25rem', borderRadius: '16px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <ShieldAlert size={22} style={{ flexShrink: 0, marginTop: '2px', color: '#ef4444' }} />
                <span style={{ fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.5 }}>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Email / Identifier */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '0.95rem', marginBottom: '0.75rem', fontWeight: 500, color: '#e5e7eb' }}>Email Address or Reg No.</label>
                <input 
                  type="text" required placeholder="E.g. student@lpu.in"
                  className="form-input"
                  style={{ padding: '1rem 1.25rem', fontSize: '1rem', borderRadius: '12px' }}
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <label style={{ fontSize: '0.95rem', marginBottom: 0, fontWeight: 500, color: '#e5e7eb' }}>Password</label>
                  <a href="#" style={{ fontSize: '0.9rem', fontWeight: 600, color: '#c084fc' }}>Forgot password?</a>
                </div>
                
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? "text" : "password"} required placeholder="Enter your password"
                    className="form-input"
                    style={{ padding: '1rem 1.25rem', paddingRight: '3.5rem', fontSize: '1rem', borderRadius: '12px' }}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginTop: '-0.5rem' }}>
                <input type="checkbox" id="remember" style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer', accentColor: '#9333ea', borderRadius: '4px' }} />
                <label htmlFor="remember" style={{ fontSize: '0.95rem', color: '#9ca3af', cursor: 'pointer', fontWeight: 400 }}>Remember me for 30 days</label>
              </div>

              {/* Submit Area */}
              <div style={{ marginTop: '1rem' }}>
                <button 
                  type="submit" 
                  className="btn-primary btn-full btn-lg"
                  disabled={!isFormValid || loading}
                  style={{ 
                    opacity: (!isFormValid || loading) ? 0.6 : 1, 
                    display: 'flex', 
                    justifyContent: 'center',
                    padding: '1.1rem',
                    fontSize: '1.1rem',
                    borderRadius: '12px',
                    boxShadow: isFormValid ? '0 10px 25px -5px rgba(147, 51, 234, 0.4)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '1.25rem', height: '1.25rem', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ChevronRight size={22} />
                    </>
                  )}
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
