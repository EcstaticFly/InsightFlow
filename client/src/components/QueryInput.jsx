import React, { useState, useEffect, useRef } from "react";
import { X as XIcon, Loader, Send, ChartArea } from "lucide-react";
import {
  submitQuery,
  setResult,
  setError,
  setSuggestions,
} from "../store/querySlice/index.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchAISuggestions, mockQueryResponse } from "../configs/mockAPI.js";

const QueryInput = ({
  loading,
  isDark,
  disableSuggestions,
  setDisableSuggestions,
  setTypedInput,
  setInput,
  typedInput,
  input,
}) => {
  const { suggestions } = useSelector((state) => state.query);
  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const [isPreview, setIsPreview] = useState(false);

  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  const previousInputRef = useRef("");
  const handleQuerySubmit = async () => {
    setShowSuggestions(false);
    dispatch(submitQuery(typedInput));
    try {
      const response = await mockQueryResponse(typedInput);
      dispatch(setResult(response));
    } catch (err) {
      dispatch(setError("Failed to process query."));
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    setDisableSuggestions(false);
    setTypedInput(value);
    setInput(value);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (disableSuggestions) return;

    if (typedInput.length <= 2) {
      dispatch(setSuggestions([]));
      setShowSuggestions(false);
      previousInputRef.current = typedInput;
      return;
    }
    if (typedInput.length < previousInputRef.current.length) {
      previousInputRef.current = typedInput;
      return;
    }
    setIsFetchingSuggestions(true);
    const timer = setTimeout(() => {
      fetchAISuggestions(typedInput)
        .then((aiSuggestions) => {
          dispatch(setSuggestions(aiSuggestions));
          setShowSuggestions(true);
          setIsFetchingSuggestions(false);
        })
        .catch(() => {
          dispatch(setSuggestions([]));
          setShowSuggestions(false);
          setIsFetchingSuggestions(false);
        });
      previousInputRef.current = typedInput;
    }, 300);
    return () => clearTimeout(timer);
  }, [typedInput, disableSuggestions, dispatch]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionMouseEnter = (suggestion) => {
    setInput(suggestion);
    setIsPreview(true);
  };

  const handleSuggestionMouseLeave = () => {
    setInput(typedInput);
    setIsPreview(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setTypedInput(suggestion);
    setInput(suggestion);
    setIsPreview(false);
    dispatch(setSuggestions([]));
    setShowSuggestions(false);
    setDisableSuggestions(true);
  };

  const handleClearInput = () => {
    setTypedInput("");
    setInput("");
    dispatch(setSuggestions([]));
    setShowSuggestions(false);
  };
  const buttonStyles = {
    backgroundColor: "#4299e1",
    color: "#ffffff",
    hoverBackgroundColor: "#3182ce",
    transition: "background-color 0.3s",
  };
  const inputStyles = {
    backgroundColor: isDark ? "#4a5568" : "#ffffff",
    color: isDark ? "#f7fafc" : "#1a202c",
    borderColor: isDark ? "#718096" : "#e2e8f0",
  };
  const suggestionStyles = {
    backgroundColor: isDark ? "#2d3748" : "#ffffff",
    hoverBackgroundColor: isDark ? "#4a5568" : "#f3f4f6",
    borderColor: isDark ? "#4a5568" : "#e2e8f0",
    color: isDark ? "#f7fafc" : "#1a202c",
  };
  return (
    <div className="mb-4 sm:mb-6">
      <div className="relative" ref={inputRef}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center">
          <div className="relative flex-grow mb-2 sm:mb-0">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {isFetchingSuggestions ? (
                <Loader
                  size={18}
                  className={`animate-spin ${
                    isDark ? "text-gray-200" : "text-gray-600"
                  }}`}
                />
              ) : (
                <ChartArea size={18} />
              )}
            </div>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              style={inputStyles}
              className={`w-full p-3 pl-10 border rounded-t sm:rounded-l sm:rounded-tr-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              } ${isFetchingSuggestions ? "cursor-wait opacity-50" : ""}`}
              placeholder="Ask a query..."
            />
            {input && (
              <button
                onClick={handleClearInput}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer rounded-full p-1 transition-colors ${
                  isDark
                    ? "hover:bg-gray-700 text-gray-200"
                    : "hover:bg-gray-200 text-gray-600"
                }`}
              >
                <XIcon size={18} />
              </button>
            )}
          </div>
          <button
            onClick={handleQuerySubmit}
            style={{
              backgroundColor: buttonStyles.backgroundColor,
              color: buttonStyles.color,
            }}
            disabled={loading || input === ""}
            className={`flex items-center justify-center px-4 py-3 rounded-b sm:rounded-r sm:rounded-bl-none hover:bg-opacity-90 transition-colors ${
              loading || input === ""
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <Send size={18} className="mr-2" />
            Submit
          </button>
        </div>

        {suggestions.length > 0 && showSuggestions && (
          <div className="relative">
            <ul
              className="absolute top-1 left-0 w-full mt-1 border rounded shadow-lg z-50 max-h-64 overflow-y-auto"
              style={{
                backgroundColor: suggestionStyles.backgroundColor,
                borderColor: suggestionStyles.borderColor,
              }}
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  style={{
                    color: suggestionStyles.color,
                  }}
                  className="p-3 cursor-pointer transition-colors border-b last:border-b-0"
                  onMouseEnter={() => handleSuggestionMouseEnter(suggestion)}
                  onMouseLeave={handleSuggestionMouseLeave}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor =
                      suggestionStyles.hoverBackgroundColor;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor =
                      suggestionStyles.backgroundColor;
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryInput;
