import { Routes, Route } from "react-router-dom";
import { useAppContext } from "./contexts/useAppContext";
import Navbar from "./components/Navbar";
import GlobalLoader from "./components/GlobalLoader";
import Home from "./pages/Home";
import Countries from "./pages/Countries";
import CountryDetails from "./pages/CountryDetails";
import Collection from "./pages/Collection";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";

function App() {
  const { isDarkMode, isGlobalLoading } = useAppContext();
  
  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <GlobalLoader 
        isVisible={isGlobalLoading} 
        onComplete={() => {}} // Empty function since we don't use it
      />
      
      {!isGlobalLoading && (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/countries/:countryName" element={<CountryDetails />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
