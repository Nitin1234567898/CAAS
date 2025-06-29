import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-color to-primary-hover text-white py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Create Custom AI Chatbots
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto opacity-90">
            Build intelligent chatbots for your website in minutes. 
            Customize personality, knowledge, and integrate seamlessly with just an API key.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <Link to="/login" className="btn bg-white text-primary-color hover:bg-gray-100">
                Get Started Free
              </Link>
            </SignedOut>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Why Choose Our Chatbot Service?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features that make creating and managing chatbots effortless
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-color rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast Setup</h3>
              <p className="text-gray-600 text-sm">
                Create your custom chatbot in minutes with our intuitive interface. 
                No coding required, just configure and deploy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-color rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Customizable Personality</h3>
              <p className="text-gray-600 text-sm">
                Define your chatbot's tone, style, and knowledge base. 
                Make it match your brand perfectly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-color rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Integration</h3>
              <p className="text-gray-600 text-sm">
                Get your API key instantly and integrate the chatbot into any website. 
                Simple plug-and-play solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to get your chatbot live
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 bg-primary-color rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Configure Your Bot</h3>
              <p className="text-gray-600 text-sm">
                Set up your chatbot's personality, knowledge base, and appearance in our dashboard.
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 bg-primary-color rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Your API Key</h3>
              <p className="text-gray-600 text-sm">
                Receive a unique API key that you can use to integrate the chatbot into your website.
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 bg-primary-color rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Deploy & Monitor</h3>
              <p className="text-gray-600 text-sm">
                Add the chatbot to your website and monitor its performance through our analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary-color text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your Chatbot?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of businesses using our chatbot service to improve customer engagement.
          </p>
          <SignedOut>
            <Link to="/login" className="btn bg-white text-primary-color hover:bg-gray-100">
              Start Building Now
            </Link>
          </SignedOut>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 