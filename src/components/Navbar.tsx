import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar" style={{ background: '#000', boxShadow: 'none' }}>
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src="/logo.png" alt="ChatBot Service Logo" className="logo-img" />
            <div className="logo-text">
              <span className="logo-title" style={{ color: '#fff' }}>ChatBot Service</span>
              <div className="logo-subtitle" style={{ color: '#fff' }}>AI-Powered Solutions</div>
            </div>
          </Link>

          {/* Right side: nav links + auth buttons */}
          <div className="navbar-right">
            <div className="nav-links">
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  background: '#080808ff',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid #000000ff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '14px'
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
                Dashboard
              </button>
              <button
                onClick={() => navigate('/integration-guide')}
                style={{
                  background: '#000000ff',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid #000000ff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '14px'
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Integration Guide
              </button>
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
                      style={{ background: '#fff', color: '#000', border: '1px solid #fff', boxShadow: 'none', transition: 'none' }}
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
                    style={{ background: '#fff', color: '#000', border: '1px solid #fff', boxShadow: 'none', transition: 'none' }}
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
          <div className="mobile-menu" style={{ background: '#000', borderTop: '1px solid #fff' }}>
            <Link
              to="/dashboard"
              className="mobile-nav-link"
              style={{ background: '#000', color: '#fff', border: '1px solid #fff', transition: 'none' }}
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
              className="mobile-nav-link"
              style={{ background: '#000', color: '#fff', border: '1px solid #fff', transition: 'none' }}
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