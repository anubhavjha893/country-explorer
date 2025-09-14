import React, { useState } from 'react';

const MobileInstallGuide = ({ isVisible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isVisible) return null;

  const steps = [
    {
      title: "Android (Chrome)",
      instructions: [
        "1. Tap the menu button (⋮) in Chrome",
        "2. Look for 'Add to Home screen' or 'Install app'",
        "3. Tap 'Add' or 'Install'",
        "4. The app will appear on your home screen"
      ],
      icon: "🤖"
    },
    {
      title: "iPhone (Safari)",
      instructions: [
        "1. Tap the Share button (📤) at the bottom",
        "2. Scroll down and tap 'Add to Home Screen'",
        "3. Tap 'Add' in the top right",
        "4. The app will appear on your home screen"
      ],
      icon: "🍎"
    },
    {
      title: "Samsung Internet",
      instructions: [
        "1. Tap the menu button (⋮) in Samsung Internet",
        "2. Tap 'Add page to'",
        "3. Select 'Home screen'",
        "4. Tap 'Add' to confirm"
      ],
      icon: "📱"
    },
    {
      title: "Firefox Mobile",
      instructions: [
        "1. Tap the menu button (⋮) in Firefox",
        "2. Tap 'Install' or 'Add to Home Screen'",
        "3. Tap 'Add' to confirm",
        "4. The app will appear on your home screen"
      ],
      icon: "🦊"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="mobile-install-guide-overlay">
      <div className="mobile-install-guide">
        <div className="guide-header">
          <h2>📱 Install on Mobile</h2>
          <button className="guide-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="guide-content">
          <div className="guide-step-indicator">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`step-dot ${index === currentStep ? 'active' : ''}`}
              />
            ))}
          </div>

          <div className="guide-step">
            <div className="step-icon">{steps[currentStep].icon}</div>
            <h3 className="step-title">{steps[currentStep].title}</h3>
            <div className="step-instructions">
              {steps[currentStep].instructions.map((instruction, index) => (
                <p key={index} className="instruction">{instruction}</p>
              ))}
            </div>
          </div>

          <div className="guide-navigation">
            <button 
              className="guide-button guide-button-secondary" 
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button 
              className="guide-button guide-button-primary" 
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
            >
              Next
            </button>
          </div>

          <div className="guide-footer">
            <p>💡 <strong>Tip:</strong> After installing, the app will work like a native mobile app!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileInstallGuide;
