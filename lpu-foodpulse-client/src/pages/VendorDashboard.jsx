import { useEffect, useState } from 'react';
import useFoodStore from '../store/useFoodStore';
import { Package, DollarSign, Star, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const VendorDashboard = () => {
  const { complaints, fetchVendorComplaints, updateComplaintStatus, loading } = useFoodStore();
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    // Fetch all complaints for the demo (or pass a specific stallId if available)
    fetchVendorComplaints('');
  }, [fetchVendorComplaints]);

  const handleUpdateStatus = async (id, status) => {
    setUpdatingId(id);
    await updateComplaintStatus(id, status);
    setUpdatingId(null);
  };

  const activeComplaints = complaints.filter(c => c.status === 'Verified' || c.status === 'Pending' || c.status === 'In Progress');
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved' || c.status === 'Rejected');

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pb-12">
      <div className="mb-6">
        <h2 className="text-3xl font-display font-bold text-white mb-2">Mess Vendor Dashboard</h2>
        <p className="text-gray-400">Manage incoming orders and resolve food quality issues.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#12122a] border border-purple-500/30 rounded-2xl p-6 shadow-[0_8px_30px_rgba(168,85,247,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Package size={80} />
          </div>
          <div className="text-purple-400 mb-2"><Package size={28} /></div>
          <div className="text-3xl font-display font-bold text-white mb-1">24</div>
          <div className="text-sm font-medium text-gray-400 mb-2">Active Orders</div>
          <div className="text-xs text-green-400 font-bold">High Volume Time</div>
        </div>

        <div className="bg-[#12122a] border border-green-500/30 rounded-2xl p-6 shadow-[0_8px_30px_rgba(16,185,129,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <DollarSign size={80} />
          </div>
          <div className="text-green-400 mb-2"><DollarSign size={28} /></div>
          <div className="text-3xl font-display font-bold text-white mb-1">12.5k</div>
          <div className="text-sm font-medium text-gray-400 mb-2">Points Earned Today</div>
          <div className="text-xs text-green-400 font-bold">↑ 15% vs Yesterday</div>
        </div>

        <div className="bg-[#12122a] border border-blue-500/30 rounded-2xl p-6 shadow-[0_8px_30px_rgba(59,130,246,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Star size={80} />
          </div>
          <div className="text-blue-400 mb-2"><Star size={28} /></div>
          <div className="text-3xl font-display font-bold text-white mb-1">4.8</div>
          <div className="text-sm font-medium text-gray-400 mb-2">Average Rating</div>
          <div className="text-xs text-gray-500 font-bold">Based on 120 reviews</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#12122a] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" /> Action Required: Complaints
              </h3>
              <span className="bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30">
                {activeComplaints.length} Pending
              </span>
            </div>

            {loading ? (
              <div className="text-center py-10 text-gray-500 animate-pulse">Loading complaints...</div>
            ) : activeComplaints.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-white/10 rounded-xl bg-white/5">
                <CheckCircle size={40} className="mx-auto text-green-500 mb-3 opacity-50" />
                <p className="text-gray-400 font-medium">All caught up!</p>
                <p className="text-xs text-gray-500 mt-1">No pending complaints require your attention.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeComplaints.map(complaint => (
                  <div key={complaint._id} className="bg-[#080810] border border-white/10 rounded-xl p-5 hover:border-purple-500/40 transition-colors">
                    <div className="flex flex-col md:flex-row gap-4">
                      {complaint.imageProof ? (
                        <div className="w-full md:w-32 h-32 shrink-0 rounded-lg overflow-hidden border border-white/10">
                          <img src={complaint.imageProof} alt="Proof" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-full md:w-32 h-32 shrink-0 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 border border-white/10">
                          No Image
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                              complaint.status === 'Verified' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                              complaint.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                              'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            }`}>
                              {complaint.status}
                            </span>
                            <h4 className="font-bold text-white text-lg mt-2">{complaint.issueType}</h4>
                          </div>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={12} /> {new Date(complaint.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{complaint.description}</p>
                        
                        <div className="mt-auto flex flex-wrap gap-2">
                          {complaint.status !== 'In Progress' && (
                            <button 
                              onClick={() => handleUpdateStatus(complaint._id, 'In Progress')}
                              disabled={updatingId === complaint._id}
                              className="px-4 py-1.5 text-sm font-semibold rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition-colors disabled:opacity-50"
                            >
                              Mark In Progress
                            </button>
                          )}
                          <button 
                            onClick={() => handleUpdateStatus(complaint._id, 'Resolved')}
                            disabled={updatingId === complaint._id}
                            className="px-4 py-1.5 text-sm font-semibold rounded-lg bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-colors disabled:opacity-50"
                          >
                            Mark Resolved
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-[#12122a] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-display font-bold text-white mb-4">AI Waste Predictor</h3>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
              <p className="text-red-400 font-bold text-sm mb-1 flex items-center gap-1">
                <AlertTriangle size={14} /> High Waste Expected
              </p>
              <p className="text-xs text-gray-400">Based on today's weather (Rainy) and weekday (Tuesday), expect 30% lower footfall for evening snacks.</p>
            </div>
            <h4 className="text-sm font-bold text-gray-300 mb-2">Recommended Actions:</h4>
            <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4 marker:text-purple-500">
              <li>Reduce Samosa prep by 50 units</li>
              <li>Offer 20% point discount on hot beverages</li>
            </ul>
          </div>

          <div className="bg-[#12122a] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-display font-bold text-white mb-4">Recently Resolved</h3>
            <div className="space-y-3">
              {resolvedComplaints.length === 0 ? (
                <p className="text-xs text-gray-500 italic">No recently resolved issues.</p>
              ) : (
                resolvedComplaints.slice(0, 3).map(c => (
                  <div key={c._id} className="flex gap-3 items-center p-3 bg-white/5 rounded-lg border border-white/5">
                    <CheckCircle className="text-green-500 shrink-0" size={16} />
                    <div className="min-w-0">
                      <p className="text-sm text-white font-medium truncate">{c.issueType}</p>
                      <p className="text-xs text-gray-500 truncate">{new Date(c.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VendorDashboard;
