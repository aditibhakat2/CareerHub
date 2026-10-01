import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, GraduationCap, Briefcase,
  FileText, Plus, Save, ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, Button, Badge, SkillChip } from '../components/ui';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, resume, updateUser, targetRole, setTargetRole, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: user.name || 'Alex Sharma',
    email: user.email || 'alex.sharma@example.com',
    targetRole: targetRole || 'Full Stack Developer',
    education: user.education || 'B.Tech Computer Science Engineering',
    college: user.college || 'NIT Trichy',
    location: user.location || 'Bangalore, Karnataka',
    graduationYear: user.graduationYear || 2025,
    careerGoal: user.careerGoal || 'Become a Full Stack Developer at a product-based tech company.',
    skills: resume.extractedProfile?.skills || ['JavaScript', 'React.js', 'Node.js', 'REST APIs', 'MongoDB', 'Git'],
  });

  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (formData.skills.includes(newSkill.trim())) {
      showToast('Skill already listed', 'warning');
      return;
    }
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()],
    }));
    setNewSkill('');
    showToast('Skill added!', 'success');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove),
    }));
  };

  const handleSave = () => {
    updateUser(formData);
    setTargetRole(formData.targetRole);
    showToast('Profile and preferences updated successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Candidate Profile & Preferences
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            Manage your career goals, verified academic details, and industry skill inventory.
          </p>
        </div>

        <Button variant="primary" onClick={handleSave}>
          <Save size={16} /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Profile Card & Resume Preview */}
        <div className="space-y-5">
          <Card className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3 shadow-md">
              {formData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">{formData.name}</h3>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">{formData.targetRole}</p>
            <p className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
              <MapPin size={12} /> {formData.location}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-left space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <GraduationCap size={14} className="text-indigo-500" />
                <span>{formData.education}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={14} className="text-indigo-500" />
                <span>Class of {formData.graduationYear} • {formData.college}</span>
              </div>
            </div>
          </Card>

          {/* Active Resume Card */}
          <Card className="border-indigo-100 dark:border-indigo-950 bg-indigo-50/20 dark:bg-indigo-950/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText size={14} className="text-indigo-600" /> Active Resume
              </span>
              <Badge variant="success" size="xs">ATS Score: {resume.score}%</Badge>
            </div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
              {resume.fileName}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Updated on {resume.uploadDate} • {resume.fileSize}
            </p>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3"
              onClick={() => navigate('/resume')}
            >
              Manage Resume <ArrowRight size={13} />
            </Button>
          </Card>
        </div>

        {/* Right Column: Edit Details & Skills */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal & Career Details */}
          <Card>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4">
              Academic & Professional Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Career Role
                </label>
                <select
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  College / University
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Career Statement & Primary Aspiration
                </label>
                <textarea
                  rows={2}
                  value={formData.careerGoal}
                  onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </Card>

          {/* Skill Inventory Manager */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Skill Inventory ({formData.skills.length})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verified skills extracted from your resume and coursework
                </p>
              </div>
            </div>

            {/* Add skill input */}
            <form onSubmit={handleAddSkill} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Add custom skill (e.g. Docker, GraphQL)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button type="submit" variant="primary" size="sm">
                <Plus size={14} /> Add Skill
              </Button>
            </form>

            {/* Skills chips */}
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, idx) => (
                <SkillChip
                  key={idx}
                  skill={skill}
                  variant="matched"
                  onRemove={() => handleRemoveSkill(skill)}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
