import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadHistory } from "../store/querySlice/index.js";

import { Loader } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import QueryHistory from "../components/QueryHistory.jsx";
import ChartDisplay from "../components/ChartDisplay.jsx";
import QueryInput from "../components/QueryInput.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { result, loading, error } = useSelector((state) => state.query);
  const [typedInput, setTypedInput] = useState("");
  const [input, setInput] = useState("");
  const [disableSuggestions, setDisableSuggestions] = useState(false);

  const [isDark, setIsDark] = useState(useDarkMode());

  const themeStyles = {
    backgroundColor: isDark ? "#1a202c" : "#f7fafc",
    color: isDark ? "#f7fafc" : "#1a202c",
    transition: "background-color 0.3s, color 0.3s",
  };

  const cardStyles = {
    backgroundColor: isDark ? "#2d3748" : "#ffffff",
    color: isDark ? "#f7fafc" : "#1a202c",
    boxShadow: isDark
      ? "0 4px 6px rgba(0, 0, 0, 0.3)"
      : "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s, color 0.3s, box-shadow 0.3s",
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#1a202c";
      document.body.style.color = "#f7fafc";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#f7fafc";
      document.body.style.color = "#1a202c";
    }
    localStorage.setItem("darkMode", isDark);
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const handleHistoryClick = (entry) => {
    setTypedInput(entry.query);
    setInput(entry.query);
    dispatch(loadHistory(entry));
    setDisableSuggestions(true);
  };
  return (
    <div style={themeStyles} className="min-h-screen flex flex-col">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />

        <div style={cardStyles} className="rounded-lg p-3 sm:p-6">
          <QueryInput
            loading={loading}
            isDark={isDark}
            typedInput={typedInput}
            input={input}
            setTypedInput={setTypedInput}
            setInput={setInput}
            disableSuggestions={disableSuggestions}
            setDisableSuggestions={setDisableSuggestions}
          />

          {loading && (
            <div className="flex justify-center items-center py-6 sm:py-8">
              <Loader size={24} className="animate-spin text-blue-400 mr-2" />
              <p
                style={{ color: isDark ? "#a0aec0" : "#718096" }}
                className="text-center"
              >
                Processing your query...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 sm:p-4 mb-4 rounded">
              <p className="flex items-center">
                <span className="font-semibold mr-2">Error:</span> {error}
              </p>
            </div>
          )}

          {result && <ChartDisplay isDark={isDark} cardStyles={cardStyles} />}
        </div>

        <QueryHistory
          cardStyles={cardStyles}
          handleHistoryClick={handleHistoryClick}
          isDark={isDark}
        />
      </div>

      <Footer isDark={isDark} />
    </div>
  );
};

export default Dashboard;
