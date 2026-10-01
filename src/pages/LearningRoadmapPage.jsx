import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, Clock, Calendar, ArrowRight,
  Sparkles, ExternalLink,
  Check, Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, Button, Badge, ProgressBar } from '../components/ui';
import { clsx } from 'clsx';

export default function LearningRoadmapPage() {
  const navigate = useNavigate();
  const { learningProgress, updateLearningProgress, showToast } = useApp();
  const [activePhase, setActivePhase] = useState('all');

  // Calculate overall progress across all items
  const allItems = learningProgress.flatMap(p => p.items);
  const totalItems = allItems.length;
  const completedItems = allItems.filter(i => i.status === 'completed').length;
  const inProgressItems = allItems.filter(i => i.status === 'in-progress').length;
  const overallPercentage = Math.round(
    allItems.reduce((acc, curr) => acc + (curr.progress || 0), 0) / (totalItems || 1)
  );

  const handleUpdateItemProgress = (phaseIdx, itemIdx, newProgress) => {
    const isDone = newProgress >= 100;
    updateLearningProgress(phaseIdx, itemIdx, {
      progress: newProgress,
      status: isDone ? 'completed' : newProgress > 0 ? 'in-progress' : 'not-started',
      completedDate: isDone ? new Date().toISOString().split('T')[0] : undefined,
    });
  };

  const getPhaseStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Phase Completed</Badge>;
      case 'in-progress':
        return <Badge variant="primary">Currently Active</Badge>;
      case 'upcoming':
        return <Badge variant="default">Scheduled Next</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Sparkles size={14} /> Adaptive Career Curriculum
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Personalized Learning Roadmap
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            Phase-by-phase action plan dynamically tailored to close your identified skill gaps.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate('/interview')}
        >
          Practice Mock Interview <ArrowRight size={16} />
        </Button>
      </div>

      {/* Progress & Milestone Overview Card */}
      <Card className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white border-0 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              Curriculum Milestone Status
            </span>
            <h2 className="text-2xl font-bold tracking-tight">
              Full Stack Readiness Pathway
            </h2>
            <p className="text-slate-300 text-xs max-w-xl leading-relaxed">
              You are currently on <strong>Phase 2: Production Development</strong>. You have completed 2 core foundational modules and have 2 active modules in flight.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-2">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> {completedItems} Completed</span>
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-indigo-400" /> {inProgressItems} In Progress</span>
              <span className="flex items-center gap-1.5"><Layers size={14} className="text-slate-400" /> {totalItems} Total Modules</span>
            </div>
          </div>

          <div className="lg:w-72 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-center">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-300 font-medium">Curriculum Progress</span>
              <span className="font-extrabold text-white text-base">{overallPercentage}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-400 to-emerald-400 h-2.5 rounded-full transition-all duration-700"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2 text-center">
              Target completion: 8-10 weeks at 8 hrs/week
            </p>
          </div>
        </div>
      </Card>

      {/* Phase Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActivePhase('all')}
          className={clsx(
            'px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all',
            activePhase === 'all'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          )}
        >
          All 4 Phases
        </button>
        {learningProgress.map((p) => (
          <button
            key={p.phase}
            onClick={() => setActivePhase(p.phase.toString())}
            className={clsx(
              'px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2',
              activePhase === p.phase.toString()
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            )}
          >
            <span>Phase {p.phase}: {p.title}</span>
            <span className={clsx(
              'w-2 h-2 rounded-full',
              p.status === 'completed' ? 'bg-emerald-400' : p.status === 'in-progress' ? 'bg-indigo-400' : 'bg-slate-400'
            )} />
          </button>
        ))}
      </div>

      {/* Phases Accordion / List */}
      <div className="space-y-6">
        {learningProgress
          .filter(p => activePhase === 'all' || activePhase === p.phase.toString())
          .map((phaseData, phaseIdx) => {
            const isPhaseDone = phaseData.status === 'completed';
            const isPhaseActive = phaseData.status === 'in-progress';

            return (
              <Card
                key={phaseData.phase}
                className={clsx(
                  'border transition-all',
                  isPhaseActive
                    ? 'border-indigo-300 dark:border-indigo-800 shadow-md ring-1 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800'
                )}
              >
                {/* Phase Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className={clsx(
                      'w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm',
                      isPhaseDone
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : isPhaseActive
                        ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    )}>
                      {isPhaseDone ? <Check size={18} /> : phaseData.phase}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                          Phase {phaseData.phase}: {phaseData.title}
                        </h3>
                        {getPhaseStatusBadge(phaseData.status)}
                      </div>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Calendar size={12} /> {phaseData.timeframe}
                      </p>
                    </div>
                  </div>

                  {isPhaseActive && (
                    <span className="self-start sm:self-auto text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                      Recommended Focus
                    </span>
                  )}
                </div>

                {/* Phase Items */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2">
                  {phaseData.items.map((item, itemIdx) => {
                    const isItemDone = item.status === 'completed';
                    const isItemInProgress = item.status === 'in-progress';

                    return (
                      <div key={itemIdx} className="py-4 first:pt-3 last:pb-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900 dark:text-white text-sm">
                              {item.skill}
                            </span>
                            <Badge variant={item.importance === 'high' ? 'danger' : 'default'} size="xs">
                              {item.importance} priority
                            </Badge>
                            {isItemDone && (
                              <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 size={12} /> Completed {item.completedDate}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock size={11} /> {item.effort}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span>Resources:</span>
                              {item.resources.map((res, rIdx) => (
                                <span
                                  key={rIdx}
                                  onClick={() => showToast(`Opening resource: ${res}`, 'info')}
                                  className="inline-flex items-center gap-0.5 text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer font-medium"
                                >
                                  {res} <ExternalLink size={9} />
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Interactive Progress Control */}
                        <div className="flex items-center gap-4 min-w-[240px] justify-between md:justify-end">
                          <div className="w-32">
                            <div className="flex justify-between text-[11px] mb-1">
                              <span className="text-slate-400">Progress</span>
                              <span className="font-bold text-slate-700 dark:text-slate-300">{item.progress}%</span>
                            </div>
                            <ProgressBar
                              value={item.progress}
                              color={isItemDone ? 'emerald' : isItemInProgress ? 'indigo' : 'purple'}
                              size="sm"
                            />
                          </div>

                          {/* Quick action buttons */}
                          <div className="flex items-center gap-1.5">
                            {item.progress < 100 ? (
                              <button
                                onClick={() => handleUpdateItemProgress(phaseIdx, itemIdx, Math.min(100, item.progress + 25))}
                                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
                                title="Add 25% progress"
                              >
                                +25%
                              </button>
                            ) : null}

                            <button
                              onClick={() => handleUpdateItemProgress(phaseIdx, itemIdx, isItemDone ? 0 : 100)}
                              className={clsx(
                                'p-1.5 rounded-lg text-xs font-semibold transition-colors',
                                isItemDone
                                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                              )}
                              title={isItemDone ? 'Mark uncompleted' : 'Mark 100% complete'}
                            >
                              <Check size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
