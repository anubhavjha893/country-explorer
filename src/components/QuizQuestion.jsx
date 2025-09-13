import React, { useState } from "react";

const QuizQuestion = ({ flag, answer, onAnswer }) => {
  const [userInput, setUserInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    const correct = userInput.trim().toLowerCase() === answer.trim().toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Show feedback for a moment before moving to next question
    setTimeout(() => {
      onAnswer(correct);
      setUserInput("");
      setShowFeedback(false);
      setIsCorrect(null);
    }, 1500);
  };

  return (
    <div className="quiz-question">
      <div className="flag-container">
        <img 
          src={flag} 
          alt="Country flag" 
          className="flag-image"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div className="flag-placeholder" style={{ display: 'none' }}>
          🏳️ Flag not available
        </div>
      </div>
      
      <div className="question-content">
        <h3 className="question-title">What country does this flag belong to?</h3>
        
        <form onSubmit={handleSubmit} className="answer-form">
          <div className="input-container">
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type the country name..."
              className="answer-input"
              type="text"
              autoComplete="off"
              autoFocus
              disabled={showFeedback}
            />
            <button
              type="submit"
              className="submit-btn"
              disabled={!userInput.trim() || showFeedback}
            >
              {showFeedback ? (isCorrect ? "✓" : "✗") : "Submit"}
            </button>
          </div>
        </form>
        
        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="feedback-icon">
              {isCorrect ? "🎉" : "😔"}
            </div>
            <div className="feedback-text">
              {isCorrect ? "Correct!" : `Incorrect. The answer is: ${answer}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;
