import { Bell, Search, Moon, Sun, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Topbar({ title, breadcrumbs = [] }) {
  const { user, isDarkMode, toggleDarkMode } = useApp();
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AS';

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
      <div className="flex flex-col">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 mb-0.5">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={10} />}
                <span className={i === breadcrumbs.length - 1 ? 'text-slate-600 dark:text-slate-300 font-medium' : ''}>{crumb}</span>
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2 w-52">
          <Search size={14} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 outline-none flex-1"
            aria-label="Search"
          />
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white dark:border-slate-950" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 pl-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
            {initials}
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{user?.name}</div>
            <div className="text-xs text-slate-400">{user?.targetRole}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
