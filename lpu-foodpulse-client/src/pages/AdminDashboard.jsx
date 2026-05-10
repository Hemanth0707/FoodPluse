import { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import useFoodStore from '../store/useFoodStore';
import { Users, AlertOctagon, TrendingUp, DollarSign, Activity, AlertTriangle } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

const AdminDashboard = () => {
  const { complaints, fetchStalls, stalls } = useFoodStore();
  const [stats, setStats] = useState({
    totalComplaints: 0,
    verifiedComplaints: 0,
    totalStudents: 15420,
    dailyRevenue: 45000,
  });

  useEffect(() => {
    fetchStalls();
    // In a real app, fetch these from an admin analytics endpoint
    if (complaints.length > 0) {
      // Wait for next tick to avoid cascading render lint error
      setTimeout(() => {
        setStats(s => ({
          ...s,
          totalComplaints: complaints.length,
          verifiedComplaints: complaints.filter(c => c.status === 'Verified').length
        }));
      }, 0);
    }
  }, [complaints, fetchStalls]);

  // Aggregate data for Hostel Problem Heatmap (Bar Chart)
  const hostelDataMap = {};
  complaints.forEach(c => {
    hostelDataMap[c.hostel] = (hostelDataMap[c.hostel] || 0) + 1;
  });
  const hostelChartData = Object.keys(hostelDataMap).map(h => ({ name: h, issues: hostelDataMap[h] })).sort((a,b) => b.issues - a.issues);

  // Aggregate data for Quality Trends (Line Chart mock)
  const qualityTrendData = [
    { name: 'Mon', taste: 85, hygiene: 90 },
    { name: 'Tue', taste: 82, hygiene: 85 },
    { name: 'Wed', taste: 78, hygiene: 70 }, // Dip mid week
    { name: 'Thu', taste: 88, hygiene: 89 },
    { name: 'Fri', taste: 92, hygiene: 95 },
    { name: 'Sat', taste: 95, hygiene: 98 },
    { name: 'Sun', taste: 90, hygiene: 92 },
  ];

  // Student Satisfaction (Pie Chart)
  const satisfactionData = [
    { name: 'Satisfied', value: 75, color: '#10b981' },
    { name: 'Neutral', value: 15, color: '#f59e0b' },
    { name: 'Dissatisfied', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="pb-12 animate-[fadeUp_0.4s_both]">
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="ad-stat-card bg-[#12122a] border border-white/5 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl"><AlertOctagon size={24} /></div>
            <span className="text-sm font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded">+12%</span>
          </div>
          <h3 className="text-3xl font-display font-bold text-white mb-1">{stats.totalComplaints}</h3>
          <p className="text-gray-400 text-sm">Total AI Complaints</p>
        </div>

        <div className="ad-stat-card bg-[#12122a] border border-white/5 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-500/20 text-green-400 rounded-xl"><Activity size={24} /></div>
            <span className="text-sm font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">+5%</span>
          </div>
          <h3 className="text-3xl font-display font-bold text-white mb-1">{stats.verifiedComplaints}</h3>
          <p className="text-gray-400 text-sm">Verified Issues</p>
        </div>

        <div className="ad-stat-card bg-[#12122a] border border-white/5 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl"><Users size={24} /></div>
          </div>
          <h3 className="text-3xl font-display font-bold text-white mb-1">{stats.totalStudents.toLocaleString()}</h3>
          <p className="text-gray-400 text-sm">Active Students</p>
        </div>

        <div className="ad-stat-card bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-20"><TrendingUp size={100} /></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-white/20 text-white rounded-xl"><DollarSign size={24} /></div>
          </div>
          <h3 className="text-3xl font-display font-bold text-white mb-1 relative z-10">{stats.dailyRevenue.toLocaleString()} pts</h3>
          <p className="text-white/80 text-sm relative z-10">Marketplace Revenue (Today)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Hostel Problem Heatmap */}
        <div className="lg:col-span-2 bg-[#12122a] border border-white/5 rounded-2xl p-6 shadow-lg">
          <h3 className="font-display font-bold text-white text-lg mb-6 flex items-center gap-2">
            <AlertTriangle className="text-red-400"/> Hostel Issue Heatmap
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hostelChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#a1a1aa" axisLine={false} tickLine={false} />
                <YAxis stroke="#a1a1aa" axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#0d0d1c', border: '1px solid #ffffff10', borderRadius: '8px' }}
                />
                <Bar dataKey="issues" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Student Satisfaction Pie Chart */}
        <div className="bg-[#12122a] border border-white/5 rounded-2xl p-6 shadow-lg flex flex-col">
          <h3 className="font-display font-bold text-white text-lg mb-2">Student Satisfaction</h3>
          <p className="text-xs text-gray-400 mb-6">Based on AI verified meal ratings</p>
          <div className="flex-1 flex justify-center items-center relative">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: '#0d0d1c', border: '1px solid #ffffff10', borderRadius: '8px' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-white">75%</span>
              <span className="text-xs text-gray-400">Positive</span>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {satisfactionData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1 text-xs text-gray-300">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Trend Line Chart */}
        <div className="bg-[#12122a] border border-white/5 rounded-2xl p-6 shadow-lg">
          <h3 className="font-display font-bold text-white text-lg mb-6">Food Quality Trends (7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={qualityTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#a1a1aa" axisLine={false} tickLine={false} />
                <YAxis stroke="#a1a1aa" axisLine={false} tickLine={false} domain={[0, 100]} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#0d0d1c', border: '1px solid #ffffff10', borderRadius: '8px' }}/>
                <Line type="monotone" dataKey="taste" stroke="#a855f7" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="hygiene" stroke="#ec4899" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <div className="w-3 h-1 bg-purple-500 rounded"></div> Taste Score
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <div className="w-3 h-1 bg-pink-500 rounded"></div> Hygiene Score
            </div>
          </div>
        </div>

        {/* Vendor Performance */}
        <div className="bg-[#12122a] border border-white/5 rounded-2xl p-6 shadow-lg flex flex-col">
          <h3 className="font-display font-bold text-white text-lg mb-6">Top Performing Stalls</h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {stalls.slice(0, 5).map((stall, idx) => (
              <div key={stall._id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center font-bold text-white">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-white font-bold">{stall.name}</p>
                    <p className="text-xs text-gray-400">{stall.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold">{stall.rating} ★</p>
                  <p className="text-xs text-gray-500">{((5 - idx) * 125 + 100)} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
