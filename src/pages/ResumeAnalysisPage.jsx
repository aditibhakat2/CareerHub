import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart2, CheckCircle, AlertCircle, User, GraduationCap,
  Code, Briefcase, Award, ArrowRight, Copy, Check, Sparkles, Star
} from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Card, Button, Badge, SectionHeader, SkillChip, ProgressBar } from '../components/ui';
import { mockResume } from '../data/mockData';

const radarData = [
  { subject: 'Content', A: 82 },
  { subject: 'Skills', A: 76 },
  { subject: 'Projects', A: 80 },
  { subject: 'Complete', A: 74 },
  { subject: 'Impact', A: 68 },
];

export default function ResumeAnalysisPage() {
  const navigate = useNavigate();
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [acceptedIdx, setAcceptedIdx] = useState([]);
  const profile = mockResume.extractedProfile;

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleAccept = (idx) => {
    setAcceptedIdx(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Resume Intelligence</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Sample Analysis &mdash; Prototype Result</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/jobs/match')}>
          Check Job Match <ArrowRight size={16} />
        </Button>
      </div>

      {/* Score row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Overall */}
        <Card className="md:col-span-1 flex flex-col items-center justify-center text-center">
          <div className="text-xs text-slate-500 font-medium mb-2">Overall Score</div>
          <div className="relative w-28 h-28">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="10" className="dark:stroke-slate-800" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#6366f1" strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - mockResume.score / 100)}`}
                strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{mockResume.score}</span>
              <span className="text-xs text-slate-400">/100</span>
            </div>
          </div>
          <div className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">Resume Score</div>
        </Card>

        {/* Breakdown */}
        {Object.entries(mockResume.breakdown).map(([key, val]) => (
          <Card key={key} className="flex flex-col justify-center">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{val}<span className="text-sm text-slate-400 font-normal">/100</span></div>
            <ProgressBar value={val} color={val >= 80 ? 'emerald' : val >= 70 ? 'indigo' : 'amber'} size="sm" />
          </Card>
        ))}
      </div>

      {/* Radar + Extracted Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <SectionHeader title="Resume Quality Radar" subtitle="Multi-dimension analysis" />
          <div className="h-56 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius={80}>
                <PolarGrid stroke="#e2e8f0" className="dark:stroke-slate-700" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                <Radar name="Score" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Strengths & Gaps */}
        <Card className="space-y-4">
          <SectionHeader title="Key Findings" />
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={16} className="text-emerald-500" />
              <h4 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Strengths</h4>
            </div>
            <ul className="space-y-2">
              {mockResume.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Star size={12} className="text-emerald-500 mt-1 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={16} className="text-amber-500" />
              <h4 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Missing Information</h4>
            </div>
            <ul className="space-y-2">
              {mockResume.missingInfo.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <AlertCircle size={12} className="text-amber-500 mt-1 flex-shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      {/* Extracted Profile */}
      <Card>
        <SectionHeader title="Extracted Candidate Profile" subtitle="Auto-extracted from your resume — Sample Analysis" />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center">
                <User size={16} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Name</div>
                <div className="font-semibold text-slate-900 dark:text-white">{profile.name}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center">
                <GraduationCap size={16} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Education</div>
                <div className="font-semibold text-slate-900 dark:text-white">{profile.education}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center">
                <Briefcase size={16} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Target Role</div>
                <div className="font-semibold text-slate-900 dark:text-white">{profile.targetRole}</div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code size={16} className="text-slate-500" />
              <h4 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Extracted Skills</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map(s => <SkillChip key={s} skill={s} variant="primary" />)}
            </div>
          </div>

          {/* Projects */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart2 size={16} className="text-slate-500" />
              <h4 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Projects</h4>
            </div>
            <div className="space-y-3">
              {profile.projects.map(p => (
                <div key={p.name} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="font-medium text-slate-800 dark:text-slate-200 text-sm">{p.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.description.slice(0, 100)}...</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {p.tech.map(t => <SkillChip key={t} skill={t} size="sm" />)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience + Certs */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase size={16} className="text-slate-500" />
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Experience</h4>
              </div>
              {profile.experience.map(e => (
                <div key={e.role} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="font-medium text-slate-800 dark:text-slate-200 text-sm">{e.role}</div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400">{e.company} &bull; {e.duration}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{e.description}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award size={16} className="text-slate-500" />
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Certifications</h4>
              </div>
              <ul className="space-y-1.5">
                {profile.certifications.map(c => (
                  <li key={c} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Award size={12} className="text-amber-500 flex-shrink-0" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Resume Improvement */}
      <Card>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center">
            <Sparkles size={18} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <SectionHeader title="Resume Improvement Suggestions" />
          </div>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <Badge variant="info">Fact-preserving only</Badge>
          <span className="text-xs text-slate-400">CareerHub does not add skills or experience not supported by your profile.</span>
        </div>
        <div className="space-y-4">
          {mockResume.improvements.map((item, idx) => (
            <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="primary">{item.section}</Badge>
                <Badge variant="info">{item.label}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Current</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg italic">
                    "{item.current}"
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-emerald-600 mb-1.5 uppercase tracking-wide">Suggested</div>
                  <div className="text-sm text-slate-700 dark:text-slate-200 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 p-3 rounded-lg">
                    "{item.suggested}"
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Button
                  variant={acceptedIdx.includes(idx) ? 'success' : 'outline'}
                  size="sm"
                  onClick={() => handleAccept(idx)}
                >
                  <Check size={14} />
                  {acceptedIdx.includes(idx) ? 'Accepted' : 'Accept'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(item.suggested, idx)}
                >
                  {copiedIdx === idx ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
