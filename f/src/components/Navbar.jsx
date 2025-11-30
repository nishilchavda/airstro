import React, { useState } from "react";
import { Menu, User, X } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Plane } from "lucide-react";

function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Left: logo + desktop links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-2xl font-bold text-[#0000cc]"
              onClick={closeMobile}
            >
              Airstro
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-sm font-medium text-gray-700 hover:text-[#0000cc]"
              >
                Book
              </Link>
              <Link
                to="/deals"
                className="text-sm font-medium text-gray-700 hover:text-[#0000cc]"
              >
                Deals and Offers
              </Link>
              <Link
                to="/trips"
                className="text-sm font-medium text-gray-700 hover:text-[#0000cc]"
              >
                My Trips
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-gray-700 hover:text-[#0000cc]"
              >
                About Us
              </Link>

              {/* Admin Dashboard - only for admin */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-sm font-medium text-[#0000cc] hover:underline"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Right: auth buttons + hamburger */}
          <div className="flex items-center gap-4">
            {/* Desktop auth */}
            {!isAuthenticated && (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button
                    size="sm"
                    className="hidden md:flex bg-[#0000cc] hover:bg-[#0000aa] text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-gray-700">
                  Hi, <span className="font-semibold">{user?.fullName}</span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700"
                >
                  Logout
                </Button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 pb-4">
            <div className="flex flex-col gap-2 pt-3">
              <Link
                to="/"
                onClick={closeMobile}
                className="px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Book
              </Link>
              <Link
                to="/deals"
                onClick={closeMobile}
                className="px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Deals and Offers
              </Link>
              <Link
                to="/trips"
                onClick={closeMobile}
                className="px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                My Trips
              </Link>
              <Link
                to="/about"
                onClick={closeMobile}
                className="px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                About Us
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={closeMobile}
                  className="px-2 py-2 text-sm font-medium text-[#0000cc] hover:bg-gray-50 rounded-md"
                >
                  Admin Dashboard
                </Link>
              )}

              <div className="border-t border-gray-200 mt-2 pt-2" />

              {!isAuthenticated ? (
                <>
                  <Link to="/login" onClick={closeMobile}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-center mt-1"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={closeMobile}>
                    <Button className="w-full justify-center mt-2 bg-[#0000cc] hover:bg-[#0000aa] text-white">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center mt-2 text-red-600 border-red-300 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
