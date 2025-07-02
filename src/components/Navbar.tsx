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
            <img src="/logo.png" alt="ChatBot Service Logo" className="logo-img" />
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
                style={{
                  position: 'relative',
                  minWidth: 120,
                  minHeight: 36,
                  padding: '0.7rem 1.3rem',
                  borderRadius: 10,
                  fontSize: '1.02rem',
                  fontWeight: 600,
                  background: 'linear-gradient(120deg, #2563eb 40%, #6366f1 100%)',
                  color: '#fff',
                  border: 'none',
                  boxShadow: '0 2px 8px 0 rgb(37 99 235 / 0.10)',
                  cursor: 'pointer',
                  transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
                  overflow: 'hidden',
                  zIndex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundSize: '200% 200%',
                  backgroundPosition: '0% 50%',
                  textDecoration: 'none'
                }}
                onMouseMove={e => {
                  const btn = e.currentTarget;
                  const rect = btn.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  btn.style.setProperty('--x', `${x}%`);
                  btn.style.backgroundPosition = `${x}% 50%`;
                }}
                onClick={e => {
                  const btn = e.currentTarget;
                  let ripple = btn.querySelector('.ripple-effect');
                  if (!ripple) {
                    ripple = document.createElement('span');
                    ripple.className = 'ripple-effect';
                    btn.appendChild(ripple);
                  }
                  const rippleEl = ripple as HTMLElement;
                  rippleEl.classList.remove('show');
                  void rippleEl.offsetWidth;
                  rippleEl.classList.add('show');
                  const rect = btn.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  rippleEl.style.left = `${x}px`;
                  rippleEl.style.top = `${y}px`;
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
                Dashboard
                <span className="ripple-effect"></span>
              </Link>
              <Link
                to="/integration-guide"
                style={{
                  position: 'relative',
                  minWidth: 120,
                  minHeight: 36,
                  padding: '0.7rem 1.3rem',
                  borderRadius: 10,
                  fontSize: '1.02rem',
                  fontWeight: 500,
                  background: 'linear-gradient(120deg, #e0e7ff 40%, #c7d2fe 100%)',
                  color: '#2563eb',
                  border: 'none',
                  boxShadow: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
                  overflow: 'hidden',
                  zIndex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundSize: '200% 200%',
                  backgroundPosition: '0% 50%',
                  textDecoration: 'none'
                }}
                onMouseMove={e => {
                  const btn = e.currentTarget;
                  const rect = btn.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  btn.style.setProperty('--x', `${x}%`);
                  btn.style.backgroundPosition = `${x}% 50%`;
                }}
                onClick={e => {
                  const btn = e.currentTarget;
                  let ripple = btn.querySelector('.ripple-effect');
                  if (!ripple) {
                    ripple = document.createElement('span');
                    ripple.className = 'ripple-effect';
                    btn.appendChild(ripple);
                  }
                  const rippleEl = ripple as HTMLElement;
                  rippleEl.classList.remove('show');
                  void rippleEl.offsetWidth;
                  rippleEl.classList.add('show');
                  const rect = btn.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  rippleEl.style.left = `${x}px`;
                  rippleEl.style.top = `${y}px`;
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Integration Guide
                <span className="ripple-effect"></span>
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
                    <button
                      className="fancy-btn"
                      onClick={(e) => {
                        // Ripple effect
                        const btn = e.currentTarget;
                        const ripple = btn.querySelector('.ripple-effect') as HTMLSpanElement;
                        if (ripple) {
                          ripple.classList.remove('show');
                          void ripple.offsetWidth;
                          ripple.classList.add('show');
                          const rect = btn.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          ripple.style.left = `${x}px`;
                          ripple.style.top = `${y}px`;
                        }
                      }}
                    >
                      Sign In
                      <span className="ripple-effect"></span>
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