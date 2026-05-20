import useFoodStore from '../store/useFoodStore';
import { ArrowDownLeft, ArrowUpRight, Wallet as WalletIcon, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Wallet = () => {
  const walletPoints = useFoodStore(state => state.walletPoints);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto pb-24 lg:pb-8 flex flex-col md:flex-row gap-8"
    >
      
      {/* Current Balance card widget */}
      <div className="w-full md:w-[380px] bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl shrink-0">
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block mb-1">Total Balance</span>
              <div className="text-4xl font-display font-extrabold text-white flex items-baseline gap-1.5">
                {walletPoints} <span className="text-sm text-gray-400 font-normal">pts</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <WalletIcon size={18} />
            </div>
          </div>

          <div className="flex gap-2 items-center text-xs text-gray-400">
            <Calendar size={13} className="text-purple-400" /> Valid until Dec 31, 2026
          </div>
          
          <div className="h-[1px] bg-white/5 my-4" />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold">Spent Points</span>
              <div className="font-bold text-sm text-pink-400 mt-0.5">150 pts</div>
            </div>
            <div>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold">Remaining Limit</span>
              <div className="font-bold text-sm text-green-400 mt-0.5">{walletPoints} pts</div>
            </div>
          </div>
          
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-gray-400">Semester limit progress</span>
              <span className="text-white">75%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[75%]" />
            </div>
            <p className="text-[9px] text-gray-500">Maximum allocation: 2,000 pts per semester</p>
          </div>
        </div>

      </div>

      {/* Transaction History log list */}
      <div className="flex-1 bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl">
        <h3 className="text-xl font-display font-extrabold text-white tracking-tight mb-6 flex items-center gap-2">
          <CheckCircle size={18} className="text-purple-400" /> Recent Transactions
        </h3>
        
        <div className="space-y-4">
          {[
            { id: 'tx-1', type: 'credit', desc: 'Compensation: Verified Quality Failure', meta: 'Central Mess • Complaint Verified', amount: '+150 pts', icon: <ArrowDownLeft size={16}/>, color: 'bg-green-500/10 text-green-400 border-green-500/20' },
            { id: 'tx-2', type: 'debit', desc: 'Order Placed: Cheese Pasta', meta: 'Central Mess • Token #CP-892', amount: '-120 pts', icon: <ArrowUpRight size={16}/>, color: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
            { id: 'tx-3', type: 'credit', desc: 'Welcome Bonus Allocation', meta: 'Semester start credits', amount: '+500 pts', icon: <ArrowDownLeft size={16}/>, color: 'bg-green-500/10 text-green-400 border-green-500/20' }
          ].map((tx) => (
            <div key={tx.id} className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${tx.color}`}>
                  {tx.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">{tx.desc}</h4>
                  <p className="text-[9px] text-gray-500 mt-0.5">{tx.meta}</p>
                </div>
              </div>
              
              <span className={`font-display font-extrabold text-sm ${tx.type === 'credit' ? 'text-green-400' : 'text-pink-400'}`}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};

export default Wallet;
