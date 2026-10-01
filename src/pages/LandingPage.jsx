import { useNavigate } from 'react-router-dom';
import {
  Zap, FileText, Target, TrendingUp, BookOpen, MessageSquare,
  BarChart2, ArrowRight, CheckCircle, AlertCircle, HelpCircle,
  ChevronRight, Sparkles
} from 'lucide-react';
import { Button, Badge } from '../components/ui';

const features = [
  { icon: FileText, title: 'Smart Resume Analysis', desc: 'Extract skills, projects, and experience. Score your resume against industry standards.', color: 'indigo' },
  { icon: Target, title: 'Explainable Job Matching', desc: 'See exactly why you match a job — requirement by requirement, with evidence from your resume.', color: 'purple' },
  { icon: BarChart2, title: 'Skill Gap Intelligence', desc: 'Identify the precise skills you need to close the gap between where you are and where you want to be.', color: 'blue' },
  { icon: BookOpen, title: 'Personalized Learning', desc: 'A roadmap tailored to your skill gaps, target role, and timeframe — not a generic course list.', color: 'emerald' },
  { icon: MessageSquare, title: 'Adaptive Mock Interviews', desc: 'AI-simulated interviews that adapt to your performance level and focus on your target role.', color: 'amber' },
  { icon: TrendingUp, title: 'Career Progress Tracking', desc: 'Visualize your growth from resume upload to interview readiness across the complete journey.', color: 'rose' },
];

const steps = [
  { num: '01', title: 'Upload Resume', desc: 'Upload your resume and let CareerHub extract your complete candidate profile automatically.' },
  { num: '02', title: 'Build Your Profile', desc: 'Review your extracted skills, projects, and experience. Add your target role and goals.' },
  { num: '03', title: 'Analyze Target Jobs', desc: 'Paste any job description for instant structured analysis of requirements and expectations.' },
  { num: '04', title: 'Understand Your Match', desc: 'See your explainable match — requirement by requirement, with evidence and confidence levels.' },
  { num: '05', title: 'Close Skill Gaps', desc: 'Identify exactly what skills you need and get a prioritized learning roadmap.' },
  { num: '06', title: 'Prepare for Interviews', desc: 'Practice with adaptive mock interviews tailored to your target role.' },
  { num: '07', title: 'Track Your Progress', desc: 'Monitor your career readiness score, skill development, and interview performance over time.' },
];

const matchDemo = [
  { req: 'React.js', status: 'matched', evidence: 'Listed in Skills + E-Commerce Project', confidence: 'High' },
  { req: 'REST APIs', status: 'matched', evidence: 'Found in Project: E-Commerce Platform', confidence: 'High' },
  { req: '2+ Years Experience', status: 'partial', evidence: '6 months internship experience found', confidence: 'High' },
  { req: 'Docker', status: 'missing', evidence: 'No evidence found in resume', confidence: 'High' },
  { req: 'AWS', status: 'uncertain', evidence: 'Certification found, practical usage not demonstrated', confidence: 'Medium' },
];

const faqs = [
  { q: 'Is CareerHub free to use?', a: 'CareerHub is available for you to explore all core features. The platform is built to help job seekers and graduates prepare for their career journey.' },
  { q: 'Does CareerHub actually predict if I will get hired?', a: 'No. CareerHub is a career matching and preparation platform — not a hiring predictor. We show you how well your profile matches job requirements and help you prepare better.' },
  { q: 'Is my resume data stored securely?', a: 'All data is stored locally in your browser. No data is sent to any external server — your information stays with you.' },
  { q: 'Can I use CareerHub for any job role?', a: 'Yes. While CareerHub is especially strong for software engineering roles, the intelligent matching framework applies to any job description you paste.' },
];

function StatusIcon({ status }) {
  if (status === 'matched') return <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />;
  if (status === 'missing') return <AlertCircle size={16} className="text-red-500 flex-shrink-0" />;
  if (status === 'uncertain') return <HelpCircle size={16} className="text-blue-500 flex-shrink-0" />;
  return <AlertCircle size={16} className="text-amber-500 flex-shrink-0" />;
}

function StatusLabel({ status }) {
  const map = {
    matched: { label: 'Matched', cls: 'bg-emerald-100 text-emerald-700' },
    partial: { label: 'Partial Match', cls: 'bg-amber-100 text-amber-700' },
    missing: { label: 'Missing', cls: 'bg-red-100 text-red-700' },
    uncertain: { label: 'Uncertain', cls: 'bg-blue-100 text-blue-700' },
  };
  const cfg = map[status] || { label: status, cls: 'bg-slate-100 text-slate-600' };
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.cls}`}>{cfg.label}</span>;
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-lg">CareerHub</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#match-demo" className="hover:text-indigo-600 transition-colors">Match Demo</a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="md" onClick={() => navigate('/login')}>Sign In</Button>
            <Button variant="primary" size="md" onClick={() => navigate('/register')}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-indigo-200 dark:border-indigo-800">
            <Sparkles size={14} />
            One Hub for Your Career Journey
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
            Turn Your Career Goals Into a{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Smarter Action Plan
            </span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Analyze your resume, understand your job fit, discover skill gaps, build a personalized learning path, and prepare for interviews — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="xl" onClick={() => navigate('/register')}>
              Get Started Free <ArrowRight size={20} />
            </Button>
            <Button variant="secondary" size="xl" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>

        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="primary" size="md" className="mb-4">Why CareerHub?</Badge>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Everything You Need for Your Career Journey</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Not just a match score. A complete intelligence system for career preparation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all">
                <div className={`w-12 h-12 rounded-xl bg-${f.color}-50 dark:bg-${f.color}-950 flex items-center justify-center mb-4`}>
                  <f.icon size={22} className={`text-${f.color}-600 dark:text-${f.color}-400`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="primary" size="md" className="mb-4">How CareerHub Works</Badge>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Your Career Journey, Step by Step</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400">From resume to interview-ready — a structured path for every student.</p>
          </div>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-6 items-start group">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950 border-2 border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
                  <span className="text-lg font-black text-indigo-600 dark:text-indigo-300">{step.num}</span>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-[calc(3.5rem/2)] mt-14 w-px h-6 bg-indigo-200 dark:bg-indigo-800" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Match Demo */}
      <section id="match-demo" className="py-20 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="purple" size="md" className="mb-4">More Than a Match Score</Badge>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              See <em>Why</em> You Match — Not Just <em>How Much</em>
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              CareerHub explains every match decision with evidence grounded in your actual resume content.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Your Match — Frontend Developer</h3>
                <p className="text-sm text-slate-500">TechNova Solutions &bull; Sample Analysis</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">84%</div>
                <div className="text-xs text-slate-500">Overall Match</div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Requirement</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Evidence</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {matchDemo.map((row, i) => (
                    <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <StatusIcon status={row.status} />
                          {row.req}
                        </div>
                      </td>
                      <td className="px-6 py-4"><StatusLabel status={row.status} /></td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs max-w-xs">{row.evidence}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium ${row.confidence === 'High' ? 'text-emerald-600' : 'text-amber-600'}`}>{row.confidence}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900 text-xs text-slate-400 italic border-t border-slate-100 dark:border-slate-800">
              Sample analysis — enter your own resume and job description to see your personalized results
            </div>
          </div>
        </div>
      </section>

      {/* Career Growth Loop */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="success" size="md" className="mb-4">Career Growth Loop</Badge>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12">A Continuous Improvement Cycle</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {['Match', 'Skill Gap', 'Learn', 'Practice', 'Improve'].map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <div className="w-28 h-28 rounded-2xl bg-indigo-50 dark:bg-indigo-950 border-2 border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300 text-center text-sm">{step}</span>
                </div>
                {i < 4 && <ChevronRight size={20} className="text-indigo-400 hidden md:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">Build a Smarter Path Toward Your Next Opportunity</h2>
            <p className="text-indigo-200 text-xl mb-8">One Hub for Your Career Journey</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="xl"
                onClick={() => navigate('/register')}
                className="bg-white text-indigo-700 hover:bg-indigo-50 border-white"
              >
                Start Your Journey <ArrowRight size={20} />
              </Button>
              <Button
                size="xl"
                onClick={() => navigate('/login')}
                className="bg-white/10 text-white border border-white/30 hover:bg-white/20 rounded-xl"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">CareerHub</div>
                <div className="text-xs text-slate-400">One Hub for Your Career Journey</div>
              </div>
            </div>
            <div className="text-sm text-slate-400 text-center">
              &copy; 2025 CareerHub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
