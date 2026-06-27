import React from "react";
import { FiDollarSign, FiArrowUpRight } from "react-icons/fi";

export default function EarningsCard({ totalEarnings = "0", dynamicCycles = 0 }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 text-white flex items-center justify-between">
      <div className="space-y-1">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Accumulated Income</span>
        <h4 className="text-2xl font-black font-mono text-emerald-400">+{totalEarnings} LINKTUM</h4>
        <p className="text-[11px] text-slate-400 flex items-center gap-1">
          <FiArrowUpRight className="text-emerald-400" /> {dynamicCycles} matrix matrix structures recycled
        </p>
      </div>
      <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 shadow-inner">
        <FiDollarSign className="w-6 h-6" />
      </div>
    </div>
  );
}