import React from "react";
import { FiZap } from "react-icons/fi";

export default function GasTracker() {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-4 text-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 shadow-inner">
          <FiZap className="w-4 h-4 animate-pulse" />
        </div>
        <div>
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Ethereum Gas Tracker</span>
          <h5 className="text-sm font-black font-mono mt-0.5 text-slate-200">
            32 <span className="text-[10px] font-bold text-amber-400 font-sans">Gwei</span>
          </h5>
        </div>
      </div>
      <div className="text-right">
        <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-md border border-green-500/20 font-mono">
          Optimal
        </span>
      </div>
    </div>
  );
}