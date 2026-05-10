import { useState, useEffect } from 'react';
import { Moon, Sun, Bell, Lock, Shield, LogOut } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const Settings = () => {
  const { logout } = useAuthStore();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [notifs, setNotifs] = useState({
    orderUpdates: true,
    complaintStatus: true,
    promotions: false
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNotifChange = (e) => {
    setNotifs({ ...notifs, [e.target.name]: e.target.checked });
  };

  return (
    <div className="max-w-3xl mx-auto animate-[fadeUp_0.4s_both]">
      <h2 className="text-2xl font-bold font-display text-white mb-6">Settings</h2>
      
      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4 text-purple-400">
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            <h3 className="font-bold text-lg text-white">Appearance</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Dark Mode</p>
              <p className="text-sm text-gray-400">Switch between dark and light themes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={theme === 'dark'} onChange={toggleTheme} />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4 text-purple-400">
            <Bell size={20} />
            <h3 className="font-bold text-lg text-white">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Order Updates</p>
                <p className="text-sm text-gray-400">Get notified when order is ready</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="orderUpdates" className="sr-only peer" checked={notifs.orderUpdates} onChange={handleNotifChange} />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Complaint Status</p>
                <p className="text-sm text-gray-400">Updates on your issue reports</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="complaintStatus" className="sr-only peer" checked={notifs.complaintStatus} onChange={handleNotifChange} />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4 text-purple-400">
            <Shield size={20} />
            <h3 className="font-bold text-lg text-white">Security</h3>
          </div>
          <button className="w-full flex items-center justify-between p-3 bg-black/20 rounded-lg hover:bg-black/40 transition-colors mb-3 text-left">
            <span className="text-white">Change Password</span>
            <Lock size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-black/20 rounded-lg hover:bg-black/40 transition-colors text-left text-red-400" onClick={logout}>
            <span>Log Out</span>
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
