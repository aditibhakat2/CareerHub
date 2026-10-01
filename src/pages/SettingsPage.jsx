import { useState } from 'react';
import {
  Moon, Sun, RotateCcw, Bell, Monitor,
  Database, Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, Button } from '../components/ui';

export default function SettingsPage() {
  const { isDarkMode, toggleDarkMode, showToast } = useApp();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [presentationMode, setPresentationMode] = useState(false);

  const handleResetDemo = () => {
    localStorage.clear();
    showToast('Demo data reset to factory defaults! Refreshing...', 'info');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const handleTogglePresentation = () => {
    setPresentationMode(!presentationMode);
    showToast(
      !presentationMode
        ? 'Presentation Mode Enabled for Examiner Demonstration'
        : 'Presentation Mode Disabled',
      'success'
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          Application Settings & Controls
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
          Configure interface appearance, preferences, and local data management.
        </p>
      </div>

      {/* Appearance Section */}
      <Card>
        <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
          <Monitor size={18} className="text-indigo-600 dark:text-indigo-400" />
          Appearance & Theme
        </h3>

        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="font-semibold text-slate-900 dark:text-white text-sm">
              Color Theme Mode
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Toggle between modern dark mode and clean daylight theme
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
          </Button>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <div className="font-semibold text-slate-900 dark:text-white text-sm">
              Focus Mode
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Optimizes chart contrast and expands cards for focused review
            </div>
          </div>

          <button
            onClick={handleTogglePresentation}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              presentationMode ? 'bg-indigo-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
            }`}
            aria-label="Toggle presentation mode"
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
          </button>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
          <Bell size={18} className="text-indigo-600 dark:text-indigo-400" />
          Intelligence Alerts & Notifications
        </h3>

        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="font-semibold text-slate-900 dark:text-white text-sm">
              Real-Time High Match Alerts
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Get notified immediately when a job posting matches ≥85%
            </div>
          </div>
          <button
            onClick={() => setEmailAlerts(!emailAlerts)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              emailAlerts ? 'bg-indigo-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
            }`}
            aria-label="Toggle job alerts"
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
          </button>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <div className="font-semibold text-slate-900 dark:text-white text-sm">
              Roadmap Progress Check-ins
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Weekly summary of skill gaps closed and milestone completion
            </div>
          </div>
          <button
            onClick={() => setWeeklyDigest(!weeklyDigest)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              weeklyDigest ? 'bg-indigo-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
            }`}
            aria-label="Toggle weekly digest"
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
          </button>
        </div>
      </Card>

      {/* Data Management */}
      <Card className="border-red-100 dark:border-red-950 bg-red-50/20 dark:bg-red-950/20">
        <h3 className="font-bold text-red-600 dark:text-red-400 text-base mb-2 flex items-center gap-2">
          <Database size={18} /> Data Management
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
          Reset all locally stored data (uploaded resumes, completed roadmap items, interview progress) back to the initial state. This only affects data stored in your browser.
        </p>

        <Button variant="danger" size="sm" onClick={handleResetDemo}>
          <RotateCcw size={14} /> Reset All Local Data
        </Button>
      </Card>

      {/* Platform Information */}
      <Card className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-2">
          <Info size={16} /> Platform Information
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
          <div><strong>Platform:</strong> CareerHub</div>
          <div><strong>Purpose:</strong> AI Career Intelligence</div>
          <div><strong>Frontend:</strong> React 19 + Vite 8</div>
          <div><strong>Design System:</strong> Tailwind CSS v4 + Curated Tokens</div>
          <div><strong>Visualization:</strong> Recharts SVG Engine</div>
          <div><strong>Iconography:</strong> Lucide React Icons</div>
        </div>
      </Card>
    </div>
  );
}
