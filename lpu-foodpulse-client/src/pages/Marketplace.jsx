import { useState, useEffect } from 'react';
import useFoodStore from '../store/useFoodStore';
import useAuthStore from '../store/useAuthStore';
import { 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Info, 
  X, 
  ChevronRight, 
  Heart, 
  Flame, 
  Sparkles, 
  Compass, 
  TrendingUp,
  AlertCircle,
  Bell,
  LineChart as LineIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Marketplace = () => {
  const { stalls, fetchStalls, loading, placeOrder } = useFoodStore();
  const token = useAuthStore(state => state.token) || localStorage.getItem('foodpulse_token');
  const user = useAuthStore(state => state.user);
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStall, setSelectedStall] = useState(null);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [notificationMsg, setNotificationMsg] = useState(null);

  // Recharts mock queue data for a selected stall
  const [queueTimeData, setQueueTimeData] = useState([
    { hour: '08:00', waitTime: 5 },
    { hour: '10:00', waitTime: 8 },
    { hour: '12:00', waitTime: 25 },
    { hour: '14:00', waitTime: 15 },
    { hour: '16:00', waitTime: 6 },
    { hour: '18:00', waitTime: 12 },
    { hour: '20:00', waitTime: 20 },
    { hour: '22:00', waitTime: 10 }
  ]);

  useEffect(() => {
    fetchStalls();
  }, [fetchStalls]);

  const categories = ['All', 'Fast Food', 'Meals', 'Snacks', 'Healthy', 'Beverages'];

  const triggerToast = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  const toggleFavorite = (itemId, e) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [itemId]: !prev[itemId] }));
    triggerToast(!favorites[itemId] ? "Added to favorites!" : "Removed from favorites");
  };

  // Extract all menu items from all stalls
  const allMenuItems = stalls.flatMap(stall => 
    (stall.menuItems || []).map(item => ({ 
      ...item, 
      stallId: stall._id,
      stallName: stall.name, 
      stallLocation: stall.location,
      stallIsOpen: stall.isOpen,
      stallRating: stall.rating
    }))
  );

  // Filter items based on Category, Search Query
  const filteredItems = allMenuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.stallName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Section Grouping
  const trendingItems = allMenuItems.filter(item => item.rating >= 4.6).slice(0, 4);
  const recommendedItems = allMenuItems.filter(item => item.rating >= 4.4 && item.rating < 4.6).slice(0, 4);
  const healthyItems = allMenuItems.filter(item => item.category === 'Healthy' || item.name.toLowerCase().includes('salad') || item.name.toLowerCase().includes('veg')).slice(0, 4);
  const lateNightItems = allMenuItems.filter(item => item.category === 'Snacks' || item.category === 'Beverages').slice(0, 4);
  const popularNearYou = allMenuItems.slice().reverse().slice(0, 4);

  const handleItemClick = (item) => {
    const stall = stalls.find(s => s._id === item.stallId);
    if (stall) {
      setSelectedStall(stall);
      // If switching stalls, reset cart
      if (selectedStall?._id !== stall._id) {
        setCart([]);
      }
      setIsModalOpen(true);
    }
  };

  const updateCart = (item, change) => {
    const existing = cart.find(cartItem => cartItem._id === item._id);
    if (existing) {
      const newQuantity = existing.quantity + change;
      if (newQuantity <= 0) {
        setCart(cart.filter(cartItem => cartItem._id !== item._id));
      } else {
        setCart(cart.map(cartItem => cartItem._id === item._id ? { ...cartItem, quantity: newQuantity } : cartItem));
      }
    } else if (change > 0) {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleConfirmOrder = async () => {
    if (cart.length === 0) return;
    setIsPlacingOrder(true);
    
    const activeToken = token || localStorage.getItem('foodpulse_token');
    const totalPoints = cart.reduce((sum, item) => sum + (item.pointsCost * item.quantity), 0);
    const orderData = {
      studentId: user?._id || '',
      stallId: selectedStall._id,
      items: cart.map(i => ({ menuItemId: i._id, quantity: i.quantity, name: i.name, price: i.pointsCost })),
      totalPoints
    };

    const res = await placeOrder(orderData, activeToken);
    setIsPlacingOrder(false);
    if (res) {
      setIsModalOpen(false);
      triggerToast("Order placed successfully! Token generated.");
    } else {
      triggerToast("Order failed. Please try again.");
    }
  };

  const totalPoints = cart.reduce((sum, item) => sum + (item.pointsCost * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Food Card Sub-component
  const FoodCard = ({ item }) => {
    const isFav = !!favorites[item._id];
    return (
      <div 
        className="group relative rounded-3xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer"
        onClick={() => handleItemClick(item)}
      >
        {/* Card Image Banner */}
        <div className="w-full aspect-square overflow-hidden relative bg-[#0b0b1f]">
          {item.image && item.image.startsWith('http') ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-purple-950/20 to-pink-950/20 flex items-center justify-center text-4xl">
              🥘
            </div>
          )}

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070714] via-transparent to-transparent opacity-80" />
          
          {/* Favorite Button */}
          <button 
            className={`absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md transition-all ${isFav ? 'bg-pink-500 text-white' : 'bg-[#070714]/60 text-gray-400 hover:text-white border border-white/5'}`}
            onClick={(e) => toggleFavorite(item._id, e)}
          >
            <Heart size={16} fill={isFav ? "currentColor" : "none"} />
          </button>

          {/* Delivery & Time Badge */}
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            <span className="text-[10px] font-bold bg-[#070714]/80 text-[#f3f4f6] px-2.5 py-1 rounded-lg backdrop-blur-md flex items-center gap-1 border border-white/5">
              <Clock size={10} className="text-purple-400" /> 15m
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/5 ${item.stallIsOpen ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
              {item.stallIsOpen ? 'OPEN' : 'CLOSED'}
            </span>
          </div>
        </div>

        {/* Content Info */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex justify-between items-start gap-2">
              <h4 className="font-bold text-white text-base truncate group-hover:text-purple-400 transition-colors">{item.name}</h4>
              <div className="flex items-center text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-lg shrink-0">
                <Star size={10} className="mr-1 fill-yellow-500"/> {item.rating}
              </div>
            </div>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <MapPin size={11} className="text-purple-400" /> {item.stallName} ({item.stallLocation})
            </p>
          </div>

          <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Price</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-extrabold text-lg">{item.pointsCost} pts</span>
            </div>
            <button className="px-4 py-2 bg-gradient-to-tr from-purple-600 to-pink-500 text-white rounded-xl text-xs font-bold shadow-[0_4px_12px_rgba(168,85,247,0.2)] group-hover:scale-[1.03] transition-all">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#070714] text-[#f3f4f6] pb-24 lg:pb-12">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notificationMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-purple-900 to-pink-900 border border-purple-500/30 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-2xl backdrop-blur-md"
          >
            <Sparkles size={16} className="text-pink-400 animate-spin" />
            <span className="text-xs font-bold">{notificationMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header and Smart Search Bar */}
      <div className="sticky top-0 z-30 bg-[#070714]/85 backdrop-blur-2xl border-b border-white/5 py-5 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-5 items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
              Marketplace <span className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2.5 py-1 rounded-full font-bold">Food Court</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">Discover, order, and bypass campus queues instantly</p>
          </div>
          
          <div className="relative w-full md:w-[420px] shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search dishes, messes, or stalls..." 
              className="w-full bg-[#111126] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Category Tab Pills */}
        <div className="flex overflow-x-auto gap-3 pb-6 mb-8 hide-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`shrink-0 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-[0_4px_15px_rgba(168,85,247,0.3)] border border-transparent' 
                  : 'bg-[#111126] text-gray-400 border border-white/5 hover:border-white/20 hover:text-white'
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Display based on query filter */}
        {searchQuery !== '' || activeCategory !== 'All' ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-extrabold text-white tracking-tight">Search Results</h3>
              <span className="text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full font-bold">{filteredItems.length} Items Found</span>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="rounded-3xl border border-white/5 bg-[#111126] aspect-[3/4] animate-pulse" />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-20 bg-[#111126]/50 border border-white/5 rounded-[2.5rem]">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={28} className="text-gray-500" />
                </div>
                <h3 className="text-lg font-bold text-white">No items found</h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto mt-1">Try searching for other dish names or resetting the active categories.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredItems.map(item => (
                  <FoodCard key={item._id} item={item} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* 1. Trending Now Section */}
            {trendingItems.length > 0 && (
              <div>
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-white tracking-tight mb-6 flex items-center gap-2">
                  <Flame size={20} className="text-red-500 fill-red-500" /> Trending Now
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendingItems.map((item, idx) => (
                    <FoodCard key={`trend-${idx}`} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* 2. Smart Recommendations (Advanced Feature) */}
            {recommendedItems.length > 0 && (
              <div>
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-white tracking-tight mb-6 flex items-center gap-2">
                  <Sparkles size={20} className="text-pink-500" /> Recommended For You
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recommendedItems.map((item, idx) => (
                    <FoodCard key={`recom-${idx}`} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* 3. Popular Near You */}
            {popularNearYou.length > 0 && (
              <div>
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-white tracking-tight mb-6 flex items-center gap-2">
                  <Compass size={20} className="text-blue-500" /> Popular Near You
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {popularNearYou.map((item, idx) => (
                    <FoodCard key={`pop-${idx}`} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* 4. Healthy Choices */}
            {healthyItems.length > 0 && (
              <div>
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-white tracking-tight mb-6 flex items-center gap-2">
                  <Sparkles size={20} className="text-green-500" /> Healthy Choices
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {healthyItems.map((item, idx) => (
                    <FoodCard key={`healthy-${idx}`} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* 5. Late Night Cravings */}
            {lateNightItems.length > 0 && (
              <div>
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-white tracking-tight mb-6 flex items-center gap-2">
                  <Flame size={20} className="text-purple-500" /> Late Night Cravings
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {lateNightItems.map((item, idx) => (
                    <FoodCard key={`late-${idx}`} item={item} />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Ordering Checkout Modal & Analytics Sidebar */}
      <AnimatePresence>
        {isModalOpen && selectedStall && (
          <div className="fixed inset-0 z-50 flex justify-end items-end md:items-stretch">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="relative w-full md:max-w-[480px] h-[95vh] md:h-full bg-[#0b0b1f] md:border-l border-white/10 flex flex-col shadow-2xl z-10 rounded-t-3xl md:rounded-none overflow-hidden"
            >
              {/* Header Info */}
              <div className="p-6 border-b border-white/10 bg-white/[0.02] shrink-0">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-2xl font-bold font-display text-white tracking-tight">{selectedStall.name}</h2>
                    <p className="text-sm text-gray-400 mt-1">{selectedStall.category} • {selectedStall.location}</p>
                  </div>
                  <button className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-colors" onClick={() => setIsModalOpen(false)}>
                    <X size={18} />
                  </button>
                </div>
                
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2.5 py-1.5 rounded-lg border border-yellow-500/20">
                    <Star size={12} className="fill-yellow-500"/> {selectedStall.rating} Rating
                  </div>
                  <div className="flex items-center gap-1 bg-green-500/10 text-green-400 px-2.5 py-1.5 rounded-lg border border-green-500/20">
                    {selectedStall.isOpen ? 'OPEN' : 'CLOSED'}
                  </div>
                </div>
              </div>

              {/* Body Area (Scrollable: contains menu items & analytics chart) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#070714] hide-scrollbar pb-36">
                
                {/* Advanced Feature: Smart Queue Prediction Chart */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                    <LineIcon size={14} className="text-purple-400" /> Queue Wait Prediction Index
                  </h4>
                  <div className="h-40 w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={queueTimeData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorWait" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="hour" stroke="#71717a" fontSize={10} tickLine={false} />
                        <YAxis stroke="#71717a" fontSize={10} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0b0b1f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}
                          labelStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '11px' }}
                          itemStyle={{ color: '#c084fc', fontSize: '11px' }}
                        />
                        <Area type="monotone" dataKey="waitTime" name="Wait Mins" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorWait)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 text-center">Peak times are between 12:00 PM and 1:30 PM</p>
                </div>

                {/* Stall Menu */}
                <div className="space-y-5">
                  <h3 className="font-bold text-white text-lg tracking-tight">Full Menu List</h3>
                  
                  {selectedStall.menuItems && selectedStall.menuItems.length > 0 ? (
                    selectedStall.menuItems.map((item) => {
                      const cartItem = cart.find(c => c._id === item._id);
                      const quantity = cartItem ? cartItem.quantity : 0;
                      
                      return (
                        <div className="flex gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0" key={item._id}>
                          <div className="flex-1 min-w-0">
                            {/* Veg Tag */}
                            <div className="w-3.5 h-3.5 rounded border border-green-500 flex items-center justify-center mb-1.5 bg-green-500/10">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            </div>
                            <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                            <p className="text-purple-400 font-extrabold text-xs mt-1">{item.pointsCost} pts</p>
                            <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">Fresh ingredients, pre-cooked for convenience</p>
                          </div>
                          
                          {/* Quantity Adjuster */}
                          <div className="flex flex-col items-center gap-2">
                            {quantity === 0 ? (
                              <button 
                                className="px-4 py-1.5 rounded-xl border border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-bold text-xs"
                                onClick={() => updateCart(item, 1)}
                              >
                                ADD
                              </button>
                            ) : (
                              <div className="flex items-center gap-2 bg-[#111126] border border-white/10 rounded-xl px-2 py-1 text-xs">
                                <button onClick={() => updateCart(item, -1)} className="p-1 hover:bg-white/5 rounded text-gray-400"><Minus size={12}/></button>
                                <span className="w-4 text-center font-bold text-white">{quantity}</span>
                                <button onClick={() => updateCart(item, 1)} className="p-1 hover:bg-white/5 rounded text-white"><Plus size={12}/></button>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-xs text-gray-500 text-center py-6">No menu items found in this stall.</p>
                  )}
                </div>

              </div>

              {/* Checkout Cart Drawer Footer */}
              <AnimatePresence>
                {cart.length > 0 && (
                  <motion.div 
                    initial={{ y: '100%' }} 
                    animate={{ y: 0 }} 
                    exit={{ y: '100%' }}
                    className="absolute bottom-0 left-0 right-0 bg-[#111126] border-t border-white/10 p-5 shadow-[0_-15px_40px_rgba(0,0,0,0.6)] z-20"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{totalItems} Item{totalItems > 1 ? 's' : ''} Selected</span>
                        <span className="font-display font-extrabold text-xl text-white">{totalPoints} <span className="text-xs text-gray-400 font-normal">points</span></span>
                      </div>
                      <span className="text-[10px] bg-purple-500/10 text-purple-300 px-2 py-1 rounded-lg border border-purple-500/20 font-bold">Auto-Debit Wallet</span>
                    </div>
                    
                    <button 
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-sm shadow-[0_4px_15px_rgba(168,85,247,0.25)] hover:shadow-[0_4px_20px_rgba(168,85,247,0.45)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                      onClick={handleConfirmOrder} 
                      disabled={isPlacingOrder}
                    >
                      {isPlacingOrder ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>Place Fast Order <ChevronRight size={16} /></>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Marketplace;
