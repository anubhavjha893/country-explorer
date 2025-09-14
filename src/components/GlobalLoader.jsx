import React, { useState, useEffect } from "react";

const GlobalLoader = ({ isVisible, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  useEffect(() => {
    if (!isVisible) return;

    const loadingMessages = [
      "Initializing...",
      "Loading countries data...",
      "Preparing quiz questions...",
      "Setting up leaderboard...",
      "Almost ready...",
      "Welcome to Country Explorer!"
    ];

    let messageIndex = 0;
    let progressValue = 0;

    const interval = setInterval(() => {
      progressValue += 6; // Slower progress for 10+ second duration
      
      if (progressValue >= 100) {
        progressValue = 100;
        setProgress(100);
        setLoadingText(loadingMessages[loadingMessages.length - 1]);
        
        // Don't call onComplete here - let the context timer handle it
        clearInterval(interval);
        return;
      }

      setProgress(progressValue);
      
      // Update loading message based on progress
      const newMessageIndex = Math.floor((progressValue / 100) * loadingMessages.length);
      if (newMessageIndex < loadingMessages.length && newMessageIndex !== messageIndex) {
        messageIndex = newMessageIndex;
        setLoadingText(loadingMessages[messageIndex]);
      }
    }, 400); // Slightly slower for better performance

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="global-loader-overlay">
      <div className="global-loader-container">
        <div className="loader-logo">
          <div className="rotating-globe">
            <div className="globe-sphere">
              <div className="globe-continents">
                <div className="continent africa"></div>
                <div className="continent asia"></div>
                <div className="continent europe"></div>
                <div className="continent americas"></div>
                <div className="continent oceania"></div>
              </div>
            </div>
          </div>
          <h1 className="logo-text">Country Explorer</h1>
        </div>
        
        <div className="loader-content">
          <div className="loader-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          
          <div className="loader-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-text">{Math.round(progress)}%</div>
          </div>
          
          <div className="loader-message">{loadingText}</div>
        </div>
        
        <div className="loader-footer">
          <p>Discover the world through flags and knowledge</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
