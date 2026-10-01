import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, Clock, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, Button, Badge, SkillChip } from '../components/ui';
import { mockJobs } from '../data/mockData';
import { clsx } from 'clsx';

const getMatchBg = (score) => {
  if (score >= 85) return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
  if (score >= 70) return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300';
  return 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
};

export default function JobsPage() {
  const navigate = useNavigate();
  const { setSelectedJob } = useApp();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('match');

  const types = ['All', 'Full-time', 'Part-time', 'Contract'];

  const filtered = mockJobs
    .filter(j => {
      const q = search.toLowerCase();
      const matchSearch = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.skills.required.some(s => s.toLowerCase().includes(q));
      const matchType = typeFilter === 'All' || j.type === typeFilter;
      return matchSearch && matchType;
    })
    .sort((a, b) => sortBy === 'match' ? b.matchScore - a.matchScore : b.postedDays - a.postedDays);

  const handleViewMatch = (job) => {
    setSelectedJob(job);
    navigate('/jobs/match');
  };

  const handleAnalyze = (job) => {
    setSelectedJob(job);
    navigate('/jobs/analyzer');
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Explore Opportunities</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{filtered.length} jobs matched to your profile</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search jobs, companies, or skills..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            aria-label="Search jobs"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={clsx(
                'px-3 py-2 rounded-xl text-sm font-medium transition-all',
                typeFilter === t ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-300'
              )}
            >
              {t}
            </button>
          ))}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Sort jobs"
          >
            <option value="match">Sort: Best Match</option>
            <option value="recent">Sort: Most Recent</option>
          </select>
        </div>
      </div>

      {/* Job Cards Grid */}
      {filtered.length === 0 ? (
        <Card className="text-center py-12">
          <Search size={40} className="text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">No jobs found</h3>
          <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(job => (
            <Card key={job.id} hover className="flex flex-col gap-4">
              {/* Job header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{job.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    <Briefcase size={13} />
                    <span>{job.company}</span>
                  </div>
                </div>
                <div className={clsx('flex-shrink-0 text-xl font-black px-3 py-1 rounded-xl', getMatchBg(job.matchScore))}>
                  {job.matchScore}%
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 flex-wrap text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <MapPin size={12} /> {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} /> {job.experience}
                </div>
                <Badge variant="default">{job.type}</Badge>
                <span className="text-xs text-slate-400">{job.postedDays}d ago</span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                {job.description}
              </p>

              {/* Matched skills */}
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">Matched skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {job.matchedSkills.slice(0, 5).map(s => <SkillChip key={s} skill={s} variant="matched" size="sm" />)}
                  {job.matchedSkills.length > 5 && <SkillChip skill={`+${job.matchedSkills.length - 5}`} size="sm" />}
                </div>
              </div>

              {/* Gaps */}
              {job.gapSkills.length > 0 && (
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">Skill gaps</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.gapSkills.slice(0, 3).map(s => <SkillChip key={s} skill={s} variant="missing" size="sm" />)}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <Button variant="primary" size="sm" className="flex-1" onClick={() => handleViewMatch(job)}>
                  View Match
                </Button>
                <Button variant="secondary" size="sm" className="flex-1" onClick={() => handleAnalyze(job)}>
                  <Zap size={14} /> Analyze
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
