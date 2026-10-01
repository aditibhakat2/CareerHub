import { clsx } from 'clsx';

// Button Component
export function Button({ children, variant = 'primary', size = 'md', className = '', disabled = false, onClick, type = 'button', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm hover:shadow-md',
    secondary: 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 focus:ring-indigo-500 shadow-sm',
    ghost: 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-indigo-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-sm',
    outline: 'border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 focus:ring-indigo-500',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
    icon: 'p-2',
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

// Badge Component
export function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const base = 'inline-flex items-center gap-1 font-medium rounded-full';
  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    primary: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    danger: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  };
  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };
  return (
    <span className={clsx(base, variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}

// Card Component
export function Card({ children, className = '', padding = true, hover = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm',
        padding && 'p-6',
        hover && 'hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

// Progress Bar Component
export function ProgressBar({ value, max = 100, color = 'indigo', size = 'md', showLabel = false, className = '' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const colors = {
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  };
  const sizes = { sm: 'h-1.5', md: 'h-2', lg: 'h-3', xl: 'h-4' };
  return (
    <div className={clsx('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span></span><span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className={clsx('w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={clsx('h-full rounded-full transition-all duration-700 ease-out', colors[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// Circular Progress Component
export function CircularProgress({ value, max = 100, size = 100, strokeWidth = 8, color = '#6366f1', trackColor, label, sublabel }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor || 'currentColor'}
            strokeWidth={strokeWidth}
            className="text-slate-100 dark:text-slate-800"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-bold text-slate-900 dark:text-white" style={{ fontSize: size * 0.2 }}>
            {value}
          </span>
          {sublabel && <span className="text-slate-500 dark:text-slate-400" style={{ fontSize: size * 0.1 }}>{sublabel}</span>}
        </div>
      </div>
      {label && <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>}
    </div>
  );
}

// Stat Card Component
export function StatCard({ icon: Icon, label, value, sublabel, trend, trendUp, color = 'indigo', className = '' }) {
  const colors = {
    indigo: 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400',
    purple: 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400',
    blue: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
  };
  return (
    <Card className={clsx('flex flex-col gap-3', className)}>
      <div className="flex items-start justify-between">
        <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', colors[color])}>
          {Icon && <Icon size={20} />}
        </div>
        {trend && (
          <span className={clsx('text-xs font-medium flex items-center gap-0.5', trendUp ? 'text-emerald-600' : 'text-red-500')}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
        {sublabel && <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{sublabel}</div>}
      </div>
    </Card>
  );
}

// Status Badge Component
export function StatusBadge({ status }) {
  const map = {
    matched: { label: 'Matched', variant: 'success', dot: 'bg-emerald-500' },
    partial: { label: 'Partial Match', variant: 'warning', dot: 'bg-amber-500' },
    missing: { label: 'Missing', variant: 'danger', dot: 'bg-red-500' },
    uncertain: { label: 'Uncertain', variant: 'info', dot: 'bg-blue-500' },
    completed: { label: 'Completed', variant: 'success', dot: 'bg-emerald-500' },
    'in-progress': { label: 'In Progress', variant: 'primary', dot: 'bg-indigo-500' },
    'not-started': { label: 'Not Started', variant: 'default', dot: 'bg-slate-400' },
    upcoming: { label: 'Upcoming', variant: 'default', dot: 'bg-slate-400' },
  };
  const cfg = map[status] || { label: status, variant: 'default', dot: 'bg-slate-400' };
  return (
    <Badge variant={cfg.variant}>
      <span className={clsx('w-1.5 h-1.5 rounded-full', cfg.dot)} />
      {cfg.label}
    </Badge>
  );
}

// Skill Chip Component
export function SkillChip({ skill, variant = 'default', size = 'sm', onRemove }) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    matched: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    missing: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-800',
    primary: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
  };
  const sizes = { sm: 'px-2.5 py-1 text-xs', md: 'px-3 py-1.5 text-sm' };
  return (
    <span className={clsx('inline-flex items-center gap-1 rounded-lg font-medium', variants[variant], sizes[size])}>
      {skill}
      {onRemove && (
        <button onClick={() => onRemove(skill)} className="ml-1 hover:opacity-70" aria-label={`Remove ${skill}`}>×</button>
      )}
    </span>
  );
}

// Empty State Component
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <Icon size={32} className="text-slate-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">{title}</h3>
      {description && <p className="text-slate-500 dark:text-slate-400 max-w-xs mb-6">{description}</p>}
      {action}
    </div>
  );
}

// Section Header Component
export function SectionHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={clsx('flex items-start justify-between gap-4', className)}>
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

// Loading Skeleton
export function Skeleton({ className = '' }) {
  return <div className={clsx('animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg', className)} />;
}

// Toast Component
export function Toast({ toast }) {
  if (!toast) return null;
  const colors = {
    success: 'bg-emerald-600',
    error: 'bg-red-600',
    warning: 'bg-amber-500',
    info: 'bg-blue-600',
  };
  return (
    <div className={clsx(
      'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl text-white shadow-lg text-sm font-medium animate-in slide-in-from-bottom-4',
      colors[toast.type] || colors.info
    )}>
      {toast.message}
    </div>
  );
}

// Priority Badge
export function PriorityBadge({ priority }) {
  const map = {
    high: { label: 'High Priority', variant: 'danger' },
    medium: { label: 'Medium', variant: 'warning' },
    low: { label: 'Low', variant: 'default' },
  };
  const cfg = map[priority] || { label: priority, variant: 'default' };
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}

// Divider
export function Divider({ className = '' }) {
  return <hr className={clsx('border-slate-200 dark:border-slate-800', className)} />;
}

// Chart Card wrapper
export function ChartCard({ title, subtitle, children, action, className = '' }) {
  return (
    <Card className={clsx(className)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </Card>
  );
}
