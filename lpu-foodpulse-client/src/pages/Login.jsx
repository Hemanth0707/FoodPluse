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
    <div className="min-h-screen w-full bg-[#030308] text-white flex flex-col justify-center items-center p-4 md:p-8 lg:p-12 relative overflow-hidden font-body">
      
      {/* Background Ambient Glow Blobs */}
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-20%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-purple-600/15 blur-[120px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-blue-600/12 blur-[130px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[30%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-pink-500/8 blur-[100px] pointer-events-none z-0"
      />

      {/* Main Grid Wrapper Container */}
      <div className="w-full max-w-6xl z-10 flex flex-col gap-6 relative">
        
        {/* Top Header & Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-start items-center px-1"
        >
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-all duration-300">
              <Zap className="w-4.5 h-4.5 fill-white text-white" />
            </div>
            <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white group-hover:opacity-90 transition-opacity">
              Food<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Pulse</span>
            </span>
          </Link>
        </motion.div>

        {/* Large Layout Split-screen Card */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-[28px] overflow-hidden border border-white/5 bg-[#090916]/40 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.85)] flex flex-col lg:flex-row min-h-[600px] relative"
        >
          
          {/* LEFT SIDE: BRANDING & FEATURES (Hidden on mobile) */}
          <div className="w-full lg:w-[48%] p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
            
            {/* Background radial gradient for left side */}
            <div className="absolute inset-0 bg-radial-at-t from-purple-900/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col">
              
              {/* Eyebrow Tag */}
              <div className="text-xs font-bold text-pink-500 tracking-wider uppercase mb-5 text-left">
                ⚡ NEXT-GEN CAMPUS DINING
              </div>

              {/* Title Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-black tracking-tight text-white mb-4 leading-[1.15] text-left">
                FoodPulse<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Smart Campus</span><br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-400">Food Ecosystem</span>
              </h1>
              
              {/* Small Subtitle */}
              <p className="text-gray-400 text-sm leading-relaxed mb-8 text-left max-w-md">
                AI-powered campus food quality verification, smart meal ordering, reward points, and queue management.
              </p>

              {/* Grid of 4 Feature Cards (2x2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                
                {/* Feature 1 */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.01] border border-white/[0.03] backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs sm:text-sm font-bold text-white">AI Food Verification</h4>
                    <p className="text-[10px] text-gray-500">Computer vision issue scan</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.01] border border-white/[0.03] backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-pink-500/10 border border-pink-500/20 text-pink-400 shrink-0">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs sm:text-sm font-bold text-white">Smart Ordering</h4>
                    <p className="text-[10px] text-gray-500">Pre-order from campus stalls</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.01] border border-white/[0.03] backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs sm:text-sm font-bold text-white">Reward Points</h4>
                    <p className="text-[10px] text-gray-500">Earn from feedback & audits</p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.01] border border-white/[0.03] backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs sm:text-sm font-bold text-white">Queue Prediction</h4>
                    <p className="text-[10px] text-gray-500">Real-time wait times tracker</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Glowing Bottom Graphic */}
            <div className="relative mt-8 pt-4 flex justify-center items-center select-none">
              <div className="absolute bottom-0 w-52 h-24 bg-purple-600/35 rounded-full blur-[40px] pointer-events-none" />
              
              <motion.img 
                src={saladBowlImg} 
                alt="Glowing Food Illustration" 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-[260px] object-contain relative z-10 drop-shadow-[0_15px_30px_rgba(168,85,247,0.35)]" 
              />
            </div>

          </div>

          {/* RIGHT SIDE: CENTERED FORM PANEL */}
          <div className="w-full lg:w-[52%] p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative bg-gradient-to-b lg:bg-gradient-to-tr from-purple-900/5 via-transparent to-transparent">
            
            {/* Top-Right Neon Glow Border Effect */}
            <div className="absolute top-0 right-0 w-40 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 opacity-70 shadow-[0_0_12px_rgba(168,85,247,0.5)] hidden lg:block" />
            <div className="absolute top-0 right-0 w-[2px] h-40 bg-gradient-to-b from-purple-500 to-pink-500 opacity-70 shadow-[0_0_12px_rgba(168,85,247,0.5)] hidden lg:block" />

            <div className="w-full max-w-[400px] mx-auto">
              
              {/* Header Titles */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-black tracking-tight text-white mb-2">Welcome Back</h2>
                <p className="text-gray-400 text-xs sm:text-sm">Log in to continue your FoodPulse journey</p>
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
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* Email Input */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] font-bold text-gray-400 tracking-wider mb-2 block uppercase font-sans">
                    Student Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="email" 
                      required 
                      placeholder="Enter your email"
                      className="w-full h-13 bg-[#080814]/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 hover:border-white/20 transition-all font-body"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] font-bold text-gray-400 tracking-wider mb-2 block uppercase font-sans">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required 
                      placeholder="Enter your password"
                      className="w-full h-13 bg-[#080814]/40 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 hover:border-white/20 transition-all font-body"
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Checkbox and Forgot Password Link */}
                <div className="flex items-center justify-between text-xs mt-1 select-none">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-300 transition-colors">
                    <input 
                      type="checkbox" 
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-white/10 bg-[#080814]/40 text-purple-600 focus:ring-purple-500/30 cursor-pointer accent-purple-600" 
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="font-semibold text-pink-500 hover:text-pink-400 transition-colors">
                    Forgot Password?
                  </a>
                </div>

                {/* Sign In Button */}
                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className="w-full h-13 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 transition-all shadow-[0_8px_25px_rgba(168,85,247,0.35)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 border-none cursor-pointer text-sm"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                  <span className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">OR</span>
                  <div className="flex-grow border-t border-white/5"></div>
                </div>

                {/* Google Login button */}
                <div>
                  <button
                    type="button"
                    className="w-full h-13 rounded-xl font-semibold text-white bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all flex items-center justify-center gap-3 active:scale-[0.99] cursor-pointer text-sm"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.555 0-6.437-2.883-6.437-6.438 0-3.555 2.882-6.437 6.437-6.437 1.545 0 2.96.545 4.077 1.455l3.057-3.057C19.122 2.127 15.89 1 12.24 1A10.99 10.99 0 0 0 1.25 12a10.99 10.99 0 0 0 10.99 11c5.945 0 10.923-4.3 10.923-11.026 0-.618-.056-1.183-.157-1.689H12.24Z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="mt-2 text-center text-xs text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-bold text-pink-500 hover:text-pink-400 transition-colors">
                    Sign Up
                  </Link>
                </div>

              </form>

            </div>

          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default Login;
