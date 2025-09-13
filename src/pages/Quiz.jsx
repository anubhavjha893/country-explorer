import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCountriesByRegion, shuffleArray } from "../utils/helpers";
import { useAppContext } from "../contexts/useAppContext";
import Loader from "../components/Loader";
import QuizQuestion from "../components/QuizQuestion";

const REGIONS = ["Europe","Asia","Oceania","Americas","Africa"];

const Quiz = () => {
  const navigate = useNavigate();
  const { quizResults, setQuizResults, loading, setLoading } = useAppContext();

  // quiz flow state
  const [stage, setStage] = useState("start"); // start | running | finished
  const [username, setUsername] = useState("");
  const [region, setRegion] = useState(REGIONS[0]);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  // load countries when starting quiz
  useEffect(() => {
    if (stage !== "running") return;
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchCountriesByRegion(region);
        const shuffled = shuffleArray(data).slice(0, 15);
        setQuestions(shuffled);
        setIndex(0);
        setScore(0);
      } catch (e) {
        alert("Failed to load quiz countries: " + e.message);
        setStage("start");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [stage, region, setLoading]);

  const begin = () => {
    if (!username.trim()) return alert("Enter username");
    setStage("running");
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(s => s + 1);
    if (index + 1 >= questions.length) {
      // finish
      const result = { username, region, points: isCorrect ? score + 1 : score, date: new Date().toISOString() };
      setQuizResults([...quizResults, result]);
      // also save in localStorage via context effect (already handled in context)
      setStage("finished");
    } else {
      setIndex(i => i + 1);
    }
  };

  if (stage === "start") {
    return (
      <div className="quiz-start-container">
        <div className="quiz-start-card">
          <div className="quiz-header">
            <h1 className="quiz-title">🏳️ Flag Quiz Challenge</h1>
            <p className="quiz-subtitle">Test your knowledge of world flags!</p>
          </div>
          
          <div className="quiz-form">
            <div className="input-group">
              <label className="input-label">👤 Your Name</label>
              <input 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                className="quiz-input" 
                placeholder="Enter your name here..." 
                type="text"
                autoComplete="name"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">🌍 Select Region</label>
              <select 
                value={region} 
                onChange={e => setRegion(e.target.value)} 
                className="quiz-select"
              >
                {REGIONS.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            
            <button 
              className="quiz-start-btn" 
              onClick={begin}
              disabled={!username.trim()}
            >
              🚀 Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <Loader message="Preparing quiz questions..." />;

  if (stage === "running") {
    const q = questions[index];
    if (!q) return <Loader />;
    return (
      <div className="quiz-running-container">
        <div className="quiz-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((index + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">
            Question {index + 1} of {questions.length}
          </div>
        </div>
        
        <div className="quiz-question-container">
          <QuizQuestion
            flag={(q.flags && (q.flags.svg || q.flags.png)) || ""}
            answer={q.name.common}
            onAnswer={handleAnswer}
          />
        </div>
      </div>
    );
  }

  // finished
  const percentage = Math.round((score / questions.length) * 100);
  const getScoreMessage = () => {
    if (percentage >= 90) return "🏆 Outstanding! You're a flag expert!";
    if (percentage >= 70) return "🎉 Great job! Well done!";
    if (percentage >= 50) return "👍 Good effort! Keep practicing!";
    return "💪 Keep learning! You'll get better!";
  };

  return (
    <div className="quiz-finished-container">
      <div className="quiz-results-card">
        <div className="results-header">
          <h1 className="results-title">🎯 Quiz Complete!</h1>
          <p className="results-subtitle">{getScoreMessage()}</p>
        </div>
        
        <div className="score-display">
          <div className="score-circle">
            <span className="score-number">{score}</span>
            <span className="score-total">/{questions.length}</span>
          </div>
          <div className="score-percentage">{percentage}%</div>
        </div>
        
        <div className="results-actions">
          <button 
            className="quiz-btn secondary" 
            onClick={() => { setStage("start"); setQuestions([]); }}
          >
            🔄 Play Again
          </button>
          <button 
            className="quiz-btn primary" 
            onClick={() => navigate("/leaderboard")}
          >
            🏆 View Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
