import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, BarChart2, RefreshCw, Eye, Sparkles, Calendar, HardDrive } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, Button, Badge, SectionHeader, EmptyState } from '../components/ui';
import { clsx } from 'clsx';

export default function ResumePage() {
  const { resume, uploadResume, showToast } = useApp();
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      showToast('Please upload a PDF or Word document', 'error');
      return;
    }
    await simulateUpload(file.name);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) await simulateUpload(file.name);
  };

  const simulateUpload = async (fileName) => {
    setUploading(true);
    await new Promise(r => setTimeout(r, 1500));
    uploadResume(fileName);
    setUploading(false);
  };

  const hasResume = resume?.status === 'analyzed';

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Resume Workspace</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Upload and manage your resume</p>
        </div>
        {hasResume && (
          <Button variant="primary" onClick={() => navigate('/resume/analysis')}>
            <BarChart2 size={16} /> View Analysis
          </Button>
        )}
      </div>

      {/* Upload area */}
      {!hasResume && (
        <Card padding={false}>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={clsx(
              'border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-200 cursor-pointer',
              dragging ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950' : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900'
            )}
            onClick={() => fileRef.current?.click()}
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center mx-auto mb-4">
              <Upload size={28} className="text-indigo-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {dragging ? 'Drop your resume here' : 'Upload your resume'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Drag and drop your PDF or Word file, or click to browse
            </p>
            <Button variant="outline" size="md" onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}>
              Choose File
            </Button>
            <p className="text-xs text-slate-400 mt-4">Supported: PDF, DOC, DOCX &bull; Max 10 MB</p>
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} aria-label="Upload resume file" />
          </div>
        </Card>
      )}

      {/* Uploading state */}
      {uploading && (
        <Card className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center animate-spin">
            <RefreshCw size={20} className="text-indigo-600" />
          </div>
          <div>
            <div className="font-medium text-slate-900 dark:text-white">Uploading and analyzing...</div>
            <div className="text-sm text-slate-400">This will take a moment</div>
          </div>
        </Card>
      )}

      {/* Resume card */}
      {hasResume && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950 flex items-center justify-center flex-shrink-0">
                <FileText size={28} className="text-red-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{resume.fileName}</h3>
                  <Badge variant="success">
                    <CheckCircle size={11} /> Analyzed
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                    <HardDrive size={13} /> {resume.fileSize}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                    <Calendar size={13} /> Uploaded {resume.uploadDate}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="primary" onClick={() => navigate('/resume/analysis')}>
                <BarChart2 size={16} /> Analyze Resume
              </Button>
              <Button variant="secondary" onClick={() => navigate('/resume/analysis')}>
                <Eye size={16} /> View Analysis
              </Button>
              <Button variant="secondary" onClick={() => navigate('/resume/analysis')}>
                <Sparkles size={16} /> Improve Resume
              </Button>
              <Button variant="ghost" onClick={() => fileRef.current?.click()}>
                <RefreshCw size={16} /> Replace Resume
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} aria-label="Replace resume file" />
              </Button>
            </div>
          </Card>

          {/* Score card */}
          <Card className="flex flex-col items-center text-center">
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Resume Quality Score</div>
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="12" className="dark:stroke-slate-800" />
                <circle
                  cx="50" cy="50" r="42" fill="none" stroke="#6366f1" strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - resume.score / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{resume.score}</span>
                <span className="text-xs text-slate-400">/100</span>
              </div>
            </div>
            <div className="mt-4 space-y-2 w-full">
              {Object.entries(resume.breakdown).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{val}/100</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Empty state if no resume */}
      {!hasResume && !uploading && (
        <EmptyState
          icon={FileText}
          title="No resume uploaded yet"
          description="Upload your resume to start the CareerHub journey — analysis, job matching, and skill gap identification all depend on your resume."
        />
      )}

      {/* Checklist */}
      <Card>
        <SectionHeader title="Resume Workspace Checklist" subtitle="Complete these steps to maximize your CareerHub experience" />
        <div className="mt-4 space-y-3">
          {[
            { label: 'Upload resume', done: hasResume },
            { label: 'Review resume analysis', done: false },
            { label: 'Apply resume improvement suggestions', done: false },
            { label: 'Analyze a target job description', done: false },
            { label: 'Review explainable job match', done: false },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={clsx('w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0', item.done ? 'bg-emerald-500' : 'border-2 border-slate-300 dark:border-slate-600')}>
                {item.done && <CheckCircle size={12} className="text-white" />}
              </div>
              <span className={clsx('text-sm', item.done ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-700 dark:text-slate-200')}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
