import React from 'react';

// 1. Accept the new onGoBack prop here
const Header = ({ isAuthenticated, onSignOut, onLoginClick, onSignupClick, onGoBack }) => {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 relative z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          {/* 2. The onClick here will now work correctly */}
          <a href="#" onClick={(e) => { e.preventDefault(); if (isAuthenticated) return; onGoBack(); }} className="text-2xl font-bold text-white">
            Secretary.AI
          </a>
        </div>

        {/* --- Desktop Menu --- */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <button
              onClick={onSignOut}
              className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
            >
              Sign Out
            </button>
          ) : (
            <>
              <a href="#login" onClick={onLoginClick} className="hover:text-purple-400 transition-colors">
                Login
              </a>
              <a href="#signup" onClick={onSignupClick} className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200 transition-all">
                Sign Up
              </a>
            </>
          )}
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
        {isAuthenticated ? (
            <li>
                <button
                    onClick={onSignOut}
                    className="w-full bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                >
                    Sign Out
                </button>
            </li>
          ) : (
            <>
              <li><a href="#login" onClick={onLoginClick} className="block text-center hover:text-purple-400 transition-colors">Login</a></li>
              <li><a href="#signup" onClick={onSignupClick} className="block bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200 transition-all">Sign Up</a></li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;