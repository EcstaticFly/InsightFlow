import { createSlice } from "@reduxjs/toolkit";

const persistedHistory = JSON.parse(
  localStorage.getItem("queryHistory") || "[]"
);

const querySlice = createSlice({
  name: "query",
  initialState: {
    currentQuery: "",
    queryHistory: persistedHistory,
    result: null,
    loading: false,
    error: null,
    suggestions: [],
  },
  reducers: {
    submitQuery: (state, action) => {
      state.currentQuery = action.payload;
      state.loading = true;
      state.error = null;
    },
    setResult: (state, action) => {
      state.result = action.payload;
      state.loading = false;
      const entry = { query: state.currentQuery, result: action.payload };
      state.queryHistory.push(entry);
      localStorage.setItem("queryHistory", JSON.stringify(state.queryHistory));
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    loadHistory: (state, action) => {
      const entry = action.payload;
      state.currentQuery = entry.query;
      state.result = entry.result;
    },
  },
});

export const { submitQuery, setResult, setError, setSuggestions, loadHistory } =
  querySlice.actions;
export default querySlice.reducer;
