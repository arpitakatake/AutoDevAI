import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { LandingPage } from './pages/LandingPage'
import { DashboardPage } from './pages/DashboardPage'
import { NewProjectPage } from './pages/NewProjectPage'
import { AIWorkflowPage } from './pages/AIWorkflowPage'
import { ProjectDetailsPage } from './pages/ProjectDetailsPage'
import { RequirementsPage } from './pages/RequirementsPage'
import { ArchitecturePage } from './pages/ArchitecturePage'
import { DevelopmentPage } from './pages/DevelopmentPage'
import { TestingPage } from './pages/TestingPage'
import { SecurityPage } from './pages/SecurityPage'
import { DeploymentPage } from './pages/DeploymentPage'
import { SettingsPage } from './pages/SettingsPage'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Landing / Start Page is the initial entry point */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* Platform Shell with Sidebar + TopBar */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/new-project" element={<NewProjectPage />} />
          <Route path="/workflow" element={<AIWorkflowPage />} />
          <Route path="/project-details" element={<ProjectDetailsPage />} />
          <Route path="/requirements" element={<RequirementsPage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/development" element={<DevelopmentPage />} />
          <Route path="/testing" element={<TestingPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/deployment" element={<DeploymentPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
