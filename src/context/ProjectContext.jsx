import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROJECTS } from '../data/mockProjects.js';
import { detectCategory } from '../data/mockQuestionFlows.js';

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('autodevai_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_PROJECTS;
  });

  const [activeProjectId, setActiveProjectId] = useState(() => {
    const savedId = localStorage.getItem('autodevai_active_project_id');
    if (savedId) {
      return savedId;
    }
    return 'campus-attend';
  });

  useEffect(() => {
    localStorage.setItem('autodevai_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('autodevai_active_project_id', activeProjectId);
  }, [activeProjectId]);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0] || null;

  const getProject = (id) => {
    return projects.find((p) => p.id === id) || null;
  };

  const createProject = ({ name, type, idea }) => {
    const id = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `project-${Date.now()}`;

    const category = type && type !== 'auto' ? type : detectCategory(idea);

    const newProj = {
      id,
      name: name.trim() || 'Untitled Application',
      description: idea.length > 100 ? `${idea.slice(0, 97)}...` : idea,
      category,
      idea: idea.trim(),
      stage: 'REQUIREMENTS_DISCOVERY',
      progress: 15,
      status: 'In Progress',
      lastUpdated: 'Just now',
      nextAction: 'Answer Requirement Agent discovery questions',
      nextRoute: `/project/${id}/requirements/discovery`,
      answers: {},
      discoveryCompleted: false,
      requirementsApproved: false,
      architectureApproved: false,
      developmentCompleted: false,
      testsPassed: false,
      securityResolved: false,
      deployed: false,
      liveUrl: null,
    };

    setProjects((prev) => [newProj, ...prev]);
    setActiveProjectId(id);
    return newProj;
  };

  const updateProjectAnswers = (id, answers) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, answers: { ...p.answers, ...answers } } : p))
    );
  };

  const completeDiscovery = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              discoveryCompleted: true,
              stage: 'REQUIREMENTS_REVIEW',
              progress: 35,
              lastUpdated: 'Just now',
              nextAction: 'Review and approve generated requirements',
              nextRoute: `/project/${id}/requirements`,
            }
          : p
      )
    );
  };

  const approveRequirements = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              requirementsApproved: true,
              stage: 'ARCHITECTURE',
              progress: 50,
              lastUpdated: 'Just now',
              nextAction: 'Review and approve system architecture',
              nextRoute: `/project/${id}/architecture`,
            }
          : p
      )
    );
  };

  const approveArchitecture = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              architectureApproved: true,
              stage: 'DEVELOPMENT',
              progress: 68,
              lastUpdated: 'Just now',
              nextAction: 'Monitor development progress',
              nextRoute: `/project/${id}/development`,
            }
          : p
      )
    );
  };

  const completeDevelopment = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              developmentCompleted: true,
              stage: 'TESTING',
              progress: 80,
              lastUpdated: 'Just now',
              nextAction: 'Run automated test suite',
              nextRoute: `/project/${id}/testing`,
            }
          : p
      )
    );
  };

  const passTests = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              testsPassed: true,
              stage: 'SECURITY',
              progress: 90,
              lastUpdated: 'Just now',
              nextAction: 'Review security scan and remediate findings',
              nextRoute: `/project/${id}/security`,
            }
          : p
      )
    );
  };

  const resolveSecurity = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              securityResolved: true,
              stage: 'DEPLOYMENT',
              progress: 95,
              lastUpdated: 'Just now',
              nextAction: 'Trigger production deployment',
              nextRoute: `/project/${id}/deployment`,
            }
          : p
      )
    );
  };

  const completeDeployment = (id, liveUrl) => {
    const url = liveUrl || `https://${id}.autodev.app`;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              deployed: true,
              stage: 'COMPLETED',
              status: 'Live',
              progress: 100,
              lastUpdated: 'Just now',
              liveUrl: url,
              nextAction: 'Open live application',
              nextRoute: `/project/${id}/deployment`,
            }
          : p
      )
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        activeProjectId,
        setActiveProjectId,
        getProject,
        createProject,
        updateProjectAnswers,
        completeDiscovery,
        approveRequirements,
        approveArchitecture,
        completeDevelopment,
        passTests,
        resolveSecurity,
        completeDeployment,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
