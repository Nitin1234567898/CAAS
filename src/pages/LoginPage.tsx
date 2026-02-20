import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import GlassCard from '../components/GlassCard';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  return (
    <div className={`page-wrap ${styles.root}`}>
      <GlassCard className={styles.card}>
        <div className={styles.header}>
          <p className="ui-label">Authentication</p>
          <h1>Welcome back</h1>
          <p className="ui-muted">Sign in to manage your chatbot workspaces.</p>
        </div>

        <SignIn
          appearance={{
            elements: {
              card: 'bg-transparent shadow-none p-0',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              formButtonPrimary: 'glass-button glass-button--primary',
              socialButtonsBlockButton: 'glass-button glass-button--secondary',
              formFieldInput: 'glass-input',
              formFieldLabel: 'ui-label',
              footerActionLink: 'ui-muted',
              footerActionText: 'ui-muted',
            },
          }}
        />
      </GlassCard>
    </div>
  );
};

export default LoginPage;
