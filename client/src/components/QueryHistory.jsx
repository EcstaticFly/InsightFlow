import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const getPageNumbers = (currentPage, totalPages) => {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages; i++) {
    range.push(i);
  }

  for (let i of range) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      rangeWithDots.push(i);
    } else if (rangeWithDots[rangeWithDots.length - 1] !== "...") {
      rangeWithDots.push("...");
    }
  }
  return rangeWithDots;
};

const QueryHistory = ({
  handleHistoryClick,
  cardStyles,
  isDark,
}) => {
  const {queryHistory} = useSelector((state) => state.query);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const sortedHistory =
    sortOrder === "asc" ? [...queryHistory] : [...queryHistory].reverse();
  const totalPages = Math.ceil(sortedHistory.length / itemsPerPage);
  const displayedHistory = sortedHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="mt-6 sm:mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h2
          style={{ color: isDark ? "#f7fafc" : "#1a202c" }}
          className="text-xl sm:text-2xl font-semibold"
        >
          Query History ({queryHistory.length})
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm sm:text-base">Sort by time:</span>
          <div className="flex space-x-2">
            <div
              onClick={() => {
                setSortOrder("desc");
                setCurrentPage(1);
              }}
              className={`px-2 sm:px-3 py-1 border rounded cursor-pointer transition-colors text-xs sm:text-sm ${
                sortOrder === "desc"
                  ? "bg-blue-500 text-white"
                  : isDark
                  ? "bg-[#1a202c] text-white"
                  : "bg-[#f7fafc] text-black"
              }`}
            >
              Newest
            </div>
            <div
              onClick={() => {
                setSortOrder("asc");
                setCurrentPage(1);
              }}
              className={`px-2 sm:px-3 py-1 border rounded cursor-pointer transition-colors text-xs sm:text-sm ${
                sortOrder === "asc"
                  ? "bg-blue-500 text-white"
                  : isDark
                  ? "bg-[#1a202c] text-white"
                  : "bg-[#f7fafc] text-black"
              }`}
            >
              Oldest
            </div>
          </div>
        </div>
      </div>
      {queryHistory.length === 0 ? (
        <p className="text-sm sm:text-base">No query history.</p>
      ) : (
        <>
          <div style={{ height: "300px", overflowY: "auto" }}>
            <ul className="space-y-2">
              {displayedHistory.map((entry, index) => (
                <li
                  key={index}
                  style={cardStyles}
                  className="p-2 sm:p-3 rounded shadow cursor-pointer hover:opacity-90 transition-opacity text-xs sm:text-sm"
                  onClick={() => handleHistoryClick(entry)}
                >
                  {entry.query}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex items-center justify-center flex-wrap gap-1 sm:gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 sm:px-3 py-1 border rounded disabled:opacity-50 text-xs sm:text-sm"
            >
              Prev
            </button>
            {getPageNumbers(currentPage, totalPages).map((page, index) =>
              page === "..." ? (
                <span
                  key={index}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm"
                >
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 sm:px-3 py-1 border rounded transition-colors text-xs sm:text-sm ${
                    currentPage === page ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-2 sm:px-3 py-1 border rounded disabled:opacity-50 text-xs sm:text-sm"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QueryHistory;
