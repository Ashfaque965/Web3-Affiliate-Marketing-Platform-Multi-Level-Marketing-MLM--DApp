import React from "react";
import { FiLock, FiCheckCircle } from "react-icons/fi";

export default function LevelCard({ levelNum, cost, active, onClick, programName }) {
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between h-28 cursor-pointer select-none group relative overflow-hidden ${
        active 
          ? "bg-gradient-to-br from-slate-900 to-purple-950/20 border-purple-500/40 hover:border-purple-500 shadow-md" 
          : "bg-slate-950/40 border-slate-900 opacity-60 hover:opacity-100 hover:border-slate-800"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <span className="font-mono text-xs font-bold text-slate-400">Lvl {levelNum}</span>
        {active ? (
          <FiCheckCircle className="w-4 h-4 text-purple-400" />
        ) : (
          <FiLock className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition" />
        )}
      </div>

      <div>
        <div className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">{programName}</div>
        <div className="text-sm font-black font-mono mt-0.5 text-slate-200">
          {cost} <span className="text-[10px] font-bold text-purple-400">LKM</span>
        </div>
      </div>
    </div>
  );
}