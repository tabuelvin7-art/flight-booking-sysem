import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, User, LogOut, LayoutDashboard, Settings, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Dropdown, { DropdownItem } from './Dropdown';

export default function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition" onClick={closeMobileMenu}>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl">
              <Plane className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold text-gray-900">Skyline Travels</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 lg:gap-10">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition text-sm lg:text-base">HOME</Link>
            <Link to="/flights" className="text-gray-700 hover:text-blue-600 font-medium transition text-sm lg:text-base">FLIGHTS</Link>
            {user && (
              <>
                {user.isAdmin ? (
                  <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium transition text-sm lg:text-base">ADMIN</Link>
                ) : (
                  <>
                    <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition text-sm lg:text-base">DASHBOARD</Link>
                    <Link to="/my-bookings" className="text-gray-700 hover:text-blue-600 font-medium transition text-sm lg:text-base">BOOKINGS</Link>
                  </>
                )}
              </>
            )}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Desktop User Menu */}
            <div className="hidden md:block">
              {user ? (
                <Dropdown
                  trigger={
                    <div className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition">
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium hidden lg:inline">{user.name}</span>
                      {user.isAdmin && (
                        <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Admin</span>
                      )}
                    </div>
                  }
                >
                  {user.isAdmin ? (
                    <>
                      <DropdownItem onClick={() => navigate('/admin')}>
                        <div className="flex items-center gap-2">
                          <LayoutDashboard className="w-4 h-4" />
                          Admin Panel
                        </div>
                      </DropdownItem>
                      <DropdownItem onClick={() => navigate('/admin/profile')}>
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Admin Settings
                        </div>
                      </DropdownItem>
                    </>
                  ) : (
                    <>
                      <DropdownItem onClick={() => navigate('/dashboard')}>
                        <div className="flex items-center gap-2">
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </div>
                      </DropdownItem>
                      <DropdownItem onClick={() => navigate('/profile')}>
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Profile Settings
                        </div>
                      </DropdownItem>
                    </>
                  )}
                  <div className="border-t my-2" />
                  <DropdownItem onClick={handleLogout}>
                    <div className="flex items-center gap-2 text-red-600">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </div>
                  </DropdownItem>
                </Dropdown>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium text-sm lg:text-base">Login</Link>
                  <Link
                    to="/register"
                    className="bg-gray-900 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full hover:bg-gray-800 transition font-medium text-sm lg:text-base"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 font-medium transition px-4 py-2"
                onClick={closeMobileMenu}
              >
                HOME
              </Link>
              <Link 
                to="/flights" 
                className="text-gray-700 hover:text-blue-600 font-medium transition px-4 py-2"
                onClick={closeMobileMenu}
              >
                FLIGHTS
              </Link>
              {user && (
                <>
                  {user.isAdmin ? (
                    <>
                      <Link 
                        to="/admin" 
                        className="text-gray-700 hover:text-blue-600 font-medium transition px-4 py-2"
                        onClick={closeMobileMenu}
                      >
                        ADMIN PANEL
                      </Link>
                      <Link 
                        to="/admin/profile" 
                        className="text-gray-700 hover:text-blue-600 font-medium transition px-4 py-2"
                        onClick={closeMobileMenu}
                      >
                        ADMIN SETTINGS
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/dashboard" 
                        className="text-gray-700 hover:text-blue-600 font-medium transition px-4 py-2"
                        onClick={closeMobileMenu}
                      >
                        DASHBOARD
                      </Link>
                      <Link 
                        to="/my-bookings" 
                        className="text-gray-700 hover:text-blue-600 font-medium transition px-4 py-2"
                        onClick={closeMobileMenu}
                      >
                        MY BOOKINGS
                      </Link>
                      <Link 
                        to="/profile" 
                        className="text-gray-700 hover:text-blue-600 font-medium transition px-4 py-2"
                        onClick={closeMobileMenu}
                      >
                        PROFILE
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-600 hover:text-red-700 font-medium transition px-4 py-2"
                  >
                    LOGOUT
                  </button>
                </>
              )}
              {!user && (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-blue-600 font-medium transition px-4 py-2"
                    onClick={closeMobileMenu}
                  >
                    LOGIN
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition font-medium mx-4"
                    onClick={closeMobileMenu}
                  >
                    SIGN UP
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
