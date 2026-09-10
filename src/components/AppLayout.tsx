import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export const AppLayout: React.FC = () => {
  const location = useLocation()

  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-content">
        <TopBar />
        <main className="page-viewport" key={location.pathname}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
