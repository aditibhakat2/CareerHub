import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, AlertTriangle, XCircle, HelpCircle,
  Briefcase, Building2, MapPin, Award, ArrowRight, BookOpen,
  MessageSquare, Sparkles, Info, ShieldCheck, ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, Button, Badge, ProgressBar } from '../components/ui';
import { mockJobs, mockExplainableMatch } from '../data/mockData';
import { clsx } from 'clsx';

export default function JobMatchPage() {
  const navigate = useNavigate();
  const { selectedJob, setSelectedJob } = useApp();
  
  // Use selected job from context or fallback to first job
  const activeJob = selectedJob || mockJobs[0];
  const [filterStatus, setFilterStatus] = useState('all');

  const matchData = mockExplainableMatch;
  const requirements = matchData.requirements;

  const filteredRequirements = requirements.filter(req => {
    if (filterStatus === 'all') return true;
    return req.status === filterStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'matched':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 size={13} className="text-emerald-500" /> Matched
          </span>
        );
      case 'partial':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <AlertTriangle size={13} className="text-amber-500" /> Partial Match
          </span>
        );
      case 'missing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
            <XCircle size={13} className="text-red-500" /> Missing
          </span>
        );
      case 'uncertain':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <HelpCircle size={13} className="text-blue-500" /> Inconclusive
          </span>
        );
      default:
        return null;
    }
  };

  const getImportanceBadge = (importance) => {
    switch (importance.toLowerCase()) {
      case 'mandatory':
      case 'required':
        return <Badge variant="primary" size="xs">Required</Badge>;
      case 'preferred':
        return <Badge variant="default" size="xs">Preferred</Badge>;
      default:
        return <Badge variant="default" size="xs">{importance}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Sparkles size={14} /> Explainable AI Match Engine
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Job Compatibility & Evidence Matrix
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            Transparent, auditable AI reasoning comparing your resume against job criteria without hallucinations.
          </p>
        </div>

        {/* Job selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Evaluating:</span>
          <select
            value={activeJob.id}
            onChange={(e) => {
              const selected = mockJobs.find(j => j.id === e.target.value);
              if (selected) setSelectedJob(selected);
            }}
            className="px-3 py-2 text-sm rounded-xl font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Select job to compare"
          >
            {mockJobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.title} - {job.company} ({job.matchScore}%)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Job Quick Summary Card */}
      <Card className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-0 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                Target Role
              </span>
              <span className="text-xs text-slate-400">{activeJob.type}</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{activeJob.title}</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5"><Building2 size={14} className="text-indigo-400" /> {activeJob.company}</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-indigo-400" /> {activeJob.location}</span>
              <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-indigo-400" /> {activeJob.experience}</span>
              <span className="flex items-center gap-1.5"><Award size={14} className="text-emerald-400" /> {activeJob.salary}</span>
            </div>
          </div>

          {/* Overall Match Circle & Highlights */}
          <div className="flex items-center gap-6 border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-4 lg:pt-0 lg:pl-8">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-24 h-24 -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#334155" strokeWidth="7" fill="none" />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#10b981"
                    strokeWidth="7"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * matchData.overallMatch) / 100}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-white">{matchData.overallMatch}%</span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase">Match</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span><strong>7</strong> High Confidence Matches</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span><strong>2</strong> Moderate Evidence Items</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span><strong>1</strong> Critical Gap (Docker)</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Reasoning Narrative & Method Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Why this match */}
        <Card className="lg:col-span-2 border-indigo-100 dark:border-indigo-950 bg-indigo-50/30 dark:bg-indigo-950/20">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-semibold text-sm mb-2">
            <Info size={16} /> Explainable Reasoning Summary
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            {matchData.whyThisMatch}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-indigo-500" />
              <span>Grounding verification: No fabricated skills or false claims</span>
            </div>
            <span className="font-mono text-[11px] bg-white dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700">
              Confidence Score: 0.91 / 1.0
            </span>
          </div>
        </Card>

        {/* Algorithm Comparison */}
        <Card>
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">
            Multi-Strategy Scoring Breakdown
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Semantic Vector Matching</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{matchData.matchingMethods.semantic}%</span>
              </div>
              <ProgressBar value={matchData.matchingMethods.semantic} color="indigo" size="sm" />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Hybrid Weighted Average</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{matchData.matchingMethods.hybrid}%</span>
              </div>
              <ProgressBar value={matchData.matchingMethods.hybrid} color="emerald" size="sm" />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Exact Keyword Match</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{matchData.matchingMethods.keyword}%</span>
              </div>
              <ProgressBar value={matchData.matchingMethods.keyword} color="blue" size="sm" />
            </div>
          </div>
        </Card>
      </div>

      {/* 5-Dimensional Competency Progress Bars */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: 'Skill Match', value: matchData.breakdown.skillMatch, color: 'indigo' },
          { label: 'Experience Match', value: matchData.breakdown.experienceMatch, color: 'amber' },
          { label: 'Education Match', value: matchData.breakdown.educationMatch, color: 'emerald' },
          { label: 'Requirement Coverage', value: matchData.breakdown.requirementCoverage, color: 'blue' },
          { label: 'Evidence Strength', value: matchData.breakdown.evidenceStrength, color: 'purple' },
        ].map((item, idx) => (
          <Card key={idx} padding={false} className="p-4 text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {item.value}%
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              {item.label}
            </div>
            <ProgressBar value={item.value} color={item.color} size="xs" />
          </Card>
        ))}
      </div>

      {/* Filterable Audit Table of Requirements & Evidence */}
      <Card padding={false} className="overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Requirement-by-Requirement Evidence Audit
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Inspect how every line item of the job posting was verified against your candidate profile.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-medium">
            {[
              { id: 'all', label: `All (${requirements.length})` },
              { id: 'matched', label: `Matched (${requirements.filter(r => r.status === 'matched').length})` },
              { id: 'partial', label: `Partial (${requirements.filter(r => r.status === 'partial').length})` },
              { id: 'missing', label: `Missing (${requirements.filter(r => r.status === 'missing').length})` },
              { id: 'uncertain', label: `Inconclusive (${requirements.filter(r => r.status === 'uncertain').length})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg transition-all',
                  filterStatus === tab.id
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Job Requirement</th>
                <th className="px-4 py-3.5">Importance</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-6 py-3.5">Extracted Evidence / Reasoning</th>
                <th className="px-4 py-3.5">Evidence Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRequirements.map((req, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                    {req.requirement}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getImportanceBadge(req.importance)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getStatusBadge(req.status)}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-300 max-w-md">
                    {req.evidence}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {req.evidenceType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Action Next Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="flex flex-col justify-between border-slate-200 dark:border-slate-800">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
              <BookOpen size={20} />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Close Missing Skill Gaps</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Add Docker, Testing (Jest), and Cloud modules directly to your personalized learning roadmap.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full"
            onClick={() => navigate('/skills')}
          >
            View Skill Gap Plan <ArrowRight size={14} />
          </Button>
        </Card>

        <Card className="flex flex-col justify-between border-slate-200 dark:border-slate-800">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
              <MessageSquare size={20} />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Practice Interview for This Role</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Simulate technical and behavioral interview questions tailored specifically to {activeJob.title}.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="mt-4 w-full"
            onClick={() => navigate('/interview')}
          >
            Launch Mock Interview <ArrowRight size={14} />
          </Button>
        </Card>

        <Card className="flex flex-col justify-between border-slate-200 dark:border-slate-800">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <Award size={20} />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Optimize Resume Bullet Points</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Apply fact-preserving improvements to highlight quantifiable impact for {activeJob.company}.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4 w-full"
            onClick={() => navigate('/resume/analysis')}
          >
            Resume Improvements <ChevronRight size={14} />
          </Button>
        </Card>
      </div>
    </div>
  );
}
