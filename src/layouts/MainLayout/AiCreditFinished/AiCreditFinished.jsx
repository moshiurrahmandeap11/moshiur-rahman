import React, { useEffect, useState } from "react";


const ApiCreditFinished = ({ onRetry, estimatedWaitTime }) => {
  const [countdown, setCountdown] = useState(estimatedWaitTime || 300); // 5 minutes default

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center text-white p-6 select-none overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-500 rounded-full animate-ping"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-500 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-purple-500 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 right-16 w-14 h-14 bg-pink-500 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="text-8xl mb-4 animate-bounce">⚡</div>
          <div className="absolute inset-0 text-8xl animate-pulse opacity-50">💳</div>
        </div>

        {/* Title with Gradient */}
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          API Credit Finished!
        </h1>

        {/* Description */}
        <div className="mb-8 space-y-4">
          <p className="text-xl text-gray-300 leading-relaxed">
            API Credit has been exhausted. Please wait while we process your request.
          </p>
          <p className="text-lg text-gray-400">
            We are working to retry for you.
          </p>
        </div>

        {/* Countdown Timer */}
        {countdown > 0 && (
          <div className="mb-8 p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="text-sm text-gray-400 mb-2">Estimated Wait Time</div>
            <div className="text-4xl font-mono text-orange-400 mb-2">
              {formatTime(countdown)}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((estimatedWaitTime - countdown) / estimatedWaitTime) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
              <FaRedo className="animate-spin" />
              Try Again
            </button>
          )}
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors duration-200"
            >
              🔄 Refresh
            </button>
            
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors duration-200"
            >
              ⬅️ Back
            </button>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="mt-12">
          <div className="flex justify-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-8 text-sm text-gray-500">
          <p>At your service</p>
        </div>
      </div>
    </div>
  );
};
export default ApiCreditFinished;
