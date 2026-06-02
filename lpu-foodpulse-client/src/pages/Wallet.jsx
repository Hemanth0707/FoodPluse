import React, { useState } from 'react';
import useFoodStore from '../store/useFoodStore';
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Wallet as WalletIcon, 
  Calendar, 
  CheckCircle, 
  TrendingUp, 
  Sparkles, 
  Award, 
  HelpCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

const Wallet = () => {
  const walletPoints = useFoodStore(state => state.walletPoints);
  const [selectedPeriod, setSelectedPeriod] = useState('6M');

  // Chart data representing points activity
  const analyticsData = [
    { name: 'Jan', earned: 300, spent: 120, audits: 2 },
    { name: 'Feb', earned: 500, spent: 220, audits: 3 },
    { name: 'Mar', earned: 400, spent: 310, audits: 2 },
    { name: 'Apr', earned: 750, spent: 200, audits: 5 },
    { name: 'May', earned: 600, spent: 450, audits: 4 },
    { name: 'Jun', earned: 950, spent: 300, audits: 6 }
  ];

  const milestones = [
    { name: 'Bronze Auditor', req: '500 PTS', progress: 100, unlocked: true, reward: 'Bronze Avatar Badge' },
    { name: 'Silver Guardian', req: '1,500 PTS', progress: Math.min(100, Math.round((walletPoints / 1500) * 100)), unlocked: walletPoints >= 1500, reward: '10% Checkout Discount' },
    { name: 'Gold Sentinel', req: '3,000 PTS', progress: Math.min(100, Math.round((walletPoints / 3000) * 100)), unlocked: walletPoints >= 3000, reward: 'Stall Priority Lane Access' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 md:px-8 pb-24 lg:pb-12 space-y-10 font-sans"
    >
      {/* HEADER SUMMARY */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none pb-2 border-b border-white/5">
        <div>
          <h2 className="text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-2.5">
            Smart Wallet <span className="text-[10px] uppercase bg-amber-500/5 text-amber-500 border border-amber-500/20 px-2.5 py-1 rounded-full font-bold tracking-widest">Digital Ledger</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">Monitor dining credits, review audit payouts, and track reward levels.</p>
        </div>
        
        <div className="flex gap-2">
          {['1M', '3M', '6M'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedPeriod === period 
                  ? 'bg-amber-500 text-white shadow-md' 
                  : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* DASHBOARD GRID: Balance Widget + Analytics Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Balance Card Widget (Spans 4 columns) */}
        <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block mb-1">Total Available Balance</span>
                <div className="text-5xl font-display font-black text-white flex items-baseline gap-2">
                  {walletPoints.toLocaleString()} <span className="text-sm text-amber-500 font-bold uppercase tracking-wider">PTS</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/5 text-amber-500 flex items-center justify-center border border-amber-500/20 shadow-inner">
                <WalletIcon size={22} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#151515]/60 border border-white/5 shadow-inner">
                <span className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold block mb-0.5">Spent Value</span>
                <span className="font-extrabold text-sm text-amber-500">890 pts</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#151515]/60 border border-white/5 shadow-inner">
                <span className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold block mb-0.5">Remaining Cap</span>
                <span className="font-extrabold text-sm text-[#7BA05B]">{walletPoints} pts</span>
              </div>
            </div>
            
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-400">Semester Cap Progress</span>
                <span className="text-white">75%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-600 to-yellow-500 text-neutral-950 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1.2 }}
                />
              </div>
              <div className="flex items-center justify-between text-[9px] text-gray-500 mt-1">
                <span>Maximum limit: 2,000 pts</span>
                <span className="flex items-center gap-1"><Calendar size={10} /> Exp: Dec 31</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/5 text-[10px] text-gray-500 flex items-center gap-1.5 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
            Wallet and transaction channels secure
          </div>
        </div>

        {/* Recharts Analytics Card (Spans 8 columns) */}
        <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl flex flex-col justify-between min-h-[400px]">
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-amber-500" />
              <h3 className="text-lg font-bold text-white tracking-tight">Earned vs Spent Analytics</h3>
            </div>
            <span className="text-[10px] bg-amber-500/5 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
              AI Aggregation
            </span>
          </div>

          <div className="flex-1 w-full min-h-[260px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEarned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(val) => `${val}p`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#020208', 
                    borderColor: 'rgba(255,255,255,0.1)', 
                    borderRadius: '16px',
                    color: '#fff',
                    fontSize: '11px',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.5)', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="earned" 
                  name="Points Earned"
                  stroke="#00D4FF" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorEarned)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="spent" 
                  name="Points Spent"
                  stroke="#06B6D4" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorSpent)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* BOTTOM GRID: Recent Activities + Gamified Milestones Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Recent Transactions List (Spans 8 columns) */}
        <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl">
          <h3 className="text-xl font-display font-extrabold text-white tracking-tight mb-6 flex items-center gap-2 select-none">
            <CheckCircle size={18} className="text-amber-500" /> Recent Ledgers
          </h3>
          
          <div className="space-y-4">
            {[
              { id: 'tx-1', type: 'credit', desc: 'Compensation: Verified Quality Failure', meta: 'Central Mess • Complaint Verified', amount: '+150 pts', icon: <ArrowDownLeft size={16}/>, color: 'bg-green-500/10 text-[#7BA05B] border-green-500/20' },
              { id: 'tx-2', type: 'debit', desc: 'Order Placed: Cheese Pasta', meta: 'Central Mess • Token #CP-892', amount: '-120 pts', icon: <ArrowUpRight size={16}/>, color: 'bg-yellow-500/3 text-amber-500 border-blue-600/20' },
              { id: 'tx-3', type: 'credit', desc: 'Compensation: Hair Follicle Violation', meta: 'BH1 Mess • Scan verified', amount: '+150 pts', icon: <ArrowDownLeft size={16}/>, color: 'bg-green-500/10 text-[#7BA05B] border-green-500/20' },
              { id: 'tx-4', type: 'credit', desc: 'Welcome Bonus Allocation', meta: 'Semester initiation bonus credits', amount: '+500 pts', icon: <ArrowDownLeft size={16}/>, color: 'bg-green-500/10 text-[#7BA05B] border-green-500/20' }
            ].map((tx) => (
              <div 
                key={tx.id} 
                className="p-4 bg-[#151515]/30 border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/[0.02] hover:border-white/5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${tx.color} shadow-inner`}>
                    {tx.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs md:text-sm">{tx.desc}</h4>
                    <p className="text-[10px] text-gray-500 mt-1">{tx.meta}</p>
                  </div>
                </div>
                
                <span className={`font-display font-extrabold text-sm md:text-base shrink-0 ${tx.type === 'credit' ? 'text-[#7BA05B]' : 'text-amber-500'}`}>
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Milestones (Spans 4 columns) */}
        <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="text-lg font-display font-extrabold text-white tracking-tight flex items-center gap-2">
              <Award size={18} className="text-amber-500 animate-pulse" /> Achievements
            </h3>
            <Sparkles size={14} className="text-amber-500 animate-bounce" />
          </div>

          <div className="space-y-5">
            {milestones.map((ms, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  ms.unlocked 
                    ? 'bg-amber-500/5 border-amber-500/20' 
                    : 'bg-[#151515]/40 border-white/5 opacity-60'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-white text-xs">{ms.name}</h4>
                    <span className="text-[9px] text-gray-500 block mt-0.5">Reward: {ms.reward}</span>
                  </div>
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded border ${
                    ms.unlocked 
                      ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' 
                      : 'bg-white/5 text-gray-500 border-white/5'
                  }`}>
                    {ms.req}
                  </span>
                </div>

                <div className="space-y-1 mt-3">
                  <div className="flex justify-between text-[9px] font-bold text-gray-400">
                    <span>Progress</span>
                    <span>{ms.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-500 text-neutral-950" style={{ width: `${ms.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button className="w-full py-3.5 rounded-xl border border-white/5 hover:border-amber-500/30 bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 accessibility-focus">
              Explore Reward Marketplace <ArrowRight size={12} />
            </button>
          </div>
        </div>

      </div>

    </motion.div>
  );
};

export default Wallet;
