import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
  AlertTriangle,
  Menu,
  X,
  Mail,
  Lock,
  User,
  ChevronRight
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  // Auth States
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authStudentId, setAuthStudentId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleViewChange = (view) => {
    if (view === 'login') {
      navigate('/login');
      setNavOpen(false);
      return;
    }
    if (view === 'signup') {
      navigate('/register');
      setNavOpen(false);
      return;
    }
    setCurrentView(view);
    setNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const renderHome = () => (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen pt-36 pb-28 flex items-center w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8 z-10 text-left"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Sparkles size={14} className="text-amber-500 animate-pulse" /> 
              Premium Student Dining Hub
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-light text-white tracking-tight leading-[1.1]">
              Redefining <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 font-extrabold filter drop-shadow-[0_0_30px_rgba(198,138,43,0.15)]">
                Campus Dining
              </span> <br />
              With Artistry
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-xl leading-relaxed font-light">
              Experience chef-crafted meals, real-time visual safety audits, custom queue balancing, and a dining environment designed to support student well-being.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => handleViewChange('login')} 
                className="group px-8 py-4 rounded-2xl bg-[#C68A2B] hover:bg-[#b07823] text-neutral-950 font-bold text-base shadow-[0_8px_30px_rgba(198,138,43,0.25)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                Explore Gastronomy
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => handleViewChange('signup')} 
                className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-semibold text-base hover:bg-white/10 hover:border-amber-500/30 transition-all flex items-center justify-center gap-2 backdrop-blur-md hover:-translate-y-1 cursor-pointer"
              >
                File Quality Request
              </button>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5">
              <div>
                <h4 className="text-2xl sm:text-3xl font-display font-light text-white">5k+</h4>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1 font-semibold">Active Diners</p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-display font-light text-amber-500">99.8%</h4>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1 font-semibold">Verification Index</p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-display font-light text-neutral-400">20k+</h4>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1 font-semibold">Honors Unlocked</p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Column (Cinematic Gourmet food photography) */}
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end w-full"
          >
            {/* Elegant Warm Backing Glow */}
            <div className="absolute inset-0 m-auto w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative w-full max-w-[480px] rounded-[28px] overflow-hidden border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.6)] aspect-[4/3.8] group">
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-black/20 z-10 pointer-events-none" />
              
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80" 
                alt="Cinematic Fine Plated Dining" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[3s]"
              />
              
              {/* Frosted Glass Floating Panel */}
              <div className="absolute bottom-5 left-5 right-5 z-20 bg-neutral-950/70 backdrop-blur-md border border-white/5 p-5 rounded-2xl flex items-center justify-between shadow-2xl">
                <div className="text-left space-y-1">
                  <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-widest inline-block">Gourmet Standard</span>
                  <h4 className="text-white font-medium text-sm">Seared Salmon & Organic Salad</h4>
                  <p className="text-[10px] text-neutral-400">Central Mess Executive Zone</p>
                </div>
                <div className="text-right flex flex-col justify-center items-end shrink-0">
                  <span className="text-[9px] text-amber-500 font-bold uppercase tracking-wider block">PREP TIME</span>
                  <span className="text-xs text-white font-mono font-bold">12 min wait</span>
                </div>
              </div>
            </div>
          </motion.div>

          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS: Alternating Cinematic Stories */}
      <section id="how-it-works" className="relative py-32 bg-[#0B0B0B] w-full overflow-hidden border-t border-white/5">
        <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] bg-yellow-600/3 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
          {/* Header */}
          <div className="max-w-3xl mb-24 text-left space-y-4">
            <div className="text-[10px] font-bold text-amber-500 tracking-[0.25em] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              + The Gastronomic Pipeline
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-white leading-tight">
              How FoodPulse <br/>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-200">Refines Your Dining</span>
            </h2>
            <div className="h-[1px] w-24 bg-amber-500/30 mt-4" />
          </div>

          {/* Step 1: Browse & Reserve (Asymmetrical Text Left, Immersive Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-36 w-full">
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-[10px] font-bold text-amber-500/50 font-mono tracking-widest block">STEP // 01</span>
              <h3 className="text-3xl font-display font-bold text-white tracking-tight">Culinary Discovery</h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-light">
                Explore LPU's decentralized digital food marketplace to view live menus, queue predictions, and place pre-orders. Skip traditional dining hall lines by purchasing tokens directly using dining reward points or wallet balances.
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs text-amber-500 font-semibold">
                <ShoppingBag size={16} /> pre-order via digital tokens
              </div>
            </div>
            
            <div className="lg:col-span-7 relative group">
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-amber-500/10 to-yellow-500/10 opacity-30 blur-lg group-hover:opacity-50 transition-opacity" />
              <div className="relative aspect-[16/10] rounded-[28px] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop" 
                  alt="Browse Gourmet Foods" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-neutral-950/70 backdrop-blur-md border border-white/5 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="text-white text-xs font-bold">Premium Salad & Grains</h4>
                    <span className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold">Zone 3 Mess</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#7BA05B] bg-[#7BA05B]/10 border border-[#7BA05B]/20 px-2 py-0.5 rounded">Active Prep</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Savor or Report (Immersive Image Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-36 w-full">
            <div className="lg:col-span-7 lg:order-2 space-y-6 text-left">
              <span className="text-[10px] font-bold text-amber-500/50 font-mono tracking-widest block">STEP // 02</span>
              <h3 className="text-3xl font-display font-bold text-white tracking-tight">The Gastronomy Experience</h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-light font-sans">
                Skip traditional lines entirely and claim your plate. Enjoy fresh food items audited for safety. In the rare event of a quality discrepancy, submit a verified visual complaint ticket instantly.
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs text-amber-500 font-semibold">
                <Utensils size={16} /> instant plate receipt validation
              </div>
            </div>

            <div className="lg:col-span-5 lg:order-1 relative group">
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-amber-500/10 to-yellow-500/10 opacity-30 blur-lg group-hover:opacity-50 transition-opacity" />
              <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop" 
                  alt="Gourmet Plating" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-neutral-950/80 backdrop-blur-md border border-white/5 rounded-2xl">
                  <span className="text-[9px] text-amber-500 font-bold block uppercase tracking-wider mb-1">MESS HYGIENE INDEX</span>
                  <p className="text-white text-xs font-medium">99.8% Freshness Checked</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Computer Vision Audit (Text Left, Immersive Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-36 w-full">
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-[10px] font-bold text-amber-500/50 font-mono tracking-widest block">STEP // 03</span>
              <h3 className="text-3xl font-display font-bold text-white tracking-tight">AI Texture Auditing</h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-light font-sans">
                Proprietary computer vision models verify your uploaded meal details. Portions, baking consistency, raw sections, and structural composition are flagged automatically in seconds.
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs text-amber-500 font-semibold">
                <ShieldCheck size={16} /> 99.5% vision accuracy score
              </div>
            </div>
            
            <div className="lg:col-span-7 relative group">
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-amber-500/10 to-yellow-500/10 opacity-30 blur-lg group-hover:opacity-50 transition-opacity" />
              <div className="relative aspect-[16/10] rounded-[28px] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop" 
                  alt="AI Food Quality Scan" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                {/* Floating scanner indicator box */}
                <div className="absolute top-10 left-10 w-44 p-3 bg-neutral-950/70 border border-amber-500/30 rounded-2xl backdrop-blur-md animate-bounce">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                    <span className="text-[9px] font-mono font-bold text-white uppercase">AI Analysis</span>
                  </div>
                  <p className="text-[10px] text-amber-400 font-bold">Starch Index Verified</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Smart Ledger Rewards (Immersive Image Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">
            <div className="lg:col-span-7 lg:order-2 space-y-6 text-left">
              <span className="text-[10px] font-bold text-amber-500/50 font-mono tracking-widest block">STEP // 04</span>
              <h3 className="text-3xl font-display font-bold text-white tracking-tight">Smart Wallet Incentives</h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-light font-sans">
                Once an issue is validated, points are instantly credited back to your campus wallet. Re-invest points into your marketplace dining or purchase premium dining vouchers.
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs text-amber-500 font-semibold">
                <Award size={16} /> compensation point ledger
              </div>
            </div>

            <div className="lg:col-span-5 lg:order-1 relative group">
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-amber-500/10 to-yellow-500/10 opacity-30 blur-lg group-hover:opacity-50 transition-opacity" />
              <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop" 
                  alt="Smart Wallet Dining Credits" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#151515]/95 border border-white/5 rounded-2xl flex items-center justify-between shadow-2xl">
                  <div className="text-left">
                    <span className="text-[8px] text-gray-500 uppercase tracking-widest block">Smart Wallet</span>
                    <span className="text-lg font-display font-bold text-white">4,850 <span className="text-xs text-amber-500">PTS</span></span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] text-[#7BA05B] font-bold block uppercase bg-[#7BA05B]/10 px-2 py-0.5 rounded">Active Link</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM BENEFITS: Asymmetrical Luxury Composition */}
      <section id="advantages" className="relative py-32 bg-[#0B0B0B]/70 w-full overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 m-auto w-[600px] h-[300px] bg-amber-500/3 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
          {/* Header */}
          <div className="max-w-3xl mb-24 text-left space-y-4">
            <span className="text-[10px] bg-amber-500/10 text-amber-400 font-bold px-2.5 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest inline-block">
              ✦ Gastronomic Engineering
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-white leading-tight">
              Engineered for <br/>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-200">The LPU Campus Environment</span>
            </h2>
            <div className="h-[1px] w-24 bg-amber-500/30 mt-4" />
          </div>

          {/* Asymmetrical 3-Column Luxury Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
            
            {/* Left Column: Massive Vertical Storytelling Banner Card (5 Cols) */}
            <div className="lg:col-span-5 rounded-[2.5rem] overflow-hidden border border-white/10 relative shadow-2xl min-h-[460px] flex flex-col justify-end p-8 md:p-10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/40 to-transparent z-10 pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop" 
                alt="LPU Kitchen Counter" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" 
              />
              
              <div className="relative z-20 space-y-4 text-left">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/20 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  Congestion Management
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-light text-white leading-snug">
                  Restoring time back to <span className="font-bold text-amber-300">5k+ active diners</span> per semester.
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-light max-w-sm">
                  Wait predictions, real-time load distribution, and digital queue bypass tools ensure campus dining takes minutes, not hours.
                </p>
              </div>
            </div>

            {/* Center Column: Technology Spec List (4 Cols) */}
            <div className="lg:col-span-4 rounded-[2.5rem] bg-[#151515] border border-white/5 p-8 md:p-10 flex flex-col justify-between shadow-2xl">
              <div className="space-y-6 text-left">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">Texture Audits</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans">
                  Our computer vision pipeline acts as a decentralized campus quality inspector. We audit portion sizing, cooking consistency, raw dough parameters, and general kitchen hygiene markers.
                </p>
              </div>

              <div className="space-y-3.5 pt-8 border-t border-white/5 text-left">
                <div className="flex items-center gap-2.5 text-[10px] text-neutral-300 font-semibold">
                  <span className="w-4 h-4 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400 text-[8px] font-extrabold">✓</span>
                  <span>99.5% accuracy rate standard</span>
                </div>
                <div className="flex items-center gap-2.5 text-[10px] text-neutral-300 font-semibold">
                  <span className="w-4 h-4 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400 text-[8px] font-extrabold">✓</span>
                  <span>Portion verification parameters</span>
                </div>
              </div>
            </div>

            {/* Right Column: Ledger Spec Card (3 Cols) */}
            <div className="lg:col-span-3 rounded-[2.5rem] bg-[#151515]/50 border border-white/5 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-6 text-left">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
                  <Wallet size={24} />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Smart Ledger</h3>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                  A secure digital system verifying feedback. Validated anomalies unlock points instantly to compensate dining discrepancies.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/60 border border-white/5 text-left space-y-1">
                <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest block">AUDIT PAYOUT</span>
                <span className="text-xl font-display font-black text-amber-500 block">+150 <span className="text-xs">PTS</span></span>
                <span className="text-[8px] text-[#7BA05B] font-bold block">Refund Verified</span>
              </div>
            </div>

          </div>

          {/* Cinematic Statistics Section (Apple-style immersive layout) */}
          <div className="border-t border-white/5 pt-12 mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { metric: "👥 5,000+", label: "Active Diners" },
              { metric: "🎯 99.8%", label: "Visual Compliances" },
              { metric: "🎁 20,000+", label: "Vouchers Redeemed" },
              { metric: "⏱️ 8.5 Hours", label: "Saved Per Term" }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1.5 text-center">
                <div className="text-3xl font-display font-extrabold text-white tracking-tight">{item.metric}</div>
                <p className="text-[10px] text-neutral-400 font-semibold uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. THE GASTRONOMIC STANDARD: Complete Bento Grid & Transformed Rankings */}
      <section id="benefits" className="relative py-32 bg-[#0B0B0B] w-full overflow-hidden border-t border-white/5">
        <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
          {/* Header */}
          <div className="max-w-3xl mb-24 text-left space-y-4">
            <span className="text-[10px] bg-amber-500/10 text-amber-400 font-bold px-2.5 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest inline-block">
              ✦ Bento Showcase
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-white leading-tight">
              Designed for <br/>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-200">Campus Transparency</span>
            </h2>
            <div className="h-[1px] w-24 bg-amber-500/30 mt-4" />
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full mb-28">
            
            {/* Card 1: Time Saver */}
            <div className="md:col-span-8 rounded-[2.5rem] bg-[#151515] border border-white/5 p-8 md:p-10 flex flex-col justify-between min-h-[380px] hover:border-amber-500/20 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2 border border-amber-500/20">
                  <Clock size={20} />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">Queue-Free Dining Pipeline</h3>
                <p className="text-gray-400 text-sm max-w-lg leading-relaxed font-light font-sans">
                  Skip traditional 30-minute cafeteria waiting lines. Pre-order your chef-crafted meal on the smart marketplace, track wait curve forecasts, and grab your tray instantly.
                </p>
              </div>

              <div className="my-6 p-5 rounded-2xl bg-neutral-950/60 border border-white/5 space-y-3.5 text-left">
                <div className="flex justify-between items-center text-xs font-bold text-amber-500">
                  <span>Fast-Track Optimization Progress</span>
                  <span>9.2 mins saved</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-500 w-[78%] rounded-full" />
                </div>
                <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                  <span>Standard Waiting: 25 mins</span>
                  <span>FoodPulse Pipeline: 4.5 mins</span>
                </div>
              </div>

              <div className="flex gap-4 items-center pt-4 text-[10px] text-amber-400 font-bold uppercase tracking-wider border-t border-white/5 text-left">
                <span>⚡ optimized queuing saves average 8.5 hours per student</span>
              </div>
            </div>

            {/* Card 2: Hygiene Score */}
            <div className="md:col-span-4 rounded-[2.5rem] bg-[#151515] border border-white/5 p-8 flex flex-col justify-between min-h-[380px] hover:border-amber-500/20 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2 border border-amber-500/20">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">Hygiene Indices</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light font-sans">
                  Dynamic food freshness quality indexes let you confirm mess standards before you dine.
                </p>
              </div>

              <div className="my-6 space-y-2.5 text-left">
                {[
                  { name: 'Central Mess', rating: 'A+ (99.8%)', color: 'text-amber-500' },
                  { name: 'BH1 Dining', rating: 'A- (93.1%)', color: 'text-neutral-300' },
                  { name: 'BH2 Mess Cafeteria', rating: 'B (82.5%)', color: 'text-neutral-500' }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-xl bg-neutral-950/60 border border-white/5">
                    <span className="text-gray-400 font-medium">{item.name}</span>
                    <span className={`font-bold ${item.color}`}>{item.rating}</span>
                  </div>
                ))}
              </div>

              <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider pt-2 border-t border-white/5 text-left block">
                ★ safety verified indexes
              </span>
            </div>

          </div>

          {/* Premium Alternating/Horizontal Testimonial/Rankings Grid */}
          <div className="w-full max-w-7xl mx-auto rounded-[2.5rem] border border-white/10 bg-[#151515] overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            
            <div className="p-8 md:p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <div className="text-left">
                <h3 className="text-xl font-display font-bold text-white tracking-tight">Gourmet Mess Rankings</h3>
                <p className="text-xs text-neutral-400 mt-1 font-light">Live campus food statistics curated from student crowd audits.</p>
              </div>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider shrink-0">
                Live updates
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/5 bg-[#0B0B0B]/60 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-5 px-8">Rank</th>
                    <th className="py-5 px-6">Dining Venue</th>
                    <th className="py-5 px-6">Quality Rating</th>
                    <th className="py-5 px-6">Average Wait</th>
                    <th className="py-5 px-6">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rank: '🥇 #1', name: 'Central Mess Hall', rating: 'A+ (99.8%)', rColor: 'text-[#7BA05B]', wait: '4.2 mins', status: 'Stable', sClass: 'bg-[#7BA05B]/10 text-[#7BA05B] border-[#7BA05B]/20' },
                    { rank: '🥈 #2', name: 'BH2 Dining Hall', rating: 'A- (93.1%)', rColor: 'text-[#7BA05B]', wait: '6.5 mins', status: 'Notice', sClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
                    { rank: '🥉 #3', name: 'Block 34 Foodcourt', rating: 'B+ (88.4%)', rColor: 'text-amber-500', wait: '8.0 mins', status: 'Alert Active', sClass: 'bg-red-500/10 text-red-400 border-red-500/20' }
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors">
                      <td className="py-5 px-8 font-display font-extrabold text-sm text-white">{row.rank}</td>
                      <td className="py-5 px-6 font-semibold text-white">{row.name}</td>
                      <td className={`py-5 px-6 font-bold ${row.rColor}`}>{row.rating}</td>
                      <td className="py-5 px-6 text-gray-300">{row.wait}</td>
                      <td className="py-5 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold border ${row.sClass}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </>
  );

  const renderLogin = () => (
    <div className="w-full flex justify-center items-center py-20 px-4 min-h-[75vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[440px] rounded-[2rem] border border-white/5 bg-[#151515] p-8 md:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col justify-between"
      >
        {/* Glow circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-extrabold text-white mb-2 uppercase tracking-widest text-sm">Welcome Back</h2>
            <p className="text-xs text-neutral-400 font-light">Log in to manage your FoodPulse dashboard and wallet points</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert("Mock Authentication Successful!"); handleViewChange('home'); }} className="space-y-5">
            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">Student Email Address</label>
              <div className="relative flex items-center">
                <Mail size={16} className="absolute left-4 text-neutral-500" />
                <input 
                  type="email" 
                  required 
                  placeholder="e.g. student@lpu.in"
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-2xl py-3.5 px-4 pl-12 text-white text-xs focus:border-amber-500 focus:bg-[#0B0B0B]/80 outline-none transition-all"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">Account Password</label>
                <button type="button" className="text-[10px] font-bold text-amber-500 hover:underline bg-transparent border-none cursor-pointer">Forgot?</button>
              </div>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-4 text-neutral-500" />
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••••••"
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-2xl py-3.5 px-4 pl-12 text-white text-xs focus:border-amber-500 focus:bg-[#0B0B0B]/80 outline-none transition-all"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 text-left">
              <input type="checkbox" id="remember-me" className="w-3.5 h-3.5 accent-amber-500 rounded bg-[#0B0B0B] border-white/10 cursor-pointer" />
              <label htmlFor="remember-me" className="text-[10px] text-neutral-400 cursor-pointer select-none">Remember me for 30 days</label>
            </div>

            <button type="submit" className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-yellow-500 hover:scale-[1.02] text-neutral-950 font-bold text-xs shadow-lg shadow-amber-500/5 transition-all cursor-pointer mt-4 border-none uppercase tracking-wider">
              Sign In
            </button>
          </form>

          <p className="text-center text-xs text-neutral-400 mt-8 font-semibold">
            Don't have an account? 
            <button onClick={() => handleViewChange('signup')} className="text-amber-500 hover:underline font-bold ml-1 bg-transparent border-none cursor-pointer">Sign Up</button>
          </p>
        </div>
      </motion.div>
    </div>
  );

  const renderSignup = () => (
    <div className="w-full flex justify-center items-center py-20 px-4 min-h-[75vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[440px] rounded-[2rem] border border-white/5 bg-[#151515] p-8 md:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col justify-between"
      >
        {/* Glow circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-extrabold text-white mb-2 uppercase tracking-widest text-sm">Create Account</h2>
            <p className="text-xs text-neutral-400 font-light">Join FoodPulse to browse stalls and earn verified points</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert("Registration Mock Successful!"); handleViewChange('login'); }} className="space-y-5">
            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">LPU Student ID</label>
              <div className="relative flex items-center">
                <User size={16} className="absolute left-4 text-neutral-500" />
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 12015382"
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-2xl py-3.5 px-4 pl-12 text-white text-xs focus:border-amber-500 focus:bg-[#0B0B0B]/80 outline-none transition-all"
                  value={authStudentId}
                  onChange={(e) => setAuthStudentId(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">Student Email Address</label>
              <div className="relative flex items-center">
                <Mail size={16} className="absolute left-4 text-neutral-500" />
                <input 
                  type="email" 
                  required 
                  placeholder="e.g. student@lpu.in"
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-2xl py-3.5 px-4 pl-12 text-white text-xs focus:border-amber-500 focus:bg-[#0B0B0B]/80 outline-none transition-all"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">Create Password</label>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-4 text-neutral-500" />
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••••••"
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-2xl py-3.5 px-4 pl-12 text-white text-xs focus:border-amber-500 focus:bg-[#0B0B0B]/80 outline-none transition-all"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 text-left">
              <input type="checkbox" id="terms" required className="w-3.5 h-3.5 accent-amber-500 rounded bg-[#0B0B0B] border-white/10 cursor-pointer" />
              <label htmlFor="terms" className="text-[10px] text-neutral-400 cursor-pointer select-none">I agree to LPU campus terms and conditions</label>
            </div>

            <button type="submit" className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-yellow-500 hover:scale-[1.02] text-neutral-950 font-bold text-xs shadow-lg shadow-amber-500/5 transition-all cursor-pointer mt-4 border-none uppercase tracking-wider">
              Sign Up
            </button>
          </form>

          <p className="text-center text-xs text-neutral-400 mt-8 font-semibold">
            Already have an account? 
            <button onClick={() => handleViewChange('login')} className="text-amber-500 hover:underline font-bold ml-1 bg-transparent border-none cursor-pointer">Log In</button>
          </p>
        </div>
      </motion.div>
    </div>
  );

  const renderHowItWorks = () => (
    <div className="w-full py-24 select-none">
      <div className="text-left max-w-3xl mb-20 space-y-4">
        <span className="text-[10px] bg-amber-500/10 text-amber-500 font-bold px-2.5 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest inline-block">
          Technical Architecture Documentation
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-white leading-tight">
          How FoodPulse <br/>
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-200">Maintains Dining Quality</span>
        </h2>
        <div className="h-[1px] w-24 bg-amber-500/30 mt-4" />
      </div>

      <div className="space-y-16 w-full max-w-5xl mx-auto">
        {[
          { icon: "🛒", title: "1. Digital Pre-Orders & Token Reservation", text: "Students pre-order from LPU messes or food stalls remotely using Smart Wallet points, locking in tokens and avoiding lines completely." },
          { icon: "📸", title: "2. Image Uplink & Computer Vision Verification", text: "Upon receipt, any meal can be photographed and uploaded. FoodPulse's proprietary computer vision pipeline inspects baking ratios, starch parameters, and counts portions to verify quality." },
          { icon: "🛡️", title: "3. Decentralized Crowd Compliance Audit", text: "Quality flags create direct community auditing tasks. Students vote on anomaly reports anonymously, building absolute dining administration accountability." },
          { icon: "🪙", title: "4. Wallet Reimbursements & Compensations", text: "Validated claims instantly unlock points compensation back to the Smart Wallet, enforcing high culinary standards among operator kitchens." }
        ].map((item, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 bg-[#151515] border border-white/5 rounded-[2rem] hover:border-amber-500/25 transition-all shadow-xl">
            <div className="md:col-span-2 text-center text-4xl shrink-0 bg-neutral-950/60 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 mx-auto">
              {item.icon}
            </div>
            <div className="md:col-span-10 text-left space-y-2">
              <h3 className="text-lg font-display font-bold text-white">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFeatures = () => (
    <div className="w-full py-24 select-none">
      <div className="text-left max-w-3xl mb-20 space-y-4">
        <span className="text-[10px] bg-amber-500/10 text-amber-500 font-bold px-2.5 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest inline-block">
          Capabilities Spec Sheet
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-white leading-tight">
          FoodPulse Core <br/>
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-200">Dining Innovations</span>
        </h2>
        <div className="h-[1px] w-24 bg-amber-500/30 mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
        {[
          { icon: "⏱️", title: "Queue-Free Fast-Track", desc: "Allows students to pre-order campus dishes ahead of time. Digital tokens enable instant tray pickups upon kitchen arrival, keeping checkout wait curves under 5 minutes." },
          { icon: "📷", title: "AI Plate Density Verification", desc: "Automated texture verification scans quality. Computer vision registers undercooked indices, sanitation anomalies, cold gravity metrics, and portion parameters in real-time." },
          { icon: "📊", title: "Dynamic Load Balancing", desc: "Intelligent analytics curves forecast wait intervals, routing student footfall away from congested zones to optimal dining halls." }
        ].map((item, idx) => (
          <div key={idx} className="rounded-[2.5rem] bg-[#151515] border border-white/5 p-8 flex flex-col justify-between min-h-[300px] hover:border-amber-500/20 transition-all shadow-xl">
            <div className="space-y-4 text-left">
              <div className="text-3xl mb-2 bg-neutral-950/60 w-12 h-12 rounded-xl flex items-center justify-center border border-white/5">{item.icon}</div>
              <h3 className="text-lg font-display font-bold text-white">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="w-full py-24 select-none">
      <div className="text-left max-w-3xl mb-20 space-y-4">
        <span className="text-[10px] bg-amber-500/10 text-amber-500 font-bold px-2.5 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest inline-block">
          Dining Performance Index
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-white leading-tight">
          Audited Mess <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-200">Rankings Index</span>
        </h2>
        <div className="h-[1px] w-24 bg-amber-500/30 mt-4" />
      </div>

      <div className="w-full max-w-5xl mx-auto rounded-[2.5rem] border border-white/10 bg-[#151515] overflow-hidden shadow-2xl relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/5 bg-[#0B0B0B]/60 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-5 px-8">Rank</th>
                <th className="py-5 px-6">Dining Venue / Stall</th>
                <th className="py-5 px-6">Hygiene Rating</th>
                <th className="py-5 px-6">Average Wait</th>
                <th className="py-5 px-6">Issues Flagged</th>
                <th className="py-5 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rank: '🥇 #1', name: 'Central Mess Hall', rating: 'A+ (99.8%)', rColor: 'text-[#7BA05B]', wait: '4.2 minutes', complaints: '12 complaints', status: 'Stable', sClass: 'bg-[#7BA05B]/10 text-[#7BA05B] border-[#7BA05B]/20' },
                { rank: '🥈 #2', name: 'BH2 Cafe & Stall', rating: 'A- (93.1%)', rColor: 'text-[#7BA05B]', wait: '6.5 minutes', complaints: '19 complaints', status: 'Verify', sClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
                { rank: '🥉 #3', name: 'Block 34 Cafeteria', rating: 'B+ (88.4%)', rColor: 'text-amber-500', wait: '8.0 minutes', complaints: '34 complaints', status: 'Alert Active', sClass: 'bg-red-500/10 text-red-400 border-red-500/20' },
                { rank: '#4', name: 'BH1 Student Dining', rating: 'A (91.5%)', rColor: 'text-[#7BA05B]', wait: '5.0 minutes', complaints: '8 complaints', status: 'Stable', sClass: 'bg-[#7BA05B]/10 text-[#7BA05B] border-[#7BA05B]/20' },
                { rank: '#5', name: 'Central Cafe Annex', rating: 'B (82.5%)', rColor: 'text-neutral-400', wait: '9.5 minutes', complaints: '45 complaints', status: 'Inspect', sClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20' }
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors">
                  <td className="py-5 px-8 font-display font-extrabold text-sm text-white">{row.rank}</td>
                  <td className="py-5 px-6 font-semibold text-white">{row.name}</td>
                  <td className={`py-5 px-6 font-bold ${row.rColor}`}>{row.rating}</td>
                  <td className="py-5 px-6 text-gray-300">{row.wait}</td>
                  <td className="py-5 px-6 text-gray-400 font-mono">{row.complaints}</td>
                  <td className="py-5 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold border ${row.sClass}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#ECE6DD] font-sans overflow-x-hidden relative selection:bg-amber-500/20 selection:text-amber-200">
      
      {/* Background Warm Vignette Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-600/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-amber-700/5 blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[20%] w-[350px] h-[350px] rounded-full bg-amber-800/2 blur-[100px] pointer-events-none z-0" />

      {/* NAV BAR */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-[#0B0B0B]/85 backdrop-blur-2xl border-white/5 py-4 shadow-[0_10px_35px_rgba(0,0,0,0.6)]' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          <button onClick={() => handleViewChange('home')} className="flex items-center gap-2.5 group bg-transparent border-none cursor-pointer text-left">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-amber-500 shadow-md group-hover:scale-105 transition-transform duration-300">
              <Zap size={16} fill="currentColor" />
            </div>
            <span className="text-lg font-display font-light text-white tracking-widest uppercase">
              Food<span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-300">Pulse</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            <li><button onClick={() => handleViewChange('how-it-works')} className={`hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer ${currentView === 'how-it-works' ? 'text-amber-400 font-bold' : ''}`}>How It Works</button></li>
            <li><button onClick={() => handleViewChange('features')} className={`hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer ${currentView === 'features' ? 'text-amber-400 font-bold' : ''}`}>Features</button></li>
            <li><button onClick={() => handleViewChange('leaderboard')} className={`hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer ${currentView === 'leaderboard' ? 'text-amber-400 font-bold' : ''}`}>Leaderboard</button></li>
          </ul>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => handleViewChange('login')} className={`text-xs uppercase tracking-widest font-semibold hover:text-white px-4 py-2 hover:bg-white/5 rounded-xl transition-all bg-transparent border-none cursor-pointer ${currentView === 'login' ? 'text-white' : 'text-neutral-400'}`}>
              Sign In
            </button>
            <button onClick={() => handleViewChange('signup')} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-neutral-950 font-bold text-xs shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer border-none uppercase tracking-wider">
              Register
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-neutral-400 hover:text-white bg-white/5 rounded-xl border border-white/5 cursor-pointer"
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
            className="md:hidden bg-[#0B0B0B] border-b border-white/10 px-6 py-6 space-y-4 text-left"
          >
            <button onClick={() => handleViewChange('how-it-works')} className="block w-full text-left text-neutral-300 hover:text-amber-400 font-semibold bg-transparent border-none cursor-pointer py-1 text-xs uppercase tracking-wider">How It Works</button>
            <button onClick={() => handleViewChange('features')} className="block w-full text-left text-neutral-300 hover:text-amber-400 font-semibold bg-transparent border-none cursor-pointer py-1 text-xs uppercase tracking-wider">Features</button>
            <button onClick={() => handleViewChange('leaderboard')} className="block w-full text-left text-neutral-300 hover:text-amber-400 font-semibold bg-transparent border-none cursor-pointer py-1 text-xs uppercase tracking-wider">Leaderboard</button>
            <div className="h-[1px] bg-white/5 my-4" />
            <div className="flex gap-4">
              <button onClick={() => handleViewChange('login')} className="flex-grow text-center py-2.5 border border-white/10 rounded-xl font-bold text-xs uppercase tracking-wider text-neutral-300 hover:text-white bg-transparent cursor-pointer">Sign In</button>
              <button onClick={() => handleViewChange('signup')} className="flex-grow text-center py-2.5 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-xl font-bold text-xs uppercase tracking-wider text-neutral-950 shadow-lg border-none cursor-pointer">Register</button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* ══ MAIN WORKSPACE CONTAINER ══ */}
      <div className="w-full relative z-10">
        {currentView === 'home' && renderHome()}
        
        {currentView !== 'home' && (
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center justify-center">
            {currentView === 'login' && renderLogin()}
            {currentView === 'signup' && renderSignup()}
            {currentView === 'how-it-works' && renderHowItWorks()}
            {currentView === 'features' && renderFeatures()}
            {currentView === 'leaderboard' && renderLeaderboard()}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#0B0B0B] py-16 px-6 md:px-8 relative z-10 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4 text-left">
            <button onClick={() => handleViewChange('home')} className="flex items-center gap-2 group bg-transparent border-none cursor-pointer text-left">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-neutral-950 text-sm font-bold">⚡</div>
              <span className="text-lg font-bold text-white">FoodPulse</span>
            </button>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs font-light">
              Building a smarter, healthier campus food ecosystem through technology and transparent crowd auditing.
            </p>
          </div>

          <div className="space-y-3 text-left">
            <h5 className="text-sm font-bold text-white">Quick Links</h5>
            <ul className="space-y-2 text-xs text-gray-400 list-none font-light">
              <li><button onClick={() => handleViewChange('login')} className="hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer">Stall Marketplace</button></li>
              <li><button onClick={() => handleViewChange('signup')} className="hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer">Report Issue</button></li>
              <li><button onClick={() => handleViewChange('how-it-works')} className="hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer">How It Works</button></li>
            </ul>
          </div>

          <div className="space-y-3 text-left">
            <h5 className="text-sm font-bold text-white">Support</h5>
            <ul className="space-y-2 text-xs text-gray-400 list-none font-light">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="space-y-3 text-left">
            <h5 className="text-sm font-bold text-white">Connect</h5>
            <div className="flex gap-3">
              {['Twitter', 'LinkedIn', 'Discord'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-amber-500/20 text-xs font-semibold text-gray-400 hover:text-white transition-all"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4 w-full">
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
