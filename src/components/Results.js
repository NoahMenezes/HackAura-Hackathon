// src/components/Results.js

import React, { useState, useEffect } from 'react';
import 'particles.js';

const Results = ({ onGoBack }) => {
    const [transcriptInput, setTranscriptInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('summary');
    const [results, setResults] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');

    const mockData = {
        summary: "The team discussed the launch strategy for 'Project Nova'. Key updates were provided by marketing and engineering. Marketing has a press release ready for review and is waiting on budget approval. Engineering is on track, with only a security audit remaining. The next sync-up is scheduled in two weeks.",
        actionItems: [
            { owner: "Sarah", task: "Submit press release for review.", deadline: "This Friday" },
            { owner: "Mark", task: "Get final budget approval from finance.", deadline: "Wednesday EOD" },
            { owner: "David", task: "Schedule and complete the security audit.", deadline: "Next Friday, Aug 22nd" }
        ],
        email: `Subject: Action Items & Summary: Q3 Planning for Project Nova\n\nHi Team,\n\nGreat meeting today. Here's a quick summary and the action items we agreed upon:\n\nSummary:\nWe've finalized the launch strategy for 'Project Nova'. Marketing is ready with the press release, and engineering is on track with the final feature set.\n\nAction Items:\n- Sarah: Submit press release for review by this Friday.\n- Mark: Get final budget approval from finance by Wednesday EOD.\n- David: Complete the security audit by next Friday, August 22nd.\n\nLet's keep up the great momentum!\n\nBest,\nSecretary.AI`,
        integrations: [
            { id: 'trello', title: 'Trello Task Created', description: 'Card: Get final budget approval', assigned: 'Mark', dueDate: 'Wednesday', status: 'Success' },
            { id: 'asana', title: 'Asana Task Created', description: 'Task: Complete security audit', assigned: 'David', dueDate: 'Aug 22nd', status: 'Success' }
        ]
    };
    
    useEffect(() => {
        setTranscriptInput(mockData.email.replace(/\n/g, ' '));
    }, []);

    useEffect(() => {
        if (window.particlesJS) {
            window.particlesJS('particles-js', {
                "particles": { "number": { "value": 50, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#8A2BE2" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#4B0082", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" } },
                "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } } },
                "retina_detect": true
            });
        }
    }, []);

    const showMessage = (msg, type = 'success') => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 3000);
    };

    const handleAnalyze = () => {
        if (transcriptInput.trim() === "") {
            showMessage('Please paste a transcript first.', 'error');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setResults(mockData);
            setIsLoading(false);
            showMessage('Analysis complete!');
        }, 2500);
    };

    const handleCopy = (content) => {
        navigator.clipboard.writeText(content)
            .then(() => showMessage('Content copied to clipboard!'))
            .catch(() => showMessage('Could not copy text.', 'error'));
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 antialiased">
            <div id="particles-js"></div>
            
            <div className="main-container w-full max-w-6xl mx-auto p-6 sm:p-10 rounded-2xl shadow-2xl fade-in">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-black text-white hero-glow mb-4">Transform Transcripts into Action</h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                        Paste your meeting transcript below. Our AI will instantly summarize, extract action items, draft follow-up emails, and sync with your project management tools.
                    </p>
                </header>

                <main>
                    {/* Input Section */}
                    <div className="mb-8">
                        <textarea 
                            id="transcriptInput" 
                            className="w-full h-48 p-4 bg-black bg-opacity-20 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all" 
                            placeholder="Paste your meeting transcript here..."
                            value={transcriptInput}
                            onChange={(e) => setTranscriptInput(e.target.value)}
                        />
                    </div>
                    
                    <div className="text-center mb-12">
                        <button 
                            id="analyzeBtn" 
                            className="btn-primary text-white font-bold py-4 px-8 rounded-lg text-lg"
                            onClick={handleAnalyze}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Analyze Transcript'
                            )}
                        </button>
                    </div>

                    {/* Output Section */}
                    {results && (
                        <div id="resultsOutput" className="fade-in">
                            {/* Tabs */}
                            <div className="border-b border-gray-700 mb-6">
                                <nav className="flex space-x-6" aria-label="Tabs">
                                    <button className={`tab-btn py-3 px-1 font-medium text-lg ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => setActiveTab('summary')}>AI Summary</button>
                                    <button className={`tab-btn py-3 px-1 font-medium text-lg ${activeTab === 'actions' ? 'active' : ''}`} onClick={() => setActiveTab('actions')}>Action Items</button>
                                    <button className={`tab-btn py-3 px-1 font-medium text-lg ${activeTab === 'email' ? 'active' : ''}`} onClick={() => setActiveTab('email')}>Draft Email</button>
                                    <button className={`tab-btn py-3 px-1 font-medium text-lg ${activeTab === 'integrations' ? 'active' : ''}`} onClick={() => setActiveTab('integrations')}>Integrations</button>
                                </nav>
                            </div>

                            {/* Tab Content */}
                            <div>
                                {/* AI Summary */}
                                {activeTab === 'summary' && (
                                    <div id="summaryContent" className="tab-content">
                                        <div className="relative bg-black bg-opacity-20 p-6 rounded-lg border border-gray-700">
                                            <button onClick={() => handleCopy(results.summary)} className="absolute top-3 right-3 bg-gray-700 hover:bg-purple-800 text-gray-300 hover:text-white p-2 rounded-full transition-all" title="Copy Summary">
                                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.03 1.125 0 1.131.094 1.976 1.057 1.976 2.192V7.5m-9 3.75h9v8.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 19.5V11.25zM16.5 5.25v12a2.25 2.25 0 01-2.25 2.25H9" /></svg>
                                            </button>
                                            <div id="summaryOutput" className="output-content min-h-[200px]">{results.summary}</div>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Action Items */}
                                {activeTab === 'actions' && (
                                    <div id="actionsContent" className="tab-content">
                                        <div id="actionsOutput" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {results.actionItems.map((item, index) => (
                                                <div key={index} className="bg-black bg-opacity-20 p-6 rounded-lg border border-gray-700 transform hover:scale-105 hover:border-purple-500 transition-all duration-300">
                                                    <div className="flex items-center mb-3">
                                                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-500/20 text-purple-300 font-bold mr-3">{item.owner.charAt(0)}</span>
                                                        <h3 className="text-lg font-bold text-white">{item.owner}</h3>
                                                    </div>
                                                    <p className="text-gray-300 mb-4">{item.task}</p>
                                                    <div className="text-sm text-purple-400 font-semibold flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                        <span>Due: {item.deadline}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Draft Email */}
                                {activeTab === 'email' && (
                                    <div id="emailContent" className="tab-content">
                                        <div className="relative bg-black bg-opacity-20 p-6 rounded-lg border border-gray-700">
                                            <button onClick={() => handleCopy(results.email)} className="absolute top-3 right-3 bg-gray-700 hover:bg-purple-800 text-gray-300 hover:text-white p-2 rounded-full transition-all" title="Copy Email">
                                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.03 1.125 0 1.131.094 1.976 1.057 1.976 2.192V7.5m-9 3.75h9v8.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 19.5V11.25zM16.5 5.25v12a2.25 2.25 0 01-2.25 2.25H9" /></svg>
                                            </button>
                                            <div id="emailOutput" className="output-content min-h-[200px]">{results.email}</div>
                                        </div>
                                    </div>
                                )}

                                {/* Integrations */}
                                {activeTab === 'integrations' && (
                                    <div id="integrationsContent" className="tab-content">
                                        <div id="integrationsOutput" className="grid md:grid-cols-2 gap-6">
                                            {results.integrations.map((item, index) => (
                                                <div key={index} className="bg-black bg-opacity-20 p-6 rounded-lg border border-gray-700 fade-in">
                                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                                        {item.id === 'trello' && (
                                                            <img src="https://placehold.co/24x24/026AA7/FFFFFF?text=T" className="mr-2 rounded" alt="Trello Logo" />
                                                        )}
                                                        {item.id === 'asana' && (
                                                            <img src="https://placehold.co/24x24/6E49CC/FFFFFF?text=A" className="mr-2 rounded-full" alt="Asana Logo" />
                                                        )}
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-gray-400"><strong>{item.description.split(': ')[0]}:</strong> {item.description.split(': ')[1]}</p>
                                                    <p className="text-gray-400"><strong>Assigned to:</strong> {item.assigned}</p>
                                                    <p className="text-gray-400"><strong>Due Date:</strong> {item.dueDate}</p>
                                                    <span className="inline-block mt-3 bg-green-500/20 text-green-300 text-xs font-semibold px-2 py-1 rounded-full">{item.status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </main>
                <div className="text-center mt-12">
                  <button
                      onClick={onGoBack}
                      className="btn-secondary text-gray-400 hover:text-white font-bold py-2 px-4 rounded-lg"
                  >
                      ← Back to Home
                  </button>
                </div>
            </div>
            {message && (
                <div className={`fixed top-5 right-5 text-white py-2 px-4 rounded-lg shadow-lg transition-all duration-300 z-50 ${messageType === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default Results;