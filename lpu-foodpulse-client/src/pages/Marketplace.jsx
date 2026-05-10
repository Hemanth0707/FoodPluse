import { useState, useEffect } from 'react';
import useFoodStore from '../store/useFoodStore';
import useAuthStore from '../store/useAuthStore';
import { Search, Star, MapPin, Clock, Plus, Minus, ShoppingCart, Info } from 'lucide-react';
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
  const trendingItems = allMenuItems.filter(item => item.rating >= 4.6).slice(0, 5);

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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-12">
      
      {/* Search & Header */}
      <div className="sticky top-0 z-30 bg-[#080810]/80 backdrop-blur-xl border-b border-white/5 py-4 mb-6">
        <div className="max-w-7xl mx-auto px-4 flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search for stalls or dishes..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        
        {/* Categories (Horizontal Scroll) */}
        <div className="flex overflow-x-auto gap-3 pb-4 hide-scrollbar mb-8">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Trending Section */}
        {searchQuery === '' && activeCategory === 'All' && trendingItems.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
              🔥 Trending Today
            </h3>
            <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
              {trendingItems.map((item, idx) => (
                <div key={idx} className="min-w-[280px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-colors group cursor-pointer" onClick={() => {
                  const stall = stalls.find(s => s.name === item.stallName);
                  if (stall) handleStallClick(stall);
                }}>
                  <div className="h-32 w-full overflow-hidden relative">
                    {item.image && item.image.startsWith('http') ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-purple-900 to-pink-900 flex items-center justify-center text-4xl">{item.image || '🍽️'}</div>
                    )}
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold flex items-center gap-1 text-white border border-white/10">
                      <div className="w-2 h-2 rounded-full border border-green-500 bg-green-500/20 flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-green-500"></div></div>
                      Veg
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-white truncate">{item.name}</h4>
                    <p className="text-xs text-gray-400 mb-2 truncate">{item.stallName} • {item.stallLocation}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-400 font-bold">{item.pointsCost} pts</span>
                      <span className="flex items-center text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded"><Star size={10} className="mr-1"/> {item.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Stalls */}
        <h3 className="text-xl font-display font-bold text-white mb-4">
          {searchQuery ? 'Search Results' : 'Explore Stalls'}
        </h3>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="rounded-2xl border border-white/5 bg-white/5 p-4 animate-pulse h-48"></div>
            ))}
          </div>
        ) : filteredStalls.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p>No stalls or dishes found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStalls.map(stall => (
              <div 
                className="group bg-[#0d0d1c] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 hover:shadow-[0_8px_32px_rgba(168,85,247,0.15)] transition-all duration-300 cursor-pointer flex flex-col h-full" 
                key={stall._id} 
                onClick={() => handleStallClick(stall)}
              >
                <div className="h-40 w-full overflow-hidden relative">
                  {/* Generate a mock stall banner using the first item's image if available */}
                  {stall.menuItems && stall.menuItems[0] && stall.menuItems[0].image && stall.menuItems[0].image.startsWith('http') ? (
                    <img src={stall.menuItems[0].image} alt={stall.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-5xl opacity-80">
                      {stall.name.includes('Pizza') || stall.name === 'Oven Express' ? '🍕' : stall.name.includes('Juice') ? '🥤' : stall.name.includes('Kitchen') ? '🥘' : '🍔'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1c] to-transparent"></div>
                  
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                    <h4 className="text-2xl font-display font-bold text-white group-hover:text-purple-300 transition-colors">{stall.name}</h4>
                    <div className={`px-2 py-1 rounded text-xs font-bold ${stall.isOpen ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
                      {stall.isOpen ? 'OPEN' : 'CLOSED'}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="flex gap-4 mb-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg"><Star size={14} className="text-yellow-400" /> {stall.rating || 4.5}</span>
                    <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg"><MapPin size={14} /> {stall.location || 'Food Court'}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{stall.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stall Menu Modal (Swiggy Style) */}
      <AnimatePresence>
        {isModalOpen && selectedStall && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-[#0d0d1c] border-l border-white/10 flex flex-col shadow-2xl z-10"
            >
              {/* Stall Header */}
              <div className="p-6 border-b border-white/5 bg-[#12122a]">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-bold font-display text-white">{selectedStall.name}</h2>
                  <button className="text-gray-400 hover:text-white bg-white/5 p-2 rounded-full" onClick={() => setIsModalOpen(false)}>✕</button>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="flex items-center"><Star size={14} className="text-yellow-400 mr-1"/> {selectedStall.rating}</span>
                  <span>•</span>
                  <span>{selectedStall.category}</span>
                  <span>•</span>
                  <span>{selectedStall.location}</span>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto p-4 pb-32 hide-scrollbar">
                <div className="mb-4 pb-2 border-b border-white/5">
                  <h3 className="font-bold text-gray-300">Recommended <Info size={12} className="inline text-gray-500"/></h3>
                </div>
                
                <div className="space-y-6">
                  {selectedStall.menuItems && selectedStall.menuItems.length > 0 ? (
                    selectedStall.menuItems.map(item => {
                      const cartItem = cart.find(c => c._id === item._id);
                      const quantity = cartItem ? cartItem.quantity : 0;
                      
                      return (
                        <div className="flex gap-4 group" key={item._id}>
                          <div className="flex-1">
                            <div className="w-3 h-3 rounded-[2px] border border-green-500 flex items-center justify-center mb-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            </div>
                            <h4 className="font-bold text-white text-lg">{item.name}</h4>
                            <p className="text-purple-400 font-medium mb-1">{item.pointsCost} pts</p>
                            <p className="text-xs text-gray-500 flex items-center gap-3">
                              <span className="flex items-center text-yellow-400"><Star size={10} className="mr-1"/> {item.rating}</span>
                              <span className="flex items-center"><Clock size={10} className="mr-1"/> {item.prepTime} mins</span>
                            </p>
                          </div>
                          
                          <div className="relative w-32 h-32 shrink-0">
                            <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 bg-white/5">
                              {item.image && item.image.startsWith('http') ? (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl">{item.image || '🍽️'}</div>
                              )}
                            </div>
                            
                            {/* Swiggy Add Button */}
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0d0d1c] border border-green-500/50 rounded-lg shadow-lg shadow-black/50 overflow-hidden w-24">
                              {quantity === 0 ? (
                                <button 
                                  className="w-full py-1.5 text-green-500 font-bold text-sm hover:bg-green-500/10 transition-colors uppercase tracking-wide"
                                  onClick={() => updateCart(item, 1)}
                                >
                                  ADD
                                </button>
                              ) : (
                                <div className="flex items-center justify-between px-2 py-1.5 text-green-500 font-bold text-sm">
                                  <button onClick={() => updateCart(item, -1)} className="p-1 hover:bg-white/10 rounded"><Minus size={14}/></button>
                                  <span>{quantity}</span>
                                  <button onClick={() => updateCart(item, 1)} className="p-1 hover:bg-white/10 rounded"><Plus size={14}/></button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-gray-500 text-center py-10">Menu currently unavailable.</p>
                  )}
                </div>
              </div>
              
              {/* Sticky Cart Footer */}
              <AnimatePresence>
                {cart.length > 0 && (
                  <motion.div 
                    initial={{ y: '100%' }} 
                    animate={{ y: 0 }} 
                    exit={{ y: '100%' }}
                    className="absolute bottom-0 left-0 right-0 bg-[#080810] border-t border-white/10 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20"
                  >
                    <div className="flex items-center justify-between mb-3 bg-white/5 px-3 py-2 rounded-lg text-sm text-gray-300">
                      <span>{totalItems} ITEM{totalItems > 1 ? 'S' : ''}</span>
                      <span className="font-bold text-purple-400">{totalPoints} pts</span>
                    </div>
                    
                    <button 
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                      onClick={handleConfirmOrder} 
                      disabled={isPlacingOrder}
                    >
                      {isPlacingOrder ? 'Processing...' : (
                        <>Place Order <ShoppingCart size={18} /></>
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
