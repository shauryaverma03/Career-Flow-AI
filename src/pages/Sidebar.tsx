import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, MessageSquare, FileText, Search, Award, BookOpen, GraduationCap, Users } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [logoHover, setLogoHover] = useState(false);
  const { currentTheme } = useTheme();
  const isDarkTheme = currentTheme === 'clean-modern';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'chatbot', label: 'Sancara AI', icon: MessageSquare },
    { id: 'resume-builder', label: 'Resume Builder', icon: FileText },
    { id: 'resume-analyzer', label: 'Resume Analyzer', icon: Search },
    { id: 'job-finder', label: 'Job Finder', icon: Award },
    { id: 'scholarship-finder', label: 'Scholarship Finder', icon: Award },
    { id: 'course-recommender', label: 'Course Recommender', icon: BookOpen },
    { id: 'college-finder', label: 'College Finder', icon: GraduationCap },
    { id: 'mentorship', label: 'Mentorship', icon: Users },
  ];

  // map menu ids to app routes
  const routeFor = (id: string) => {
    const map: Record<string, string | null> = {
      'dashboard': '/',
      'chatbot': '/career-assistant',
      'resume-builder': '/resume-builder',
      'resume-analyzer': '/resume-analyzer',
      'job-finder': '/job-finder',
      'scholarship-finder': '/scholarship-finder',
      'course-recommender': '/course-recommender',
      'college-finder': '/college-finder',
      'mentorship': '/mentorship',
    };
    return map[id] ?? null;
  };

  // Theme-aware styles
  const sidebarBg = isDarkTheme
    ? 'bg-slate-900/95 border-slate-700'
    : 'bg-white/95 border-gray-200';
  const textPrimary = isDarkTheme ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkTheme ? 'text-slate-400' : 'text-gray-500';
  const textNav = isDarkTheme ? 'text-slate-300' : 'text-gray-700';
  const borderColor = isDarkTheme ? 'border-slate-700' : 'border-gray-200';
  const activeItem = isDarkTheme
    ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/20'
    : 'bg-gray-900 text-white shadow-md';
  const hoverBg = isDarkTheme ? 'hover:bg-slate-800' : 'hover:bg-gray-100';
  const helpBg = isDarkTheme ? 'bg-slate-800' : 'bg-gray-50';

  return (
    <aside className={`fixed left-0 top-0 h-screen w-64 ${sidebarBg} backdrop-blur-xl border-r flex flex-col transition-all duration-300 z-30`}>
      <div
        className={`p-6 border-b ${borderColor} flex items-center gap-3`}
        onMouseEnter={() => setLogoHover(true)}
        onMouseLeave={() => setLogoHover(false)}
      >
        <img
          src="/logo.png"
          alt="Career Flow Logo"
          tabIndex={0}
          onFocus={() => setLogoHover(true)}
          onBlur={() => setLogoHover(false)}
          className={`w-10 h-10 rounded-md object-contain transform ${logoHover ? 'animate-spin' : ''} drop-shadow-lg`}
        />
        <div>
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Career Flow</h1>
          <p className={`text-sm ${textSecondary} mt-1`}>Your Career Companion</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const href = routeFor(item.id);
          const commonClass = `w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200 group ${isActive
              ? activeItem
              : `${textNav} ${hoverBg}`
            }`;

          return href ? (
            <Link
              key={item.id}
              to={href}
              onClick={() => onTabChange(item.id)}
              className={commonClass}
            >
              <Icon
                size={20}
                className={`transition-transform duration-200 ${!isActive ? 'group-hover:scale-110' : ''} ${isActive ? 'text-white' : ''}`}
              />
              <span className={`font-medium text-sm`}>{item.label}</span>
            </Link>
          ) : (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={commonClass}
            >
              <Icon
                size={20}
                className={`transition-transform duration-200 ${!isActive ? 'group-hover:scale-110' : ''} ${isActive ? 'text-white' : ''}`}
              />
              <span className={`font-medium text-sm`}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className={`p-4 border-t ${borderColor}`}>
        <div className={`${helpBg} rounded-lg p-4`}>
          <p className={`text-xs ${textSecondary}`}>Need help?</p>
          <button className={`text-sm ${isDarkTheme ? 'text-sky-400 hover:text-sky-300' : 'text-gray-900 hover:text-gray-700'} font-medium mt-1 hover:underline`}>
            Contact Support
          </button>
        </div>
      </div>
    </aside>
  );
}
