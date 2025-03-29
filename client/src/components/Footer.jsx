import React from "react";

const Footer = ({ isDark }) => {
  return (
    <footer className="mt-8 py-4 text-center text-xs sm:text-sm">
      <p style={{ color: isDark ? "#a0aec0" : "#718096" }}>
        &copy; {new Date().getFullYear()} InsightFlow Analytics. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
