import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Results from './components/Results';
import Product from './components/Product';
// CHANGE 1: The 'Start' component is no longer needed, so we remove the import.
// import Start from './components/Start'; 
import 'particles.js';
import './App.css';

const App = () => {
  // CHANGE 2: Set the initial page to 'home' instead of 'start'.
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // This useEffect logic needs to be run on multiple pages
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const toggleMenu = () => mobileMenu.classList.toggle('hidden');
    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const fadeUpElements = document.querySelectorAll('.fade-in-up');
    fadeUpElements.forEach((el) => observer.observe(el));

    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        "particles": { "number": { "value": 50, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#8A2BE2" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } }, "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false } }, "line_linked": { "enable": true, "distance": 150, "color": "#4B0082", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false } },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } },
        "retina_detect": true
      });
    }

    return () => {
      if (menuBtn) menuBtn.removeEventListener('click', toggleMenu);
      fadeUpElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentPage]);

  // --- Navigation Handlers ---

  const handleLoginClick = (e) => {
    e.preventDefault();
    setCurrentPage('login');
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    setCurrentPage('signup');
  };

  const handleProductClick = (e) => {
    e.preventDefault();
    setCurrentPage('product');
  };
    
  const handleResultsClick = (e) => {
    e.preventDefault();
    setCurrentPage('results');
  };
  
  const handleHomeClick = (e) => {
    e.preventDefault();
    setCurrentPage('home');
  };

  const handleGoBack = () => {
    // CHANGE 3: The back button on the Login/Signup pages should now go to 'home'.
    setCurrentPage('home');
  };

  const handleAuthSuccess = () => {
    setCurrentPage('home');
  };

  // --- Page Rendering Logic ---

  // The rendering block for the 'start' page has been completely removed.
  // if (currentPage === 'start') { ... }

  if (currentPage === 'login') {
    return (
      <div className="antialiased">
        <div id="particles-js" className="fixed top-0 left-0 w-full h-full z-0"></div>
        <div className="relative z-10">
          <Login onGoBack={handleGoBack} onLoginSuccess={handleAuthSuccess} />
        </div>
      </div>
    );
  }

  if (currentPage === 'signup') {
    return (
      <div className="antialiased">
        <div id="particles-js" className="fixed top-0 left-0 w-full h-full z-0"></div>
        <div className="relative z-10">
          <Signup onGoBack={handleGoBack} onSignupSuccess={handleAuthSuccess} />
        </div>
      </div>
    );
  }
  
  if (currentPage === 'product') {
    return (
      <div className="antialiased">
        <div id="particles-js" className="fixed top-0 left-0 w-full h-full z-0"></div>
        <div className="relative z-10">
          <Product onGoBack={() => setCurrentPage('home')} />
        </div>
      </div>
    );
  }
  
  if (currentPage === 'results') {
    return (
      <div className="antialiased">
        <div id="particles-js" className="fixed top-0 left-0 w-full h-full z-0"></div>
        <div className="relative z-10">
          <Results onGoBack={() => setCurrentPage('home')} />
        </div>
      </div>
    );
  }

  // --- Default Page ('home') ---
  // Since 'home' is now the initial state, this will be the first thing the user sees.
  return (
    <div className="antialiased">
      <div id="particles-js"></div>
      <div className="relative z-10">
        <Header 
            onHomeClick={handleHomeClick}
            onLoginClick={handleLoginClick} 
            onSignupClick={handleSignupClick} 
            onProductClick={handleProductClick} 
            onResultsClick={handleResultsClick} 
        />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center py-20 md:py-32 gradient-bg">
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 hero-glow fade-in-up">
              The #1 AI Teammate for <br /> Your Meetings
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 fade-in-up" style={{ transitionDelay: '0.2s' }}>
              Secretary.AI automatically transcribes, summarizes, and extracts key action items from your meetings. Stop taking notes and start focusing on the conversation.
            </p>
            <div className="fade-in-up" style={{ transitionDelay: '0.4s' }}>
              {/* THIS IS THE MODIFIED LINE */}
              <a href="#login" onClick={handleLoginClick} className="btn-primary text-white font-bold py-3 px-8 rounded-lg text-lg">
                Get Started For Free
              </a>
            </div>
          </section>
          <hr className="my-8 border-gray-800" />
          {/* Features Section */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 fade-in-up">
                Go Beyond Notetaking with 200+ AI Apps
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto fade-in-up" style={{ transitionDelay: '0.2s' }}>
                Our AI helps you automatically extract key details, generate follow-up emails, score candidates, and other insights from every meeting.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1: Summarizer */}
              <div className="feature-card p-8 rounded-2xl fade-in-up">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-500 bg-opacity-20 mb-6">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Instant Summaries</h3>
                <p className="text-gray-400">
                  Get concise, AI-generated summaries of your entire meeting in seconds. Perfect for catching up or sharing with stakeholders.
                </p>
              </div>
              {/* Card 2: Task Assignment */}
              <div className="feature-card p-8 rounded-2xl fade-in-up" style={{ transitionDelay: '0.2s' }}>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-pink-500 bg-opacity-20 mb-6">
                  <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Automatic Task Assignment</h3>
                <p className="text-gray-400">
                  Our AI intelligently identifies action items and suggests assignees based on the conversation, streamlining your workflow.
                </p>
              </div>
              {/* Card 3: Transcript Analysis */}
              <div className="feature-card p-8 rounded-2xl fade-in-up" style={{ transitionDelay: '0.4s' }}>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 bg-opacity-20 mb-6">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Deep Transcript Analysis</h3>
                <p className="text-gray-400">
                  Search your entire meeting history, identify key topics, and analyze sentiment to gain deeper insights from your discussions.
                </p>
              </div>
            </div>
          </section>
          <hr className="my-8 border-gray-800" />
          {/* How it works section */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 fade-in-up">How It Works in 3 Simple Steps</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 md:space-x-8">
              {/* Step 1 */}
              <div className="text-center max-w-sm fade-in-up">
                <div className="mb-4 text-5xl font-bold text-purple-400">1</div>
                <h3 className="text-xl font-bold text-white mb-2">Record & Upload</h3>
                <p className="text-gray-400">Connect your calendar or simply upload your meeting audio/video file. We integrate with Zoom, Google Meet, and more.</p>
              </div>
              {/* Step 2 */}
              <div className="text-center max-w-sm fade-in-up" style={{ transitionDelay: '0.2s' }}>
                <div className="mb-4 text-5xl font-bold text-purple-400">2</div>
                <h3 className="text-xl font-bold text-white mb-2">AI Processing</h3>
                <p className="text-gray-400">Our advanced AI gets to work, transcribing with high accuracy, identifying speakers, and analyzing the content.</p>
              </div>
              {/* Step 3 */}
              <div className="text-center max-w-sm fade-in-up" style={{ transitionDelay: '0.4s' }}>
                <div className="mb-4 text-5xl font-bold text-purple-400">3</div>
                <h3 className="text-xl font-bold text-white mb-2">Review & Export</h3>
                <p className="text-gray-400">Receive a detailed summary with action items. Review, edit, and export tasks to your favorite project management tools.</p>
              </div>
            </div>
          </section>
        </main>
        
        <footer className="bg-black bg-opacity-20 mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="w-full text-center">
                <h2 className="text-6xl md:text-8xl font-black text-white hero-glow mb-2 tracking-widest">
                    SECRETARY.AI
                </h2>
                <p className="text-lg md:text-xl text-gray-400">The future of meetings.</p>
            </div>
            <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
              <p>&copy; 2025 Secretary.AI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;