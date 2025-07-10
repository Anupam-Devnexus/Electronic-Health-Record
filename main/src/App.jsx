import "./App.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./pages/auth/AuthContext";
import ProtectedRoute from "./shared/ProtectedRoutes/ProtectedRoute";

import Navbar from "./shared/Navigationbar/Navbar";

import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/Dashboard/Admin/Dashboard";
import DoctorDashboard from "./pages/Dashboard/Doctors/Dashboard";
import LabsDashboard from "./pages/Dashboard/Labs/Dashboard";
import NurseDashboard from "./pages/Dashboard/Nurse/Dashboard";
import Unauthorized from "./pages/Unauthorized";

import AdminLayout from "../src/pages/Dashboard/Admin/Adminlayou";

// userdash 
import UserDash from "./pages/Dashboard/Admin/User/UserDash";
import Alluser from "./pages/Dashboard/Admin/User/Alluser";
import Adduser from "./pages/Dashboard/Admin/User/Adduser";

// labs
import LabsDash from "./pages/Dashboard/Admin/Labs/LabsDash";
import LabReport from "./pages/Dashboard/Admin/Labs/LabReports";
import LabsAssistants from "./pages/Dashboard/Admin/Labs/LabsAssistanst"; 


// finance
import FinDash from "./pages/Dashboard/Admin/Finance/FinDash"; 
import Reports from "./pages/Dashboard/Admin/Finance/Reports"; 

// admin pharmacy
import PharmacyDash from "./pages/Dashboard/Admin/Pharmacy/PharmacyDash"; 
import PharmacyInventory from "./pages/Dashboard/Admin/Pharmacy/PharmacyInventry"; // Uncomment if you have a separate inventory page
import PharmacyIssue from "./pages/Dashboard/Admin/Pharmacy/MedicineIssue"; // Uncomment if you have a separate issue page

// admin wards
import WardsDash from "./pages/Dashboard/Admin/Wards/WardsDash"; // Uncomment if you have a wards dashboard

function AppContent() {
  const location = useLocation();
  const { user } = useAuth();

  const hideNavbar = location.pathname === "/" || location.pathname === "/unauthorized";

  return (
    <div className="">
      {!hideNavbar && user && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin nested routes under AdminLayout */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          {/* admin user routes */}
          <Route path="/admin-dashboard/allusers" element={<Alluser />} />
          <Route path="/admin-dashboard/user-dash" element={<UserDash />} />
          <Route path="/admin-dashboard/add-user" element={<Adduser />} />

          {/* admin labs routes */}
          <Route path="/admin-dashboard/labs-dash" element={<LabsDash />} />
          <Route path="/admin-dashboard/labs-report" element={<LabReport />} />
          <Route path="/admin-dashboard/labs-assistants" element={<LabsAssistants />} />

          {/* admin finance routes */}
          <Route path="/admin-dashboard/finance-dash" element={<FinDash />} />
          <Route path="/admin-dashboard/finance-reports" element={<Reports />} />

          {/* pharmacy routes */}
          <Route path="/admin-dashboard/pharmacy-dash" element={<PharmacyDash />} />
          <Route path="/admin-dashboard/pharmacy-inventory" element={<PharmacyInventory />} />
          <Route path="/admin-dashboard/pharmacy-issue" element={<PharmacyIssue />} />

          {/* wards routes */}
          <Route path="/admin-dashboard/wards-dash" element={<WardsDash />} />

        </Route>

        {/* Other dashboards */}
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
    </div>
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
