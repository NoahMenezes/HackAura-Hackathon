// src/components/Header.js

import React from 'react';

const Header = ({ onLoginClick, onSignupClick, onProductClick }) => {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-white">Secretary.AI</h1>
          <ul className="hidden md:flex space-x-6">
            <li>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              {/* Add the onClick handler for the Product link */}
              <a href="#" onClick={onProductClick} className="hover:text-purple-400 transition-colors">
                Product
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Results
              </a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" onClick={onLoginClick} className="hover:text-purple-400 transition-colors">
            Login
          </a>
          <a href="#" onClick={onSignupClick} className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200 transition-all">
            Sign Up
          </a>
        </div>
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
      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden md:hidden mt-4">
        <ul className="flex flex-col space-y-2">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-purple-900 rounded">
              Home
            </a>
          </li>
          <li>
            <a href="#" onClick={onProductClick} className="block px-4 py-2 hover:bg-purple-900 rounded">
              Product
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-purple-900 rounded">
              Results
            </a>
          </li>
          <li>
            <a href="#" onClick={onLoginClick} className="block px-4 py-2 hover:bg-purple-900 rounded">
              Login
            </a>
          </li>
          <li>
            <a href="#" onClick={onSignupClick} className="block px-4 py-2 bg-white text-purple-700 font-semibold rounded text-center">
              Sign Up
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;