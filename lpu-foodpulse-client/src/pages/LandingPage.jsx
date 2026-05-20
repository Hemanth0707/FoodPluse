import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Wallet, 
  ShoppingBag, 
  TrendingUp, 
  Clock, 
  Utensils, 
  Award, 
  BarChart3, 
  Heart, 
  AlertTriangle,
  Menu,
  X,
  Plus,
  CheckCircle,
  ThumbsUp
} from 'lucide-react';

const LandingPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 90, damping: 14 }
    }
  };

  return (
    <div className="min-h-screen bg-[#070714] text-[#f3f4f6] font-sans overflow-x-hidden relative selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Background Neon Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[20%] w-[450px] h-[450px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none z-0" />

      {/* Floating Particles Backdrop Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute top-[20%] left-[15%] w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
        <div className="absolute top-[45%] left-[80%] w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[75%] left-[30%] w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
      </div>

      {/* NAV BAR */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-[#070714]/80 backdrop-blur-xl border-white/5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform duration-300">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-display font-extrabold text-white tracking-tight">
              Food<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Pulse</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <li><a href="#how-it-works" className="hover:text-purple-400 transition-colors">How It Works</a></li>
            <li><a href="#advantages" className="hover:text-purple-400 transition-colors">Advantages</a></li>
            <li><a href="#benefits" className="hover:text-purple-400 transition-colors">Benefits</a></li>
          </ul>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-gray-300 hover:text-white px-4 py-2 hover:bg-white/5 rounded-xl transition-all">
              Sign In
            </Link>
            <Link to="/register" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-sm shadow-[0_4px_20px_rgba(168,85,247,0.35)] hover:shadow-[0_4px_25px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 transition-all">
              Register
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white bg-white/5 rounded-xl border border-white/5"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {navOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-[#0b0b1f] border-b border-white/10 px-6 py-6 space-y-4"
          >
            <a href="#how-it-works" onClick={() => setNavOpen(false)} className="block text-gray-300 hover:text-purple-400 font-semibold">How It Works</a>
            <a href="#advantages" onClick={() => setNavOpen(false)} className="block text-gray-300 hover:text-purple-400 font-semibold">Advantages</a>
            <a href="#benefits" onClick={() => setNavOpen(false)} className="block text-gray-300 hover:text-purple-400 font-semibold">Benefits</a>
            <div className="h-[1px] bg-white/5 my-4" />
            <div className="flex gap-4">
              <Link to="/login" onClick={() => setNavOpen(false)} className="flex-1 text-center py-2.5 border border-white/10 rounded-xl font-bold text-gray-300 hover:text-white">Sign In</Link>
              <Link to="/register" onClick={() => setNavOpen(false)} className="flex-1 text-center py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl font-bold text-white shadow-lg">Register</Link>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen pt-36 pb-28 px-6 md:px-8 max-w-7xl mx-auto flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8 z-10 text-left"
          >
            {/* Startup Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Sparkles size={14} className="text-pink-400 animate-pulse" /> 
              Next-Gen Student Dining
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
              FoodPulse – Smart <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 font-extrabold filter drop-shadow-[0_0_30px_rgba(168,85,247,0.25)]">
                Campus Food
              </span> <br />
              Ecosystem
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
              Redefining campus meals with real-time AI food verification, seamless mobile pre-ordering, queue analytics, and a reward system students love.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link 
                to="/register" 
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-base shadow-[0_8px_30px_rgba(168,85,247,0.45)] hover:shadow-[0_8px_35px_rgba(168,85,247,0.65)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Explore Marketplace 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-bold text-base hover:bg-white/10 hover:border-purple-500/30 transition-all flex items-center justify-center gap-2 backdrop-blur-md hover:-translate-y-1"
              >
                Report Food Issue
              </Link>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5">
              <div>
                <h4 className="text-2xl sm:text-3xl font-display font-bold text-white">5k+</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-semibold">Active Students</p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-display font-bold text-purple-400">99.8%</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-semibold">AI Scan Accuracy</p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-display font-bold text-pink-400">20k+</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-semibold">Points Redeemed</p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Column (Futuristic UI mockups / Phone Visual) */}
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end w-full"
          >
            {/* Neon Glow Circle Behind */}
            <div className="absolute inset-0 m-auto w-80 h-80 bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 rounded-full blur-[100px] opacity-35" />

            <div className="relative w-full max-w-[460px] h-[400px] md:h-[450px] select-none">
              {/* Dashboard Window Mockup */}
              <div className="absolute top-0 left-0 w-[82%] h-[78%] rounded-3xl border border-white/10 bg-[#0d0d21]/80 backdrop-blur-2xl shadow-2xl p-5 overflow-hidden flex flex-col justify-between">
                {/* Header bar */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[9px] text-gray-500 font-mono ml-2">foodpulse.lpu.in/dashboard</span>
                  </div>
                </div>
                
                {/* Mock Content */}
                <div className="flex-1 py-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Mess 1 Queue Prediction</h5>
                    <span className="text-[8px] bg-green-500/10 text-green-300 font-semibold px-2 py-0.5 rounded border border-green-500/20">Optimal</span>
                  </div>
                  {/* Visual Graph bars */}
                  <div className="flex items-end gap-2 h-20 pt-2 border-b border-white/5 pb-1">
                    <div className="flex-1 h-[25%] bg-purple-500/20 rounded-t" />
                    <div className="flex-1 h-[40%] bg-purple-500/20 rounded-t" />
                    <div className="flex-1 h-[75%] bg-purple-500/40 rounded-t" />
                    <div className="flex-1 h-[90%] bg-gradient-to-t from-purple-600 to-pink-500 rounded-t relative">
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] text-white bg-black/80 px-1 py-0.5 rounded font-bold font-mono">12:30</span>
                    </div>
                    <div className="flex-1 h-[60%] bg-purple-500/30 rounded-t" />
                    <div className="flex-1 h-[30%] bg-purple-500/20 rounded-t" />
                    <div className="flex-1 h-[20%] bg-purple-500/20 rounded-t" />
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                    <span>11:00 AM</span>
                    <span>Peak (12:30)</span>
                    <span>3:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Overlapping Phone UI / Floating Card (spans right & bottom) */}
              <div className="absolute bottom-0 right-0 w-[55%] h-[75%] rounded-3xl border border-white/10 bg-[#070714] p-4 shadow-2xl overflow-hidden flex flex-col justify-between animate-premium-float">
                {/* Phone details */}
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-bold text-white">Verification HUD</span>
                  <span className="text-[8px] bg-pink-500/10 text-pink-400 font-extrabold px-1.5 py-0.5 rounded-full border border-pink-500/20">AI LIVE</span>
                </div>
                
                {/* Image analysis area */}
                <div className="flex-1 my-3 bg-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center border border-white/5">
                  <div className="text-3xl">🍲</div>
                  {/* Glowing scanner scanning line */}
                  <div className="absolute inset-x-0 h-[2px] bg-purple-500 shadow-[0_0_10px_#a855f7] top-0 animate-radarScan pointer-events-none" />
                  
                  {/* Bounding box */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-2 border-red-500/40 rounded">
                    <span className="absolute -top-4 left-0 text-[8px] font-bold font-mono bg-red-500 text-white px-1 rounded">Roti: Undercooked</span>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-red-300 font-bold block leading-none">Quality Alert</span>
                    <span className="text-[8px] text-gray-400">BH2 Mess • +150 Points</span>
                  </div>
                  <span className="text-xs">📸</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="relative py-28 px-6 md:px-8 border-t border-white/5 bg-[#0b0b1f]/30">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h4 className="text-purple-400 text-sm font-bold uppercase tracking-widest">Workflow</h4>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white">How FoodPulse Works</h2>
            <p className="text-gray-400 text-base">Our ecosystem is engineered to keep dining high-quality and order checkout frictionless.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { step: "01", title: "Browse Marketplace", desc: "Access the campus digital food court, check menus, and order your favorite meals.", icon: <ShoppingBag size={24} />, color: "from-purple-500 to-indigo-500" },
              { step: "02", title: "Order or Report", desc: "Enjoy quick queue-free meals or report poor-quality food items instantly.", icon: <Utensils size={24} />, color: "from-pink-500 to-purple-500" },
              { step: "03", title: "AI Verification", desc: "Computer vision scans details to verify complaints automatically in seconds.", icon: <ShieldCheck size={24} />, color: "from-blue-500 to-indigo-500" },
              { step: "04", title: "Earn Rewards", desc: "Recieve instant compensation points and unlock premium reward badges.", icon: <Award size={24} />, color: "from-amber-500 to-pink-500" }
            ].map((card, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="group relative rounded-3xl bg-white/[0.02] border border-white/5 p-8 backdrop-blur-md hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[280px]"
              >
                {/* Accent glow corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr ${card.color} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`} />
                
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-md`}>
                    {card.icon}
                  </div>
                  <span className="text-4xl font-display font-extrabold text-white/10 tracking-widest">{card.step}</span>
                </div>

                <div className="mt-8 space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{card.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 3. ADVANTAGES SECTION */}
      <section id="advantages" className="py-28 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h4 className="text-pink-400 text-sm font-bold uppercase tracking-widest">Platform Benefits</h4>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white">Engineered for LPU Campus</h2>
          <p className="text-gray-400 text-base">Discover custom-designed tools designed to address common dining and kitchen issues.</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { title: "Faster Ordering", desc: "Skip queues by ordering menu items ahead of arrival.", icon: <Clock size={20} />, status: "Instant" },
            { title: "AI Verification", desc: "Computer vision verifies food texture and ingredients.", icon: <ShieldCheck size={20} />, status: "Automated" },
            { title: "Complaint Tracking", desc: "Track mess issues live from detection to resolution.", icon: <AlertTriangle size={20} />, status: "Transparent" },
            { title: "Queue Reduction", desc: "Optimize preparation times with predictive insights.", icon: <BarChart3 size={20} />, status: "Live" },
            { title: "Reward Points", desc: "Earn and spend compensation points across campus.", icon: <Wallet size={20} />, status: "Earn Points" },
            { title: "Student Transparency", desc: "Every resolved report holds kitchens accountable.", icon: <Heart size={20} />, status: "Social Good" },
            { title: "Better Food Quality", desc: "Continuous audits force stalls to maintain standards.", icon: <Utensils size={20} />, status: "Audited" },
            { title: "Campus Analytics", desc: "Deep metrics charts on popular food items and trends.", icon: <TrendingUp size={20} />, status: "Smart Insights" }
          ].map((feat, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between h-[200px] hover:shadow-[0_8px_30px_rgba(168,85,247,0.08)]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] bg-purple-500/10 text-purple-300 font-bold px-2 py-0.5 rounded-full border border-purple-500/20">{feat.status}</span>
                </div>
                <h4 className="font-bold text-white text-base">{feat.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. STUDENT BENEFITS SECTION (Bento Grid Layout) */}
      <section id="benefits" className="relative py-28 px-6 md:px-8 border-t border-white/5 bg-[#0b0b1f]/20">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h4 className="text-blue-400 text-sm font-bold uppercase tracking-widest">Bento Grid</h4>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white">How FoodPulse Helps Students</h2>
            <p className="text-gray-400 text-base">Simplifying student dining while building mess administration transparency.</p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Bento Card 1: Time Saver (Large, Col: 7) */}
            <div className="md:col-span-7 rounded-3xl bg-[#0d0d21] border border-purple-500/20 p-8 flex flex-col justify-between min-h-[360px] hover:border-purple-500/40 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20">
                  <Clock size={20} />
                </div>
                <h3 className="text-2xl font-bold text-white">Saves Time & Reduces Waiting</h3>
                <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                  Tired of waiting 30 minutes for lunch? Pre-order on the marketplace, monitor the live queue prediction index, and grab your plate the moment it is ready.
                </p>
              </div>

              {/* Inside Bento Card Mock Visual */}
              <div className="my-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-purple-300">
                  <span>Checkout Wait-Time Progress</span>
                  <span>9.2 min saved</span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[78%] rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>Traditional: 25 mins waiting</span>
                  <span>FoodPulse Fast-Track: 4.5 mins</span>
                </div>
              </div>

              <div className="flex gap-4 items-center pt-4 text-xs text-purple-400 font-semibold border-t border-white/5">
                <span>⚡ 8.5 Hours Saved Average / Student</span>
              </div>
            </div>

            {/* Bento Card 2: Hygiene Awareness (Medium, Col: 5) */}
            <div className="md:col-span-5 rounded-3xl bg-white/[0.03] border border-white/5 p-8 flex flex-col justify-between min-h-[360px] hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4 border border-pink-500/20">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-2xl font-bold text-white">Mess Hygiene Scores</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Real-time quality audits flag messes with active issues, letting you make healthy choices on where to dine.
                </p>
              </div>

              {/* Mess Score List Visual */}
              <div className="my-6 space-y-2.5">
                {[
                  { name: 'Central Mess', rating: 'A+ (99.8%)', color: 'text-green-400' },
                  { name: 'BH1 Dining', rating: 'A- (93.1%)', color: 'text-green-300' },
                  { name: 'BH2 Mess Cafeteria', rating: 'B (82.5%)', color: 'text-yellow-400' }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-xl bg-white/[0.01] border border-white/5">
                    <span className="text-gray-300 font-medium">{item.name}</span>
                    <span className={`font-bold ${item.color}`}>{item.rating}</span>
                  </div>
                ))}
              </div>

              <span className="text-xs text-pink-400 font-bold uppercase tracking-wider pt-2">Safety Verified</span>
            </div>

            {/* Bento Card 3: Gives Students a Voice (Medium, Col: 5) */}
            <div className="md:col-span-5 rounded-3xl bg-white/[0.03] border border-white/5 p-8 flex flex-col justify-between min-h-[360px] hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="text-2xl font-bold text-white">Gives Students a Voice</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  No more ignored feedback letters. Submit visual proof and let the automated computer vision verification hold kitchen operators accountable.
                </p>
              </div>

              {/* Audit Status Ticket Visual */}
              <div className="my-6 p-4 rounded-2xl bg-[#0b0b1f]/60 border border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-ping" />
                  <div>
                    <span className="text-gray-300 font-semibold block">Undercooked Meat Audit</span>
                    <span className="text-[10px] text-gray-500">Scan Verified</span>
                  </div>
                </div>
                <span className="text-green-400 font-extrabold">+150 pts</span>
              </div>

              <span className="text-xs text-blue-400 font-bold uppercase tracking-wider pt-2">Direct Action</span>
            </div>

            {/* Bento Card 4: Mess Management & Transparency (Large, Col: 7) */}
            <div className="md:col-span-7 rounded-3xl bg-[#0d0d21] border border-indigo-500/20 p-8 flex flex-col justify-between min-h-[360px] hover:border-indigo-500/40 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20">
                  <TrendingUp size={20} />
                </div>
                <h3 className="text-2xl font-bold text-white">Audited Mess Performance Leaderboard</h3>
                <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                  Stall performance ratings, live queue speeds, and resolved complaints data are broadcast directly to the student leaderboard.
                </p>
              </div>

              {/* Leaderboard Rating Visual */}
              <div className="my-6 grid grid-cols-3 gap-3">
                {[
                  { place: '🥇 #1 Central Stall', score: '4.95 ⭐' },
                  { place: '🥈 #2 BH2 Cafe', score: '4.88 ⭐' },
                  { place: '🥉 #3 Central Cafe', score: '4.79 ⭐' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl text-center">
                    <span className="block font-bold text-xs text-white mb-1">{item.place}</span>
                    <span className="text-[10px] text-purple-300 font-semibold">{item.score}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 items-center pt-4 text-xs text-indigo-400 font-semibold border-t border-white/5">
                <span>📊 Full Campus Food Quality Statistics Available</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#0b0b1f] py-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-sm font-bold">⚡</div>
              <span className="text-lg font-bold text-white">FoodPulse</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              Building a smarter, healthier campus food ecosystem through technology and transparent crowd auditing.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-sm font-bold text-white">Quick Links</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/marketplace" className="hover:text-purple-400 transition-colors">Stall Marketplace</Link></li>
              <li><Link to="/login" className="hover:text-purple-400 transition-colors">Report Issue</Link></li>
              <li><a href="#how-it-works" className="hover:text-purple-400 transition-colors">How It Works</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-sm font-bold text-white">Support</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-sm font-bold text-white">Connect</h5>
            <div className="flex gap-3">
              {['Twitter', 'LinkedIn', 'Discord'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-purple-500/20 text-xs font-semibold text-gray-400 hover:text-white transition-all"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© 2026 FoodPulse. Redesigned with premium SaaS aesthetics. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:underline">Cookies Settings</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
