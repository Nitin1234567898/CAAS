import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homeRoot}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Create Custom AI Chatbots</h1>
          <p className={styles.heroSubtitle}>Build intelligent chatbots for your website in minutes. Customize personality, knowledge, and integrate seamlessly with just an API key.</p>
          <div className={styles.heroCtas}>
            <SignedOut>
              <Link to="/login" className={styles.ctaBtn}>Get Started Free</Link>
            </SignedOut>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.textCenter}>
            <h2 className={styles.featuresTitle}>Why Choose Our Chatbot Service?</h2>
            <p className={styles.featuresSubtitle}>Powerful features that make creating and managing chatbots effortless</p>
          </div>

          <div className={styles.featuresGrid}>
            {/* Feature 1 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Lightning Fast Setup</h3>
              <p className={styles.featureDesc}>Create your custom chatbot in minutes with our intuitive interface. No coding required, just configure and deploy.</p>
            </div>

            {/* Feature 2 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Customizable Personality</h3>
              <p className={styles.featureDesc}>Define your chatbot's tone, style, and knowledge base. Make it match your brand perfectly.</p>
            </div>

            {/* Feature 3 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Easy Integration</h3>
              <p className={styles.featureDesc}>Get your API key instantly and integrate the chatbot into any website. Simple plug-and-play solution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection}>
        <div className={styles.container}>
          <div className={styles.textCenter}>
            <h2 className={styles.howItWorksTitle}>How It Works</h2>
            <p className={styles.howItWorksSubtitle}>Three simple steps to get your chatbot live</p>
          </div>

          <div className={styles.howItWorksGrid}>
            <div className={styles.howItWorksStep}>
              <div className={styles.howItWorksStepNumber}>1</div>
              <h3 className={styles.howItWorksStepTitle}>Configure Your Bot</h3>
              <p className={styles.howItWorksStepDesc}>Set up your chatbot's personality, knowledge base, and appearance in our dashboard.</p>
            </div>

            <div className={styles.howItWorksStep}>
              <div className={styles.howItWorksStepNumber}>2</div>
              <h3 className={styles.howItWorksStepTitle}>Get Your API Key</h3>
              <p className={styles.howItWorksStepDesc}>Receive a unique API key that you can use to integrate the chatbot into your website.</p>
            </div>

            <div className={styles.howItWorksStep}>
              <div className={styles.howItWorksStepNumber}>3</div>
              <h3 className={styles.howItWorksStepTitle}>Deploy & Monitor</h3>
              <p className={styles.howItWorksStepDesc}>Add the chatbot to your website and monitor its performance through our analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaSectionTitle}>Ready to Create Your Chatbot?</h2>
          <p className={styles.ctaSectionSubtitle}>Join thousands of businesses using our chatbot service to improve customer engagement.</p>
          <SignedOut>
            <Link to="/login" className={styles.ctaBtn}>Start Building Now</Link>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard" className={styles.ctaBtn}>Go to Your Dashboard</Link>
          </SignedIn>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 