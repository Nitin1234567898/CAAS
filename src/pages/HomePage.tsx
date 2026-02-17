import React from 'react';
import { Link } from 'react-router-dom';
import { SignedOut } from '@clerk/clerk-react';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homeRoot} style={{ background: '#000', color: '#fff', minHeight: '100vh', transition: 'none' }}>
      {/* Hero Section */}
      <section className={styles.heroSection} style={{ background: '#000', color: '#fff', backgroundImage: 'none', boxShadow: 'none', transition: 'none' }}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle} style={{ color: '#fff', textShadow: 'none' }}>Create Custom AI Chatbots</h1>
          <p className={styles.heroSubtitle} style={{ color: '#fff', textShadow: 'none' }}>Build intelligent chatbots for your website in minutes. Customize personality, knowledge, and integrate seamlessly with just an API key.</p>
          <div className={styles.heroCtas}>
            <SignedOut>
              <Link to="/login" className={styles.ctaBtn} style={{ background: '#000', color: '#fff', backgroundImage: 'none', boxShadow: 'none', border: '1px solid #fff', transition: 'none', textShadow: 'none' }}>Get Started Free</Link>
            </SignedOut>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection} style={{ background: '#000', color: '#fff', transition: 'none' }}>
        <div className={styles.container}>
          <div className={styles.textCenter}>
            <h2 className={styles.featuresTitle} style={{ color: '#fff', textShadow: 'none' }}>Why Choose Our Chatbot Service?</h2>
            <p className={styles.featuresSubtitle} style={{ color: '#fff', textShadow: 'none' }}>Powerful features that make creating and managing chatbots effortless</p>
          </div>

          <div className={styles.featuresGrid}>
            {/* Feature 1 */}
            <div className={styles.featureCard} style={{ background: '#000', border: '1px solid #000000ff', boxShadow: 'none', color: '#fff', transition: 'none' }}>
              <div className={styles.featureIcon} style={{ background: '#fff', color: '#000', backgroundImage: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'none', transition: 'none' }}>
                <svg className="w-6 h-6" style={{ color: '#000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle} style={{ color: '#fff', textShadow: 'none' }}>Lightning Fast Setup</h3>
              <p className={styles.featureDesc} style={{ color: '#fff', textShadow: 'none' }}>Create your custom chatbot in minutes with our intuitive interface. No coding required, just configure and deploy.</p>
            </div>

            {/* Feature 2 */}
            <div className={styles.featureCard} style={{ background: '#000', border: '1px solid #000000ff', boxShadow: 'none', color: '#fff', transition: 'none' }}>
              <div className={styles.featureIcon} style={{ background: '#fff', color: '#000', backgroundImage: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'none', transition: 'none' }}>
                <svg className="w-6 h-6" style={{ color: '#000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle} style={{ color: '#fff', textShadow: 'none' }}>Customizable Personality</h3>
              <p className={styles.featureDesc} style={{ color: '#fff', textShadow: 'none' }}>Define your chatbot's tone, style, and knowledge base. Make it match your brand perfectly.</p>
            </div>

            {/* Feature 3 */}
            <div className={styles.featureCard} style={{ background: '#000', border: '1px solid #000000ff', boxShadow: 'none', color: '#fff', transition: 'none' }}>
              <div className={styles.featureIcon} style={{ background: '#fff', color: '#000', backgroundImage: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'none', transition: 'none' }}>
                <svg className="w-6 h-6" style={{ color: '#000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className={styles.featureTitle} style={{ color: '#fff', textShadow: 'none' }}>Easy Integration</h3>
              <p className={styles.featureDesc} style={{ color: '#fff', textShadow: 'none' }}>Get your API key instantly and integrate the chatbot into any website. Simple plug-and-play solution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection} style={{ background: '#000', color: '#fff', transition: 'none' }}>
        <div className={styles.container}>
          <div className={styles.textCenter}>
            <h2 className={styles.howItWorksTitle} style={{ color: '#fff', textShadow: 'none' }}>How It Works</h2>
            <p className={styles.howItWorksSubtitle} style={{ color: '#fff', textShadow: 'none' }}>Three simple steps to get your chatbot live</p>
          </div>

          <div className={styles.howItWorksGrid}>
            <div className={styles.howItWorksStep} style={{ background: '#000', border: '1px solid #fff', boxShadow: 'none', transition: 'none' }}>
              <div className={styles.howItWorksStepNumber} style={{ background: '#fff', color: '#000', backgroundImage: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'none', transition: 'none' }}>1</div>
              <h3 className={styles.howItWorksStepTitle} style={{ color: '#fff', textShadow: 'none' }}>Configure Your Bot</h3>
              <p className={styles.howItWorksStepDesc} style={{ color: '#fff', textShadow: 'none' }}>Set up your chatbot's personality, knowledge base, and appearance in our dashboard.</p>
            </div>

            <div className={styles.flowArrow}>
              <svg width="80" height="24" viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ overflow: 'visible' }}>
                <path d="M0 12 C 20 2, 60 22, 80 12" />
                <path d="M75 7 L80 12 L75 17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className={styles.howItWorksStep} style={{ background: '#000', border: '1px solid #fff', boxShadow: 'none', transition: 'none' }}>
              <div className={styles.howItWorksStepNumber} style={{ background: '#fff', color: '#000', backgroundImage: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'none', transition: 'none' }}>2</div>
              <h3 className={styles.howItWorksStepTitle} style={{ color: '#fff', textShadow: 'none' }}>Get Your API Key</h3>
              <p className={styles.howItWorksStepDesc} style={{ color: '#fff', textShadow: 'none' }}>Receive a unique API key that you can use to integrate the chatbot into your website.</p>
            </div>

            <div className={styles.flowArrow}>
              <svg width="80" height="24" viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ overflow: 'visible' }}>
                <path d="M0 12 C 20 22, 60 2, 80 12" />
                <path d="M75 7 L80 12 L75 17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className={styles.howItWorksStep} style={{ background: '#000', border: '1px solid #fff', boxShadow: 'none', transition: 'none' }}>
              <div className={styles.howItWorksStepNumber} style={{ background: '#fff', color: '#000', backgroundImage: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'none', transition: 'none' }}>3</div>
              <h3 className={styles.howItWorksStepTitle} style={{ color: '#fff', textShadow: 'none' }}>Deploy & Monitor</h3>
              <p className={styles.howItWorksStepDesc} style={{ color: '#fff', textShadow: 'none' }}>Add the chatbot to your website and monitor its performance through our analytics.</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default HomePage; 