import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.content}`}>
        <Link to="/" className={styles.brand} onClick={() => setIsMobileMenuOpen(false)}>
          <img src="/logo.png" alt="ChatBot Service Logo" className={styles.logo} />
          <div>
            <div className={styles.title}>ChatBot Service</div>
            <div className={styles.subtitle}>AI-Powered Solutions</div>
          </div>
        </Link>

        <button
          type="button"
          className={`glass-button glass-button--secondary ${styles.mobileToggle}`}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>

        <div className={styles.desktopNav}>
          <NavLink to="/dashboard" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            Dashboard
          </NavLink>
          <NavLink to="/integration-guide" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            Integration Guide
          </NavLink>

          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: styles.userAvatar } }} />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="glass-button glass-button--primary">Sign In</button>
            </SignInButton>
            <Link to="/login" className="glass-button glass-button--secondary">
              Get Started
            </Link>
          </SignedOut>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={`container ${styles.mobileMenuInner}`}>
            <NavLink to="/dashboard" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink to="/integration-guide" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
              Integration Guide
            </NavLink>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="glass-button glass-button--primary">Sign In</button>
              </SignInButton>
              <Link to="/login" className="glass-button glass-button--secondary" onClick={() => setIsMobileMenuOpen(false)}>
                Get Started
              </Link>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
