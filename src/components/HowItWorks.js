import React from 'react';

const HowItWorks = () => {
  return (
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
  );
};

export default HowItWorks;