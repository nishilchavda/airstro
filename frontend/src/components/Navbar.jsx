
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // npm install jwt-decode

export default function Navbar() {
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const checkAuthAndFetchRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);

        // Decode token to get user ID
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        // Fetch role from backend
        const res = await axios.get(
          `http://localhost:5000/api/auth/role/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setRole(res.data.role);
      } catch (error) {
        console.error("Error fetching role:", error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchRole();
  }, []);

  if (loading) {
    return (
      <div className="fixed left-0 top-0 h-16 w-full bg-blue-800 text-white flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Flights", path: "/flight" },
    { name: "Category", path: "/category" },
    { name: "Reviews", path: "/Reviews" },
    { name: "About", path: "/About" },
    { name: "Contact", path: "/Contact" },
    { name: "Profile", path: "/profile" },
  ];

  // Only show Admin if role is admin
  if (role === "admin") {
    menuItems.push({ name: "Admin", path: "/admin" });
  }

  return (
    <nav className="flex justify-between items-center p-4 text-[#ffffff] bg-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl">Airstro</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`w-full flex items-center gap-2 px-3 py-1.5 text-left font-medium rounded-md m-2 transform transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-indigo-600 bg-[#ffffff] scale-105 shadow-md"
                      : "text-[#ffffff] hover:bg-white hover:text-blue-700 hover:scale-105"
                  }`}
              >
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Side: Buttons */}
        <div className="flex gap-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-indigo-600 bg-[#ffffff] font-semibold px-4 py-2 rounded-lg hover:bg-white hover:text-[#001f4d] transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-indigo-600 bg-[#ffffff] font-semibold px-4 py-2 rounded-lg hover:bg-white hover:text-[#001f4d] transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-indigo-600 bg-[#ffffff] font-semibold px-4 py-2 rounded-lg hover:bg-white hover:text-[#001f4d] transition-all duration-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
