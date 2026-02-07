import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    const titles = {
      '/dashboard': 'Dashboard',
      '/employees': 'Employee Management',
      '/attendance': 'Attendance Management',
    };
    return titles[location.pathname] || 'HRMS Lite';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">📊 HRMS Lite</div>
          <div className="sidebar-subtitle">HR Management System</div>
        </div>
        <nav className="sidebar-nav">
          <div
            className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => {
              navigate('/dashboard');
              setSidebarOpen(false);
            }}
          >
            <span className="nav-icon">📈</span>
            Dashboard
          </div>
          <div
            className={`nav-item ${isActive('/employees') ? 'active' : ''}`}
            onClick={() => {
              navigate('/employees');
              setSidebarOpen(false);
            }}
          >
            <span className="nav-icon">👥</span>
            Employees
          </div>
          <div
            className={`nav-item ${isActive('/attendance') ? 'active' : ''}`}
            onClick={() => {
              navigate('/attendance');
              setSidebarOpen(false);
            }}
          >
            <span className="nav-icon">📋</span>
            Attendance
          </div>
        </nav>

        <div className="sidebar-footer">
          <button
            onClick={() => navigate('/')}
            className="nav-item"
            style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer' }}
          >
            <span className="nav-icon">🏠</span>
            Back to Home
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <button
            className="btn btn-icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ display: 'none' }}
          >
            ☰
          </button>
          <div className="header-title">{getPageTitle()}</div>
          <div className="header-actions">
            <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Welcome, Admin
            </span>
          </div>
        </header>

        {/* Content Area */}
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
