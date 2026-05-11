import { useState, useEffect } from 'react';
import useFoodStore from '../store/useFoodStore';
import useAuthStore from '../store/useAuthStore';
import { Search, Star, MapPin, Clock, Plus, Minus, ShoppingCart, Info, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Marketplace = () => {
  const { stalls, fetchStalls, loading, placeOrder } = useFoodStore();
  const token = useAuthStore(state => state.token);
  const user = useAuthStore(state => state.user);
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStall, setSelectedStall] = useState(null);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    fetchStalls();
  }, [fetchStalls]);

  const categories = ['All', 'Fast Food', 'Meals', 'Snacks', 'Beverages', 'Healthy'];

  const filteredStalls = stalls.filter(s => {
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.menuItems?.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const allMenuItems = stalls.flatMap(stall => 
    (stall.menuItems || []).map(item => ({ ...item, stallName: stall.name, stallLocation: stall.location }))
  );
  const trendingItems = allMenuItems.filter(item => item.rating >= 4.6).slice(0, 6);

  const handleStallClick = (stall) => {
    setSelectedStall(stall);
    setCart([]);
    setIsModalOpen(true);
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
    
    const totalPoints = cart.reduce((sum, item) => sum + (item.pointsCost * item.quantity), 0);
    const orderData = {
      studentId: user._id,
      stallId: selectedStall._id,
      items: cart.map(i => ({ menuItemId: i._id, quantity: i.quantity, name: i.name, price: i.pointsCost })),
      totalPoints
    };

    const res = await placeOrder(orderData, token);
    setIsPlacingOrder(false);
    if (res) {
      setIsModalOpen(false);
    }
  };

  const totalPoints = cart.reduce((sum, item) => sum + (item.pointsCost * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24 lg:pb-12 bg-[#080810] min-h-screen">
      
      {/* Header & Search */}
      <div className="sticky top-0 z-30 bg-[#080810]/90 backdrop-blur-2xl border-b border-white/5 py-4 mb-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-white tracking-tight">Marketplace</h1>
            <p className="text-sm text-gray-400">Discover and order premium campus food</p>
          </div>
          <div className="relative w-full md:w-96 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search for messes, dishes, cravings..." 
              className="w-full bg-[#12122a] border border-white/10 rounded-full py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Categories Carousel */}
        <div className="flex overflow-x-auto gap-3 pb-6 hide-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-[0_4px_14px_rgba(168,85,247,0.4)] border border-transparent' 
                  : 'bg-[#12122a] text-gray-400 border border-white/5 hover:border-white/20 hover:text-white'
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Trending Section */}
        {searchQuery === '' && activeCategory === 'All' && trendingItems.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">
                🔥 Trending Now
              </h3>
              <button className="text-sm text-purple-400 font-semibold hover:text-purple-300 flex items-center">
                See All <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group bg-[#12122a] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 cursor-pointer flex items-center gap-4 p-3 shadow-lg hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)]"
                  onClick={() => {
                    const stall = stalls.find(s => s.name === item.stallName);
                    if (stall) handleStallClick(stall);
                  }}
                >
                  <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden relative">
                    {item.image && item.image.startsWith('http') ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-purple-900/40 to-pink-900/40 flex items-center justify-center text-3xl">🍽️</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="font-bold text-white text-base truncate mb-1">{item.name}</h4>
                    <p className="text-xs text-gray-400 truncate mb-2">{item.stallName}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-400 font-bold text-sm bg-purple-500/10 px-2 py-0.5 rounded-md">{item.pointsCost} pts</span>
                      <span className="flex items-center text-xs font-medium text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded"><Star size={10} className="mr-1 fill-yellow-500"/> {item.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Stalls */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">
            {searchQuery ? 'Search Results' : 'Explore Campus Messes'}
          </h3>
          <span className="text-sm text-gray-400">{filteredStalls.length} vendors</span>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="rounded-2xl border border-white/5 bg-[#12122a] overflow-hidden flex flex-col h-full animate-pulse">
                <div className="w-full aspect-video bg-white/5"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-white/10 rounded w-2/3"></div>
                  <div className="h-4 bg-white/5 rounded w-1/2"></div>
                  <div className="h-4 bg-white/5 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredStalls.length === 0 ? (
          <div className="text-center py-20 bg-[#12122a] border border-white/5 rounded-3xl mt-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
            <p className="text-gray-400 max-w-md mx-auto">We couldn't find any mess vendors or dishes matching your current filters or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStalls.map(stall => (
              <div 
                className="group bg-[#12122a] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] transition-all duration-300 cursor-pointer flex flex-col h-full relative" 
                key={stall._id} 
                onClick={() => handleStallClick(stall)}
              >
                {/* Stall Image Banner */}
                <div className="w-full aspect-video overflow-hidden relative bg-[#0d0d1c]">
                  {stall.menuItems && stall.menuItems[0] && stall.menuItems[0].image && stall.menuItems[0].image.startsWith('http') ? (
                    <img src={stall.menuItems[0].image} alt={stall.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-4xl opacity-50">
                      {stall.category === 'Fast Food' ? '🍔' : stall.category === 'Beverages' ? '🥤' : stall.category === 'Meals' ? '🥘' : '🍕'}
                    </div>
                  )}
                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12122a] via-[#12122a]/40 to-transparent opacity-90"></div>
                  
                  {/* Status Badge */}
                  <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm ${stall.isOpen ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'}`}>
                    {stall.isOpen ? 'OPEN' : 'CLOSED'}
                  </div>
                  
                  {/* Rating floating badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-black px-2 py-1 rounded-lg text-xs font-bold flex items-center shadow-lg">
                    {stall.rating || 4.5} <Star size={12} className="ml-1 fill-yellow-500 text-yellow-500" />
                  </div>
                </div>
                
                {/* Stall Info */}
                <div className="p-4 flex-1 flex flex-col -mt-8 relative z-10">
                  <h4 className="text-xl font-display font-bold text-white group-hover:text-purple-400 transition-colors mb-1 truncate">{stall.name}</h4>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3 truncate">
                    <span className="truncate">{stall.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0"></span>
                    <span className="flex items-center gap-1 truncate"><MapPin size={12} className="shrink-0"/> {stall.location || 'Campus'}</span>
                  </div>
                  
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-1">{stall.description}</p>
                  
                  <div className="border-t border-white/5 pt-3 flex items-center justify-between text-xs font-medium text-gray-400">
                    <span className="flex items-center gap-1.5"><Clock size={14}/> 15-20 mins</span>
                    <span className="text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md">~150 pts/person</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ordering Modal (Sidebar on Desktop, Bottom Sheet on Mobile) */}
      <AnimatePresence>
        {isModalOpen && selectedStall && (
          <div className="fixed inset-0 z-50 flex justify-end items-end md:items-stretch">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            {/* Modal Panel */}
            <motion.div 
              initial={{ y: '100%' }} 
              animate={{ y: 0 }} 
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full md:max-w-[450px] h-[90vh] md:h-full bg-[#0d0d1c] md:border-l border-white/10 flex flex-col shadow-2xl z-10 rounded-t-3xl md:rounded-none overflow-hidden md:transform-none"
            >
              {/* Drag Handle for Mobile */}
              <div className="w-full flex justify-center py-3 md:hidden absolute top-0 z-20" onClick={() => setIsModalOpen(false)}>
                <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
              </div>

              {/* Stall Header */}
              <div className="pt-8 md:pt-6 p-6 border-b border-white/5 bg-[#12122a] shrink-0">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-2xl font-bold font-display text-white tracking-tight">{selectedStall.name}</h2>
                    <p className="text-sm text-gray-400 mt-1">{selectedStall.category} • {selectedStall.location}</p>
                  </div>
                  <button className="hidden md:flex text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors" onClick={() => setIsModalOpen(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg text-white">
                    <Star size={14} className="text-yellow-500 fill-yellow-500"/> {selectedStall.rating}
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg text-white">
                    <Clock size={14} className="text-blue-400"/> 15-20 mins
                  </div>
                </div>
              </div>
              
              {/* Menu Items List */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-40 hide-scrollbar bg-[#080810]">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-bold text-white text-lg tracking-tight">Full Menu</h3>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-white/5 px-2 py-1 rounded">Vegetarian Only</div>
                </div>
                
                <div className="space-y-6">
                  {selectedStall.menuItems && selectedStall.menuItems.length > 0 ? (
                    selectedStall.menuItems.map((item, index) => {
                      const cartItem = cart.find(c => c._id === item._id);
                      const quantity = cartItem ? cartItem.quantity : 0;
                      
                      return (
                        <div className="flex gap-4 group border-b border-white/5 pb-6 last:border-0 last:pb-0" key={item._id}>
                          {/* Item Details */}
                          <div className="flex-1 min-w-0 pr-2">
                            {/* Veg Icon */}
                            <div className="w-3.5 h-3.5 rounded-[3px] border border-green-500 flex items-center justify-center mb-2 bg-green-500/10">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            </div>
                            
                            <h4 className="font-bold text-white text-base leading-tight mb-1">{item.name}</h4>
                            <p className="text-purple-400 font-semibold mb-2">{item.pointsCost} <span className="text-xs text-purple-400/70 font-normal">pts</span></p>
                            
                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                              {item.category} • Freshly prepared with high-quality ingredients.
                            </p>
                          </div>
                          
                          {/* Item Image & Add Button */}
                          <div className="w-32 shrink-0 flex flex-col items-center">
                            <div className="w-32 h-32 rounded-xl overflow-hidden bg-[#12122a] border border-white/5 relative shadow-md">
                              {item.image && item.image.startsWith('http') ? (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl opacity-50">🍽️</div>
                              )}
                            </div>
                            
                            {/* Floating Add Button */}
                            <div className="-mt-4 relative z-10 w-24">
                              {quantity === 0 ? (
                                <button 
                                  className="w-full bg-white text-green-600 border border-green-200 py-1.5 rounded-lg shadow-lg font-bold text-sm uppercase tracking-wide hover:bg-green-50 transition-colors"
                                  onClick={() => updateCart(item, 1)}
                                >
                                  ADD
                                </button>
                              ) : (
                                <div className="w-full bg-white text-green-600 border border-green-200 py-1.5 rounded-lg shadow-lg flex items-center justify-between px-2 font-bold text-sm">
                                  <button onClick={() => updateCart(item, -1)} className="p-1 hover:bg-green-100 rounded text-gray-500"><Minus size={14}/></button>
                                  <span className="w-4 text-center">{quantity}</span>
                                  <button onClick={() => updateCart(item, 1)} className="p-1 hover:bg-green-100 rounded"><Plus size={14}/></button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-center py-12 px-4 border border-dashed border-white/10 rounded-2xl">
                      <p className="text-gray-400 font-medium">Menu is currently unavailable.</p>
                      <p className="text-xs text-gray-500 mt-1">The mess vendor hasn't added any items yet.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Checkout Footer */}
              <AnimatePresence>
                {cart.length > 0 && (
                  <motion.div 
                    initial={{ y: '100%' }} 
                    animate={{ y: 0 }} 
                    exit={{ y: '100%' }}
                    className="absolute bottom-0 left-0 right-0 bg-[#12122a] border-t border-white/10 p-4 md:p-6 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] z-20"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">{totalItems} Item{totalItems > 1 ? 's' : ''} added</span>
                        <span className="font-display font-bold text-xl text-white">{totalPoints} <span className="text-sm text-gray-400 font-normal">points</span></span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-green-400 font-medium block">Extra charges may apply</span>
                      </div>
                    </div>
                    
                    <button 
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-base flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(168,85,247,0.3)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none"
                      onClick={handleConfirmOrder} 
                      disabled={isPlacingOrder}
                    >
                      {isPlacingOrder ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Processing...
                        </div>
                      ) : (
                        <>Proceed to Checkout <ChevronRight size={20} /></>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Marketplace;
