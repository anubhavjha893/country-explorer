import React, { useState, useEffect } from 'react';

const PWAInstallPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
        return;
      }
      if (window.navigator.standalone === true) {
        setIsInstalled(true);
        return;
      }
    };

    // Check if user has already dismissed the popup
    const hasDismissed = localStorage.getItem('pwa-install-dismissed');
    const lastShown = localStorage.getItem('pwa-install-last-shown');
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours

    checkIfInstalled();

    // Show popup if not installed and not dismissed recently
    if (!isInstalled && !hasDismissed && (!lastShown || now - parseInt(lastShown) > oneDay)) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem('pwa-install-last-shown', now.toString());
      }, 3000); // 3 seconds delay

      return () => clearTimeout(timer);
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!hasDismissed && (!lastShown || now - parseInt(lastShown) > oneDay)) {
        setShowPopup(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isInstalled]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowPopup(false);
      
      if (outcome === 'accepted') {
        localStorage.setItem('pwa-install-dismissed', 'true');
      }
    }
  };

  const handleDismiss = () => {
    setShowPopup(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  const handleLater = () => {
    setShowPopup(false);
    // Don't set dismissed, just hide for now
  };

  if (!showPopup || isInstalled) {
    return null;
  }

  return (
    <div className="pwa-install-popup-overlay">
      <div className="pwa-install-popup">
        <div className="pwa-popup-header">
          <div className="pwa-popup-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <button className="pwa-popup-close" onClick={handleDismiss}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div className="pwa-popup-content">
          <h3 className="pwa-popup-title">Install Country Explorer</h3>
          <p className="pwa-popup-description">
            Get the full app experience! Install Country Explorer on your device for faster access, offline browsing, and a native app feel.
          </p>
          
          <div className="pwa-popup-features">
            <div className="pwa-feature">
              <span className="pwa-feature-icon">⚡</span>
              <span>Faster loading</span>
            </div>
            <div className="pwa-feature">
              <span className="pwa-feature-icon">📱</span>
              <span>Native app experience</span>
            </div>
            <div className="pwa-feature">
              <span className="pwa-feature-icon">🌐</span>
              <span>Offline access</span>
            </div>
          </div>
        </div>
        
        <div className="pwa-popup-actions">
          <button className="pwa-popup-button pwa-popup-button-secondary" onClick={handleLater}>
            Maybe Later
          </button>
          <button className="pwa-popup-button pwa-popup-button-primary" onClick={handleInstall}>
            Install App
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPopup;
