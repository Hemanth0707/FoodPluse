import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Eye, EyeOff, ShieldAlert, CheckCircle2, ChevronRight, Zap, Star, ShieldCheck, Users, Target, Gift, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
// Force importing global styles
import '../index.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lpuId: '',
    email: '',
    password: '',
    confirmPassword: '',
    hostel: 'BH1',
    roomNumber: '',
    department: 'B.Tech CSE',
    year: '1',
    mess: 'Mess 1',
    role: 'student'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let err = '';
    if (name === 'email' && value && !value.endsWith('@lpu.in')) {
      err = 'Must be an @lpu.in email address';
    }
    if (name === 'password' && value && value.length < 6) {
      err = 'Password must be at least 6 characters';
    }
    if (name === 'confirmPassword' && value && value !== formData.password) {
      err = 'Passwords do not match';
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    const errorMsg = validateField(name, value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: errorMsg
    }));
    
    if (name === 'password' && formData.confirmPassword) {
      setValidationErrors(prev => ({
        ...prev,
        confirmPassword: value !== formData.confirmPassword ? 'Passwords do not match' : ''
      }));
    }
  };

  const isFormValid = () => {
    const isEmailValid = formData.email.endsWith('@lpu.in');
    const isPassValid = formData.password.length >= 6;
    const isMatch = formData.password === formData.confirmPassword;
    const allRequired = formData.name && formData.lpuId && formData.roomNumber;
    return isEmailValid && isPassValid && isMatch && allRequired;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    const submitData = { ...formData };
    delete submitData.confirmPassword;
    
    const success = await register(submitData);
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="auth-split-layout font-sans">
      
      {/* LEFT PANEL: BRANDING (46%) */}
      <div className="auth-split-left flex flex-col justify-between h-full relative">
        
        {/* Abstract Floating Glows */}
        <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Logo and Hero Title Header */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <Zap size={22} fill="currentColor" />
            </div>
            <span className="text-2xl font-display font-extrabold text-white">Food<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Pulse</span></span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white leading-tight mb-4">
              Reimagining<br/>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Campus Dining.</span>
            </h1>
            
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Join the AI-powered ecosystem built for smarter food ordering, queue reduction, and food quality transparency at LPU.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid Visuals */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 0.6 }} 
          className="relative z-10 grid grid-cols-2 gap-4 my-6"
        >
          {/* Card 1: LIVE MESS QUALITY INDEX */}
          <div className="bg-[#111126]/40 border border-white/5 rounded-3xl p-4 flex flex-col justify-between backdrop-blur-md">
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest block mb-2.5">Live Mess Quality Index</span>
            <div className="flex gap-2.5 items-center">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10 relative bg-black/40">
                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=80" alt="Food" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <h5 className="text-[11px] font-bold text-white truncate">BH1 Mess</h5>
                <div className="flex items-center gap-1 text-[9px] text-yellow-400 font-extrabold leading-none mt-0.5">
                  <span>4.6</span>
                  <div className="flex text-[7px] text-yellow-500">★★★★★</div>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[9px]">
                  <span className="text-green-400 font-bold">Excellent</span>
                  <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: QUEUE PREDICTION */}
          <div className="bg-[#111126]/40 border border-white/5 rounded-3xl p-4 flex flex-col justify-between backdrop-blur-md overflow-hidden relative">
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Queue Prediction</span>
            <div className="min-w-0">
              <div className="flex items-center justify-between">
                <h5 className="text-[10px] font-bold text-gray-300 truncate">Central Mess</h5>
                <span className="text-[8px] text-green-400 font-bold bg-green-500/10 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-green-400" /> Low Wait
                </span>
              </div>
              <div className="text-xl font-extrabold text-white mt-1">15 min</div>
            </div>
            {/* Sparkline Graph */}
            <svg className="w-full h-6 text-green-400 mt-2 shrink-0" viewBox="0 0 100 30" fill="none">
              <path d="M0,25 Q15,10 30,22 T60,5 T90,20 L100,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M0,25 Q15,10 30,22 T60,5 T90,20 L100,18 L100,30 L0,30 Z" fill="url(#green-gradient-reg)" opacity="0.15" />
              <defs>
                <linearGradient id="green-gradient-reg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Card 3: TODAY'S ORDERS */}
          <div className="bg-[#111126]/40 border border-white/5 rounded-3xl p-4 flex flex-col justify-between backdrop-blur-md">
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest block mb-2.5">Today's Orders</span>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xl font-extrabold text-white">1,248</div>
                <span className="text-[9px] text-green-400 font-bold block mt-0.5">+18% from yesterday</span>
              </div>
              {/* Mini Bar Chart */}
              <svg className="w-12 h-8 text-purple-400" viewBox="0 0 60 30">
                <rect x="5" y="15" width="6" height="15" rx="1.5" fill="currentColor" opacity="0.3" />
                <rect x="15" y="8" width="6" height="22" rx="1.5" fill="currentColor" opacity="0.5" />
                <rect x="25" y="18" width="6" height="12" rx="1.5" fill="currentColor" opacity="0.3" />
                <rect x="35" y="4" width="6" height="26" rx="1.5" fill="currentColor" />
                <rect x="45" y="12" width="6" height="18" rx="1.5" fill="currentColor" opacity="0.7" />
              </svg>
            </div>
          </div>

          {/* Card 4: AI VERIFICATIONS */}
          <div className="bg-[#111126]/40 border border-white/5 rounded-3xl p-4 flex flex-col justify-between backdrop-blur-md">
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest block mb-2">AI Verifications</span>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xl font-extrabold text-white">98.7%</div>
                <span className="text-[9px] text-gray-400 block mt-0.5">Accuracy Rate</span>
              </div>
              {/* Progress Ring */}
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <svg className="w-full h-full text-purple-500 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-white/5" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-purple-400" strokeDasharray="98.7, 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-[8px] font-bold text-purple-300">98%</span>
              </div>
            </div>
          </div>

          {/* Card 5: Trust Banner (Full Width below grid) */}
          <div className="col-span-2 bg-white/[0.01] border border-white/5 rounded-2xl p-3 flex justify-between items-center backdrop-blur-md">
            <span className="text-[10px] text-gray-400 font-semibold leading-snug max-w-[200px]">More than 5K+ students trust FoodPulse every day!</span>
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                {['👦', '👧', '👨', '👩', '🧑'].map((avatar, idx) => (
                  <div key={idx} className="w-5 h-5 rounded-full border border-purple-900 bg-[#12122b] text-[10px] flex items-center justify-center select-none shadow">
                    {avatar}
                  </div>
                ))}
              </div>
              <span className="text-[9px] bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded-full font-extrabold tracking-wider">
                +2.3K
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Metrics Bar Footer */}
        <div className="relative z-10 border-t border-white/5 pt-4 mt-auto flex justify-between text-gray-400 text-[10px] font-bold">
          <span className="flex items-center gap-1.5">
            <Users size={12} className="text-purple-400" /> 5K+ Active Students
          </span>
          <span className="flex items-center gap-1.5">
            <Target size={12} className="text-purple-400" /> 99.8% AI Accuracy
          </span>
          <span className="flex items-center gap-1.5">
            <Gift size={12} className="text-purple-400" /> 20K+ Rewards Redeemed
          </span>
        </div>

      </div>

      {/* RIGHT PANEL: FORM (54%) */}
      <div className="auth-split-right">
        
        <div className="auth-form-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
                  <Users size={20} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.875rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'white', lineHeight: '1.2' }}>Create your account</h2>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    Already have an account? <Link to="/login" style={{ color: '#ec4899', fontWeight: 700 }}>Sign in here</Link>
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ marginBottom: '2rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', padding: '1rem 1.25rem', borderRadius: '16px', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <ShieldAlert size={20} style={{ flexShrink: 0, marginTop: '2px', color: '#ef4444' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.5 }}>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* SECTION: PERSONAL INFO */}
              <div>
                <h3 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> PERSONAL INFORMATION
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  {/* Full Name */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Full Name</label>
                    <div style={{ position: 'relative' }}>
                      <Users size={16} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                      <input 
                        type="text" name="name" required placeholder="E.g. Namburi Hemanth"
                        className="form-input"
                        style={{ paddingLeft: '3rem' }}
                        value={formData.name} onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  {/* Registration Number */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Registration Number</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={16} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                      <input 
                        type="text" name="lpuId" required placeholder="E.g. 12345678"
                        className="form-input"
                        style={{ paddingLeft: '3rem' }}
                        value={formData.lpuId} onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>LPU Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                    <input 
                      type="email" name="email" required placeholder="E.g. hemanth.123@lpu.in"
                      className="form-input"
                      style={{ paddingLeft: '3rem', borderColor: validationErrors.email ? '#ef4444' : undefined }}
                      value={formData.email} onChange={handleChange}
                    />
                  </div>
                  {validationErrors.email && (
                    <p style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><ShieldAlert size={14}/>{validationErrors.email}</p>
                  )}
                </div>
              </div>

              {/* SECTION: ACADEMIC & HOSTEL */}
              <div>
                <h3 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> ACADEMIC & HOSTEL DETAILS
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  {/* Department */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Department</label>
                    <select 
                      name="department" 
                      className="form-input"
                      value={formData.department} onChange={handleChange}
                    >
                      <option value="B.Tech CSE">B.Tech CSE</option>
                      <option value="B.Tech ME">B.Tech ME</option>
                      <option value="BBA">BBA</option>
                      <option value="MBA">MBA</option>
                      <option value="B.Des">B.Des</option>
                    </select>
                  </div>

                  {/* Year */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Year</label>
                    <select 
                      name="year" 
                      className="form-input"
                      value={formData.year} onChange={handleChange}
                    >
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                  {/* Hostel */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Hostel</label>
                    <select 
                      name="hostel" 
                      className="form-input"
                      value={formData.hostel} onChange={handleChange}
                    >
                      <option value="BH1">BH-1</option>
                      <option value="BH2">BH-2</option>
                      <option value="BH3">BH-3</option>
                      <option value="GH1">GH-1</option>
                      <option value="GH2">GH-2</option>
                    </select>
                  </div>

                  {/* Room Number */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Room No.</label>
                    <input 
                      type="text" name="roomNumber" required placeholder="E.g. 104A"
                      className="form-input"
                      value={formData.roomNumber} onChange={handleChange}
                    />
                  </div>

                  {/* Mess */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Mess</label>
                    <select 
                      name="mess" 
                      className="form-input"
                      value={formData.mess} onChange={handleChange}
                    >
                      <option value="Mess 1">Mess 1</option>
                      <option value="Mess 2">Mess 2</option>
                      <option value="Mess 3">Mess 3</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION: SECURITY */}
              <div>
                <h3 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> SECURITY
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  {/* Password */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={16} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                      <input 
                        type={showPassword ? "text" : "password"} name="password" required placeholder="Create a strong password"
                        className="form-input"
                        style={{ paddingLeft: '3rem', paddingRight: '3rem', borderColor: validationErrors.password ? '#ef4444' : undefined }}
                        value={formData.password} onChange={handleChange}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {validationErrors.password && (
                      <p style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><ShieldAlert size={14}/>{validationErrors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Confirm Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={16} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                      <input 
                        type={showPassword ? "text" : "password"} name="confirmPassword" required placeholder="Confirm your password"
                        className="form-input"
                        style={{ paddingLeft: '3rem', borderColor: validationErrors.confirmPassword ? '#ef4444' : undefined }}
                        value={formData.confirmPassword} onChange={handleChange}
                      />
                    </div>
                    {validationErrors.confirmPassword && (
                      <p style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><ShieldAlert size={14}/>{validationErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Area */}
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <input type="checkbox" required id="terms" style={{ width: '1rem', height: '1rem', accentColor: '#c084fc', borderRadius: '4px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <label htmlFor="terms" style={{ fontSize: '0.82rem', color: '#9ca3af', cursor: 'pointer' }}>
                    I agree to the <a href="#" style={{ color: '#c084fc', fontWeight: 600 }}>Terms of Service</a> and <a href="#" style={{ color: '#c084fc', fontWeight: 600 }}>Privacy Policy</a>
                  </label>
                </div>
                <button 
                  type="submit" 
                  className="btn-primary btn-full btn-lg"
                  disabled={!isFormValid() || loading}
                  style={{ 
                    opacity: (!isFormValid() || loading) ? 0.6 : 1, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    background: 'linear-gradient(to right, #9333ea, #db2777)',
                    borderColor: 'transparent',
                    boxShadow: '0 4px 20px rgba(147, 51, 234, 0.25)',
                    padding: '1rem',
                    fontSize: '1rem',
                    borderRadius: '16px',
                    fontWeight: 700,
                    width: '100%',
                    color: 'white'
                  }}
                >
                  {loading ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '1.25rem', height: '1.25rem', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <span>+ Create Account</span>
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

export default Register;
