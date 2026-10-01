import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Briefcase, BarChart2, MessageSquare, BookOpen,
  TrendingUp, ArrowRight, Clock, CheckCircle
} from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { useApp } from '../context/AppContext';
import { StatCard, Card, SectionHeader, Badge, Button, ProgressBar, SkillChip } from '../components/ui';
import { mockJobs, mockSkillGaps, mockCareerProgress } from '../data/mockData';

const radarData = [
  { subject: 'Resume', A: 78 },
  { subject: 'Job Match', A: 84 },
  { subject: 'Interview', A: 72 },
  { subject: 'Skills', A: 67 },
  { subject: 'Learning', A: 42 },
];

const getMatchColor = (score) => {
  if (score >= 85) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950';
  if (score >= 70) return 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950';
  return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950';
};

const quickActions = [
  { label: 'Upload Resume', icon: FileText, path: '/resume', color: 'indigo' },
  { label: 'Analyze a Job', icon: Briefcase, path: '/jobs/analyzer', color: 'purple' },
  { label: 'Check Job Match', icon: BarChart2, path: '/jobs/match', color: 'blue' },
  { label: 'Start Interview', icon: MessageSquare, path: '/interview', color: 'emerald' },
  { label: 'Continue Learning', icon: BookOpen, path: '/learning', color: 'amber' },
];

export default function DashboardPage() {
  const { user } = useApp();
  const navigate = useNavigate();
  const hour = useMemo(() => new Date().getHours(), []);
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const topJobs = [...mockJobs].sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);
  const topGaps = mockSkillGaps.filter(s => s.priority === 'high').slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            {greeting}, {user?.name?.split(' ')[0]} 👋
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here's your career intelligence overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="primary">
            <Clock size={12} /> Last updated: Today
          </Badge>
          <Badge variant="default">
            Sample Analysis
          </Badge>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={FileText}
          label="Resume Quality"
          value="78/100"
          sublabel="Content, Skills, Projects"
          trend="+4 pts"
          trendUp
          color="indigo"
        />
        <StatCard
          icon={BarChart2}
          label="Average Job Match"
          value="84%"
          sublabel="Across 12 analyzed jobs"
          trend="+6%"
          trendUp
          color="emerald"
        />
        <StatCard
          icon={MessageSquare}
          label="Interview Readiness"
          value="72%"
          sublabel="Based on mock interviews"
          trend="+13%"
          trendUp
          color="amber"
        />
        <StatCard
          icon={BookOpen}
          label="Skills Covered"
          value="16 / 24"
          sublabel="Target role skills"
          trend="+2 skills"
          trendUp
          color="purple"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Career Readiness Radar */}
        <Card className="lg:col-span-1">
          <SectionHeader title="Career Readiness" subtitle="Multi-dimension overview" />
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius={80}>
                <PolarGrid stroke="#e2e8f0" className="dark:stroke-slate-700" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                <Radar name="Score" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Career Snapshot */}
        <Card className="lg:col-span-2">
          <SectionHeader title="Career Snapshot" subtitle={`Target: ${user?.targetRole}`} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <CheckCircle size={14} className="text-emerald-500" />
                Top Strengths
              </h4>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'JavaScript', 'Node.js', 'REST APIs', 'MongoDB'].map(s => (
                  <SkillChip key={s} skill={s} variant="matched" />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <TrendingUp size={14} className="text-amber-500" />
                Priority Gaps
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Docker', 'System Design', 'AWS', 'Testing'].map(s => (
                  <SkillChip key={s} skill={s} variant="missing" />
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Readiness Progress</h4>
              <div className="space-y-2.5">
                {[
                  { label: 'Resume Quality', val: 78, color: 'indigo' },
                  { label: 'Job Match', val: 84, color: 'emerald' },
                  { label: 'Interview Readiness', val: 72, color: 'amber' },
                  { label: 'Skill Coverage', val: 67, color: 'purple' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 dark:text-slate-400 w-32 flex-shrink-0">{item.label}</span>
                    <ProgressBar value={item.val} color={item.color} size="md" className="flex-1" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-8 text-right">{item.val}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommended Jobs */}
      <div>
        <SectionHeader
          title="Recommended Jobs"
          subtitle="Best matches for your profile"
          action={<Button variant="ghost" size="sm" onClick={() => navigate('/jobs')}>View All <ArrowRight size={14} /></Button>}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {topJobs.map(job => (
            <Card key={job.id} hover className="flex flex-col gap-3" onClick={() => navigate('/jobs/match')}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{job.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{job.company} &bull; {job.location}</p>
                </div>
                <div className={`flex-shrink-0 text-lg font-black px-3 py-1 rounded-xl ${getMatchColor(job.matchScore)}`}>
                  {job.matchScore}%
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="default">{job.type}</Badge>
                <Badge variant="default">{job.experience}</Badge>
              </div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">Matched skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {job.matchedSkills.slice(0, 4).map(s => <SkillChip key={s} skill={s} variant="matched" size="sm" />)}
                </div>
              </div>
              {job.gapSkills.length > 0 && (
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">Gaps</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.gapSkills.slice(0, 3).map(s => <SkillChip key={s} skill={s} variant="missing" size="sm" />)}
                  </div>
                </div>
              )}
              <Button variant="outline" size="sm" className="w-full mt-1" onClick={(e) => { e.stopPropagation(); navigate('/jobs/match'); }}>
                View Match <ArrowRight size={14} />
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Gap Priorities */}
        <Card>
          <SectionHeader
            title="Skill Gap Priorities"
            action={<Button variant="ghost" size="sm" onClick={() => navigate('/skills')}>View All <ArrowRight size={14} /></Button>}
          />
          <div className="mt-4 space-y-4">
            {topGaps.map(gap => (
              <div key={gap.skill}>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 cursor-pointer"
                    onClick={() => navigate('/skills')}
                  >
                    {gap.skill}
                  </span>
                  <Badge variant={gap.priority === 'high' ? 'danger' : 'warning'} size="xs">
                    {gap.priority === 'high' ? 'High' : 'Medium'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <ProgressBar value={gap.yourLevel} max={100} color={gap.priority === 'high' ? 'red' : 'amber'} size="sm" className="flex-1" />
                  <span className="text-xs text-slate-400">{gap.yourLevel}%</span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{gap.effort} to learn</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Learning Progress */}
        <Card>
          <SectionHeader
            title="Learning Progress"
            subtitle="42% overall complete"
            action={<Button variant="ghost" size="sm" onClick={() => navigate('/learning')}>View Roadmap <ArrowRight size={14} /></Button>}
          />
          <div className="mt-4 space-y-3">
            {mockCareerProgress.learningCompletion.map(item => (
              <div key={item.topic} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.done === 100 ? 'bg-emerald-500' : item.done > 0 ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                <span className="text-sm text-slate-700 dark:text-slate-200 flex-1">{item.topic}</span>
                <span className={`text-xs font-semibold ${item.done === 100 ? 'text-emerald-600' : item.done > 0 ? 'text-indigo-600' : 'text-slate-400'}`}>
                  {item.done}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <SectionHeader title="Quick Actions" />
          <div className="mt-4 space-y-2">
            {quickActions.map(action => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all group text-left"
              >
                <action.icon size={16} className={`text-${action.color}-500 group-hover:scale-110 transition-transform`} />
                {action.label}
                <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Readiness over time */}
      <Card>
        <SectionHeader title="Career Readiness Over Time" subtitle="Projected trajectory" />
        <div className="mt-4 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockCareerProgress.readinessOverTime} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#f1f5f9', fontSize: 12 }}
                formatter={(v) => [`${v}%`, 'Readiness Score']}
              />
              <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2.5} fill="url(#colorScore)" dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 italic">Prototype Data — Projected readiness trend</p>
      </Card>
    </div>
  );
}
