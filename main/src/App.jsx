import './App.css';

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./pages/auth/AuthContext";
import ProtectedRoute from "./shared/ProtectedRoutes/ProtectedRoute";

import Navbar from "./shared/Navigationbar/Navbar"; // Import Navbar here

import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/Dashboard/Admin/Dashboard";
import DoctorDashboard from "./pages/Dashboard/Doctors/Dashboard";
import LabsDashboard from "./pages/Dashboard/Labs/Dashboard";
import NurseDashboard from "./pages/Dashboard/Nurse/Dashboard";
import Unauthorized from "./pages/Unauthorized";

// Wrapper to handle Navbar visibility based on route & auth
function AppContent() {
  const location = useLocation();
  const { user } = useAuth();

  // Hide navbar on login and unauthorized page
  const hideNavbar = location.pathname === "/" || location.pathname === "/unauthorized";

  return (
    <>
      {!hideNavbar && user && <Navbar />} {/* Render Navbar only if not on login or unauthorized page */}
      {/* Render the routes */}
      {/* The Navbar will be hidden on the login and unauthorized pages */}
      {/* The Navbar will be visible on all other pages */}
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/labs-dashboard"
          element={
            <ProtectedRoute allowedRoles={["labs"]}>
              <LabsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nurse-dashboard"
          element={
            <ProtectedRoute allowedRoles={["nurse"]}>
              <NurseDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
