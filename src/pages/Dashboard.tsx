import { useState } from 'react';
import { MessageSquare, FileText, Search, Award, BookOpen, GraduationCap, Users, TrendingUp, Clock, Target } from 'lucide-react';
import FeatureCard, { StatCard } from '../components/FeatureCard';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import { useTheme } from '@/lib/theme-context';
import ThemeSelector from '@/components/ThemeSelector';

interface DashboardProps {
  onNavigate?: (tab: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const { currentTheme, themeConfig } = useTheme();
  const isDarkTheme = currentTheme === 'clean-modern';

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (onNavigate) onNavigate(tab);
  };

  const features = [
    {
      id: 'chatbot',
      icon: MessageSquare,
      title: 'Career Assistant',
      description: 'Get instant answers to all your career-related questions with AI-powered guidance',
      action: 'Start Chat',
      gradient: isDarkTheme ? 'bg-sky-500' : 'bg-blue-500',
    },
    {
      id: 'resume-builder',
      icon: FileText,
      title: 'Resume Builder',
      description: 'Create professional resumes with our easy-to-use builder and templates',
      action: 'Build Resume',
      gradient: isDarkTheme ? 'bg-emerald-500' : 'bg-green-500',
    },
    {
      id: 'resume-analyzer',
      icon: Search,
      title: 'Resume Analyzer',
      description: 'Get detailed feedback and improvement suggestions for your resume',
      action: 'Analyze Now',
      gradient: isDarkTheme ? 'bg-violet-500' : 'bg-purple-500',
    },
    {
      id: 'job-finder',
      icon: Award,
      title: 'Job Finder',
      description: 'Discover job opportunities tailored to your skills and preferences',
      action: 'Find Jobs',
      gradient: isDarkTheme ? 'bg-amber-500' : 'bg-orange-500',
    },
    {
      id: 'scholarship-finder',
      icon: Award,
      title: 'Scholarship Finder',
      description: 'Find scholarships and funding opportunities for your education',
      action: 'Explore Scholarships',
      gradient: isDarkTheme ? 'bg-yellow-400' : 'bg-yellow-500',
    },
    {
      id: 'course-recommender',
      icon: BookOpen,
      title: 'Course Recommender',
      description: 'Get personalized course recommendations to boost your career',
      action: 'Get Recommendations',
      gradient: isDarkTheme ? 'bg-pink-500' : 'bg-pink-500',
    },
    {
      id: 'college-finder',
      icon: GraduationCap,
      title: 'College Finder',
      description: 'Find the perfect college that matches your career aspirations',
      action: 'Search Colleges',
      gradient: isDarkTheme ? 'bg-indigo-400' : 'bg-indigo-500',
    },
    {
      id: 'mentorship',
      icon: Users,
      title: 'Mentorship',
      description: 'Connect with experienced mentors for personalized career guidance',
      action: 'Find Mentor',
      gradient: isDarkTheme ? 'bg-teal-400' : 'bg-teal-500',
    },
  ];

  const stats = [
    { label: 'Career Goals', value: '3', icon: Target, trend: '+2 this month' },
    { label: 'Hours Learning', value: '24', icon: Clock, trend: '+12%' },
    { label: 'Applications', value: '12', icon: TrendingUp, trend: '+5 this week' },
  ];

  // Theme-aware background and text colors
  const mainBg = isDarkTheme
    ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
    : 'bg-gradient-to-br from-gray-50 via-white to-blue-50';
  const textPrimary = isDarkTheme ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkTheme ? 'text-slate-300' : 'text-gray-600';
  const ctaBg = isDarkTheme
    ? 'bg-gradient-to-r from-sky-900 to-slate-800'
    : 'bg-gradient-to-r from-gray-900 to-gray-800';

  return (
    <div className={`min-h-screen ${mainBg}`}>
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <DashboardHeader />

      {/* Theme Selector */}
      <ThemeSelector position="floating" />

      <main className="ml-64 pt-20 p-8 min-h-screen">
        <div className="space-y-8">
          <div>
            <h2 className={`text-3xl font-bold ${textPrimary} mb-2`}>Your Career Dashboard</h2>
            <p className={textSecondary}>Track your progress and access all career tools in one place</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <div>
            <h3 className={`text-xl font-bold ${textPrimary} mb-6`}>Quick Access</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  {...feature}
                  onClick={() => handleTabChange(feature.id)}
                />
              ))}
            </div>
          </div>

          <div className={`${ctaBg} rounded-2xl p-8 text-white shadow-xl`}>
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold mb-2">Ready to take the next step?</h3>
              <p className={`${isDarkTheme ? 'text-slate-300' : 'text-gray-300'} mb-6`}>
                Our AI-powered career assistant is here to help you navigate your career journey
              </p>
              <button
                onClick={() => handleTabChange('chatbot')}
                className={`${isDarkTheme ? 'bg-sky-500 hover:bg-sky-400' : 'bg-white text-gray-900 hover:bg-gray-100'} px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg`}
              >
                Talk to Career Assistant
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
