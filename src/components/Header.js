import React from 'react';

// The props for the removed links (onHomeClick, onProductClick, onResultsClick) have been taken out.
const Header = ({ onLoginClick, onSignupClick }) => {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 relative z-10">
      <nav className="container mx-auto flex justify-between items-center">
        {/* The title remains on the left. */}
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-white">Secretary.AI</h1>
          {/* The navigation links for Home, Product, and Results have been removed. */}
        </div>

        {/* The Login and Sign Up buttons remain on the right for desktop view. */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" onClick={onLoginClick} className="hover:text-purple-400 transition-colors">
            Login
          </a>
          <a href="#" onClick={onSignupClick} className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200 transition-all">
            Sign Up
          </a>
        </div>

        {/* The mobile menu button (hamburger icon) remains. */}
        <div className="md:hidden">
          <button id="menu-btn" className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu: The links have been removed, but the container is kept for potential future use. */}
      {/* You could add Login/Signup links here for a better mobile experience. */}
      <div id="mobile-menu" className="hidden md:hidden mt-4">
        <ul className="flex flex-col space-y-2">
            {/* Intentionally left empty as requested */}
        </ul>
      </div>
    </header>
  );
};

export default Header;
