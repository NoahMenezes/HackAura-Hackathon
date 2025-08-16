import React from 'react';

const Header = ({ 
  isAuthenticated, 
  onSignOut, 
  onLoginClick, 
  onSignupClick, 
  onGoBack,
  onFeaturesClick,
  onHowItWorksClick 
}) => {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 relative z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          {/* Use onGoBack for the main logo link to return home */}
          <a href="#" onClick={onGoBack} className="text-2xl font-bold text-white">
            Secretary.AI
          </a>
        </div>

        {/* --- Desktop Menu --- */}
        <div className="hidden md:flex items-center space-x-8">
          {/* --- NEW HOME BUTTON ADDED HERE --- */}
          <a href="#" onClick={onGoBack} className="hover:text-purple-400 transition-colors">Home</a>
          
          <a href="#" onClick={onFeaturesClick} className="hover:text-purple-400 transition-colors">Features</a>
          <a href="#" onClick={onHowItWorksClick} className="hover:text-purple-400 transition-colors">How It Works</a>
          
          <div className='flex items-center space-x-4'>
            {isAuthenticated ? (
              <button
                onClick={onSignOut}
                className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                Sign Out
              </button>
            ) : (
              <>
                <a href="#" onClick={onLoginClick} className="hover:text-purple-400 transition-colors">
                  Login
                </a>
                <a href="#" onClick={onSignupClick} className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200 transition-all">
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>

        {/* --- Mobile Menu Button --- */}
        <div className="md:hidden">
          <button id="menu-btn" className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      <div id="mobile-menu" className="hidden md:hidden mt-4">
        <ul className="flex flex-col space-y-4 items-center">
          {/* --- NEW HOME BUTTON ADDED HERE --- */}
          <li><a href="#" onClick={onGoBack} className="block text-center hover:text-purple-400 transition-colors">Home</a></li>
          
          <li><a href="#" onClick={onFeaturesClick} className="block text-center hover:text-purple-400 transition-colors">Features</a></li>
          <li><a href="#" onClick={onHowItWorksClick} className="block text-center hover:text-purple-400 transition-colors">How It Works</a></li>
          <hr className='w-full border-gray-700' />
          {isAuthenticated ? (
            <li>
              <button onClick={onSignOut} className="w-full bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-all">
                Sign Out
              </button>
            </li>
          ) : (
            <>
              <li><a href="#" onClick={onLoginClick} className="block text-center hover:text-purple-400 transition-colors">Login</a></li>
              <li><a href="#" onClick={onSignupClick} className="block bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200 transition-all">Sign Up</a></li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;