import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../pages/auth/AuthContext"; // Adjust path as needed

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  // Role-based menu
  const menuItems = {
    admin: [
      { label: "Dashboard", path: "/admin-dashboard" },
      { label: "Users", path: "/admin/users" },
      { label: "Settings", path: "/admin/settings" },
    ],
    doctor: [
      { label: "Dashboard", path: "/doctor-dashboard" },
      { label: "Appointments", path: "/doctor/appointments" },
      { label: "Patients", path: "/doctor/patients" },
    ],
    labs: [
      { label: "Dashboard", path: "/labs-dashboard" },
      { label: "Tests", path: "/labs/tests" },
      { label: "Reports", path: "/labs/reports" },
    ],
    accounts: [
      { label: "Dashboard", path: "/accounts-dashboard" },
      { label: "Invoices", path: "/accounts/invoices" },
      { label: "Payments", path: "/accounts/payments" },
    ],
  };

  const links = menuItems[user.role] || [];

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-[#141414] text-white px-6 py-3 flex justify-between items-center shadow-md relative z-50">
      {/* Left - Brand */}
      <div className="text-2xl font-bold cursor-pointer select-none">
        <Link to={`/${user.role}-dashboard`}>EHR System</Link>
      </div>

      {/* Center - Navigation Links */}
      <ul className="hidden md:flex space-x-8">
        {links.map(({ label, path }) => (
          <li key={path}>
            <Link
              to={path}
              className={`hover:text-[#dcdc3c] transition duration-200 ${
                location.pathname === path ? "text-[#dcdc3c] font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right - Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center space-x-2 focus:outline-none"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          <div className="bg-[#dcdc3c] text-black rounded-full w-10 h-10 flex items-center justify-center uppercase font-bold select-none">
            {(user.name && user.name[0]) || user.id[0] || "U"}
          </div>
          <span className="hidden md:block">
            {user.name || user.id} <span className="text-gray-300 text-sm">({user.role})</span>
          </span>
          <svg
            className={`w-4 h-4 ml-1 transition-transform duration-200 ${
              dropdownOpen ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg text-black ring-1 ring-black ring-opacity-5">
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-semibold">{user.name || user.id}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
            <ul>
              <li>
                <Link
                  to={`/${user.role}-dashboard`}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
