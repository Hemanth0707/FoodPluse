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
    <div className="min-h-screen w-full bg-[#030308] text-white flex flex-col justify-center items-center p-6 md:p-12 relative overflow-hidden font-body py-12 md:py-20">
      
      {/* Background Neon Glow Blobs */}
      <motion.div 
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.15, 0.22, 0.15],
          x: [0, 15, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] min-w-[400px] min-h-[400px] rounded-full bg-purple-600/20 blur-[130px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.18, 0.12],
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] min-w-[400px] min-h-[400px] rounded-full bg-blue-600/15 blur-[140px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[35%] left-[35%] w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] rounded-full bg-pink-500/10 blur-[100px] pointer-events-none z-0"
      />

      {/* Subtle Floating Star/Particle Mock */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40 z-0"></div>

      {/* Main Grid Wrapper Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 xl:px-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 z-10 relative">
        
        {/* LEFT SIDE (50%): Large futuristic hero section */}
        <div className="flex flex-col justify-center items-start w-full lg:w-1/2 text-left lg:pr-8 xl:pr-12">
          
          {/* Top Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-[0_0_25px_rgba(168,85,247,0.45)] group-hover:scale-105 transition-all duration-300">
                <Zap className="w-5 h-5 fill-white text-white" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white group-hover:opacity-90 transition-opacity">
                Food<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Pulse</span>
              </span>
            </Link>
          </motion.div>

          {/* Eyebrow Tag */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 tracking-wider uppercase mb-5"
          >
            <span>⚡ NEXT-GEN CAMPUS DINING</span>
          </motion.div>

          {/* Title Heading */}
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white mb-5 leading-[1.15] max-w-xl"
          >
            FoodPulse <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Smart Campus</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-400">Food Ecosystem</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed max-w-md"
          >
            AI-powered campus food quality verification, smart meal ordering, reward points, and queue management.
          </motion.p>

          {/* Grid of 4 Feature Cards (2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-8">
            
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-md hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-bold text-white">AI Food Verification</h4>
                <p className="text-[10px] text-gray-500">Computer vision issue scan</p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-md hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-pink-500/10 border border-pink-500/20 text-pink-400 shrink-0 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-bold text-white">Smart Ordering</h4>
                <p className="text-[10px] text-gray-500">Pre-order from campus stalls</p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-md hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-bold text-white">Reward Points</h4>
                <p className="text-[10px] text-gray-500">Earn from feedback & audits</p>
              </div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-md hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-bold text-white">Queue Prediction</h4>
                <p className="text-[10px] text-gray-500">Wait times tracker</p>
              </div>
            </motion.div>

          </div>

          {/* Glowing Salad Bowl Image (Reduced size by 20%: max-w-[200px]) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 100, damping: 15 }}
            className="relative w-full max-w-sm flex justify-center lg:justify-start items-center select-none pt-4"
          >
            <div className="absolute left-8 bottom-0 w-40 h-28 bg-purple-600/30 rounded-full blur-[40px] pointer-events-none" />
            <motion.img 
              src={saladBowlImg} 
              alt="Glowing Salad Bowl" 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-[200px] object-contain relative z-10 drop-shadow-[0_15px_30px_rgba(168,85,247,0.4)]"
            />
          </motion.div>

        </div>

        {/* RIGHT SIDE (50%): Centered Login Card */}
        <div className="flex items-center justify-center lg:justify-end w-full lg:w-1/2">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full max-w-[490px] sm:max-w-[500px] rounded-[32px] border border-white/10 bg-[#090916]/65 backdrop-blur-3xl p-8 sm:p-10 md:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.85),0_0_80px_rgba(168,85,247,0.06)] relative overflow-hidden"
          >
            
            {/* Header Title */}
            <div className="text-center lg:text-left mb-8">
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

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Email Address */}
              <div className="flex flex-col text-left">
                <label className="text-xs font-bold text-gray-400 tracking-wider mb-2 block uppercase font-sans">
                  Student Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter your email"
                    className="w-full h-14 bg-[#080814]/60 border border-white/10 rounded-2xl py-3.5 pl-12 pr-5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 hover:border-white/20 transition-all font-body"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col text-left">
                <label className="text-xs font-bold text-gray-400 tracking-wider mb-2 block uppercase font-sans">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    placeholder="Enter your password"
                    className="w-full h-14 bg-[#080814]/60 border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 hover:border-white/20 transition-all font-body"
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

              {/* Remember & Forgot Row */}
              <div className="flex items-center justify-between text-xs sm:text-sm select-none">
                <label className="flex items-center gap-2.5 cursor-pointer text-gray-400 hover:text-gray-300 transition-colors">
                  <input 
                    type="checkbox" 
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-white/10 bg-[#080814]/40 text-purple-600 focus:ring-purple-500/30 cursor-pointer accent-purple-600" 
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot Password?
                </a>
              </div>

              {/* Sign In submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className="w-full h-14 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 transition-all shadow-[0_10px_35px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 border-none cursor-pointer text-sm"
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

              {/* Google Log-in button */}
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

              {/* Sign Up Redirect */}
              <div className="mt-2 text-center text-xs sm:text-sm text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="font-bold text-purple-400 hover:text-purple-300 transition-colors">
                  Sign Up
                </Link>
              </div>

            </form>

          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default Login;
