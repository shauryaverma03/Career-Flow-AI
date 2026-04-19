import { Bell, Settings, User } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

export default function DashboardHeader() {
  const { currentTheme } = useTheme();
  const isDarkTheme = currentTheme === 'clean-modern';

  // Theme-aware styles
  const headerBg = isDarkTheme
    ? 'bg-slate-900/95 border-slate-700'
    : 'bg-white/95 border-gray-200';
  const textPrimary = isDarkTheme ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkTheme ? 'text-slate-300' : 'text-gray-500';
  const iconColor = isDarkTheme ? 'text-slate-200' : 'text-gray-700';
  const hoverBg = isDarkTheme ? 'hover:bg-slate-800' : 'hover:bg-gray-100';
  const avatarBg = isDarkTheme ? 'bg-sky-500' : 'bg-gray-900';

  return (
    <header className={`fixed top-0 right-0 left-64 ${headerBg} backdrop-blur-xl border-b z-10`}>
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h2 className={`text-2xl font-bold ${textPrimary}`}>Welcome back!</h2>
          <p className={`text-sm ${textSecondary} mt-1`}>Let's achieve your career goals today</p>
        </div>

        <div className="flex items-center gap-4">
          <button className={`relative p-2 rounded-lg ${hoverBg} transition-colors duration-200`}>
            <Bell size={20} className={iconColor} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button className={`p-2 rounded-lg ${hoverBg} transition-colors duration-200`}>
            <Settings size={20} className={iconColor} />
          </button>

          <button className={`flex items-center gap-3 px-4 py-2 rounded-lg ${hoverBg} transition-colors duration-200`}>
            <div className={`w-8 h-8 ${avatarBg} rounded-full flex items-center justify-center`}>
              <User size={16} className="text-white" />
            </div>
            <span className={`text-sm font-medium ${textPrimary}`}>Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}
