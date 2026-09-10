import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext.jsx';
import { ProjectProvider } from './context/ProjectContext.jsx';

// Layouts
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AppShell from './components/layout/AppShell.jsx';

// Public & Marketing Pages
import Home from './pages/Home.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';

// Authenticated Workspace Pages
import DashboardPage from './pages/DashboardPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import CreateProjectPage from './pages/CreateProjectPage.jsx';
import ProjectOverviewPage from './pages/ProjectOverviewPage.jsx';
import RequirementDiscoveryPage from './pages/RequirementDiscoveryPage.jsx';
import RequirementsReviewPage from './pages/RequirementsReviewPage.jsx';
import ArchitecturePage from './pages/ArchitecturePage.jsx';
import DevelopmentPage from './pages/DevelopmentPage.jsx';
import TestingPage from './pages/TestingPage.jsx';
import SecurityPage from './pages/SecurityPage.jsx';
import DeploymentPage from './pages/DeploymentPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import HelpPage from './pages/HelpPage.jsx';

// Global Styles
import './styles/variables.css';
import './styles/global.css';
import './styles/responsive.css';
import './styles/app.css';

function MarketingLayout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

function WorkspaceRoute({ children }) {
  return <AppShell>{children}</AppShell>;
}

export default function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing & Marketing Pages */}
            <Route
              path="/"
              element={
                <MarketingLayout>
                  <Home />
                </MarketingLayout>
              }
            />
            <Route
              path="/workflow"
              element={
                <MarketingLayout>
                  <PlaceholderPage
                    title="Workflow Deep Dive"
                    description="Explore the architecture and execution specifications of each AI agent in the AutoDevAI lifecycle."
                  />
                </MarketingLayout>
              }
            />
            <Route
              path="/how-it-works"
              element={
                <MarketingLayout>
                  <PlaceholderPage
                    title="How It Works"
                    description="Learn more about how autonomous agents collaborate to take your software requirements to production."
                  />
                </MarketingLayout>
              }
            />
            <Route
              path="/why-autodevai"
              element={
                <MarketingLayout>
                  <PlaceholderPage
                    title="Why AutoDevAI"
                    description="Discover how our continuous validation and human-in-the-loop safeguards empower developers."
                  />
                </MarketingLayout>
              }
            />
            <Route
              path="/about"
              element={
                <MarketingLayout>
                  <PlaceholderPage
                    title="About AutoDevAI"
                    description="Learn about our mission to reimagine software engineering through collaborative AI agent teams."
                  />
                </MarketingLayout>
              }
            />

            {/* Authentication Pages */}
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/get-started" element={<Navigate to="/create-project" replace />} />

            {/* Authenticated Workspace Application Routes */}
            <Route
              path="/dashboard"
              element={
                <WorkspaceRoute>
                  <DashboardPage />
                </WorkspaceRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <WorkspaceRoute>
                  <ProjectsPage />
                </WorkspaceRoute>
              }
            />
            <Route
              path="/create-project"
              element={
                <WorkspaceRoute>
                  <CreateProjectPage />
                </WorkspaceRoute>
              }
            />
            <Route
              path="/project/:id"
              element={
                <WorkspaceRoute>
                  <ProjectOverviewPage />
                </WorkspaceRoute>
              }
            />
            <Route
              path="/project/:id/requirements/discovery"
              element={
                <WorkspaceRoute>
                  <RequirementDiscoveryPage />
                </WorkspaceRoute>
              }
            />
            <Route
              path="/project/:id/requirements"
              element={
                <WorkspaceRoute>
                  <RequirementsReviewPage />
                </WorkspaceRoute>
              }
            />
            <Route
              path="/project/:id/architecture"
              element={
                <WorkspaceRoute>
                  <ArchitecturePage />
                </WorkspaceRoute>
              }
            />
            <Route
              path="/project/:id/development"
              element={
                <WorkspaceRoute>
                  <DevelopmentPage />
                </WorkspaceRoute>
              }
            />
            <Route
              path="/project/:id/testing"
              element={
                <WorkspaceRoute>
                  <TestingPage />
                </WorkspaceRoute>
              }
            />
            <Route
              path="/project/:id/security"
              element={
                <WorkspaceRoute>
                  <SecurityPage />
                </WorkspaceRoute>
              }
            />
            <Route
              path="/project/:id/deployment"
              element={
                <WorkspaceRoute>
                  <DeploymentPage />
                </WorkspaceRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <WorkspaceRoute>
                  <SettingsPage />
                </WorkspaceRoute>
              }
            />
            <Route
              path="/help"
              element={
                <WorkspaceRoute>
                  <HelpPage />
                </WorkspaceRoute>
              }
            />

            {/* Fallback */}
            <Route
              path="*"
              element={
                <MarketingLayout>
                  <PlaceholderPage
                    title="Page Not Found"
                    description="The page you requested does not exist."
                  />
                </MarketingLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </ProjectProvider>
    </AuthProvider>
  );
}
