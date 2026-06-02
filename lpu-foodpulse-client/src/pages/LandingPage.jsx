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

    {/* 2. HOW IT WORKS SECTION */}
    <section id="how-it-works" className="relative py-28 border-t border-white/5 bg-[#0B0B0B]/30 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-[10px] bg-amber-500/10 text-amber-400 font-bold px-2.5 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest inline-block">
            + WORKFLOW
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light text-white">How FoodPulse <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">Works</span></h2>
          <p className="text-neutral-400 text-base font-light">Our ecosystem is engineered to keep dining high-quality and order checkout frictionless.</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative w-full"
        >
          {[
            { step: "01", title: "Browse Marketplace", desc: "Access the campus digital food court, check menus, and order your favorite meals.", icon: <ShoppingBag size={24} />, color: "from-amber-600 to-yellow-600" },
            { step: "02", title: "Order or Report", desc: "Enjoy quick queue-free meals or report poor-quality food items instantly.", icon: <Utensils size={24} />, color: "from-amber-600 to-yellow-600" },
            { step: "03", title: "AI Verification", desc: "Computer vision scans details to verify complaints automatically in seconds.", icon: <ShieldCheck size={24} />, color: "from-amber-600 to-yellow-600" },
            { step: "04", title: "Earn Rewards", desc: "Receive instant compensation points and unlock premium reward badges.", icon: <Award size={24} />, color: "from-amber-600 to-yellow-600" }
          ].map((card, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="group relative rounded-3xl bg-[#151515] border border-white/5 p-8 hover:border-amber-500/30 hover:shadow-[0_8px_30px_rgba(198,138,43,0.08)] transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[300px]"
            >
              {/* Accent glow corner */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr ${card.color} opacity-0 group-hover:opacity-5 rounded-bl-full transition-opacity duration-500`} />
              
              {/* Step indicator inside card */}
              <div className="absolute top-6 left-6 text-xs font-mono font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                {card.step}
              </div>
 
              <div className="flex justify-center items-center mt-6">
                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-neutral-950 shadow-lg`}>
                  {card.icon}
                </div>
              </div>
 
              <div className="mt-8 space-y-2 text-center">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">{card.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">{card.desc}</p>
              </div>
 
              {/* Arrow pointers between cards */}
              {idx < 3 && (
                <div className="hidden lg:flex absolute right-[-20px] top-[50%] translate-y-[-50%] z-20 items-center justify-center text-amber-500/20">
                  <span className="text-2xl font-bold">➔</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* 3. ADVANTAGES SECTION */}
    <section id="advantages" className="py-28 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="bg-[#151515]/65 border border-white/5 rounded-[36px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle warm glow */}
          <div className="absolute top-[20%] left-[50%] translate-x-[-50%] w-[500px] h-[200px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 relative z-10">
            <span className="text-[10px] bg-amber-500/10 text-amber-400 font-bold px-2.5 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest inline-block">
              ✦ PLATFORM BENEFITS
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-light text-white">Engineered for LPU Campus</h2>
            <p className="text-neutral-400 text-base font-light">Discover custom-designed tools designed to address common dining and kitchen issues.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
          >
            {[
              { title: "Faster Ordering", desc: "Skip queues by ordering menu items ahead of arrival.", icon: <Clock size={20} />, status: "Instant", points: ["30% Less Waiting Time", "Real-time Queue Updates"] },
              { title: "AI Verification", desc: "Computer vision verifies food texture and ingredients.", icon: <ShieldCheck size={20} />, status: "Automated", points: ["99.5% Accuracy Rate", "Instant Issue Detection"] },
              { title: "Complaint Tracking", desc: "Track mess issues live from detection to resolution.", icon: <AlertTriangle size={20} />, status: "Transparent", points: ["Live Status Updates", "Full Transparency"] },
              { title: "Queue Reduction", desc: "Optimize preparation times with predictive insights.", icon: <BarChart3 size={20} />, status: "Live", points: ["Predictive Analytics", "Smart Load Balancing"] }
            ].map((feat, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="p-6 rounded-3xl bg-neutral-950/60 border border-white/5 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between min-h-[260px] hover:shadow-glow"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                      {feat.icon}
                    </div>
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/20">{feat.status}</span>
                  </div>
                  <h4 className="font-bold text-white text-lg">{feat.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">{feat.desc}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                  {feat.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-[10px] text-neutral-400 font-medium">
                      <span className="w-4 h-4 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-[8px] font-bold">✓</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Metrics Bar */}
          <div className="relative z-10 border-t border-white/5 pt-8 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-2xl font-extrabold text-white flex items-center justify-center gap-2">
                👥 5K+
              </span>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider font-light">Active Diners</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-2xl font-extrabold text-white flex items-center justify-center gap-2">
                🎯 99.8%
              </span>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider font-light">Scan Accuracy</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-2xl font-extrabold text-white flex items-center justify-center gap-2">
                🎁 20K+
              </span>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider font-light">Vouchers Redeemed</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-2xl font-extrabold text-white flex items-center justify-center gap-2">
                ⏱️ 8.5hrs
              </span>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider font-light">Avg. Time Saved</span>
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* 4. STUDENT BENEFITS SECTION (Bento Grid) */}
    <section id="benefits" className="relative py-28 border-t border-white/5 bg-[#0B0B0B] w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h4 className="text-amber-500 text-sm font-bold uppercase tracking-widest">Bento Grid</h4>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white">How FoodPulse Helps Students</h2>
          <p className="text-gray-400 text-base">Simplifying student dining while building mess administration transparency.</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
          {/* Bento Card 1: Time Saver */}
          <div className="md:col-span-7 rounded-3xl bg-[#151515] border border-white/5 p-8 flex flex-col justify-between min-h-[360px] hover:border-amber-500/20 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 border border-amber-500/20">
                <Clock size={20} />
              </div>
              <h3 className="text-2xl font-bold text-white">Saves Time & Reduces Waiting</h3>
              <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                Tired of waiting 30 minutes for lunch? Pre-order on the marketplace, monitor the live queue prediction index, and grab your plate the moment it is ready.
              </p>
            </div>

            <div className="my-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-amber-500">
                <span>Checkout Wait-Time Progress</span>
                <span>9.2 min saved</span>
              </div>
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-500 w-[78%] rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>Traditional: 25 mins waiting</span>
                <span>FoodPulse Fast-Track: 4.5 mins</span>
              </div>
            </div>

            <div className="flex gap-4 items-center pt-4 text-xs text-amber-500 font-semibold border-t border-white/5">
              <span>⚡ 8.5 Hours Saved Average / Student</span>
            </div>
          </div>

          {/* Bento Card 2: Hygiene Score */}
          <div className="md:col-span-5 rounded-3xl bg-[#151515] border border-white/5 p-8 flex flex-col justify-between min-h-[360px] hover:border-amber-500/20 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 border border-amber-500/20">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-2xl font-bold text-white">Mess Hygiene Scores</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Real-time quality audits flag messes with active issues, letting you make healthy choices on where to dine.
              </p>
            </div>

            <div className="my-6 space-y-2.5">
              {[
                { name: 'Central Mess', rating: 'A+ (99.8%)', color: 'text-amber-500' },
                { name: 'BH1 Dining', rating: 'A- (93.1%)', color: 'text-neutral-300' },
                { name: 'BH2 Mess Cafeteria', rating: 'B (82.5%)', color: 'text-neutral-400' }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-white/[0.01] border border-white/5">
                  <span className="text-gray-300 font-medium">{item.name}</span>
                  <span className={`font-bold ${item.color}`}>{item.rating}</span>
                </div>
              ))}
            </div>

            <span className="text-xs text-amber-500 font-bold uppercase tracking-wider pt-2">Safety Verified</span>
          </div>

          {/* Bento Card 3: Voice */}
          <div className="md:col-span-5 rounded-3xl bg-[#151515] border border-white/5 p-8 flex flex-col justify-between min-h-[360px] hover:border-amber-500/20 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 border border-amber-500/20">
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-2xl font-bold text-white">Gives Students a Voice</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                No more ignored feedback letters. Submit visual proof and let the automated computer vision verification hold kitchen operators accountable.
              </p>
            </div>

            <div className="my-6 p-4 rounded-2xl bg-[#0B0B0B]/60 border border-white/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <div>
                  <span className="text-gray-300 font-semibold block">Undercooked Meat Audit</span>
                  <span className="text-[10px] text-gray-500">Scan Verified</span>
                </div>
              </div>
              <span className="text-amber-500 font-extrabold">+150 pts</span>
            </div>

            <span className="text-xs text-amber-500 font-bold uppercase tracking-wider pt-2">Direct Action</span>
          </div>

          {/* Bento Card 4: Leaderboard */}
          <div className="md:col-span-7 rounded-3xl bg-[#151515] border border-white/5 p-8 flex flex-col justify-between min-h-[360px] hover:border-amber-500/20 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 border border-amber-500/20">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-2xl font-bold text-white">Audited Mess Performance Leaderboard</h3>
              <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                Stall performance ratings, live queue speeds, and resolved complaints data are broadcast directly to the student leaderboard.
              </p>
            </div>

            <div className="my-6 grid grid-cols-3 gap-3">
              {[
                { place: '🥇 #1 Central Mess', score: '4.95 ⭐' },
                { place: '🥈 #2 BH2 Cafe', score: '4.88 ⭐' },
                { place: '🥉 #3 Central Cafe', score: '4.79 ⭐' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl text-center">
                  <span className="block font-bold text-xs text-white mb-1">{item.place}</span>
                  <span className="text-[10px] text-amber-500 font-semibold">{item.score}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 items-center pt-4 text-xs text-amber-500 font-semibold border-t border-white/5">
              <span>📊 Full Campus Food Quality Statistics Available</span>
            </div>
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
            <h2 className="text-3xl font-display font-extrabold text-white mb-2">Welcome Back</h2>
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
                <button type="button" className="text-[10px] font-bold text-amber-500 hover:underline">Forgot?</button>
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
            <h2 className="text-3xl font-display font-extrabold text-white mb-2">Create Account</h2>
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
    <div className="w-full py-20">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-[10px] bg-amber-500/10 text-amber-500 font-bold px-2.5 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest inline-block">
          Documentation
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white">How FoodPulse <span className="bg-gradient-to-r from-amber-500 to-yellow-200 bg-clip-text text-transparent">Works</span></h2>
        <p className="text-gray-400 text-base leading-relaxed font-light">A comprehensive breakdown of LPU's automated student dining and crowd auditing platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
        <div className="rounded-3xl bg-[#151515] border border-white/5 p-8 backdrop-blur-md hover:border-amber-500/20 transition-all duration-300">
          <div className="text-3xl mb-4">🛒</div>
          <h3 className="text-xl font-bold text-white mb-2">1. Marketplace Discovery</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Students access LPU's decentralized digital food marketplace to view live menus, queue predictions, and place pre-orders. Skip traditional dining hall lines by purchasing tokens directly using dining reward points or wallet balances.
          </p>
        </div>

        <div className="rounded-3xl bg-[#151515] border border-white/5 p-8 backdrop-blur-md hover:border-amber-500/20 transition-all duration-300">
          <div className="text-3xl mb-4">🤖</div>
          <h3 className="text-xl font-bold text-white mb-2">2. AI Kitchen Verification</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Every meal served can be photographed and uploaded for instantaneous verification. FoodPulse's proprietary computer vision models verify portion control, structural parameters, food color profiles, and detect preparation anomalies like undercooked components.
          </p>
        </div>

        <div className="rounded-3xl bg-[#151515] border border-white/5 p-8 backdrop-blur-md hover:border-amber-500/20 transition-all duration-300">
          <div className="text-3xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-white mb-2">3. Real-Time Crowd Auditing</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Any food preparation discrepancy automatically creates an active audit ticket on the student dashboard. Neighboring students act as decentralized auditors, reviewing photos to confirm or reject anomalies, enforcing dining hall transparency and hygiene.
          </p>
        </div>

        <div className="rounded-3xl bg-[#151515] border border-white/5 p-8 backdrop-blur-md hover:border-amber-500/20 transition-all duration-300">
          <div className="text-3xl mb-4">🪙</div>
          <h3 className="text-xl font-bold text-white mb-2">4. Rewards Compensation</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Once the crowd-audited quality ticket is flagged and verified by the system, points are instantly refunded to the student's Smart Wallet. Users redeem these verified points at LPU campus stalls, ensuring dining hall operator accountability.
          </p>
        </div>
      </div>
    </div>
  );

  const renderFeatures = () => (
    <div className="w-full py-20">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-[10px] bg-amber-500/10 text-amber-500 font-bold px-2.5 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest inline-block">
          Capabilities Matrix
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white">Platform <span className="bg-gradient-to-r from-amber-500 to-yellow-200 bg-clip-text text-transparent">Features</span></h2>
        <p className="text-gray-400 text-base leading-relaxed font-light">Explore LPU FoodPulse's advanced AI-powered dining optimization technologies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
        <div className="rounded-3xl bg-[#151515] border border-white/5 p-8 backdrop-blur-md hover:border-amber-500/20 transition-all duration-300">
          <div className="text-3xl mb-4">⏱️</div>
          <h3 className="text-xl font-bold text-white mb-2">Queue-Free Pipeline</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Our smart routing algorithm allows students to order food items remotely and pick them up instantly upon arrival. Real-time updates track preparation status directly on the web app.
          </p>
        </div>

        <div className="rounded-3xl bg-[#151515] border border-white/5 p-8 backdrop-blur-md hover:border-amber-500/20 transition-all duration-300">
          <div className="text-3xl mb-4">📷</div>
          <h3 className="text-xl font-bold text-white mb-2">AI Texture Tracking</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Harnessing state-of-the-art computer vision to analyze plate contents. Automatically flags hygiene indices, undercooked roti, cold gravy, or incorrect portion sizing before the first bite.
          </p>
        </div>

        <div className="rounded-3xl bg-[#151515] border border-white/5 p-8 backdrop-blur-md hover:border-amber-500/20 transition-all duration-300">
          <div className="text-3xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-white mb-2">Predictive Load Balancing</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Minimizes peak dining hall congestion by tracking wait-time curves. Directs students to under-utilized messes, improving campus load distribution and saving hours of waiting time.
          </p>
        </div>
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="w-full py-20">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-[10px] bg-amber-500/10 text-amber-500 font-bold px-2.5 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest inline-block">
          Leaderboard
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white">Audited Mess <span className="bg-gradient-to-r from-amber-500 to-yellow-200 bg-clip-text text-transparent">Rankings</span></h2>
        <p className="text-gray-400 text-base leading-relaxed font-light">Live student-curated food quality ratings, AI-verified audits, and queue metrics across LPU dining halls.</p>
      </div>

      <div className="w-full max-w-5xl mx-auto rounded-3xl border border-white/5 bg-[#151515] backdrop-blur-md overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/5 bg-[#0B0B0B]/60 text-[#8A8A8A] font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6">Rank</th>
                <th className="py-4 px-6">Dining Venue / Stall</th>
                <th className="py-4 px-6">Hygiene Rating</th>
                <th className="py-4 px-6">Avg Waiting Time</th>
                <th className="py-4 px-6">Anomalies Verified</th>
                <th className="py-4 px-6">Platform Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rank: '🥇 #1', name: 'Central Mess Hall', rating: 'A+ (99.8%)', rColor: 'text-[#7BA05B]', wait: '4.2 minutes', complaints: '12 complaints', status: 'Stable', sClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                { rank: '🥈 #2', name: 'BH2 Cafe & Stall', rating: 'A- (93.1%)', rColor: 'text-[#7BA05B]', wait: '6.5 minutes', complaints: '19 complaints', status: 'Check Quality', sClass: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
                { rank: '🥉 #3', name: 'Block 34 Cafeteria', rating: 'B+ (88.4%)', rColor: 'text-amber-500', wait: '8.0 minutes', complaints: '34 complaints', status: 'Alert Active', sClass: 'bg-red-500/10 text-red-400 border-red-500/20' },
                { rank: '#4', name: 'BH1 Student Dining', rating: 'A (91.5%)', rColor: 'text-[#7BA05B]', wait: '5.0 minutes', complaints: '8 complaints', status: 'Stable', sClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                { rank: '#5', name: 'Central Cafe Annex', rating: 'B (82.5%)', rColor: 'text-neutral-400', wait: '9.5 minutes', complaints: '45 complaints', status: 'Quality Notice', sClass: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' }
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4.5 px-6 font-display font-extrabold text-sm text-white">{row.rank}</td>
                  <td className="py-4.5 px-6 font-semibold text-white">{row.name}</td>
                  <td className={`py-4.5 px-6 font-bold ${row.rColor}`}>{row.rating}</td>
                  <td className="py-4.5 px-6 text-gray-300">{row.wait}</td>
                  <td className="py-4.5 px-6 text-gray-300">{row.complaints}</td>
                  <td className="py-4.5 px-6">
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
