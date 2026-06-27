import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { FiLayout, FiGrid, FiArrowRight, FiCheckCircle } from "react-icons/fi";

const MatrixPreview = ({ x4ActiveLevel, x4FilledSlots, xxxActiveLevel, xxxFilledSlots }) => {
  
  // Quick calculation helper for slot completion visual fills
  const getPercentage = (filled, total) => Math.min(Math.round((filled / total) * 100), 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* ================= x4 PROGRAM PREVIEW CARD ================= */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl relative overflow-hidden group">
        {/* Background Radial Glow Accent */}
        <div className="absolute -right-16 -top-16 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <FiLayout className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white tracking-tight">x4 Matrix</h4>
              <p className="text-xs text-slate-400">2×2 Structure Tree Tier</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-md border border-purple-500/30">
            Level {x4ActiveLevel}/12
          </span>
        </div>

        {/* Matrix Position Structural Slots Tracker Grid */}
        <div className="my-6 bg-slate-950/40 rounded-xl p-4 border border-slate-800/40">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-400 font-medium">Active Board Allocation</span>
            <span className="text-xs font-semibold text-purple-400">{x4FilledSlots} / 6 Cycles Filled</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-500"
              style={{ width: `${getPercentage(x4FilledSlots, 6)}%` }}
            />
          </div>
          
          {/* Visual node slots matrix shorthand placeholder map */}
          <div className="flex gap-1.5 mt-4 justify-start">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full border ${
                  i < x4FilledSlots 
                    ? "bg-purple-500 border-purple-400 shadow-sm shadow-purple-500/50" 
                    : "bg-slate-900 border-slate-700"
                }`}
              />
            ))}
          </div>
        </div>

        <Link href="/matrix/x4" className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition group/btn">
          Manage x4 Board <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* ================= xXx PROGRAM PREVIEW CARD ================= */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl relative overflow-hidden group">
        {/* Background Radial Glow Accent */}
        <div className="absolute -right-16 -top-16 w-36 h-36 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all duration-500" />
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400">
              <FiGrid className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white tracking-tight">xXx Matrix</h4>
              <p className="text-xs text-slate-400">2+4+8 Network Matrix</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 bg-pink-500/20 text-pink-300 rounded-md border border-pink-500/30">
            Level {xxxActiveLevel}/12
          </span>
        </div>

        {/* Matrix Position Structural Slots Tracker Grid */}
        <div className="my-6 bg-slate-950/40 rounded-xl p-4 border border-slate-800/40">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-400 font-medium">Active Board Allocation</span>
            <span className="text-xs font-semibold text-pink-400">{xxxFilledSlots} / 14 Cycles Filled</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-pink-500 to-rose-500 h-full transition-all duration-500"
              style={{ width: `${getPercentage(xxxFilledSlots, 14)}%` }}
            />
          </div>

          {/* Visual node slots matrix shorthand placeholder map */}
          <div className="flex gap-1.5 mt-4 justify-start flex-wrap">
            {[...Array(14)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full border ${
                  i < xxxFilledSlots 
                    ? "bg-pink-500 border-pink-400 shadow-sm shadow-pink-500/50" 
                    : "bg-slate-900 border-slate-700"
                }`}
              />
            ))}
          </div>
        </div>

        <Link href="/matrix/xxx" className="inline-flex items-center gap-2 text-xs font-bold text-pink-400 hover:text-pink-300 transition group/btn">
          Manage xXx Board <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
};

MatrixPreview.propTypes = {
  x4ActiveLevel: PropTypes.number,
  x4FilledSlots: PropTypes.number,
  xxxActiveLevel: PropTypes.number,
  xxxFilledSlots: PropTypes.number,
};

MatrixPreview.defaultProps = {
  x4ActiveLevel: 1,
  x4FilledSlots: 0,
  xxxActiveLevel: 1,
  xxxFilledSlots: 0,
};

export default MatrixPreview;