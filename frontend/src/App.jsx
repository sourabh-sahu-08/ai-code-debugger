import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import DebugWorkspace from './components/debugger/DebugWorkspace';
import Projects from './pages/projects/Projects';
import DebugHistory from './pages/history/DebugHistory';
import Friends from './pages/friends/Friends';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      
      {/* Protected App Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/debugger" element={
        <ProtectedRoute>
          <DashboardLayout>
            <DebugWorkspace />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/projects" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Projects />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/history" element={
        <ProtectedRoute>
          <DashboardLayout>
            <DebugHistory />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/friends" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Friends />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
