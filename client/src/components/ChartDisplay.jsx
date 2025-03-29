import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  Area,
  ComposedChart,
  AreaChart,
  BarChart,
  ResponsiveContainer,
} from "recharts";

const ChartDisplay = ({ isDark, cardStyles }) => {
  const [chartType, setChartType] = useState("line");
  const { result } = useSelector((state) => state.query);
  const chartColors = {
    grid: isDark ? "#4a5568" : "#e2e8f0",
    axis: isDark ? "#f7fafc" : "#4a5568",
    tooltip: {
      backgroundColor: isDark ? "#2d3748" : "#ffffff",
      borderColor: isDark ? "#4a5568" : "#e2e8f0",
      color: isDark ? "#f7fafc" : "#1a202c",
    },
  };
  return (
    <div className="mt-4 sm:mt-6">
      <h2
        style={{ color: isDark ? "#f7fafc" : "#1a202c" }}
        className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4"
      >
        Query Result
      </h2>
      <div
        style={{ ...cardStyles, marginBottom: "1rem" }}
        className="p-3 sm:p-4 rounded flex justify-center flex-wrap gap-2 sm:gap-4"
      >
        <button
          onClick={() => setChartType("line")}
          style={{
            backgroundColor:
              chartType === "line"
                ? isDark
                  ? "#4299e1"
                  : "#3182ce"
                : isDark
                ? "#2d3748"
                : "#e2e8f0",
            color:
              chartType === "line" ? "#ffffff" : isDark ? "#f7fafc" : "#1a202c",
          }}
          className="px-2 sm:px-4 py-1 sm:py-2 rounded transition-colors cursor-pointer text-xs sm:text-sm"
        >
          Line Chart
        </button>
        <button
          onClick={() => setChartType("bar")}
          style={{
            backgroundColor:
              chartType === "bar"
                ? isDark
                  ? "#4299e1"
                  : "#3182ce"
                : isDark
                ? "#2d3748"
                : "#e2e8f0",
            color:
              chartType === "bar" ? "#ffffff" : isDark ? "#f7fafc" : "#1a202c",
          }}
          className="px-2 sm:px-4 py-1 sm:py-2 rounded transition-colors cursor-pointer text-xs sm:text-sm"
        >
          Bar Chart
        </button>
        <button
          onClick={() => setChartType("area")}
          style={{
            backgroundColor:
              chartType === "area"
                ? isDark
                  ? "#4299e1"
                  : "#3182ce"
                : isDark
                ? "#2d3748"
                : "#e2e8f0",
            color:
              chartType === "area" ? "#ffffff" : isDark ? "#f7fafc" : "#1a202c",
          }}
          className="px-2 sm:px-4 py-1 sm:py-2 rounded transition-colors cursor-pointer text-xs sm:text-sm"
        >
          Area Chart
        </button>
        <button
          onClick={() => setChartType("composed")}
          style={{
            backgroundColor:
              chartType === "composed"
                ? isDark
                  ? "#4299e1"
                  : "#3182ce"
                : isDark
                ? "#2d3748"
                : "#e2e8f0",
            color:
              chartType === "composed"
                ? "#ffffff"
                : isDark
                ? "#f7fafc"
                : "#1a202c",
          }}
          className="px-2 sm:px-4 py-1 sm:py-2 rounded transition-colors cursor-pointer text-xs sm:text-sm"
        >
          Combined Chart
        </button>
      </div>
      <div style={cardStyles} className="p-3 sm:p-4 rounded">
        <div className="w-full" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" && (
              <LineChart data={result.data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartColors.grid}
                />
                <XAxis
                  dataKey="name"
                  stroke={chartColors.axis}
                  tick={{ fontSize: "0.75rem" }}
                />
                <YAxis
                  stroke={chartColors.axis}
                  tick={{ fontSize: "0.75rem" }}
                />
                <Tooltip contentStyle={chartColors.tooltip} />
                <Legend
                  wrapperStyle={{
                    color: chartColors.axis,
                    fontSize: "0.75rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Current"
                  stroke="#4299e1"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="previousYear"
                  name="Previous Year"
                  stroke="#9f7aea"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            )}
            {chartType === "bar" && (
              <BarChart data={result.data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartColors.grid}
                />
                <XAxis
                  dataKey="name"
                  stroke={chartColors.axis}
                  tick={{ fontSize: "0.75rem" }}
                />
                <YAxis
                  stroke={chartColors.axis}
                  tick={{ fontSize: "0.75rem" }}
                />
                <Tooltip contentStyle={chartColors.tooltip} />
                <Legend
                  wrapperStyle={{
                    color: chartColors.axis,
                    fontSize: "0.75rem",
                  }}
                />
                <Bar dataKey="value" name="Current" fill="#4299e1" />
                <Bar
                  dataKey="previousYear"
                  name="Previous Year"
                  fill="#9f7aea"
                />
              </BarChart>
            )}
            {chartType === "area" && (
              <AreaChart data={result.data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartColors.grid}
                />
                <XAxis
                  dataKey="name"
                  stroke={chartColors.axis}
                  tick={{ fontSize: "0.75rem" }}
                />
                <YAxis
                  stroke={chartColors.axis}
                  tick={{ fontSize: "0.75rem" }}
                />
                <Tooltip contentStyle={chartColors.tooltip} />
                <Legend
                  wrapperStyle={{
                    color: chartColors.axis,
                    fontSize: "0.75rem",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  name="Current"
                  stroke="#4299e1"
                  fill="#4299e1"
                  fillOpacity={0.4}
                />
                <Area
                  type="monotone"
                  dataKey="previousYear"
                  name="Previous Year"
                  stroke="#9f7aea"
                  fill="#9f7aea"
                  fillOpacity={0.3}
                />
              </AreaChart>
            )}
            {chartType === "composed" && (
              <ComposedChart data={result.data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartColors.grid}
                />
                <XAxis
                  dataKey="name"
                  stroke={chartColors.axis}
                  tick={{ fontSize: "0.75rem" }}
                />
                <YAxis
                  stroke={chartColors.axis}
                  tick={{ fontSize: "0.75rem" }}
                />
                <Tooltip contentStyle={chartColors.tooltip} />
                <Legend
                  wrapperStyle={{
                    color: chartColors.axis,
                    fontSize: "0.75rem",
                  }}
                />
                <Bar
                  dataKey="value"
                  name="Current"
                  fill="#4299e1"
                  fillOpacity={0.8}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="#f56565"
                  strokeWidth={2}
                />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-4 sm:mt-6">
        <h3
          className="text-base sm:text-lg font-semibold mb-2"
          style={{ color: isDark ? "#f7fafc" : "#1a202c" }}
        >
          Data Details
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-xs sm:text-sm">
            <thead>
              <tr>
                <th
                  className="px-2 sm:px-4 py-1 sm:py-2 border"
                  style={{
                    backgroundColor: isDark ? "#4a5568" : "#e2e8f0",
                  }}
                >
                  Name
                </th>
                <th
                  className="px-2 sm:px-4 py-1 sm:py-2 border"
                  style={{
                    backgroundColor: isDark ? "#4a5568" : "#e2e8f0",
                  }}
                >
                  Value
                </th>
                <th
                  className="px-2 sm:px-4 py-1 sm:py-2 border"
                  style={{
                    backgroundColor: isDark ? "#4a5568" : "#e2e8f0",
                  }}
                >
                  Previous Year
                </th>
                {chartType === "composed" && (
                  <th
                    className="px-2 sm:px-4 py-1 sm:py-2 border"
                    style={{
                      backgroundColor: isDark ? "#4a5568" : "#e2e8f0",
                    }}
                  >
                    Target
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {result.data.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border">
                    {item.name}
                  </td>
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border">
                    {item.value}
                  </td>
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border">
                    {item.previousYear}
                  </td>
                  {chartType === "composed" && (
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border">
                      {item.target}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChartDisplay;
