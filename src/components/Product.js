import React, { useState, useEffect, useCallback, useRef } from 'react';

const Product = ({ onGoBack }) => {
    const [view, setView] = useState('upload');
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [processingStatus, setProcessingStatus] = useState('Initializing...');
    const [results, setResults] = useState(null);
    const [activeTab, setActiveTab] = useState('transcript');
    const [message, setMessage] = useState({ text: '', type: 'success', visible: false });

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (window.particlesJS) {
            window.particlesJS('particles-js', {
                "particles": { "number": { "value": 50, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#8A2BE2" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#4B0082", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" } },
                "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } } },
                "retina_detect": true
            });
        }
    }, []);
    
    useEffect(() => {
        if (message.visible) {
            const timer = setTimeout(() => {
                setMessage(prev => ({ ...prev, visible: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message.visible]);
    
    useEffect(() => {
        const preventDefaults = e => {
            e.preventDefault();
            e.stopPropagation();
        };
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        return () => {
             ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                document.body.removeEventListener(eventName, preventDefaults, false);
            });
        };
    }, []);

    const showMessage = (text, type = 'success') => {
        setMessage({ text, type, visible: true });
    };

    const handleFileSelect = useCallback((selectedFile) => {
        if (selectedFile && selectedFile.type.startsWith('audio/')) {
            setFile(selectedFile);
        } else {
            showMessage('Please select a valid audio file.', 'error');
        }
    }, []);

    const onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrag = useCallback((e) => {
        preventDefaults(e);
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        preventDefaults(e);
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    }, [handleFileSelect]);

    const runAnalysis = async () => {
        if (!file) {
            showMessage('Please select a file first.', 'error');
            return;
        }
        setView('processing');
        const statuses = ["Transcribing audio...", "Identifying key topics...", "Summarizing meeting...", "Extracting action items...", "Drafting follow-up email..."];
        let statusIndex = 0;
        setProcessingStatus(statuses[0]);
        const statusInterval = setInterval(() => {
            statusIndex++;
            if (statusIndex < statuses.length) {
                setProcessingStatus(statuses[statusIndex]);
            } else {
                clearInterval(statusInterval);
            }
        }, 2000);

        try {
            const aiResponse = await getAiInsights(file);
            clearInterval(statusInterval);
            setResults(aiResponse);
            setView('results');
        } catch (error) {
            console.error('Error during analysis:', error);
            showMessage('An error occurred during analysis. Please try again.', 'error');
            resetToUpload();
        }
    };

    const resetToUpload = () => {
        setFile(null);
        setResults(null);
        setActiveTab('transcript');
        setView('upload');
        if(fileInputRef.current) fileInputRef.current.value = "";
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            showMessage('Content copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            showMessage('Failed to copy content.', 'error');
        });
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        });
    };

    const getAiInsights = async (file) => {
        const apiKey = "AIzaSyCOjLEvOdZZzk4nCOUc1UhfX1eKfNBm1qk";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const audioBase64 = await fileToBase64(file);
        const prompt = `You are "Secretary.AI", an expert meeting assistant. You have been given an audio recording of a meeting. Your tasks are to:
1. **Transcribe** the entire audio accurately, identifying different speakers if possible (e.g., "Speaker 1:", "Speaker 2:").
2. **Summarize** the meeting, capturing the key discussion points, decisions, and outcomes.
3. **Extract Action Items** and list them. For each action item, identify the owner, the task, and the deadline if mentioned.
4. **Draft a Follow-up Email** that includes the summary and the list of action items, formatted professionally.

Please provide the output in a single, clean JSON object with the following structure:
{"transcript": "...", "summary": "...", "actionItems": [{ "owner": "...", "task": "...", "deadline": "..." }], "email": "..."}
Do not include any text or formatting outside of this JSON object.`;

        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }, { inlineData: { mimeType: file.type, data: audioBase64 } }] }],
            generationConfig: { responseMimeType: "application/json" }
        };

        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) {
            const errorBody = await response.json();
            console.error("API Error:", errorBody);
            throw new Error(`API request failed with status ${response.status}`);
        }
        const result = await response.json();
        return JSON.parse(result.candidates[0].content.parts[0].text);
    };

    const renderActionItems = () => {
        if (!results?.actionItems || results.actionItems.length === 0) {
            return <div className="results-card empty-state col-span-full"><p>No action items were identified in this meeting.</p></div>;
        }
        return results.actionItems.map((item, index) => (
            <div key={index} className="action-item-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="owner-info">
                    <span className="owner-avatar">{item.owner ? item.owner.charAt(0) : '?'}</span>
                    <h3 className="owner-name">{item.owner || 'Unassigned'}</h3>
                </div>
                <p className="task-description">{item.task}</p>
                <div className="task-deadline">
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span>Due: {item.deadline || 'Not specified'}</span>
                </div>
            </div>
        ));
    };

    return (
        <>
            <style>{`
                :root {
                    --bg-dark: #0c0a1e; --bg-container: rgba(22, 18, 48, 0.7); --border-color: rgba(255, 255, 255, 0.15);
                    --text-primary: #F9FAFB; --text-secondary: #D1D5DB; --text-subtle: #9CA3AF;
                    --brand-primary: #8B5CF6; --brand-secondary: #A78BFA; --brand-gradient: linear-gradient(90deg, #8A2BE2 0%, #4B0082 100%);
                    --shadow-glow: 0 0 15px rgba(138, 92, 245, 0.6), 0 0 30px rgba(138, 92, 245, 0.4);
                    --shadow-btn: 0 0 15px rgba(138, 43, 226, 0.5); --shadow-btn-hover: 0 0 25px rgba(138, 43, 226, 0.8);
                    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -2px rgb(0 0 0 / 0.3);
                    --font-family: 'Inter', sans-serif;
                }
                body { background-color: var(--bg-dark); color: var(--text-primary); font-family: var(--font-family); overflow-x: hidden; }
                #particles-js { position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: -1; }
                .main-container {
                    background: var(--bg-container); border: 1px solid var(--border-color); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
                    z-index: 10; width: 100%; max-width: 64rem; margin: auto; padding: 2.5rem; border-radius: 1rem; box-shadow: var(--shadow-lg);
                }
                .page-header { text-align: center; margin-bottom: 2.5rem; }
                .page-title { font-size: 2.5rem; font-weight: 900; color: var(--text-primary); text-shadow: var(--shadow-glow); }
                .page-subtitle { font-size: 1.125rem; color: var(--text-secondary); margin-top: 1rem; max-width: 48rem; margin-inline: auto; }
                .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; font-weight: 700; cursor: pointer; transition: all 0.3s ease; }
                .btn-primary { background: var(--brand-gradient); color: var(--text-primary); box-shadow: var(--shadow-btn); font-size: 1.125rem; padding: 1rem 2rem; }
                .btn-primary:hover:not(:disabled) { transform: scale(1.05); box-shadow: var(--shadow-btn-hover); }
                .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
                .btn-secondary { background: rgba(255, 255, 255, 0.1); color: var(--text-primary); border: 1px solid rgba(255, 255, 255, 0.2); }
                .btn-secondary:hover { background: rgba(255, 255, 255, 0.2); transform: scale(1.05); }
                .file-drop-area {
                    background: rgba(138, 92, 245, 0.05); border: 2px dashed rgba(138, 92, 245, 0.4);
                    border-radius: 0.75rem; padding: 2.5rem; text-align: center; cursor: pointer;
                    transition: all 0.3s ease-in-out; max-width: 36rem; margin: 0 auto 2rem auto;
                }
                .file-drop-area.dragover, .file-drop-area:hover { border-color: rgba(138, 92, 245, 0.8); background-color: rgba(138, 92, 245, 0.1); transform: scale(1.02); }
                .file-drop-content { color: var(--text-subtle); }
                .file-drop-content .icon { width: 4rem; height: 4rem; margin: 0 auto 1rem auto; color: var(--brand-primary); opacity: 0.7; }
                .file-drop-content strong { color: var(--text-secondary); font-weight: 600; }
                .file-name { color: var(--brand-secondary); margin-top: 0.5rem; font-weight: 500; }
                .upload-actions { text-align: center; display: flex; flex-direction: column; gap: 0.75rem; max-width: 20rem; margin: auto; }
                .processing-view { text-align: center; padding: 4rem 0; }
                .spinner { width: 3rem; height: 3rem; margin: 0 auto 1.5rem auto; color: var(--brand-primary); animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .results-header { display: flex; flex-direction: column; gap: 1rem; align-items: start; margin-bottom: 2.5rem; }
                @media (min-width: 640px) { .results-header { flex-direction: row; justify-content: space-between; align-items: center; } }
                .tabs { border-bottom: 1px solid var(--border-color); margin-bottom: 1.5rem; display: flex; flex-wrap: wrap; gap: 1.5rem; }
                .tab-btn { background: none; border: none; color: var(--text-subtle); padding: 0.5rem 0.25rem; font-size: 1.125rem; font-weight: 600; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.3s ease; }
                .tab-btn.active, .tab-btn:hover { color: var(--brand-secondary); border-bottom-color: var(--brand-primary); }
                .results-card { background: rgba(12, 10, 30, 0.5); border: 1px solid var(--border-color); border-radius: 0.75rem; padding: 1.5rem; position: relative; }
                .copy-btn {
                    position: absolute; top: 0.75rem; right: 0.75rem; background: var(--bg-dark); border: 1px solid var(--border-color); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
                    cursor: pointer; transition: all 0.2s ease;
                }
                .copy-btn:hover { background: var(--brand-primary); border-color: var(--brand-primary); }
                .copy-btn .icon { width: 1rem; height: 1rem; color: var(--text-secondary); }
                .copy-btn:hover .icon { color: var(--text-primary); }
                .output-content { white-space: pre-wrap; overflow-wrap: break-word; line-height: 1.6; color: var(--text-secondary); }
                .action-items-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
                .action-item-card {
                    background: rgba(12, 10, 30, 0.5); border: 1px solid var(--border-color); border-radius: 0.75rem; padding: 1.5rem; transition: all 0.3s ease;
                    opacity: 0; animation: fadeIn 0.5s ease-out forwards;
                }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .action-item-card:hover { transform: translateY(-5px); border-color: var(--brand-primary); box-shadow: var(--shadow-lg); }
                .owner-info { display: flex; align-items: center; margin-bottom: 1rem; }
                .owner-avatar { width: 2.5rem; height: 2.5rem; border-radius: 50%; background: var(--brand-primary); color: var(--text-primary); display: flex; align-items: center; justify-content: center; font-weight: 700; margin-right: 1rem; }
                .owner-name { font-size: 1.125rem; font-weight: 600; }
                .task-description { color: var(--text-secondary); margin-bottom: 1.25rem; }
                .task-deadline { display: flex; align-items: center; font-size: 0.875rem; color: var(--brand-secondary); font-weight: 500; }
                .task-deadline .icon { width: 1rem; height: 1rem; margin-right: 0.5rem; }
                .fade-in { animation: fadeInView 0.8s ease-out forwards; }
                @keyframes fadeInView { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .message-box {
                    position: fixed; top: 1.5rem; right: 1.5rem; padding: 0.75rem 1.25rem; border-radius: 0.5rem; color: var(--text-primary); font-weight: 500;
                    box-shadow: var(--shadow-lg); transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); z-index: 1000;
                }
                .message-box.success { background-color: #22C55E; }
                .message-box.error { background-color: #EF4444; }
                .message-box.visible { opacity: 1; transform: translateY(0); }
                .message-box.hidden { opacity: 0; transform: translateY(-20px); }
            `}</style>
            
            <div id="particles-js"></div>

            <div className="main-container">
                {view === 'upload' && (
                    <div className="fade-in">
                        <header className="page-header">
                            <h1 className="page-title">Upload Your Meeting Audio</h1>
                            <p className="page-subtitle">Drag and drop your recording to instantly generate transcripts, summaries, and action items.</p>
                        </header>
                        <main>
                            <div 
                                className={`file-drop-area ${isDragging ? 'dragover' : ''}`}
                                onClick={() => fileInputRef.current.click()}
                                onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}
                            >
                                <input type="file" ref={fileInputRef} className="hidden" accept="audio/*" onChange={onFileChange} style={{display: 'none'}}/>
                                <div className="file-drop-content pointer-events-none">
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V8.25c0-1.121.904-2.025 2.025-2.025h13.95A2.025 2.025 0 0121 8.25v9a2.025 2.025 0 01-2.025 2.025H5.025A2.025 2.025 0 013 17.25z" /></svg>
                                    <p><strong>{file ? "File Selected:" : "Drag & drop an audio file here"}</strong></p>
                                    <p>{file ? "" : "or click to select a file"}</p>
                                    {file && <p className="file-name">{file.name}</p>}
                                </div>
                            </div>
                            <div className="upload-actions">
                                <button className="btn btn-primary" disabled={!file} onClick={runAnalysis}>Generate Insights</button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => console.log("Process Meeting clicked!")}
                                >
                                    Process Meeting
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    style={{background: 'none', border: 'none', marginTop: '0.5rem'}}
                                    onClick={onGoBack}
                                >
                                    ← Back to Home
                                </button>
                            </div>
                        </main>
                    </div>
                )}

                {view === 'processing' && (
                     <div className="processing-view fade-in">
                        <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle opacity="0.25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path opacity="0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <h1 className="page-title">AI is at Work...</h1>
                        <p className="page-subtitle">{processingStatus}</p>
                    </div>
                )}

                {view === 'results' && results && (
                    <div className="fade-in">
                        <header className="results-header">
                            <div>
                                <h1 className="page-title">Meeting Insights</h1>
                                <p className="page-subtitle" style={{textAlign: 'left', margin: '0.5rem 0 0 0'}}>Results for {file?.name}</p>
                            </div>
                             <button className="btn btn-secondary" onClick={resetToUpload}>
                                Analyze Another File
                            </button>
                        </header>
                        <main>
                            <nav className="tabs">
                                {['transcript', 'summary', 'actions', 'email'].map(tabName => (
                                    <button 
                                        key={tabName}
                                        className={`tab-btn ${activeTab === tabName ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tabName)}
                                    >
                                        {tabName === 'summary' ? 'AI Summary' : tabName === 'actions' ? 'Action Items' : tabName === 'email' ? 'Draft Email' : tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                                    </button>
                                ))}
                            </nav>
                            <div className="tab-content">
                                {activeTab === 'transcript' && (
                                    <div className="results-card">
                                        <button onClick={() => copyToClipboard(results.transcript)} className="copy-btn" title="Copy Transcript">
                                            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                        </button>
                                        <pre className="output-content">{results.transcript}</pre>
                                    </div>
                                )}
                                {activeTab === 'summary' && (
                                    <div className="results-card">
                                        <button onClick={() => copyToClipboard(results.summary)} className="copy-btn" title="Copy Summary">
                                            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                        </button>
                                        <p className="output-content">{results.summary}</p>
                                    </div>
                                )}
                                {activeTab === 'actions' && (
                                    <div className="action-items-grid">
                                        {renderActionItems()}
                                    </div>
                                )}
                                {activeTab === 'email' && (
                                    <div className="results-card">
                                        <button onClick={() => copyToClipboard(results.email)} className="copy-btn" title="Copy Email">
                                            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                        </button>
                                        <pre className="output-content">{results.email}</pre>
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                )}
            </div>

            <div className={`message-box ${message.type} ${message.visible ? 'visible' : 'hidden'}`}>
                {message.text}
            </div>
        </>
    );
};

export default Product;