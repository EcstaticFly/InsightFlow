import { GoogleGenerativeAI } from "@google/generative-ai";

export const mockQueryResponse = (query) => {
  return new Promise((resolve) => {
    let data = [];
    const getRandomValue = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    if (
      query.toLowerCase().includes("trend") ||
      query.toLowerCase().includes("growth")
    ) {
      data = Array.from({ length: 6 }, (_, i) => ({
        name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
        value: getRandomValue(10, 100),
      }));
    } else if (
      query.toLowerCase().includes("comparison") ||
      query.toLowerCase().includes("differ")
    ) {
      data = Array.from({ length: 5 }, (_, i) => ({
        name: `Product ${String.fromCharCode(65 + i)}`,
        value: getRandomValue(20, 100),
      }));
    } else if (
      query.toLowerCase().includes("cumulative") ||
      query.toLowerCase().includes("total")
    ) {
      data = Array.from({ length: 5 }, (_, i) => ({
        name: `Week ${i + 1}`,
        value: getRandomValue(15, 75),
      }));
    } else if (
      query.toLowerCase().includes("fluctuat") ||
      query.toLowerCase().includes("volatil")
    ) {
      data = Array.from({ length: 7 }, (_, i) => ({
        name: `Day ${i + 1}`,
        value: getRandomValue(20, 90),
      }));
    } else {
      data = Array.from({ length: 6 }, (_, i) => ({
        name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
        value: getRandomValue(20, 100),
      }));
    }

    const enhancedData = data.map((item) => ({
      ...item,
      previousYear: item.value * (0.7 + Math.random() * 0.6),
      target: item.value * (1.1 + Math.random() * 0.5),
    }));

    setTimeout(() => {
      resolve({
        query,
        data: enhancedData,
      });
    }, 1000);
  });
};

export const fetchAISuggestions = async (query) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `
        Based on the query "${query}", suggest exactly 4 concise and relevant autocomplete suggestions 
        related to data visualization, sales trends, and analytics. 
        Format the response as a JSON array of strings.
      `;

    const result = await model.generateContent(prompt);

    let rawResponse = result.response.text().trim();
    console.log("Raw AI Response:", rawResponse);

    rawResponse = rawResponse.replace(/```json|```/g, "").trim();

    let suggestions = [];
    try {
      suggestions = JSON.parse(rawResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
    }

    if (
      Array.isArray(suggestions) &&
      suggestions.every((item) => typeof item === "string")
    ) {
      return suggestions;
    } else {
      console.error("AI response is not a valid array of strings.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    return [];
  }
};
