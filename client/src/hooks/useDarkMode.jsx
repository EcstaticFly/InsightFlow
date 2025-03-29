
const useDarkMode = () => {
  const savedMode = localStorage.getItem("darkMode");
  return (
    savedMode === "true" ||
    (savedMode === null &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
};

export default useDarkMode;
