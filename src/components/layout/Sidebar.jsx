import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Search, Briefcase, Target, BookOpen,
  MessageSquare, BarChart2, User, Settings, LogOut, ChevronLeft,
  ChevronRight, Moon, Sun, GitBranch, Code, Mic, Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { clsx } from 'clsx';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    ],
  },
  {
    label: 'Career Profile',
    items: [
      { label: 'Resume', icon: FileText, path: '/resume' },
      { label: 'Resume Analysis', icon: Search, path: '/resume/analysis' },
    ],
  },
  {
    label: 'Opportunities',
    items: [
      { label: 'Jobs', icon: Briefcase, path: '/jobs' },
      { label: 'Job Analyzer', icon: Zap, path: '/jobs/analyzer' },
      { label: 'Job Match', icon: Target, path: '/jobs/match' },
    ],
  },
  {
    label: 'Growth',
    items: [
      { label: 'Skill Gaps', icon: BarChart2, path: '/skills' },
      { label: 'Learning Roadmap', icon: BookOpen, path: '/learning' },
    ],
  },
  {
    label: 'Interview',
    items: [
      { label: 'Mock Interview', icon: MessageSquare, path: '/interview' },
      { label: 'Interview Reports', icon: BarChart2, path: '/interview/report' },
    ],
  },
  {
    label: 'Progress',
    items: [
      { label: 'Career Progress', icon: BarChart2, path: '/career-progress' },
    ],
  },
  {
    label: 'Coming Soon',
    items: [
      { label: 'GitHub Analysis', icon: GitBranch, path: '/github', comingSoon: true },
      { label: 'Coding Interview', icon: Code, path: '/coding-interview', comingSoon: true },
      { label: 'Voice Interview', icon: Mic, path: '/voice-interview', comingSoon: true },
    ],
  },
];

export function Sidebar({ collapsed, onToggle }) {
  const { isDarkMode, toggleDarkMode, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={clsx(
      'fixed left-0 top-0 h-full z-40 flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className={clsx('flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-4', collapsed ? 'justify-center' : 'justify-between')}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-base leading-none">CareerHub</span>
              <div className="text-[10px] text-slate-400 leading-none mt-0.5">Career Intelligence</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
        )}
        <button
          onClick={onToggle}
          className={clsx('p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors', collapsed && 'hidden')}
          aria-label="Toggle sidebar"
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <div className="px-3 mb-1.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{group.label}</span>
              </div>
            )}
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-xl mb-0.5 text-sm font-medium transition-all duration-150 group relative',
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                    : item.comingSoon
                    ? 'text-slate-400 dark:text-slate-600 cursor-default pointer-events-none opacity-60'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white',
                  collapsed && 'justify-center px-2'
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={18} className="flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.comingSoon && (
                      <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded-full font-medium">Soon</span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-3 space-y-1">
        <NavLink
          to="/profile"
          className={({ isActive }) => clsx(
            'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors',
            isActive ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
            collapsed && 'justify-center'
          )}
        >
          <User size={18} />
          {!collapsed && 'Profile'}
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => clsx(
            'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors',
            isActive ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
            collapsed && 'justify-center'
          )}
        >
          <Settings size={18} />
          {!collapsed && 'Settings'}
        </NavLink>
        <button
          onClick={toggleDarkMode}
          className={clsx('w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors', collapsed && 'justify-center')}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          {!collapsed && (isDarkMode ? 'Light Mode' : 'Dark Mode')}
        </button>
        <button
          onClick={handleLogout}
          className={clsx('w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors', collapsed && 'justify-center')}
          aria-label="Log out"
        >
          <LogOut size={18} />
          {!collapsed && 'Logout'}
        </button>

        {/* Collapse toggle (when expanded) */}
        {collapsed && (
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Expand sidebar"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </aside>
  );
}
