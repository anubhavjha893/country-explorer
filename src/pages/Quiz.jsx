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
      <div style={{ padding: 20 }}>
        <h2>Quiz — Flags</h2>
        <div style={{ marginTop: 12 }}>
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} className="input" placeholder="Your name" />
        </div>
        <div style={{ marginTop: 12 }}>
          <label>Region</label>
          <select value={region} onChange={e => setRegion(e.target.value)} className="input">
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div style={{ marginTop: 12 }}>
          <button className="btn primary" onClick={begin}>Start Quiz</button>
        </div>
      </div>
    );
  }

  if (loading) return <Loader message="Preparing quiz questions..." />;

  if (stage === "running") {
    const q = questions[index];
    if (!q) return <Loader />;
    return (
      <div style={{ padding: 20 }}>
        <div style={{ marginBottom: 8 }}>Question {index + 1} / {questions.length}</div>
        <QuizQuestion
          flag={(q.flags && (q.flags.svg || q.flags.png)) || ""}
          answer={q.name.common}
          onAnswer={handleAnswer}
        />
      </div>
    );
  }

  // finished
  return (
    <div style={{ padding: 20 }}>
      <h3>Quiz finished</h3>
      <p>Your score: {score} / {questions.length}</p>
      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={() => { setStage("start"); setQuestions([]); }}>Play again</button>
        <button className="btn primary" onClick={() => navigate("/leaderboard")}>See leaderboard</button>
      </div>
    </div>
  );
};

export default Quiz;
