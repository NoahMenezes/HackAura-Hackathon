import React from 'react';

// 1. Accept the new onLoginSuccess prop
const Login = ({ onGoBack, onLoginSuccess }) => {
  // 2. Create a handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the browser from reloading the page
    
    // NOTE: In a real application, you would perform validation and
    // make an API call to your backend here to verify credentials.

    // For now, we'll just simulate a successful login.
    console.log('Login successful!');
    onLoginSuccess(); // This call will navigate to the main app page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent p-4">
      <div className="w-full max-w-md p-8 space-y-6 rounded-2xl feature-card text-center">
        <h2 className="text-3xl font-bold text-white">Log In to Your Account</h2>
        <p className="text-gray-400">Welcome back! Please enter your details.</p>
        {/* 3. Attach the handleSubmit function to the form's onSubmit event */}
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              autoComplete="current-password"
              required
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 bg-gray-800 border-gray-600 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            {/* The button's default type is "submit", which triggers the form's onSubmit */}
            <button
              type="submit"
              className="w-full btn-primary text-white font-bold py-3 px-4 rounded-lg text-lg"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="text-sm text-gray-400">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
            Sign Up
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

export default Login;