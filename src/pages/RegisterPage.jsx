import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, User, Mail, Lock, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui';

const roles = ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Data Scientist', 'DevOps Engineer', 'Mobile Developer', 'UI/UX Designer', 'Other'];
const levels = ['Fresher (0 years)', 'Entry Level (0-1 year)', 'Junior (1-3 years)', 'Mid Level (3-5 years)'];

function InputWrap({ icon: Icon, children }) {
  return (
    <div className="relative">
      <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      {children}
    </div>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useApp();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', password: '', targetRole: 'Full Stack Developer', experienceLevel: 'Fresher (0 years)',
  });

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    register(form);
    setLoading(false);
    navigate('/dashboard');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white text-xl">CareerHub</span>
            <div className="text-[10px] text-slate-400">One Hub for Your Career Journey</div>
          </div>
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create your career profile</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Start your smarter career journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="reg-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
              <InputWrap icon={User}>
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Alex Sharma"
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </InputWrap>
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
              <InputWrap icon={Mail}>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="alex@example.com"
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </InputWrap>
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <InputWrap icon={Lock}>
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </InputWrap>
            </div>

            <div>
              <label htmlFor="reg-role" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Target Role</label>
              <InputWrap icon={Briefcase}>
                <select
                  id="reg-role"
                  name="targetRole"
                  value={form.targetRole}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                >
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </InputWrap>
            </div>

            <div>
              <label htmlFor="reg-level" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Experience Level</label>
              <InputWrap icon={GraduationCap}>
                <select
                  id="reg-level"
                  name="experienceLevel"
                  value={form.experienceLevel}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                >
                  {levels.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </InputWrap>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full mt-2" disabled={loading}>
              {loading ? 'Creating your profile...' : <>Create Career Profile <ArrowRight size={16} /></>}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Sign in</Link>
          </p>
        </div>


      </div>
    </div>
  );
}
