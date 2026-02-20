import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import BackgroundCanvas from './components/BackgroundCanvas';
import ConfettiCanvas from './features/confetti/ConfettiCanvas';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import IntegrationGuide from './pages/IntegrationGuide';

function App() {
  return (
    <div className="app-shell">
      <BackgroundCanvas />
      <ConfettiCanvas />
      <div className="app-content">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              <>
                <SignedIn>
                  <Dashboard />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route path="/integration-guide" element={<IntegrationGuide />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
