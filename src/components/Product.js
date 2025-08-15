import React, { useState, useRef } from 'react';

const Product = ({ onGoBack }) => {
    const [audioFile, setAudioFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [displayedTranscript, setDisplayedTranscript] = useState('');
    const [message, setMessage] = useState({ text: '', type: '', visible: false });
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef(null);

    React.useEffect(() => {
        if (transcript) {
            let i = 0;
            setDisplayedTranscript('');
            const intervalId = setInterval(() => {
                setDisplayedTranscript(prev => prev + transcript.charAt(i));
                i++;
                if (i > transcript.length) {
                    clearInterval(intervalId);
                }
            }, 20);
            return () => clearInterval(intervalId);
        }
    }, [transcript]);
    
    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = (e) => {
        preventDefaults(e);
        setIsDragging(true);
    };
    const handleDragLeave = (e) => {
        preventDefaults(e);
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        preventDefaults(e);
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            updateFileInfo(files[0]);
        }
    };

    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            updateFileInfo(files[0]);
        }
    };
    
    // === VALIDATION LOGIC ADDED HERE ===
    const updateFileInfo = (file) => {
        // Check if a file is provided and if its type starts with "audio/"
        if (file && file.type.startsWith('audio/')) {
            setAudioFile(file);
            setFileName(file.name);
        } else {
            // If not an audio file, reset the state and show an error
            setAudioFile(null);
            setFileName('');
            showMessage('Invalid file type. Please upload an audio file.', 'error');
        }
    };

    const showMessage = (text, type = 'success') => {
        setMessage({ text, type, visible: true });
        setTimeout(() => setMessage({ text: '', type: '', visible: false }), 3000);
    };

    const handleGenerateClick = () => {
        if (!audioFile) {
            showMessage('Please select an audio file first.', 'error');
            return;
        }
        setIsGenerating(true);
        setTranscript('');

        setTimeout(() => {
            const mockTranscript = `Speaker 1: Hello, and welcome to the weekly status update. Let's start with the project milestones. How are we progressing on the alpha release?\n\nSpeaker 2: We're slightly behind schedule. The main blocker has been the integration with the third-party payment API. Their documentation is a bit outdated, and we've had to do a lot of trial and error. We expect to have it resolved by the end of the day tomorrow.\n\nSpeaker 1: Okay, thank you for the update. Let's ensure we have a contingency plan if the API issues persist. What about the user interface design? Is that on track?\n\nSpeaker 3: Yes, the UI components are 90% complete. We've received positive feedback on the new dashboard layout from the internal review team. We're just polishing up the mobile responsiveness and accessibility features. We should be ready for a full demo by Friday.`;
            setTranscript(mockTranscript);
            setIsGenerating(false);
        }, 2000);
    };

    const copyToClipboard = () => {
        if (!transcript) {
            showMessage('Nothing to copy yet!', 'error');
            return;
        }
        navigator.clipboard.writeText(transcript).then(() => showMessage('Transcript copied!'));
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="feature-card w-full max-w-4xl mx-auto p-6 sm:p-10 rounded-2xl shadow-2xl">
                <header className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <svg className="w-10 h-10 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C10.3431 2 9 3.34315 9 5V12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V5C15 3.34315 13.6569 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M19 10V12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                        <h1 className="text-3xl font-bold text-white">Secretary.AI</h1>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white hero-glow">Transcription Service</h2>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">Upload an audio file and our AI will transcribe it for you in seconds.</p>
                </header>

                <main>
                    <div 
                        className={`file-drop-zone w-full max-w-xl mx-auto mb-6 p-8 text-center cursor-pointer rounded-lg ${isDragging ? 'dragover' : ''}`}
                        onClick={() => fileInputRef.current.click()}
                        onDragEnter={handleDragEnter} onDragOver={handleDragEnter}
                        onDragLeave={handleDragLeave} onDrop={handleDrop}
                    >
                        <input type="file" ref={fileInputRef} className="hidden" accept="audio/*" onChange={handleFileSelect}/>
                        <div className="flex flex-col items-center text-gray-400">
                             <svg className="w-16 h-16 mb-4 text-purple-400 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V8.25c0-1.121.904-2.025 2.025-2.025h13.95A2.025 2.025 0 0121 8.25v9a2.025 2.025 0 01-2.025 2.025H5.025A2.025 2.025 0 013 17.25z" /></svg>
                            <p className="font-semibold text-gray-300">{fileName ? "File selected:" : "Drag & drop an audio file"}</p>
                            <p className="text-sm">{fileName ? "" : "or click to upload"}</p>
                            <p className="text-sm mt-2 font-medium text-purple-400">{fileName}</p>
                        </div>
                    </div>
                    
                    <div className="text-center mb-8">
                        <button onClick={handleGenerateClick} disabled={isGenerating} className="btn-primary text-white font-bold py-3 px-8 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            {isGenerating ? 'Generating...' : 'Generate Transcript'}
                        </button>
                    </div>

                    <div className="relative bg-black bg-opacity-20 border border-gray-700 rounded-lg shadow-inner">
                         <button onClick={copyToClipboard} className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-gray-300 p-2 rounded-md transition-colors" title="Copy to clipboard"><svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.03 1.125 0 1.131.094 1.976 1.057 1.976 2.192V7.5m-9 3.75h9v8.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 19.5V11.25zM16.5 5.25v12a2.25 2.25 0 01-2.25 2.25H9" /></svg></button>
                        <div className="w-full h-80 sm:h-96 p-6 rounded-md whitespace-pre-wrap overflow-y-auto text-gray-300">
                           {displayedTranscript || <span className="text-gray-500">Your generated transcript will appear here...</span>}
                        </div>
                    </div>
                </main>
                
                <div className="text-center mt-12">
                  <button onClick={onGoBack} className="btn-secondary text-gray-400 hover:text-white font-bold py-2 px-4 rounded-lg">
                    ← Back to Home
                  </button>
                </div>

                <div className={`fixed top-5 right-5 text-white py-2 px-4 rounded-lg shadow-lg transition-all duration-300 ${message.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'} ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
                    {message.text}
                </div>
            </div>
        </div>
    );
};

export default Product;