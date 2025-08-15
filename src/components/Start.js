

import React from 'react';

const Start = ({ onNavigateToLogin, onNavigateToSignup }) => {
  return (
    // Main container to center content vertically and horizontally
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      
      {/* The main heading with a custom class for the hover effect */}
      <h1 className="welcome-heading text-5xl md:text-8xl font-black text-white hero-glow mb-12">
        Welcome to Secretary.AI
      </h1>

      {/* Container for the buttons */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
        <button
          onClick={onNavigateToLogin}
          className="btn-primary text-white font-bold py-3 px-12 rounded-lg text-lg"
        >
          Login
        </button>
        <button
          onClick={onNavigateToSignup}
          className="btn-secondary text-white font-bold py-3 px-12 rounded-lg text-lg"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Start;