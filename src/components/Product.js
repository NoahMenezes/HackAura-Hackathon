// src/components/Product.js

import React from 'react';
import 'particles.js';
const Product = ({ onGoBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 antialiased">
      <div id="particles-js" className="fixed top-0 left-0 w-full h-full z-0"></div>
      
      <div className="relative main-container w-full max-w-4xl mx-auto p-6 sm:p-10 rounded-2xl shadow-2xl fade-in">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <svg className="w-10 h-10 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C10.3431 2 9 3.34315 9 5V12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V5C15 3.34315 13.6569 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 10V12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="text-3xl font-bold text-white">Secretary.AI</h1>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white hero-glow">Product Features</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Discover the powerful features that make Secretary.AI your ultimate meeting companion.
          </p>
        </header>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {/* Feature Card 1 */}
          <div className="feature-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2">AI-Powered Summaries</h3>
            <p className="text-gray-400">Get concise, easy-to-read summaries of every meeting, highlighting key discussion points and decisions.</p>
          </div>
          {/* Feature Card 2 */}
          <div className="feature-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Automated Action Items</h3>
            <p className="text-gray-400">Automatically identify and extract action items, assigned owners, and deadlines from the conversation.</p>
          </div>
          {/* Feature Card 3 */}
          <div className="feature-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Full Transcript Search</h3>
            <p className="text-gray-400">Search through your entire meeting library with a natural language query to find exactly what was said and by whom.</p>
          </div>
          {/* Feature Card 4 */}
          <div className="feature-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Sentiment Analysis</h3>
            <p className="text-gray-400">Understand the mood of your meetings with sentiment analysis, helping you identify tension or positive engagement.</p>
          </div>
        </div>

        <div className="text-center mt-12">
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

export default Product;