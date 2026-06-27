import React, { useState } from "react";
import { FiSearch, FiArrowRight } from "react-icons/fi";

export default function SearchUser({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <FiSearch className="absolute left-4 top-3.5 text-slate-500 w-4 h-4" />
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Inspect downline address or node parameters..." 
        className="w-full bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl py-3 pl-11 pr-12 text-xs text-white focus:outline-none focus:border-purple-500/80 transition"
      />
      <button type="submit" className="absolute right-2.5 top-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-purple-400">
        <FiArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}