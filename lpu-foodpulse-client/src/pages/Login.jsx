import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Eye, EyeOff, ShieldAlert, Zap, ShoppingBag, ShieldCheck, Award, Mail, Lock, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import saladBowlImg from '../assets/login_salad_bowl.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
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
    <div className="min-h-screen w-full bg-[#0B0B0B] text-white relative overflow-hidden font-body flex items-center justify-center">
      
      {/* Background Ambient Glow Blobs */}
      <motion.div 
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-20%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-yellow-500/5 blur-[130px] pointer-events-none z-0"
      />

      {/* Main 2-Column Layout Wrapper Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 xl:px-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10 py-12 lg:py-0 min-h-screen">
        
        {/* LEFT COLUMN: HERO SECTION (55%) */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center text-left space-y-6 lg:space-y-8">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-amber-500 shadow-md group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-4.5 h-4.5 fill-amber-500 text-amber-500" />
            </div>
            <span className="font-display font-light text-xl sm:text-2xl tracking-widest text-white group-hover:opacity-90 transition-opacity uppercase">
              Food<span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-200">Pulse</span>
            </span>
          </Link>

          {/* Eyebrow Tag */}
          <div className="text-xs font-bold text-amber-500 tracking-wider uppercase">
            ⚜️ LUXURY CAMPUS DINING ECOSYSTEM
          </div>

          {/* Title Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light tracking-tight text-white leading-[1.1] text-left">
            Gourmet Campus<br/>
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-100">Dining Experience</span><br/>
            <span className="text-neutral-400 text-3xl sm:text-4xl font-light tracking-wide">Intelligent. Transparent. Culinary.</span>
          </h1>
          
          {/* Small Subtitle */}
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-lg text-left font-light">
            AI-powered food quality inspections, smart dining bookings, reward points, and live congestion balancing.
          </p>

          {/* Grid of 4 Feature Cards (2x2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#151515] border border-white/5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-semibold text-white">AI Plate Verification</h4>
                <p className="text-[10px] text-neutral-500 font-light">Computer vision quality audits</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#151515] border border-white/5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-semibold text-white">Fine Dining Marketplace</h4>
                <p className="text-[10px] text-neutral-500 font-light">Premium stall pre-orders</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#151515] border border-white/5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-semibold text-white">Dining Points Wallet</h4>
                <p className="text-[10px] text-neutral-500 font-light">Earn points from quality audits</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#151515] border border-white/5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-semibold text-white">Queue Balancer</h4>
                <p className="text-[10px] text-neutral-500 font-light">Real-time wait times tracker</p>
              </div>
            </div>

          </div>

          {/* Premium Food Image Graphic instead of cartoon salad bowl */}
          <div className="relative mt-4 pt-2 flex justify-start items-center select-none">
            <div className="absolute w-40 h-20 bg-amber-500/10 rounded-full blur-[40px] pointer-events-none" />
            
            <div className="flex items-center gap-4 bg-[#151515] border border-white/5 p-3 rounded-2xl max-w-sm shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=150&auto=format&fit=crop" 
                alt="Fine Dining plate" 
                className="w-16 h-16 rounded-xl object-cover border border-white/10"
              />
              <div>
                <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block mb-0.5">Michelin Star Standard</span>
                <h5 className="text-xs font-bold text-white mb-0.5">AI Plating Audits Active</h5>
                <p className="text-[10px] text-neutral-400 font-light leading-snug">Every campus dish verified for freshness, quantity, and hygiene.</p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: PERFECTLY CENTERED LOGIN CARD (45%) */}
        <div className="w-full lg:w-[45%] flex justify-center items-center lg:justify-end">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[480px] rounded-[28px] border border-white/5 bg-[#151515] p-8 sm:p-10 md:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col justify-between"
          >
            {/* Top-Right Gold Glow Border Effect */}
            <div className="absolute top-0 right-0 w-40 h-[1px] bg-gradient-to-r from-amber-600 to-yellow-500 opacity-30" />
            <div className="absolute top-0 right-0 w-[1px] h-40 bg-gradient-to-b from-amber-600 to-yellow-500 opacity-30" />

            <div className="w-full mx-auto">
              
              {/* Header Titles */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-light tracking-tight text-white mb-2 uppercase tracking-widest">Sign In</h2>
                <p className="text-neutral-400 text-xs sm:text-sm font-light">Log in to your campus gourmet dashboard</p>
              </div>

              {/* Error Message Box */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex gap-3 items-start text-left"
                >
                  <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                  <span className="font-medium leading-relaxed">{error}</span>
                </motion.div>
              )}

              {/* Authentication Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Student Email Input */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] font-bold text-neutral-400 tracking-wider mb-2 block uppercase font-sans">
                    Student Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                    <input 
                      type="email" 
                      required 
                      placeholder="Enter your email"
                      className="w-full h-14 bg-[#0B0B0B] border border-white/10 rounded-2xl py-3 pl-12 pr-5 text-white text-sm placeholder-neutral-700 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 hover:border-white/20 transition-all font-body"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] font-bold text-neutral-400 tracking-wider mb-2 block uppercase font-sans">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required 
                      placeholder="Enter your password"
                      className="w-full h-14 bg-[#0B0B0B] border border-white/10 rounded-2xl py-3 pl-12 pr-12 text-white text-sm placeholder-neutral-700 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 hover:border-white/20 transition-all font-body"
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Checkbox and Forgot Password Link */}
                <div className="flex items-center justify-between text-xs mt-1 select-none">
                  <label className="flex items-center gap-2 cursor-pointer text-neutral-400 hover:text-neutral-300 transition-colors">
                    <input 
                      type="checkbox" 
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-white/10 bg-[#0B0B0B] text-amber-500 focus:ring-amber-500/30 cursor-pointer accent-amber-500" 
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="font-semibold text-amber-500 hover:text-amber-400 transition-colors">
                    Forgot Password?
                  </a>
                </div>

                {/* Sign In Button */}
                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className="w-full h-14 rounded-2xl font-bold text-neutral-950 bg-gradient-to-r from-amber-600 to-yellow-500 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 border-none cursor-pointer text-sm transition-all uppercase tracking-wider"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-neutral-950/30 border-t-neutral-950 rounded-full animate-spin" />
                        <span>Authenticating...</span>
                      </div>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </button>
                </div>

                {/* OR Divider */}
                <div className="flex items-center my-1 select-none">
                  <div className="flex-grow border-t border-white/5"></div>
                  <span className="px-4 text-[10px] font-bold text-neutral-600 uppercase tracking-widest">OR</span>
                  <div className="flex-grow border-t border-white/5"></div>
                </div>

                {/* Google Login button */}
                <div>
                  <button
                    type="button"
                    className="w-full h-14 rounded-2xl font-semibold text-white bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all flex items-center justify-center gap-3 active:scale-[0.99] cursor-pointer text-sm"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.555 0-6.437-2.883-6.437-6.438 0-3.555 2.882-6.437 6.437-6.437 1.545 0 2.96.545 4.077 1.455l3.057-3.057C19.122 2.127 15.89 1 12.24 1A10.99 10.99 0 0 0 1.25 12a10.99 10.99 0 0 0 10.99 11c5.945 0 10.923-4.3 10.923-11.026 0-.618-.056-1.183-.157-1.689H12.24Z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="mt-2 text-center text-xs text-neutral-400">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-bold text-amber-500 hover:text-amber-400 transition-colors">
                    Sign Up
                  </Link>
                </div>

              </form>

            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default Login;
