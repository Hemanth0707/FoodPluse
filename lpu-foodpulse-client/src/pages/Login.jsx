import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Eye, EyeOff, ShieldAlert, Zap, ShoppingBag, ShieldCheck, Award, Mail, Lock } from 'lucide-react';
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
    <div className="min-h-screen w-full bg-[#030308] text-white flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 relative overflow-hidden font-body">
      
      {/* Background Neon Glow Blobs */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] min-w-[400px] min-h-[400px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.2, 0.12],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] min-w-[400px] min-h-[400px] rounded-full bg-blue-600/15 blur-[130px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{
          opacity: [0.08, 0.15, 0.08],
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

      <div className="w-full max-w-5xl z-10 flex flex-col gap-6">
        
        {/* Top Header & Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-start items-center px-2"
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

        {/* Split-screen Layout Glass Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-[28px] overflow-hidden border border-white/5 bg-[#090916]/40 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.85),0_0_80px_rgba(168,85,247,0.03)] flex flex-col lg:flex-row min-h-[620px]"
        >
          
          {/* LEFT SIDE: BRANDING & FEATURES (Hidden on mobile) */}
          <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative overflow-hidden lg:border-r border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent">
            
            {/* Ambient Background Gradient for left side */}
            <div className="absolute inset-0 bg-radial-at-t from-purple-900/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col">
              {/* Eyebrow Tag */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-pink-400 bg-pink-500/10 border border-pink-500/20 tracking-wider uppercase mb-6 w-fit"
              >
                <span>⚡ NEXT-GEN CAMPUS DINING</span>
              </motion.div>

              {/* Large Bold Heading */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h1 className="text-4xl lg:text-5xl font-display font-black tracking-tight text-white mb-4 leading-[1.1]">
                  FoodPulse<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Smart Campus</span><br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-400">Food Ecosystem</span>
                </h1>
                
                {/* Small Subtitle */}
                <p className="text-gray-400 text-sm lg:text-base mb-8 leading-relaxed max-w-md">
                  AI-powered campus food quality verification, smart meal ordering, reward points, and queue management.
                </p>
              </motion.div>

              {/* 3 Feature Cards */}
              <div className="space-y-4 max-w-md">
                
                {/* Feature 1 */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.03] hover:border-white/[0.07] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">Smart Marketplace</h4>
                    <p className="text-xs text-gray-400 leading-normal">Explore mess menus, order meals, and skip the queue.</p>
                  </div>
                </motion.div>

                {/* Feature 2 */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.03] hover:border-white/[0.07] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-pink-500/10 border border-pink-500/20 text-pink-400 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">AI Food Verification</h4>
                    <p className="text-xs text-gray-400 leading-normal">AI-powered food quality checks for safer and healthier meals.</p>
                  </div>
                </motion.div>

                {/* Feature 3 */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.03] hover:border-white/[0.07] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">Earn & Redeem Points</h4>
                    <p className="text-xs text-gray-400 leading-normal">Earn reward points for genuine feedback and redeem for your favorite meals.</p>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Glowing Food Salad Bowl Bottom Graphic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 100, damping: 15 }}
              className="relative mt-8 pt-4 flex justify-center items-center select-none"
            >
              {/* Radial gradient glow behind the bowl */}
              <div className="absolute bottom-0 w-56 h-40 bg-purple-600/35 rounded-full blur-[50px] pointer-events-none" />
              
              <motion.img 
                src={saladBowlImg} 
                alt="Glowing Food Illustration" 
                animate={{ 
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full max-w-[280px] object-contain relative z-10 drop-shadow-[0_15px_35px_rgba(168,85,247,0.4)]" 
              />
            </motion.div>

          </div>

          {/* RIGHT SIDE: CENTERED LOGIN CARD */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-gradient-to-b from-white/[0.005] to-transparent">
            
            <div className="w-full max-w-md mx-auto">
              
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center lg:text-left mb-8"
              >
                <h2 className="text-3xl font-display font-black tracking-tight text-white mb-2">Welcome Back</h2>
                <p className="text-gray-400 text-sm">Log in to continue your FoodPulse journey</p>
              </motion.div>

              {/* Error Box */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex gap-3 items-start shadow-[0_0_15px_rgba(239,68,68,0.05)]"
                >
                  <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                  <span className="font-medium leading-relaxed">{error}</span>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* Email Address */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex flex-col"
                >
                  <label className="text-xs font-bold text-gray-400 tracking-wider mb-2 block uppercase font-sans">
                    Student Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="email" 
                      required 
                      placeholder="Enter your email"
                      className="w-full bg-[#080814]/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 hover:border-white/20 transition-all font-body"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex flex-col"
                >
                  <label className="text-xs font-bold text-gray-400 tracking-wider mb-2 block uppercase font-sans">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required 
                      placeholder="Enter your password"
                      className="w-full bg-[#080814]/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 hover:border-white/20 transition-all font-body"
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
                </motion.div>

                {/* Remember & Forgot */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex items-center justify-between text-xs lg:text-sm mt-1"
                >
                  <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-300 transition-colors select-none">
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
                </motion.div>

                {/* Submit Sign In Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="mt-3"
                >
                  <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 transition-all shadow-[0_8px_30px_rgba(147,51,234,0.35)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 relative overflow-hidden"
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
                </motion.div>

                {/* Divider */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex items-center my-2"
                >
                  <div className="flex-grow border-t border-white/5"></div>
                  <span className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest">OR</span>
                  <div className="flex-grow border-t border-white/5"></div>
                </motion.div>

                {/* Google Sign In Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.5 }}
                >
                  <button
                    type="button"
                    className="w-full py-3.5 rounded-xl font-medium text-white bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all flex items-center justify-center gap-3 active:scale-[0.99]"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.555 0-6.437-2.883-6.437-6.438 0-3.555 2.882-6.437 6.437-6.437 1.545 0 2.96.545 4.077 1.455l3.057-3.057C19.122 2.127 15.89 1 12.24 1A10.99 10.99 0 0 0 1.25 12a10.99 10.99 0 0 0 10.99 11c5.945 0 10.923-4.3 10.923-11.026 0-.618-.056-1.183-.157-1.689H12.24Z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </motion.div>

                {/* Sign Up Redirect */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.95, duration: 0.5 }}
                  className="mt-4 text-center text-sm text-gray-400"
                >
                  Don't have an account?{' '}
                  <Link to="/register" className="font-bold text-purple-400 hover:text-purple-300 transition-colors">
                    Sign Up
                  </Link>
                </motion.div>

              </form>

            </div>

          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default Login;
