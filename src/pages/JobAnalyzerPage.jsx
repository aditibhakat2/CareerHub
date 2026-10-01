import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Zap, ArrowRight, Code, Star, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, Button, Badge, SectionHeader, SkillChip } from '../components/ui';
import { mockJobs } from '../data/mockData';

const SAMPLE_JD = `Job Title: Frontend Developer
Company: TechNova Solutions

About the Role:
We are looking for a talented Frontend Developer to join our growing engineering team. You will build scalable, performant web applications using modern JavaScript frameworks.

Requirements:
- 1-2 years of experience in frontend development
- Strong proficiency in React.js and JavaScript (ES6+)
- Experience with REST APIs and state management
- Knowledge of HTML5, CSS3, and responsive design
- Familiarity with Git and version control workflows
- Bachelor's degree in Computer Science or related field

Preferred:
- Experience with TypeScript
- Familiarity with Docker and containerization
- Knowledge of AWS cloud services
- Experience with testing frameworks (Jest, React Testing Library)

Responsibilities:
- Develop and maintain React-based frontend features
- Collaborate with backend teams on API integration
- Participate in code reviews and agile sprints
- Optimize UI performance and accessibility
- Write clean, maintainable, well-documented code

Benefits:
- Remote-first work environment
- Competitive salary and equity
- Learning and development budget
- Health insurance`;

export default function JobAnalyzerPage() {
  const navigate = useNavigate();
  const { setSelectedJob } = useApp();
  const [jdText, setJdText] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);

  const mockAnalysis = mockJobs[0]; // Use job-001 as mock analysis result

  const handleAnalyze = async () => {
    if (!jdText.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setAnalyzed(true);
    setSelectedJob(mockAnalysis);
  };

  const handleLoadSample = () => {
    setJdText(SAMPLE_JD);
    setAnalyzed(false);
  };

  const handleGenerateMatch = () => {
    navigate('/jobs/match');
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Job Description Analyzer</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Paste any job description to extract structured requirements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input */}
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <SectionHeader title="Job Description" subtitle="Paste or load a sample job description" />
              <Button variant="ghost" size="sm" onClick={handleLoadSample}>
                Load Sample
              </Button>
            </div>
            <textarea
              value={jdText}
              onChange={e => { setJdText(e.target.value); setAnalyzed(false); }}
              placeholder="Paste the job description here..."
              className="w-full h-96 p-4 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono leading-relaxed"
              aria-label="Job description input"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-slate-400">{jdText.length} characters</span>
              <Button
                variant="primary"
                size="md"
                onClick={handleAnalyze}
                disabled={!jdText.trim() || loading}
              >
                {loading ? 'Analyzing...' : <><Zap size={16} /> Analyze Job Description</>}
              </Button>
            </div>
          </Card>
        </div>

        {/* Right: Analysis */}
        <div className="space-y-4">
          {!analyzed && !loading && (
            <Card className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center mb-4">
                <ClipboardList size={28} className="text-indigo-400" />
              </div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">Structured Analysis</h3>
              <p className="text-sm text-slate-400 max-w-xs">Paste a job description and click Analyze to extract role details, requirements, and skills.</p>
            </Card>
          )}

          {loading && (
            <Card className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center mb-4 animate-pulse">
                <Zap size={28} className="text-indigo-500" />
              </div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">Analyzing Job Description...</h3>
              <p className="text-sm text-slate-400">Extracting requirements and skills</p>
              <p className="text-xs text-slate-300 dark:text-slate-600 mt-2">Sample Analysis — Prototype Result</p>
            </Card>
          )}

          {analyzed && (
            <div className="space-y-4">
              {/* Role info */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <SectionHeader title="Extracted Job Details" subtitle="Sample Analysis" />
                  <Badge variant="info">Prototype Result</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    { label: 'Role', value: mockAnalysis.title },
                    { label: 'Company', value: mockAnalysis.company },
                    { label: 'Experience', value: mockAnalysis.experience },
                    { label: 'Type', value: mockAnalysis.type },
                    { label: 'Location', value: mockAnalysis.location },
                    { label: 'Salary', value: mockAnalysis.salary },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="text-xs text-slate-400 mb-0.5">{label}</div>
                      <div className="font-medium text-slate-800 dark:text-slate-200">{value}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Required Skills */}
              <Card>
                <SectionHeader title="Required Skills" />
                <div className="mt-3">
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
                      <CheckCircle size={12} className="text-red-500" /> Must Have
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {mockAnalysis.skills.required.map(s => <SkillChip key={s} skill={s} variant="primary" />)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
                      <Star size={12} className="text-amber-500" /> Nice to Have
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {mockAnalysis.skills.preferred.map(s => <SkillChip key={s} skill={s} variant="default" />)}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Responsibilities */}
              <Card>
                <SectionHeader title="Key Responsibilities" />
                <ul className="mt-3 space-y-2">
                  {[
                    'Develop and maintain React-based frontend features',
                    'Collaborate with backend teams on API integration',
                    'Participate in code reviews and agile sprints',
                    'Optimize UI performance and accessibility',
                    'Write clean, maintainable, well-documented code',
                  ].map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <Code size={12} className="text-indigo-400 mt-1 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Generate Match */}
              <Button variant="primary" size="lg" className="w-full" onClick={handleGenerateMatch}>
                <Zap size={16} /> Generate Match Analysis <ArrowRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
