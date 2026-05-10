import { CheckCircle2, QrCode, Timer, Wallet, ArrowRight } from 'lucide-react';

const OrderSuccessModal = ({ order, walletPoints, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-[#12122a] border border-white/10 rounded-3xl max-w-md w-full overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)] animate-[slideUp_0.4s_ease-out]">
        
        {/* Animated Success Header */}
        <div className="p-8 pb-6 flex flex-col items-center justify-center border-b border-white/5 bg-gradient-to-b from-green-500/10 to-transparent">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4 relative">
            <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-[ping_2s_infinite]"></div>
            <CheckCircle2 size={40} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white text-center">Order Confirmed!</h2>
          <p className="text-gray-400 text-sm mt-2">Your food is now being prepared.</p>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {/* Token Card */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 mb-6 text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
              <QrCode size={100} />
            </div>
            <p className="text-white/80 text-sm font-medium mb-1 relative z-10">Pickup Token</p>
            <p className="text-4xl font-mono font-bold text-white tracking-widest relative z-10">
              {order.qrCodeToken ? order.qrCodeToken.substring(0, 6).toUpperCase() : 'A82F9'}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-3 text-gray-300">
                <Timer size={18} className="text-purple-400"/>
                <span className="text-sm">Est. Wait Time</span>
              </div>
              <span className="font-bold text-white">{order.items?.[0]?.prepTime || 15} mins</span>
            </div>
            
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-3 text-gray-300">
                <Wallet size={18} className="text-pink-400"/>
                <span className="text-sm">Points Left</span>
              </div>
              <span className="font-bold text-white">{walletPoints} pts</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white transition flex items-center justify-center gap-2"
          >
            Track My Order <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
