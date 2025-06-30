import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span>C</span>
            </div>
            <div className="logo-text">
              <span className="logo-title">ChatBot Service</span>
              <div className="logo-subtitle">AI-Powered Solutions</div>
            </div>
          </Link>

          {/* Right side: nav links + auth buttons */}
          <div className="navbar-right">
            <div className="nav-links">
              <Link 
                to="/dashboard" 
                className="btn btn-secondary text-sm px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
                Dashboard
              </Link>
              <Link 
                to="/integration-guide" 
                className="btn btn-primary text-sm px-4 py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Integration Guide
              </Link>
            </div>
            <div className="auth-buttons">
              <SignedIn>
                <div className="auth-signed-in">
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "user-avatar"
                      }
                    }}
                  />
                </div>
              </SignedIn>
              <SignedOut>
                <div className="auth-signed-out">
                  <SignInButton mode="modal">
                    <button className="btn btn-primary">
                      Sign In
                    </button>
                  </SignInButton>
                  <Link 
                    to="/login" 
                    className="btn btn-secondary"
                  >
                    Get Started
                  </Link>
                </div>
              </SignedOut>
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mobile-menu-btn"
              >
                <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <Link 
              to="/dashboard" 
              className="mobile-nav-link bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
              </svg>
              Dashboard
            </Link>
            <Link 
              to="/integration-guide" 
              className="mobile-nav-link bg-primary-color text-white hover:bg-primary-hover transition-colors duration-200 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Integration Guide
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 