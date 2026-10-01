import { useNavigate } from 'react-router-dom';
import {
  Calendar, Sparkles, ArrowRight, Download, Check
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar
} from 'recharts';
import { useApp } from '../context/AppContext';
import { Card, Button, Badge, ProgressBar } from '../components/ui';
import { mockCareerProgress } from '../data/mockData';
import { clsx } from 'clsx';

export default function CareerProgressPage() {
  const navigate = useNavigate();
  const { targetRole, showToast } = useApp();
  const data = mockCareerProgress;

  const handleExportData = () => {
    showToast('Exporting Career Progress Dossier (PDF)...', 'info');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Sparkles size={14} /> Long-Term Career Intelligence Analytics
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Career Readiness & Velocity
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            Holistic growth metrics tracking resume optimization, interview velocity, and skill acquisition.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleExportData}>
            <Download size={14} /> Export Report
          </Button>

          <Button variant="primary" size="sm" onClick={() => navigate('/learning')}>
            Resume Learning <ArrowRight size={14} />
          </Button>
        </div>
      </div>

      {/* 4 Core Readiness Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding={false} className="p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Composite Readiness</div>
          <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-2">
            {data.readinessScore}%
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            ↑ +24% growth since baseline
          </div>
        </Card>

        <Card padding={false} className="p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Resume Strength</div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {data.resumeQuality}%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            ATS Parsed & Verified
          </div>
        </Card>

        <Card padding={false} className="p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Avg Job Match</div>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
            {data.avgJobMatch}%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Across 12 targeted postings
          </div>
        </Card>

        <Card padding={false} className="p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Skills Verified</div>
          <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-2">
            {data.skillsCovered}/{data.totalSkills}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            67% market coverage
          </div>
        </Card>
      </div>

      {/* Trajectory Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Readiness Trajectory */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Readiness Trajectory & Projection
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly progression toward 90%+ target role readiness
              </p>
            </div>
            <Badge variant="primary">Target: 87% in Jan</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.readinessOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="readinessGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fill="url(#readinessGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Mock Interview Velocity */}
        <Card>
          <div className="mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Interview Score Progression
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Score improvement over 3 attempts
            </p>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.interviewScores} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="attempt" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="score" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            Current best: <strong className="text-emerald-600 dark:text-emerald-400">78% (Interview Ready)</strong>
          </div>
        </Card>
      </div>

      {/* Curriculum Mastery Grid */}
      <Card>
        <h3 className="font-bold text-slate-900 dark:text-white text-base mb-3">
          Topic Mastery & Curriculum Status
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.learningCompletion.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-900 dark:text-white">{item.topic}</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{item.done}%</span>
              </div>
              <ProgressBar
                value={item.done}
                color={item.done === 100 ? 'emerald' : item.done > 0 ? 'indigo' : 'purple'}
                size="xs"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Milestone Journey Timeline */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Career Preparation Journey Timeline
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Key milestones achieved and scheduled upcoming targets
            </p>
          </div>
          <Badge variant="primary">Target Role: {targetRole}</Badge>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {data.timeline.map((item, idx) => {
            const isDone = item.status === 'done';
            return (
              <div key={idx} className="relative flex items-start gap-4">
                {/* Node dot */}
                <span className={clsx(
                  'absolute -left-6 top-1 w-4 h-4 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-950',
                  isDone ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                )}>
                  {isDone && <Check size={10} className="text-white" />}
                </span>

                <div className="flex-1 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {item.event}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <Calendar size={11} /> {item.date}
                    </p>
                  </div>

                  <Badge variant={isDone ? 'success' : 'default'} size="xs">
                    {isDone ? 'Achieved' : 'Scheduled Target'}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
