import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic, MicOff, ChevronRight, ChevronLeft, Award,
  Sparkles, Clock, Lightbulb, ArrowRight, Bot, User, Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, Button, Badge } from '../components/ui';
import { mockInterviewQuestions } from '../data/mockData';
import { clsx } from 'clsx';

const BEHAVIORAL_QUESTIONS = [
  {
    id: 'b1',
    text: 'Tell me about a challenging technical bug you encountered in a project and how you solved it.',
    topic: 'Problem Solving',
    difficulty: 'intermediate',
    keyPoints: ['STAR format (Situation, Task, Action, Result)', 'Root-cause analysis', 'Quantifiable outcome', 'Reflection on learnings'],
    sampleAnswer: 'In my E-Commerce project, I faced a race condition during cart quantity updates where duplicate items were created. I used browser dev tools and network logging to diagnose concurrent state updates. I refactored the action handler to use functional setState and debounced API requests, eliminating 100% of duplicate calls.',
  },
  {
    id: 'b2',
    text: 'Describe a situation where you had to learn a new tool or technology under a tight deadline.',
    topic: 'Adaptability',
    difficulty: 'beginner',
    keyPoints: ['Learning strategy', 'Time management', 'Successful delivery', 'Long-term retention'],
    sampleAnswer: 'During my internship at TechCraft Solutions, our team adopted TypeScript midway through a sprint. I spent the first weekend reading the official handbook and building a small sandbox app. Within three days, I migrated two frontend modules with full type coverage ahead of schedule.',
  },
];

export default function MockInterviewPage() {
  const navigate = useNavigate();
  const { targetRole, showToast } = useApp();
  
  const [track, setTrack] = useState('technical');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [evaluated, setEvaluated] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(0);

  const questions = track === 'technical'
    ? mockInterviewQuestions.frontend_technical
    : BEHAVIORAL_QUESTIONS;

  const currentQ = questions[currentIndex] || questions[0];
  const currentAnswer = userAnswers[currentQ.id] || '';

  // Timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleSpeechToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      showToast('Simulating microphone input... Speak now', 'info');
      setTimeout(() => {
        const spokenText = currentAnswer
          ? currentAnswer + ' Additionally, we ensure proper cleanup functions and prevent stale state closures.'
          : currentQ.sampleAnswer.slice(0, 140) + '...';
        setUserAnswers(prev => ({ ...prev, [currentQ.id]: spokenText }));
        setIsRecording(false);
        showToast('Speech transcribed successfully!', 'success');
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  const handleEvaluateQuestion = () => {
    if (!currentAnswer.trim()) {
      showToast('Please provide an answer before evaluating', 'warning');
      return;
    }
    // Simulate scoring based on answer length & keywords
    const score = Math.min(95, Math.max(68, Math.round(75 + Math.min(20, currentAnswer.length / 15))));
    setEvaluated(prev => ({
      ...prev,
      [currentQ.id]: {
        score,
        feedback: 'Strong response structure. You covered the foundational definition and highlighted practical context. To enhance this further, emphasize performance trade-offs.',
      },
    }));
    showToast('AI evaluated your answer!', 'success');
  };

  const isCurrentEvaluated = !!evaluated[currentQ.id];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Bar with Mode, Timer, and Finish */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Sparkles size={14} /> AI Interview Simulation Room
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Live AI Mock Interview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            Targeting: <strong>{targetRole}</strong> • Adaptive question engine with instant evaluation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium">
            <Clock size={14} className="text-indigo-500" />
            <span>{formatTimer(timerSeconds)}</span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/interview/report')}
          >
            End & View Report <ArrowRight size={14} />
          </Button>
        </div>
      </div>

      {/* Track Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => { setTrack('technical'); setCurrentIndex(0); }}
          className={clsx(
            'px-4 py-2 rounded-xl text-xs font-semibold transition-all',
            track === 'technical'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
          )}
        >
          Technical Round (10 Questions)
        </button>
        <button
          onClick={() => { setTrack('behavioral'); setCurrentIndex(0); }}
          className={clsx(
            'px-4 py-2 rounded-xl text-xs font-semibold transition-all',
            track === 'behavioral'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
          )}
        >
          Behavioral & HR Round (2 Questions)
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
        {questions.map((q, idx) => {
          const isAnswered = !!userAnswers[q.id];
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={q.id}
              onClick={() => { setCurrentIndex(idx); setShowHint(false); setShowSample(false); }}
              className={clsx(
                'w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center flex-shrink-0',
                isCurrent
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : isAnswered
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200'
              )}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Main Question & Simulation Card */}
      <Card className="border border-indigo-100 dark:border-indigo-950 shadow-md">
        {/* AI Interviewer Prompt Header */}
        <div className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <Bot size={24} className="text-white" />
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <Badge variant="primary" size="xs">{currentQ.topic}</Badge>
              <Badge variant="default" size="xs">{currentQ.difficulty}</Badge>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.text}
            </h2>
          </div>
        </div>

        {/* Answer Workspace */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <User size={14} className="text-indigo-500" /> Your Formulated Answer:
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <Lightbulb size={13} /> {showHint ? 'Hide Key Concepts' : 'Show Key Concepts'}
              </button>
            </div>
          </div>

          {/* Hint callout */}
          {showHint && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1 animate-in fade-in">
              <div className="font-bold flex items-center gap-1.5">
                <Lightbulb size={13} className="text-amber-500" /> Key concepts an interviewer expects:
              </div>
              <ul className="list-disc pl-5 space-y-0.5">
                {currentQ.keyPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Textarea */}
          <div className="relative">
            <textarea
              rows={6}
              value={currentAnswer}
              onChange={(e) => setUserAnswers({ ...userAnswers, [currentQ.id]: e.target.value })}
              placeholder="Structure your answer clearly. Explain core principles, provide technical examples, and address performance or edge cases..."
              className="w-full p-4 rounded-xl text-sm bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
              aria-label="Your answer input"
            />
            <div className="absolute right-3 bottom-3 text-[11px] text-slate-400">
              {currentAnswer.length} chars
            </div>
          </div>

          {/* Controls: Voice input, Quick paste sample, Evaluate */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <Button
                variant={isRecording ? 'danger' : 'secondary'}
                size="sm"
                onClick={handleSpeechToggle}
                className={clsx(isRecording && 'animate-pulse')}
              >
                {isRecording ? <MicOff size={14} /> : <Mic size={14} />}
                {isRecording ? 'Listening (Click to stop)' : 'Voice Input (Simulated)'}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUserAnswers({ ...userAnswers, [currentQ.id]: currentQ.sampleAnswer })}
              >
                Fill Suggested Answer
              </Button>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleEvaluateQuestion}
              disabled={!currentAnswer.trim()}
            >
              <Sparkles size={14} /> Evaluate This Answer
            </Button>
          </div>

          {/* Real-time AI Evaluation result card */}
          {isCurrentEvaluated && (
            <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-indigo-600 dark:text-indigo-400" />
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    Answer Evaluation Score: {evaluated[currentQ.id].score}/100
                  </span>
                </div>
                <Badge variant="success" size="xs">Evaluated</Badge>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {evaluated[currentQ.id].feedback}
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => setShowSample(!showSample)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  {showSample ? 'Hide Model Answer' : 'Compare with Industry Standard Answer'}
                </button>
                {showSample && (
                  <div className="mt-2 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 italic">
                    "{currentQ.sampleAnswer}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setCurrentIndex(Math.max(0, currentIndex - 1));
              setShowHint(false);
              setShowSample(false);
            }}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={16} /> Previous Question
          </Button>

          {currentIndex < questions.length - 1 ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setCurrentIndex(currentIndex + 1);
                setShowHint(false);
                setShowSample(false);
              }}
            >
              Next Question <ChevronRight size={16} />
            </Button>
          ) : (
            <Button
              variant="success"
              size="sm"
              onClick={() => navigate('/interview/report')}
            >
              Finish Interview & View Full Report <Check size={16} />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
