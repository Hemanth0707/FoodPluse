import { X, Clock, ShoppingBag } from 'lucide-react';

const OrderModal = ({ item, stall, onClose, onConfirm, walletPoints }) => {
  if (!item || !stall) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-[#151515] border border-white/10 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-[slideUp_0.3s_ease-out]">
        
        {/* Header Image Area */}
        <div className="h-40 bg-gradient-to-br from-neutral-900 to-neutral-900 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-md transition"
          >
            <X size={20} />
          </button>
          
          <div className="absolute -bottom-10 left-6">
            <div className="w-20 h-20 rounded-2xl bg-[#1e1e38] border-4 border-[#0c0d21] flex items-center justify-center shadow-lg text-3xl">
              🍔
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-14">
          <div className="mb-6">
            <span className="text-amber-500 text-sm font-bold uppercase tracking-wider">{stall.name}</span>
            <h2 className="text-2xl font-bold text-white mb-2">{item.name}</h2>
            <p className="text-gray-400 text-sm">Freshly prepared exactly how you like it.</p>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center">
              <span className="text-gray-400 text-xs mb-1">Cost</span>
              <span className="text-xl font-bold text-amber-500">{item.pointsCost} pts</span>
            </div>
            <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center">
              <span className="text-gray-400 text-xs mb-1">Prep Time</span>
              <div className="flex items-center gap-1 text-white font-bold text-lg">
                <Clock size={16} className="text-amber-500" />
                {item.prepTime || 15} min
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400">Wallet Balance</span>
              <span className={`font-bold ${walletPoints >= item.pointsCost ? 'text-[#7BA05B]' : 'text-red-400'}`}>
                {walletPoints} pts
              </span>
            </div>

            <button
              onClick={() => onConfirm(item)}
              disabled={walletPoints < item.pointsCost}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                walletPoints >= item.pointsCost 
                ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-neutral-950 hover:bg-amber-600 hover:text-neutral-950 text-white shadow-lg shadow-none' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingBag size={20} />
              {walletPoints >= item.pointsCost ? 'Confirm Order' : 'Insufficient Points'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
