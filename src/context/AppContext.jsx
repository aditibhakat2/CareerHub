import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockUser, mockResume, mockLearningRoadmap } from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  AUTH: 'careerhub_auth',
  USER: 'careerhub_user',
  RESUME: 'careerhub_resume',
  TARGET_ROLE: 'careerhub_target_role',
  SELECTED_JOB: 'careerhub_selected_job',
  LEARNING_PROGRESS: 'careerhub_learning_progress',
  INTERVIEW_PROGRESS: 'careerhub_interview_progress',
  THEME: 'careerhub_theme',
  ONBOARDING: 'careerhub_onboarding',
};

function loadFromStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors in demo
  }
}

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => loadFromStorage(STORAGE_KEYS.AUTH, false));
  const [user, setUser] = useState(() => loadFromStorage(STORAGE_KEYS.USER, mockUser));
  const [resume, setResume] = useState(() => loadFromStorage(STORAGE_KEYS.RESUME, mockResume));
  const [targetRole, setTargetRole] = useState(() => loadFromStorage(STORAGE_KEYS.TARGET_ROLE, 'Full Stack Developer'));
  const [selectedJob, setSelectedJob] = useState(() => loadFromStorage(STORAGE_KEYS.SELECTED_JOB, null));
  const [learningProgress, setLearningProgress] = useState(() => loadFromStorage(STORAGE_KEYS.LEARNING_PROGRESS, mockLearningRoadmap));
  const [interviewProgress, setInterviewProgress] = useState(() => loadFromStorage(STORAGE_KEYS.INTERVIEW_PROGRESS, null));
  const [isDarkMode, setIsDarkMode] = useState(() => loadFromStorage(STORAGE_KEYS.THEME, false));
  const [onboardingComplete, setOnboardingComplete] = useState(() => loadFromStorage(STORAGE_KEYS.ONBOARDING, false));
  const [toast, setToast] = useState(null);

  // Apply dark mode to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    saveToStorage(STORAGE_KEYS.THEME, isDarkMode);
  }, [isDarkMode]);

  useEffect(() => { saveToStorage(STORAGE_KEYS.AUTH, isAuthenticated); }, [isAuthenticated]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.USER, user); }, [user]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.RESUME, resume); }, [resume]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.TARGET_ROLE, targetRole); }, [targetRole]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.SELECTED_JOB, selectedJob); }, [selectedJob]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.LEARNING_PROGRESS, learningProgress); }, [learningProgress]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.INTERVIEW_PROGRESS, interviewProgress); }, [interviewProgress]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.ONBOARDING, onboardingComplete); }, [onboardingComplete]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const login = useCallback((_email, _password) => {
    // Mock authentication
    setIsAuthenticated(true);
    setUser(mockUser);
    showToast('Welcome back, Alex!', 'success');
    return true;
  }, [showToast]);

  const loginDemo = useCallback(() => {
    setIsAuthenticated(true);
    setUser(mockUser);
    showToast('Demo mode activated. Welcome, Alex!', 'success');
    return true;
  }, [showToast]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    showToast('Logged out successfully', 'info');
  }, [showToast]);

  const register = useCallback((data) => {
    setIsAuthenticated(true);
    setUser({ ...mockUser, ...data });
    setOnboardingComplete(false);
    showToast('Account created! Let\'s set up your profile.', 'success');
    return true;
  }, [showToast]);

  const updateUser = useCallback((updates) => {
    setUser(prev => ({ ...prev, ...updates }));
    showToast('Profile updated', 'success');
  }, [showToast]);

  const uploadResume = useCallback((fileName) => {
    setResume({ ...mockResume, fileName, uploadDate: new Date().toISOString().split('T')[0] });
    showToast(`Resume "${fileName}" uploaded successfully`, 'success');
  }, [showToast]);

  const updateLearningProgress = useCallback((phaseIdx, itemIdx, updates) => {
    setLearningProgress(prev => {
      const updated = prev.map((phase, pi) => {
        if (pi !== phaseIdx) return phase;
        return {
          ...phase,
          items: phase.items.map((item, ii) =>
            ii === itemIdx ? { ...item, ...updates } : item
          ),
        };
      });
      return updated;
    });
    showToast('Learning progress updated', 'success');
  }, [showToast]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      user,
      resume,
      targetRole,
      selectedJob,
      learningProgress,
      interviewProgress,
      isDarkMode,
      onboardingComplete,
      toast,
      login,
      loginDemo,
      logout,
      register,
      updateUser,
      uploadResume,
      setSelectedJob,
      setTargetRole,
      setInterviewProgress,
      updateLearningProgress,
      toggleDarkMode,
      setOnboardingComplete,
      showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
