import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Product from './components/Product';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import 'particles.js';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // This useEffect is for animations and particles. No changes are needed here.
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const toggleMenu = () => mobileMenu && mobileMenu.classList.toggle('hidden');
    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const fadeUpElements = document.querySelectorAll('.fade-in-up');
    fadeUpElements.forEach((el) => observer.observe(el));

    if (!document.querySelector('#particles-js canvas')) {
        window.particlesJS('particles-js', {
            "particles": { "number": { "value": 50, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#8A2BE2" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#4B0082", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } } },
            "retina_detect": true
        });
    }

    return () => {
      if (menuBtn) menuBtn.removeEventListener('click', toggleMenu);
      fadeUpElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentPage]);

  // --- Navigation Handlers ---
  const handleLoginClick = (e) => { e.preventDefault(); setCurrentPage('login'); };
  const handleSignupClick = (e) => { e.preventDefault(); setCurrentPage('signup'); };
  const handleGoBack = () => { setCurrentPage('home'); };
  const handleAuthSuccess = () => { setIsAuthenticated(true); setCurrentPage('product'); };
  const handleSignOut = () => { setIsAuthenticated(false); setCurrentPage('home'); };
  const handleFeaturesClick = (e) => { e.preventDefault(); setCurrentPage('features'); };
  const handleHowItWorksClick = (e) => { e.preventDefault(); setCurrentPage('how-it-works'); };

  // --- Page Rendering Logic ---

  if (currentPage === 'login' || currentPage === 'signup') {
    return (
      <div className="antialiased">
        <div id="particles-js" className="fixed top-0 left-0 w-full h-full z-0"></div>
        <div className="relative z-10">
          {currentPage === 'login' && <Login onGoBack={handleGoBack} onLoginSuccess={handleAuthSuccess} onSignupClick={handleSignupClick} />}
          {currentPage === 'signup' && <Signup onGoBack={handleGoBack} onSignupSuccess={handleAuthSuccess} onLoginClick={handleLoginClick} />}
        </div>
      </div>
    );
  }

  if (currentPage === 'product') {
    return (
      <div className="antialiased">
        <Header 
          isAuthenticated={isAuthenticated} 
          onSignOut={handleSignOut} 
          onGoBack={handleGoBack}
          onFeaturesClick={handleFeaturesClick}
          onHowItWorksClick={handleHowItWorksClick}
        />
        <div className="flex items-center justify-center p-4">
          <Product onGoBack={handleGoBack} />
        </div>
      </div>
    );
  }

  // --- Default Pages (Home, Features, How It Works) ---
  return (
    <div className="antialiased">
      <div id="particles-js"></div>
      <div className="relative z-10">
        <Header 
          isAuthenticated={isAuthenticated}
          onLoginClick={handleLoginClick} 
          onSignupClick={handleSignupClick}
          onSignOut={handleSignOut}
          onGoBack={handleGoBack}
          onFeaturesClick={handleFeaturesClick}
          onHowItWorksClick={handleHowItWorksClick}
        />
        <main className="container mx-auto px-4 sm-px-6 lg:px-8">
            {currentPage === 'home' && (
                <>
                    {/* --- THIS SECTION HAS BEEN ADDED --- */}
                    <section className="text-center py-20 md:py-32">
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 hero-glow fade-in-up">
                            The #1 AI Teammate for <br /> Your Meetings
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 fade-in-up" style={{ transitionDelay: '0.2s' }}>
                            Secretary.AI automatically transcribes, summarizes, and extracts key action items from your meetings. Stop taking notes and start focusing on the conversation.
                        </p>
                        <div className="fade-in-up" style={{ transitionDelay: '0.4s' }}>
                            <a href="#" onClick={handleLoginClick} className="btn-primary text-white font-bold py-3 px-8 rounded-lg text-lg">
                                Get Started For Free
                            </a>
                        </div>
                    </section>
                    <hr className="my-8 border-gray-800" />
                    {/* --- END OF ADDED SECTION --- */}

                    <Features />
                    <hr className="my-8 border-gray-800" />
                    <HowItWorks />
                </>
            )}
            {currentPage === 'features' && <Features />}
            {currentPage === 'how-it-works' && <HowItWorks />}
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