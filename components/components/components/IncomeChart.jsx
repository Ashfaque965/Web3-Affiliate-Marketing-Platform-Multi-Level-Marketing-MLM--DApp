import React from "react";
import { FiActivity } from "react-icons/fi";

export default function IncomeChart() {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-5 text-white">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-sm font-bold">Yield Micro-Velocity</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">Historical graph profiling capital distributions.</p>
        </div>
        <FiActivity className="text-purple-400 w-4 h-4" />
      </div>
      
      {/* Visual wire representation tracking baseline system distribution parameters */}
      <div className="h-40 w-full bg-slate-950/40 rounded-xl border border-slate-800/50 flex items-end justify-between p-4 gap-1">
        {[40, 25, 45, 60, 35, 70, 85, 50, 65, 90, 75, 95].map((val, idx) => (
          <div key={idx} className="flex-1 group relative flex justify-center h-full items-end">
            <div 
              style={{ height: `${val}%` }} 
              className="w-full bg-gradient-to-t from-purple-600/40 to-purple-500 rounded-t-sm group-hover:from-pink-500 group-hover:to-pink-400 transition-all duration-300"
            />
            <span className="absolute -top-6 bg-slate-900 border border-slate-800 text-[9px] font-mono px-1 rounded opacity-0 group-hover:opacity-100 transition duration-150 text-slate-200 z-10">
              {val}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}