import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import DebugWorkspace from './components/debugger/DebugWorkspace';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      
      {/* Protected App Routes */}
      <Route path="/dashboard" element={
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      } />
      
      <Route path="/debugger" element={
        <DashboardLayout>
          <DebugWorkspace />
        </DashboardLayout>
      } />
      
      {/* Placeholders for remaining dashboard routes */}
      <Route path="/projects" element={<DashboardLayout><div className="p-8 text-white">Projects Coming Soon</div></DashboardLayout>} />
      <Route path="/history" element={<DashboardLayout><div className="p-8 text-white">Debug History Coming Soon</div></DashboardLayout>} />
      <Route path="/learn" element={<DashboardLayout><div className="p-8 text-white">Learn Coming Soon</div></DashboardLayout>} />
      <Route path="/challenges" element={<DashboardLayout><div className="p-8 text-white">Challenges Coming Soon</div></DashboardLayout>} />
      <Route path="/friends" element={<DashboardLayout><div className="p-8 text-white">Friends Coming Soon</div></DashboardLayout>} />
      <Route path="/community" element={<DashboardLayout><div className="p-8 text-white">Community Coming Soon</div></DashboardLayout>} />
      <Route path="/achievements" element={<DashboardLayout><div className="p-8 text-white">Achievements Coming Soon</div></DashboardLayout>} />
      <Route path="/profile" element={<DashboardLayout><div className="p-8 text-white">Profile Coming Soon</div></DashboardLayout>} />
      <Route path="/settings" element={<DashboardLayout><div className="p-8 text-white">Settings Coming Soon</div></DashboardLayout>} />
    </Routes>
  );
}

export default App;
