import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Eye, EyeOff, ShieldAlert, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
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
    <div className="auth-split-layout">
      
      {/* LEFT PANEL: BRANDING (40%) */}
      <div className="auth-split-left">
        
        {/* Abstract Floating Shapes */}
        <div style={{ position: 'absolute', top: '-10%', left: '-20%', width: '500px', height: '500px', background: 'rgba(147,51,234,0.2)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px', background: 'rgba(236,72,153,0.1)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }}></div>
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '5rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #9333ea, #db2777)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 0 30px rgba(168,85,247,0.4)' }}>
              <Zap size={24} fill="currentColor" />
            </div>
            <span style={{ fontSize: '1.875rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'white' }}>Food<span style={{ background: 'linear-gradient(to right, #c084fc, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pulse</span></span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="auth-hero-title">
              Reimagining<br/>
              <span style={{ background: 'linear-gradient(to right, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Campus Dining.</span>
            </h1>
            
            <p className="auth-hero-sub">
              Join the smart ecosystem designed exclusively for Lovely Professional University. Skip the queues, report food quality issues, and order premium meals instantly.
            </p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="auth-feature-box">
            <div className="auth-feature-icon" style={{ background: 'rgba(168,85,247,0.2)', color: '#c084fc' }}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h4 className="auth-feature-title">1200 Welcome Points</h4>
              <p className="auth-feature-desc">Start your journey with complimentary digital currency usable across all campus stalls.</p>
            </div>
          </div>
          
          <div className="auth-feature-box">
            <div className="auth-feature-icon" style={{ background: 'rgba(236,72,153,0.2)', color: '#f472b6' }}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h4 className="auth-feature-title">AI Complaint Analytics</h4>
              <p className="auth-feature-desc">Report undercooked or unhygienic food with photo evidence. Earn points upon verification.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT PANEL: FORM (60%) */}
      <div className="auth-split-right">
        
        <div className="auth-form-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>Create your account</h2>
              <p style={{ color: '#9ca3af' }}>
                Already part of the ecosystem? <Link to="/login" style={{ color: '#c084fc', fontWeight: 700 }}>Sign in here</Link>
              </p>
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
                <h3 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Personal Information</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  {/* Full Name */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Full Name</label>
                    <input 
                      type="text" name="name" required placeholder="E.g. Namburi Hemanth"
                      className="form-input"
                      value={formData.name} onChange={handleChange}
                    />
                  </div>
                  
                  {/* Registration Number */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Registration Number</label>
                    <input 
                      type="text" name="lpuId" required placeholder="E.g. 12345678"
                      className="form-input"
                      value={formData.lpuId} onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>LPU Email Address</label>
                  <input 
                    type="email" name="email" required placeholder="E.g. hemanth.123@lpu.in"
                    className="form-input"
                    style={{ borderColor: validationErrors.email ? '#ef4444' : undefined }}
                    value={formData.email} onChange={handleChange}
                  />
                  {validationErrors.email && (
                    <p style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><ShieldAlert size={14}/>{validationErrors.email}</p>
                  )}
                </div>
              </div>

              {/* SECTION: ACADEMIC & HOSTEL */}
              <div>
                <h3 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Academic & Housing Details</h3>
                
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
                <h3 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Security</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  {/* Password */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Password</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type={showPassword ? "text" : "password"} name="password" required placeholder="Min 6 characters"
                        className="form-input"
                        style={{ paddingRight: '3rem', borderColor: validationErrors.password ? '#ef4444' : undefined }}
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
                    <input 
                      type={showPassword ? "text" : "password"} name="confirmPassword" required placeholder="Retype password"
                      className="form-input"
                      style={{ borderColor: validationErrors.confirmPassword ? '#ef4444' : undefined }}
                      value={formData.confirmPassword} onChange={handleChange}
                    />
                    {validationErrors.confirmPassword && (
                      <p style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><ShieldAlert size={14}/>{validationErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Area */}
              <div style={{ marginTop: '1rem' }}>
                <button 
                  type="submit" 
                  className="btn-primary btn-full btn-lg"
                  disabled={!isFormValid() || loading}
                  style={{ opacity: (!isFormValid() || loading) ? 0.6 : 1, display: 'flex', justifyContent: 'center' }}
                >
                  {loading ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '1.25rem', height: '1.25rem', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ChevronRight size={20} />
                    </>
                  )}
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280', marginTop: '1.5rem' }}>
                  By clicking Create Account, you agree to the FoodPulse <a href="#" style={{ color: '#c084fc' }}>Terms of Service</a> and <a href="#" style={{ color: '#c084fc' }}>Privacy Policy</a>.
                </p>
              </div>

            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
