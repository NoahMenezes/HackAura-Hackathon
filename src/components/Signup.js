// src/components/Signup.js

import React from 'react';

const Signup = ({ onGoBack }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent p-4">
      <div className="w-full max-w-md p-8 space-y-6 rounded-2xl feature-card text-center">
        <h2 className="text-3xl font-bold text-white">Create Your Account</h2>
        <p className="text-gray-400">Join Secretary.AI today and streamline your meetings.</p>
        <form className="space-y-4">
          <div>
            <label htmlFor="full-name" className="sr-only">
              Full Name
            </label>
            <input
              id="full-name"
              name="full-name"
              type="text"
              autoComplete="name"
              required
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full btn-primary text-white font-bold py-3 px-4 rounded-lg text-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-sm text-gray-400">
          Already have an account?{' '}
          <a href="#" onClick={onGoBack} className="font-medium text-purple-400 hover:text-purple-300">
            Log In
          </a>
        </div>
        <div className="mt-4">
            <button
                onClick={onGoBack}
                className="btn-secondary text-gray-400 hover:text-white font-bold py-2 px-4 rounded-lg"
            >
                ← Back to Home
            </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;