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
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);

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

  // Global loader effect - show loader for minimum 10 seconds
  useEffect(() => {
    const startTime = Date.now();
    const minLoadingTime = 10000; // 10 seconds minimum

    // Simple timer that waits for the minimum time
    const timer = setTimeout(() => {
      setIsGlobalLoading(false);
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, []);

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
        isGlobalLoading,
        setIsGlobalLoading,
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
