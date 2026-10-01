import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ResumePage from './pages/ResumePage';
import ResumeAnalysisPage from './pages/ResumeAnalysisPage';
import JobsPage from './pages/JobsPage';
import JobAnalyzerPage from './pages/JobAnalyzerPage';
import JobMatchPage from './pages/JobMatchPage';
import SkillGapsPage from './pages/SkillGapsPage';
import LearningRoadmapPage from './pages/LearningRoadmapPage';
import MockInterviewPage from './pages/MockInterviewPage';
import InterviewReportPage from './pages/InterviewReportPage';
import CareerProgressPage from './pages/CareerProgressPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import ComingSoonPage from './pages/ComingSoonPage';

// Scroll to top component on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Marketing & Auth Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Application Workspace Pages */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/resume/analysis" element={<ResumeAnalysisPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/analyzer" element={<JobAnalyzerPage />} />
            <Route path="/jobs/match" element={<JobMatchPage />} />
            <Route path="/skills" element={<SkillGapsPage />} />
            <Route path="/learning" element={<LearningRoadmapPage />} />
            <Route path="/interview" element={<MockInterviewPage />} />
            <Route path="/interview/report" element={<InterviewReportPage />} />
            <Route path="/career-progress" element={<CareerProgressPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Feature Previews / Roadmap */}
            <Route path="/github" element={<ComingSoonPage />} />
            <Route path="/coding-interview" element={<ComingSoonPage />} />
            <Route path="/voice-interview" element={<ComingSoonPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
