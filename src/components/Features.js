import React from 'react';

const Features = () => {
  return (
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
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Instant Summaries</h3>
          <p className="text-gray-400">
            Get concise, AI-generated summaries of your entire meeting in seconds. Perfect for catching up or sharing with stakeholders.
          </p>
        </div>
        {/* Card 2: Task Assignment */}
        <div className="feature-card p-8 rounded-2xl fade-in-up" style={{ transitionDelay: '0.2s' }}>
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-pink-500 bg-opacity-20 mb-6">
            <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Automatic Task Assignment</h3>
          <p className="text-gray-400">
            Our AI intelligently identifies action items and suggests assignees based on the conversation, streamlining your workflow.
          </p>
        </div>
        {/* Card 3: Transcript Analysis */}
        <div className="feature-card p-8 rounded-2xl fade-in-up" style={{ transitionDelay: '0.4s' }}>
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 bg-opacity-20 mb-6">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Deep Transcript Analysis</h3>
          <p className="text-gray-400">
            Search your entire meeting history, identify key topics, and analyze sentiment to gain deeper insights from your discussions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;