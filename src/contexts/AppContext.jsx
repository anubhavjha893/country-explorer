import { createContext, useContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [savedCountries, setSavedCountries] = useState(
    JSON.parse(localStorage.getItem("savedCountries")) || []
  );
  const [quizResults, setQuizResults] = useState(
    JSON.parse(localStorage.getItem("quizResults")) || []
  );
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDarkMode")) ?? true
  );

  // Sync savedCountries with localStorage
  useEffect(() => {
    localStorage.setItem("savedCountries", JSON.stringify(savedCountries));
  }, [savedCountries]);

  // Sync quizResults with localStorage
  useEffect(() => {
    localStorage.setItem("quizResults", JSON.stringify(quizResults));
  }, [quizResults]);

  // Sync isDarkMode with localStorage
  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <AppContext.Provider
      value={{
        savedCountries,
        setSavedCountries,
        quizResults,
        setQuizResults,
        loading,
        setLoading,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ✅ Correct export
export const useAppContext = () => {
  return useContext(AppContext);
};
