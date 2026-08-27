import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      {/* Dashboard placeholders */}
      <Route path="/dashboard" element={<div className="p-8 text-white">Dashboard Layout Coming Soon</div>} />
      <Route path="/debugger" element={<div className="p-8 text-white">Debugger Workspace Coming Soon</div>} />
    </Routes>
  );
}

export default App;
