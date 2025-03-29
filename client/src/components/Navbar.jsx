import React from "react";

const Navbar = ({ isDark, toggleDarkMode }) => {
  return (
    <div className="flex flex-wrap justify-between items-center py-4 sm:py-6">
      <div className="flex gap-1 items-center justify-center mb-2 sm:mb-0">
        <img
          src={isDark ? "/Logo-Dark.png" : "/Logo-Light.png"}
          className="size-8 rounded-lg"
          alt="Logo"
        />
        <h1
          style={{ color: isDark ? "#f7fafc" : "#1a202c" }}
          className="text-xl sm:text-2xl md:text-3xl font-bold"
        >
          InsightFlow
        </h1>
      </div>
      <button
        onClick={toggleDarkMode}
        className="px-3 py-1 sm:px-4 sm:py-2 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
        style={{
          backgroundColor: isDark ? "#2d3748" : "#e2e8f0",
          color: isDark ? "#f7fafc" : "#1a202c",
          border: isDark ? "1px solid #4a5568" : "1px solid #cbd5e0",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        {isDark ? (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-yellow-300"
            >
              <path
                d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
            Light Mode
          </>
        ) : (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-indigo-600"
            >
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Dark Mode
          </>
        )}
      </button>
    </div>
  );
};

export default Navbar;
