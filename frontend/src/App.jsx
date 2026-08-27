import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AnalysisDetail from "./pages/AnalysisDetail";
import PublicAnalysis from "./pages/PublicAnalysis";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// v2 Components
import LandingV2 from "./v2/pages/Landing";
import DebuggerV2 from "./v2/pages/DebuggerV2";

// JWT Protected Route Gate
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Router>
      <Toaster 
        position="top-right" 
        theme="dark" 
        toastOptions={{
          style: {
            background: "rgba(10, 18, 36, 0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "#f1f5f9"
          }
        }} 
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingV2 />} />
        <Route path="/legacy" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/analysis/public/:id" element={<PublicAnalysis />} />

        {/* Secure Developer Workspace Routes */}
        <Route path="/v2/debugger" element={<DebuggerV2 />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/analysis/:id"
          element={
            <ProtectedRoute>
              <AnalysisDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Fallback routing to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
