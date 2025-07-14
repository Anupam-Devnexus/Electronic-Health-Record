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

// Layouts
import AdminLayout from "../src/pages/Dashboard/Admin/Adminlayou";
import DoctorsLayout from "./pages/Dashboard/Doctors/Doctorslayout";

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
import PharmacyInventory from "./pages/Dashboard/Admin/Pharmacy/PharmacyInventry";
import PharmacyIssue from "./pages/Dashboard/Admin/Pharmacy/MedicineIssue";

// admin wards
import WardsDash from "./pages/Dashboard/Admin/Wards/WardsDash";

// Reports
import RevenueReports from "./pages/Dashboard/Reports/ReportRevenue";
import ReportDash from "./pages/Dashboard/Reports/ReportDash"

// admin team
import Teamdash from "./pages/Dashboard/Team/TeamDash";
import Teamdoc from "./pages/Dashboard/Team/TeamDoct";
import Teamnurse from "./pages/Dashboard/Team/TeamNurse";
import Teamlabs from "./pages/Dashboard/Team/TeamLabstaff";


// Doctor Route starts here
import DoctorAppoinment from "./pages/Dashboard/Doctors/Appoinments/TodayAppoinment";
import AllApoinment from "./pages/Dashboard/Doctors/Appoinments/AllApoinment";
import CurrentPatientList from "./pages/Dashboard/Doctors/Patient/CurrentPatientList";
import AllPatient from "./pages/Dashboard/Doctors/Patient/AllPatient";
import AddPatient from "./pages/Dashboard/Doctors/Patient/AddPatient";

// Doctor Lab Report
import DoctLabReports from "./pages/Dashboard/Doctors/LabReports/AllReports";
import AddReport from "./pages/Dashboard/Doctors/LabReports/AddReport";

// Prescription 
import AddPriscription from "./pages/Dashboard/Doctors/Prescription/AddPrescription";
import AllPriscription from "./pages/Dashboard/Doctors/Prescription/AllPrescription";

// Doct Performance
import DoctStats from "./pages/Dashboard/Doctors/Performance/DoctSats";
import PatientFeedback from "./pages/Dashboard/Doctors/Performance/PatientFeedback";


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

          {/* Report routes */}
          <Route path="/admin-dashboard/reports-dash" element={<ReportDash />} />
          <Route path="/admin-dashboard/reports-revenue" element={<RevenueReports />} />

          {/* admin team route */}
          <Route path="/admin-dashboard/team-dash" element={<Teamdash />} />
          <Route path="/admin-dashboard/team-doctor" element={<Teamdoc />} />
          <Route path="/admin-dashboard/team-nurse" element={<Teamnurse />} />
          <Route path="/admin-dashboard/team-lab" element={<Teamlabs />} />

        </Route>

        {/* doctor dashboards */}
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorsLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DoctorDashboard />} />
          {/* appoinments */}
          <Route path="/doctor-dashboard/appointments" element={<DoctorAppoinment />} />
          <Route path="/doctor-dashboard/all-apointments" element={<AllApoinment/>}/>
          <Route path="/doctor-dashboard/current-patient" element ={<CurrentPatientList/>}/>

          {/* Patient */}
          <Route path ="/doctor-dashboard/current-patient" element={<CurrentPatientList/>}/>
          <Route path ="/doctor-dashboard/all-patient" element={<AllPatient/>}/>
          <Route path="/doctor-dashboard/add-patient" element={<AddPatient/>}/>

          {/* Reports */}
          <Route path="/doctor-dashboard/reports" element={<DoctLabReports/>}/>
          <Route path="/doctor-dashboard/add-reports" element={<AddReport/>}/>

          {/* Prescription */}
          <Route path="/doctor-dashboard/all-prescription" element={<AllPriscription/>}/>
          <Route path="/doctor-dashboard/add-prescription" element={<AddPriscription/>}/>

          {/* Performance */}
          <Route path="/doctor-dashboard/stats" element={<DoctStats/>}/>
          <Route path ="/doctor-dashboard/feedbacks" element={<PatientFeedback/>}/>


        </Route>

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
