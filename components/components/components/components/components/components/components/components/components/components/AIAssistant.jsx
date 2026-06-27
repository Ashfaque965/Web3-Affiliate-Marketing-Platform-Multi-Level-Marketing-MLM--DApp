import React, { useState } from "react";
import { FiCpu, FiSend } from "react-icons/fi";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Welcome back. Ask me any structural strategy questions regarding x4 or xXx cycles." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");

    // Simulate real-time on-chain assistance data responses
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "To optimize matrix velocity, focus your Tier 1 directs on upgrading to Level 3 synchronously to ensure cycle looping triggers." }
      ]);
    }, 800);
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl h-80 flex flex-col justify-between overflow-hidden text-white w-full max-w-sm">
      <div className="p-3.5 border-b border-slate-800 flex items-center gap-2 bg-purple-950/20">
        <FiCpu className="text-purple-400 w-4 h-4 animate-pulse" />
        <span className="text-xs font-bold font-sans">Ecosystem Co-Pilot Coprocessor</span>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-none text-xs">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] p-2.5 rounded-xl border leading-relaxed ${
              msg.role === "user" 
                ? "bg-purple-600 border-purple-500 text-white rounded-br-none" 
                : "bg-slate-950/60 border-slate-800 text-slate-300 rounded-bl-none"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-2 border-t border-slate-800 bg-slate-950/20 flex gap-1.5 items-center">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask strategic node operations configurations..." 
          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 transition"
        />
        <button type="submit" className="p-2 bg-purple-600 hover:bg-purple-500 transition rounded-lg text-white">
          <FiSend className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}