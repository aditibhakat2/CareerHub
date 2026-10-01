import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, AlertTriangle, BookOpen, RotateCcw,
  Sparkles, ArrowRight, Printer
} from 'lucide-react';
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { useApp } from '../context/AppContext';
import { Card, Button, Badge } from '../components/ui';
import { mockInterviewReport } from '../data/mockData';
import { clsx } from 'clsx';

export default function InterviewReportPage() {
  const navigate = useNavigate();
  const { user } = useApp();
  const report = mockInterviewReport;

  const radarData = [
    { subject: 'Technical Knowledge', score: report.breakdown.technicalKnowledge, fullMark: 100 },
    { subject: 'Answer Relevance', score: report.breakdown.relevance, fullMark: 100 },
    { subject: 'Completeness', score: report.breakdown.completeness, fullMark: 100 },
    { subject: 'Clarity & Delivery', score: report.breakdown.clarity, fullMark: 100 },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Sparkles size={14} /> Comprehensive Evaluation Diagnostic
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Interview Assessment Report
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            Role: <strong>{report.role}</strong> • Completed on {report.date} • {report.totalQuestions} Questions Evaluated
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrint}
          >
            <Printer size={14} /> Export / Print
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/interview')}
          >
            <RotateCcw size={14} /> Retake Simulation
          </Button>
        </div>
      </div>

      {/* Hero Score Banner */}
      <Card className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-0 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="xs">Readiness Level: Interview Ready</Badge>
              <span className="text-xs text-slate-400">Candidate: {user.name}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Overall Technical Rating: {report.overallScore}/100
            </h2>
            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              Demonstrated solid conceptual depth across React architecture, state management, and modern browser APIs. Focus on sharpening CORS protocol nuances and performance optimization techniques.
            </p>
          </div>

          {/* Quick Score Badges */}
          <div className="grid grid-cols-2 gap-3 min-w-[280px]">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-xs text-slate-300 mb-0.5">Technical Depth</div>
              <div className="text-xl font-bold text-emerald-400">{report.breakdown.technicalKnowledge}%</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-xs text-slate-300 mb-0.5">Relevance</div>
              <div className="text-xl font-bold text-indigo-400">{report.breakdown.relevance}%</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-xs text-slate-300 mb-0.5">Completeness</div>
              <div className="text-xl font-bold text-amber-400">{report.breakdown.completeness}%</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-xs text-slate-300 mb-0.5">Clarity & Structure</div>
              <div className="text-xl font-bold text-blue-400">{report.breakdown.clarity}%</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Radar Chart & Competency Diagnostic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
            Skill Dimension Competency Radar
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" opacity={0.3} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 text-center">
            Evaluates accuracy, keyword coverage, structured framing, and technical nuance
          </p>
        </Card>

        {/* Strong Areas vs Gaps */}
        <div className="space-y-4">
          <Card className="border-emerald-200 dark:border-emerald-900 bg-emerald-50/20 dark:bg-emerald-950/20">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-2">
              <CheckCircle2 size={16} /> Strong Domain Areas
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {report.strongAreas.map((area, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span><strong>{area}</strong> - High conceptual precision and clarity</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="border-amber-200 dark:border-amber-900 bg-amber-50/20 dark:bg-amber-950/20">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm mb-2">
              <AlertTriangle size={16} /> Recommended Improvement Focus
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {report.improvementAreas.map((area, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>{area}</strong> - Needs deeper mention of edge cases & architecture</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-sm mb-2">
              <BookOpen size={16} /> Targeted Study Topics
            </div>
            <div className="flex flex-wrap gap-1.5">
              {report.recommendedTopics.map((topic, i) => (
                <span key={i} className="px-2.5 py-1 text-xs rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {topic}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Question-by-Question Diagnostic Table */}
      <Card padding={false} className="overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Detailed Question-by-Question Analysis
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Audit of each question prompt, technical topic, awarded score, and actionable feedback.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3">#</th>
                <th className="px-5 py-3">Topic</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-6 py-3">AI Evaluator Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {report.questionResults.map((q, idx) => {
                const isHigh = q.score >= 80;
                const isMid = q.score >= 70 && q.score < 80;
                return (
                  <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-slate-400 text-xs">{idx + 1}</td>
                    <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white whitespace-nowrap text-xs">
                      {q.topic}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={clsx(
                        'px-2.5 py-1 rounded-full text-xs font-bold',
                        isHigh ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' :
                        isMid ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' :
                        'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      )}>
                        {q.score}%
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-xs text-slate-600 dark:text-slate-300">
                      {q.feedback}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Action Plan Checklist */}
      <Card>
        <h3 className="font-bold text-slate-900 dark:text-white text-base mb-3">
          Recommended Next Steps
        </h3>
        <div className="space-y-2">
          {report.nextSteps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
              <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                {idx + 1}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/skills')}
          >
            Review Skill Gaps
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/career-progress')}
          >
            Track Career Progress <ArrowRight size={14} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
