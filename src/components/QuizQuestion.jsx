import React, { useState } from "react";

const QuizQuestion = ({ flag, answer, onAnswer }) => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect =
      userInput.trim().toLowerCase() === answer.trim().toLowerCase();
    onAnswer(isCorrect);
    setUserInput("");
  };

  return (
    <div className="p-4 text-center">
      <img src={flag} alt="flag" className="w-40 h-24 mx-auto mb-4" />
      <form onSubmit={handleSubmit}>
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter country name"
          className="border p-2 rounded w-64"
        />
        <button
          type="submit"
          className="ml-2 bg-[var(--primary)] text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuizQuestion;
