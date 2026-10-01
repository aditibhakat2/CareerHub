import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle, Clock, BookOpen, ArrowRight,
  Sparkles, CheckCircle2, Layers, ExternalLink, Plus
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import { useApp } from '../context/AppContext';
import { Card, Button, Badge, ProgressBar, PriorityBadge } from '../components/ui';
import { mockSkillGaps } from '../data/mockData';
import { clsx } from 'clsx';

export default function SkillGapsPage() {
  const navigate = useNavigate();
  const { targetRole, showToast } = useApp();
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [addedSkills, setAddedSkills] = useState({});

  const categories = ['all', ...new Set(mockSkillGaps.map(s => s.category))];

  const filteredGaps = mockSkillGaps.filter(item => {
    const matchPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    const matchCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchPriority && matchCategory;
  });

  const chartData = mockSkillGaps.map(item => ({
    name: item.skill,
    'Your Level': item.yourLevel,
    'Market Demand': item.requiredLevel,
  }));

  const handleAddToRoadmap = (skillName) => {
    setAddedSkills(prev => ({ ...prev, [skillName]: true }));
    showToast(`Added ${skillName} to your personalized learning roadmap!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Sparkles size={14} /> Market Demand Intelligence
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Skill Gap Identification & Benchmarking
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            Real-time comparison of your skills against 500+ active hiring criteria for <strong>{targetRole}</strong>.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/learning')}
          className="self-start md:self-auto"
        >
          <BookOpen size={16} /> Open Learning Roadmap <ArrowRight size={16} />
        </Button>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card padding={false} className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Tracked</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Layers size={16} />
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">24 Skills</div>
          <div className="text-xs text-slate-400 mt-0.5">Across 6 domain categories</div>
        </Card>

        <Card padding={false} className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Profile Strengths</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} />
            </span>
          </div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">16 Verified</div>
          <div className="text-xs text-slate-400 mt-0.5">React, JS, Node, REST APIs, Git</div>
        </Card>

        <Card padding={false} className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">High-Priority Gaps</span>
            <span className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400">
              <AlertCircle size={16} />
            </span>
          </div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">4 Critical</div>
          <div className="text-xs text-slate-400 mt-0.5">Docker, DSA, System Design, AWS</div>
        </Card>

        <Card padding={false} className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Estimated Effort</span>
            <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <Clock size={16} />
            </span>
          </div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-2">8-10 Weeks</div>
          <div className="text-xs text-slate-400 mt-0.5">To reach 90%+ match readiness</div>
        </Card>
      </div>

      {/* Benchmarking Comparison Chart */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Candidate Proficiency vs Market Requirement
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Benchmarked against current entry-level & junior full-stack developer job descriptions
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-indigo-500 inline-block"></span>
              <span className="text-slate-600 dark:text-slate-400">Your Current Level</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-slate-300 dark:bg-slate-700 inline-block"></span>
              <span className="text-slate-600 dark:text-slate-400">Market Benchmark</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#64748b' }}
                angle={-25}
                textAnchor="end"
                interval={0}
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="Your Level" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Market Demand" fill="#94a3b8" radius={[4, 4, 0, 0]} opacity={0.4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Filters & Skill Cards */}
      <div className="space-y-4">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          {/* Priority pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 font-medium mr-1">Priority:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'high', label: 'High Priority' },
              { id: 'medium', label: 'Medium' },
              { id: 'low', label: 'Low' },
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setPriorityFilter(p.id)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  priorityFilter === p.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Category dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Domain:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg font-medium bg-slate-100 dark:bg-slate-800 border-0 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Filter skills by domain category"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Skill Gap Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGaps.map((item, idx) => (
            <Card key={idx} className="flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {item.skill}
                      </h4>
                      <Badge variant="default" size="xs">{item.category}</Badge>
                    </div>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                      {item.importance}
                    </p>
                  </div>
                  <PriorityBadge priority={item.priority} />
                </div>

                {/* Level Comparison Bar */}
                <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Current Proficiency:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{item.yourLevel}%</span>
                  </div>
                  <ProgressBar value={item.yourLevel} color="indigo" size="xs" />

                  <div className="flex justify-between text-xs pt-1">
                    <span className="text-slate-500 dark:text-slate-400">Target Industry Level:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{item.requiredLevel}%</span>
                  </div>
                  <ProgressBar value={item.requiredLevel} color="emerald" size="xs" />
                </div>

                {/* Recommended resources */}
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1">
                    <BookOpen size={12} /> Curated Learning Resources:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.resources.map((res, ri) => (
                      <span
                        key={ri}
                        className="inline-flex items-center gap-1 text-[11px] bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-md transition-colors cursor-pointer"
                        onClick={() => showToast(`Resource opened: ${res}`, 'info')}
                      >
                        {res} <ExternalLink size={10} className="text-slate-400" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock size={12} /> {item.effort} effort
                </span>

                <Button
                  variant={addedSkills[item.skill] ? 'success' : 'outline'}
                  size="sm"
                  onClick={() => handleAddToRoadmap(item.skill)}
                  disabled={addedSkills[item.skill]}
                >
                  {addedSkills[item.skill] ? (
                    <>
                      <CheckCircle2 size={13} /> Added to Plan
                    </>
                  ) : (
                    <>
                      <Plus size={13} /> Add to Roadmap
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
