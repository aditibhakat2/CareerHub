import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles, GitBranch, Code, Mic, ArrowRight, ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';

export default function ComingSoonPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const configs = {
    '/github': {
      title: 'GitHub Repository Intelligence',
      subtitle: 'Automated deep scan of public repos for commit quality, code complexity, and architecture patterns',
      icon: GitBranch,
      plannedRelease: 'Phase 2 Milestone',
      features: [
        'Commit history velocity and consistency scoring',
        'Automated detection of clean code conventions and testing coverage',
        'Repository architecture diagram extraction',
        'Direct project link verification on candidate resume',
      ],
    },
    '/coding-interview': {
      title: 'Live AI Coding Sandbox Interview',
      subtitle: 'Real-time multi-language code editor with test cases and AI logic review',
      icon: Code,
      plannedRelease: 'Phase 2 Milestone',
      features: [
        'Integrated Monaco code editor (JavaScript, Python, C++, Java)',
        'Hidden test suite execution and time complexity benchmarking',
        'AI real-time hint suggestions when stuck on edge cases',
        'Code cleanliness and refactoring recommendations',
      ],
    },
    '/voice-interview': {
      title: 'Real-Time Voice AI Interviewer',
      subtitle: 'Low-latency conversational speech agent with tone and delivery feedback',
      icon: Mic,
      plannedRelease: 'Phase 3 Milestone',
      features: [
        'WebRTC low-latency streaming speech interaction',
        'Pace, filler words (um/uh), and confidence metric analysis',
        'Natural conversational interruption and clarifying follow-ups',
        'Post-call audio playback with timestamped feedback markers',
      ],
    },
  };

  const current = configs[location.pathname] || {
    title: 'Advanced AI Capability',
    subtitle: 'This feature is scheduled in upcoming engineering sprints',
    icon: Sparkles,
    plannedRelease: 'Coming Soon',
    features: ['Machine learning inference integration', 'Expanded dataset benchmarks'],
  };

  const Icon = current.icon;

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <Card className="text-center py-12 px-6 border-indigo-100 dark:border-indigo-950">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Icon size={32} />
        </div>

        <Badge variant="primary" className="mb-2">
          {current.plannedRelease}
        </Badge>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {current.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto mb-8">
          {current.subtitle}
        </p>

        {/* Feature roadmap cards */}
        <div className="text-left bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 mb-8 max-w-lg mx-auto">
          <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">
            Planned Technical Deliverables:
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            {current.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} /> Go Back
          </Button>

          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            Return to Dashboard <ArrowRight size={16} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
