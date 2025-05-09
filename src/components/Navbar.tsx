import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <svg 
                className="h-10 w-10 text-lms-primary mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                />
              </svg>
              <span className="text-2xl font-bold text-lms-primary tracking-tight">LearnHub</span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-base font-medium transition-colors px-3 py-2 rounded-md ${
                  isActive('/') 
                    ? 'text-lms-primary bg-lms-light' 
                    : 'text-gray-700 hover:text-lms-primary hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/courses" 
                className={`text-base font-medium transition-colors px-3 py-2 rounded-md ${
                  isActive('/courses') 
                    ? 'text-lms-primary bg-lms-light' 
                    : 'text-gray-700 hover:text-lms-primary hover:bg-gray-50'
                }`}
              >
                Courses
              </Link>
              <Link 
                to="/about" 
                className={`text-base font-medium transition-colors px-3 py-2 rounded-md ${
                  isActive('/about') 
                    ? 'text-lms-primary bg-lms-light' 
                    : 'text-gray-700 hover:text-lms-primary hover:bg-gray-50'
                }`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`text-base font-medium transition-colors px-3 py-2 rounded-md ${
                  isActive('/contact') 
                    ? 'text-lms-primary bg-lms-light' 
                    : 'text-gray-700 hover:text-lms-primary hover:bg-gray-50'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="px-5 py-2 text-lms-primary border-lms-primary hover:bg-lms-light font-medium"
            >
              Sign In
            </Button>
            <Button 
              className="px-5 py-2 bg-lms-primary hover:bg-lms-secondary text-white font-medium"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="flex items-center p-2 rounded-md text-gray-700 hover:text-lms-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lms-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-md text-base font-medium ${
                isActive('/') ? 'text-lms-primary bg-lms-light' : 'text-gray-700 hover:text-lms-primary hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={`block px-4 py-3 rounded-md text-base font-medium ${
                isActive('/courses') ? 'text-lms-primary bg-lms-light' : 'text-gray-700 hover:text-lms-primary hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/about"
              className={`block px-4 py-3 rounded-md text-base font-medium ${
                isActive('/about') ? 'text-lms-primary bg-lms-light' : 'text-gray-700 hover:text-lms-primary hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block px-4 py-3 rounded-md text-base font-medium ${
                isActive('/contact') ? 'text-lms-primary bg-lms-light' : 'text-gray-700 hover:text-lms-primary hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="grid grid-cols-2 gap-3 pt-4 pb-2">
              <Button 
                variant="outline" 
                className="text-lms-primary border-lms-primary hover:bg-lms-light w-full justify-center"
              >
                Sign In
              </Button>
              <Button 
                className="bg-lms-primary hover:bg-lms-secondary w-full justify-center"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}