import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Toast } from '../ui';
import { useApp } from '../../context/AppContext';
import { clsx } from 'clsx';

const ROUTE_CONFIG = {
  '/dashboard': { title: 'Career Intelligence Dashboard', breadcrumbs: ['Overview', 'Dashboard'] },
  '/resume': { title: 'Resume Intelligence Workspace', breadcrumbs: ['Career Profile', 'Resume'] },
  '/resume/analysis': { title: 'Deep ATS & Resume Analysis', breadcrumbs: ['Career Profile', 'Analysis'] },
  '/jobs': { title: 'Curated Opportunities Explorer', breadcrumbs: ['Opportunities', 'Jobs'] },
  '/jobs/analyzer': { title: 'Job Description Analyzer', breadcrumbs: ['Opportunities', 'JD Analyzer'] },
  '/jobs/match': { title: 'Explainable AI Match Matrix', breadcrumbs: ['Opportunities', 'Match Evidence'] },
  '/skills': { title: 'Skill Gap Benchmarking', breadcrumbs: ['Growth', 'Skill Gaps'] },
  '/learning': { title: 'Adaptive Learning Roadmap', breadcrumbs: ['Growth', 'Learning Roadmap'] },
  '/interview': { title: 'AI Mock Interview Simulator', breadcrumbs: ['Interview', 'Mock Interview'] },
  '/interview/report': { title: 'Interview Assessment Report', breadcrumbs: ['Interview', 'Diagnostic Report'] },
  '/career-progress': { title: 'Career Readiness & Velocity', breadcrumbs: ['Progress', 'Readiness Analytics'] },
  '/profile': { title: 'Candidate Profile & Preferences', breadcrumbs: ['Account', 'Profile'] },
  '/settings': { title: 'Application Settings & Controls', breadcrumbs: ['System', 'Settings'] },
  '/github': { title: 'GitHub Repository Intelligence', breadcrumbs: ['Preview', 'GitHub Analysis'] },
  '/coding-interview': { title: 'Coding Sandbox Interview', breadcrumbs: ['Preview', 'Coding Sandbox'] },
  '/voice-interview': { title: 'Voice AI Interviewer', breadcrumbs: ['Preview', 'Voice AI'] },
};

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useApp();
  const location = useLocation();

  const currentConfig = ROUTE_CONFIG[location.pathname] || {
    title: 'CareerHub Intelligence',
    breadcrumbs: ['CareerHub', 'Workspace'],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(prev => !prev)} />
      <div className={clsx('transition-all duration-300', sidebarCollapsed ? 'ml-16' : 'ml-64')}>
        <Topbar title={currentConfig.title} breadcrumbs={currentConfig.breadcrumbs} />
        <main className="p-6 min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>
      <Toast toast={toast} />
    </div>
  );
}
