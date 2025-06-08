import React, { useState } from "react";
import axios from "axios";

const API_KEY = "AIzaSyBy0bollGfC9bRShLdqcFBBYsEeE6QsjMA"; // 
const CSE_ID = "1069ec3c70cb74944";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [startIndex, setStartIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleSearch = async (start = 1) => {
    if (!query) return;
    setLoading(true);

    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}&start=${start}`;

    try {
      const res = await axios.get(url);
      setResults(res.data.items || []);
      console.log("Search results:", res.data.items);
      
      setStartIndex(start);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 font-sans">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">🔍 Personal Blog Search</h1>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search blogs like 'how to become PM'"
          className="w-full max-w-xl px-5 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          onClick={() => handleSearch(1)}
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md transition cursor-pointer disabled:opacity-50`}
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Loading...
            </>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {loading && (
        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}

      <div className="max-w-3xl mx-auto space-y-6">
        {results.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-medium text-blue-700 hover:underline cursor-pointer"
            >
              {item.title}
            </a>
            <p className="text-sm text-gray-700 mt-2">{item.snippet}</p>
            <p className="text-xs text-gray-500 mt-1">Source: {item.displayLink}</p>
          </div>
        ))}
      </div>

      {results.length > 0 && (
        <div className="flex justify-center gap-6 mt-10">
          <button
            onClick={() => handleSearch(Math.max(startIndex - 10, 1))}
            disabled={startIndex === 1 || loading}
            className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            Previous
          </button>
          <button
            onClick={() => handleSearch(startIndex + 10)}
            disabled={loading}
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
