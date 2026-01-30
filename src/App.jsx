import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Public Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

// Candidate Pages
import CandidateDashboard from './pages/candidate/Dashboard'
import CareerGuidance from './pages/candidate/CareerGuidance'
import ResumeBuilder from './pages/candidate/ResumeBuilder'
import CoverLetterGenerator from './pages/candidate/CoverLetterGenerator'
import InterviewPrep from './pages/candidate/InterviewPrep'
import Recommendations from './pages/candidate/Recommendations'
import JobListings from './pages/candidate/JobListings'
import JobDetails from './pages/candidate/JobDetails'
import ApplyJob from './pages/candidate/ApplyJob'

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/Dashboard'
import PostJob from './pages/recruiter/PostJob'
import ApplicantsList from './pages/recruiter/ApplicantsList'
import ApplicantDetail from './pages/recruiter/ApplicantDetail'

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Candidate Routes */}
        <Route path="/candidate" element={<DashboardLayout userType="candidate" />}>
          <Route index element={<CandidateDashboard />} />
          <Route path="career-guidance" element={<CareerGuidance />} />
          <Route path="resume-builder" element={<ResumeBuilder />} />
          <Route path="cover-letter" element={<CoverLetterGenerator />} />
          <Route path="interview-prep" element={<InterviewPrep />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="jobs" element={<JobListings />} />
          <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="jobs/:id/apply" element={<ApplyJob />} />
        </Route>

        {/* Recruiter Routes */}
        <Route path="/recruiter" element={<DashboardLayout userType="recruiter" />}>
          <Route index element={<RecruiterDashboard />} />
          <Route path="dashboard" element={<RecruiterDashboard />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="applicants" element={<ApplicantsList />} />
          <Route path="applicants/:id" element={<ApplicantDetail />} />
        </Route>
      </Routes>
    </>
  )
}
