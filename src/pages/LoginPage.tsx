import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-color rounded-lg flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to your ChatBot Service account
          </p>
        </div>
        
        <div className="card">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: "btn w-full",
                card: "bg-transparent shadow-none p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "btn btn-secondary w-full mb-3",
                dividerLine: "bg-gray-200",
                dividerText: "text-gray-500 text-sm",
                formFieldInput: "input",
                formFieldLabel: "text-sm font-medium text-gray-700 mb-2 block",
                footerActionLink: "text-primary-color hover:text-primary-hover",
                footerActionText: "text-gray-600"
              }
            }}
          />
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={() => window.location.href = '/signup'}
              className="text-primary-color hover:text-primary-hover font-medium bg-transparent border-none cursor-pointer"
            >
              Sign up for free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 