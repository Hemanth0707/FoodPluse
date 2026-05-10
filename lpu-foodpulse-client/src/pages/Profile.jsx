import { useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import useFoodStore from '../store/useFoodStore';
import { Camera, Edit3, ShoppingBag, AlertTriangle, Wallet, Bell, QrCode, Medal, Star, TrendingUp, Clock, Activity, Target, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const user = useAuthStore(state => state.user);
  const { complaints, orders } = useFoodStore();
  const walletPoints = useFoodStore(state => state.walletPoints);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  
  // Simulated avatar
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Mock Student Stats
  const studentStats = [
    { label: 'Semester Points', value: walletPoints, icon: <Wallet size={20}/>, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Meals Redeemed', value: orders.length + 42, icon: <ShoppingBag size={20}/>, color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { label: 'Money Saved', value: '₹1,240', icon: <TrendingUp size={20}/>, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Queue Time Saved', value: '8.5 hrs', icon: <Clock size={20}/>, color: 'text-blue-400', bg: 'bg-blue-500/10' }
  ];

  // Quick Actions
  const quickActions = [
    { label: 'Order Food', icon: <ShoppingBag size={24}/>, action: () => navigate('/report-food') },
    { label: 'Report Issue', icon: <AlertTriangle size={24}/>, action: () => navigate('/report-food') },
    { label: 'Notifications', icon: <Bell size={24}/>, action: () => alert('No new notifications') },
    { label: 'Scan QR', icon: <QrCode size={24}/>, action: () => alert('Opening QR Scanner...') }
  ];

  // Mock Rewards
  const rewards = [
    { id: 1, title: 'Food Critic', desc: 'Reported 5 valid issues', icon: '📝', unlocked: true },
    { id: 2, title: 'Early Bird', desc: 'Ordered breakfast 10 times', icon: '🌅', unlocked: true },
    { id: 3, title: 'Marketplace Explorer', desc: 'Tried 5 different stalls', icon: '🏪', unlocked: false },
    { id: 4, title: 'Healthy Eater', desc: 'Ordered 10 salads', icon: '🥗', unlocked: false }
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-[fadeUp_0.4s_both]">
      
      {/* MASSIVE PROFILE HERO */}
      <div className="relative mb-8 rounded-[2.5rem] p-8 overflow-hidden bg-gradient-to-br from-[#12122a] to-black border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full filter blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
          
          {/* Avatar Uploader */}
          <div className="relative group cursor-pointer">
            <div className="w-40 h-40 rounded-[2rem] bg-gradient-to-tr from-purple-600 to-pink-500 p-1 shadow-[0_0_40px_rgba(168,85,247,0.3)] transform transition duration-500 hover:scale-105 hover:rotate-3">
              <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-[#12122a] flex items-center justify-center relative">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl font-bold text-white">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                )}
                
                {/* Camera Overlay */}
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white mb-1" size={24} />
                  <span className="text-xs text-white font-semibold uppercase tracking-wider">Change</span>
                </div>
              </div>
            </div>
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleAvatarChange} />
          </div>

          {/* User Details */}
          <div className="flex-1 text-center md:text-left mt-4 md:mt-2">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">{user?.name || 'Namburi Hemanth'}</h1>
              <div className="hidden md:flex gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-purple-500/30 bg-purple-500/10 text-purple-300">Level 4</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-pink-500/30 bg-pink-500/10 text-pink-300">Pro</span>
              </div>
            </div>
            
            <p className="text-xl text-gray-400 mb-6 font-medium">{user?.email || 'student@lpu.in'} • {user?.lpuId || '12014567'}</p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <div className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span className="font-semibold">{user?.department || 'B.Tech CSE'}</span>
              </div>
              <div className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span className="font-semibold">{user?.hostel || 'BH1'} - {user?.room || '102-A'}</span>
              </div>
              <div className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                <span className="font-semibold">Year {user?.year || 3}</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-4"></div>

          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition mt-6 md:mt-0">
            <Edit3 size={18} /> Edit Profile
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action, idx) => (
          <button 
            key={idx} 
            onClick={action.action}
            className="group relative overflow-hidden bg-[#12122a] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] hover:border-purple-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-purple-400 group-hover:scale-110 transition-transform duration-300">
              {action.icon}
            </div>
            <span className="text-white font-semibold text-sm">{action.label}</span>
          </button>
        ))}
      </div>

      {/* STUDENT STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {studentStats.map((stat, idx) => (
          <div key={idx} className="bg-[#12122a] border border-white/5 rounded-3xl p-6 flex items-center gap-5 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10 transform scale-150">
              {stat.icon}
            </div>
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white font-display">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* FOOD ACTIVITY CARD */}
        <div className="lg:col-span-2 bg-[#12122a] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full filter blur-[80px]"></div>
          
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Activity className="text-pink-400" /> Food Activity
            </h3>
            <button className="text-sm text-pink-400 font-semibold hover:underline">View All Orders</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="bg-black/30 border border-white/5 rounded-2xl p-6">
              <p className="text-gray-400 text-sm mb-4">Most Ordered</p>
              <div className="flex items-center gap-4">
                <div className="text-4xl">🍔</div>
                <div>
                  <h4 className="text-white font-bold text-lg">Spicy Chicken Burger</h4>
                  <p className="text-sm text-purple-400">Ordered 14 times</p>
                </div>
              </div>
            </div>
            <div className="bg-black/30 border border-white/5 rounded-2xl p-6">
              <p className="text-gray-400 text-sm mb-4">Favorite Stall</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white">
                  <Store size={20}/>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Oven Express</h4>
                  <p className="text-sm text-gray-400">Fast Food & Snacks</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COMPLAINT ANALYTICS */}
        <div className="bg-[#12122a] border border-white/5 rounded-3xl p-8">
          <h3 className="text-xl font-display font-bold text-white flex items-center gap-2 mb-6">
            <Target className="text-purple-400" /> Issue Reports
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">AI Verified</span>
                <span className="text-green-400 font-bold">85%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[85%] rounded-full shadow-[0_0_10px_#22c55e]"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
                <p className="text-3xl font-display font-bold text-white mb-1">{complaints.length + 12}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Total Reports</p>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
                <p className="text-3xl font-display font-bold text-green-400 mb-1">10</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Resolved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REWARDS & BADGES SECTION */}
      <div className="bg-[#12122a] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/2 w-96 h-96 bg-yellow-500/5 rounded-full filter blur-[100px]"></div>
        
        <div className="flex justify-between items-end mb-8 relative z-10">
          <div>
            <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2 mb-2">
              <Medal className="text-yellow-400" /> Achievements
            </h3>
            <p className="text-gray-400">Unlock badges by participating in the campus food ecosystem.</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-xl text-yellow-400 font-bold flex items-center gap-2">
            <Star size={16} fill="currentColor" /> Level 4
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {rewards.map(reward => (
            <div key={reward.id} className={`border rounded-2xl p-6 transition-all ${reward.unlocked ? 'bg-gradient-to-br from-white/5 to-white/0 border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.1)] hover:-translate-y-1' : 'bg-black/40 border-white/5 opacity-60 grayscale'}`}>
              <div className="text-5xl mb-4 filter drop-shadow-lg">{reward.icon}</div>
              <h4 className="font-bold text-lg text-white mb-1">{reward.title}</h4>
              <p className="text-sm text-gray-400">{reward.desc}</p>
              
              {!reward.unlocked && (
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-500 flex items-center justify-center">🔒</div>
                  Locked
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Profile;
