import React from 'react';
import { Link } from 'react-router-dom';
import { SignedOut } from '@clerk/clerk-react';
import GlassCard from '../components/GlassCard';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.root}>
      <section className={`page-wrap ${styles.hero}`}>
        <p className="ui-label">Futura Tasks System</p>
        <h1 className={styles.title}>Create custom AI chatbots with cinematic clarity.</h1>
        <p className={styles.subtitle}>
          Build, tune, and deploy assistants in minutes. Keep full control of personality, knowledge base, and integration flow.
        </p>
        <SignedOut>
          <Link to="/login" className={`glass-button glass-button--primary ${styles.cta}`}>
            Get Started Free
          </Link>
        </SignedOut>
      </section>

      <section className={`page-wrap ${styles.section}`}>
        <div className={styles.sectionHeading}>
          <p className="ui-label">Core Capabilities</p>
          <h2>Why teams choose this platform</h2>
        </div>

        <div className={styles.grid3}>
          <GlassCard className={styles.featureCard}>
            <h3>Lightning Setup</h3>
            <p className="ui-muted">Configure your bot quickly with a focused control panel and immediate deployment options.</p>
          </GlassCard>
          <GlassCard className={styles.featureCard}>
            <h3>Brand Personality</h3>
            <p className="ui-muted">Define tone and behavior so each chatbot responds in a way that matches your product voice.</p>
          </GlassCard>
          <GlassCard className={styles.featureCard}>
            <h3>Simple Integration</h3>
            <p className="ui-muted">Use your API key and connect to any frontend with a clean, production-friendly endpoint.</p>
          </GlassCard>
        </div>
      </section>

      <section className={`page-wrap ${styles.section}`}>
        <div className={styles.sectionHeading}>
          <p className="ui-label">Process</p>
          <h2>How it works</h2>
        </div>
        <div className={styles.steps}>
          <GlassCard className={styles.stepCard}>
            <span className={styles.stepNumber}>01</span>
            <h3>Configure</h3>
            <p className="ui-muted">Set chatbot identity, behavior, and knowledge profile.</p>
          </GlassCard>
          <GlassCard className={styles.stepCard}>
            <span className={styles.stepNumber}>02</span>
            <h3>Generate Key</h3>
            <p className="ui-muted">Use your unique API key and chatbot ID from the dashboard.</p>
          </GlassCard>
          <GlassCard className={styles.stepCard}>
            <span className={styles.stepNumber}>03</span>
            <h3>Deploy</h3>
            <p className="ui-muted">Embed, test, and monitor usage with your existing app setup.</p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
