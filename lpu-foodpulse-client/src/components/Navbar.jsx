import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div className="bg-amber-500 text-white p-1.5 rounded-lg font-bold">FP</div>
        <span className="text-xl font-bold text-gray-800">FoodPulse</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <User size={18} />
          <span className="text-sm font-medium">12315707</span>
        </div>
        <button 
          onClick={handleLogout}
          className="text-gray-500 hover:text-red-600 transition flex items-center gap-1"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </nav>
  );
}
