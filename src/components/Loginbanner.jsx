import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Settings, X, Shield, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const roleLabel = { user: 'User', admin: 'Admin', master_admin: 'Master Admin' };
const roleIcon  = { user: User, admin: Shield, master_admin: Shield };
const roleColor = {
  user:         'from-gray-700 to-gray-800 border-gray-700',
  admin:        'from-blue-900/60 to-gray-900/60 border-blue-800/50',
  master_admin: 'from-purple-900/60 to-gray-900/60 border-purple-800/50',
};
const roleText  = { user: 'text-gray-300', admin: 'text-blue-300', master_admin: 'text-purple-300' };

const LoginBanner = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [closed, setClosed] = useState(false);

  if (!user || closed) return null;

  const Icon = roleIcon[user.role] || User;

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className={`fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-80 z-40 bg-gradient-to-r ${roleColor[user.role]} border backdrop-blur-md rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3`}>
      <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0`}>
        <Icon size={15} className={roleText[user.role]} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-gray-500 leading-none mb-0.5">Anda login sebagai</p>
        <p className={`text-sm font-semibold truncate ${roleText[user.role]}`}>
          {user.username} <span className="font-normal opacity-70">· {roleLabel[user.role]}</span>
        </p>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        {isAdmin() && (
          <Link to="/setting" className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors" title="Pengaturan">
            <Settings size={15} />
          </Link>
        )}
        <button onClick={handleLogout} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Keluar">
          <LogOut size={15} />
        </button>
        <button onClick={() => setClosed(true)} className="p-1.5 rounded-lg text-gray-600 hover:text-gray-400 transition-colors">
          <X size={15} />
        </button>
      </div>
    </div>
  );
};

export default LoginBanner;