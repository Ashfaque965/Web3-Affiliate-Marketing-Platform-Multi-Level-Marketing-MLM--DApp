import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { FiUser, FiCheckCircle } from "react-icons/fi";

const MatrixVisualization = ({ program, filledSlots, targetUser, isReadOnlyInspector }) => {
  
  // Node layout maps generated dynamically based on chosen matrix type
  const matrixNodes = useMemo(() => {
    const totalNodes = program.toLowerCase() === "xxx" ? 14 : 6;
    
    return Array.from({ length: totalNodes }, (_, index) => {
      const positionNumber = index + 1;
      const isOccupied = index < filledSlots;
      
      // Determine hierarchical structure generations
      let generation = 1;
      if (program.toLowerCase() === "xxx") {
        if (positionNumber > 2 && positionNumber <= 6) generation = 2;
        if (positionNumber > 6) generation = 3;
      } else {
        if (positionNumber > 2) generation = 2;
      }

      return {
        id: positionNumber,
        occupied: isOccupied,
        generation,
      };
    });
  }, [program, filledSlots]);

  return (
    <div className="w-full select-none py-4">
      {/* Target User Status Header inside Inspector frame */}
      {isReadOnlyInspector && (
        <div className="mb-8 inline-flex items-center gap-2 bg-slate-950/60 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50" />
          Root Node ID / Wallet: <span className="text-purple-400 font-bold">{targetUser.slice(0, 8)}...</span>
        </div>
      )}

      {/* Core Node Generation Tree Container */}
      <div className="flex flex-col items-center gap-12 relative max-w-2xl mx-auto">
        
        {/* ================= LEVEL 0: ROOT OWNER NODE ================= */}
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white border-2 border-purple-400 shadow-xl shadow-purple-500/20 ring-4 ring-slate-950">
            <FiUser className="w-6 h-6" />
          </div>
          <p className="text-[10px] text-center font-bold text-slate-400 mt-1 uppercase tracking-wide">You</p>
        </div>

        {/* ================= GENERATIONS WRAPPER ================= */}
        <div className="w-full space-y-10">
          
          {/* GENERATION 1: Direct Left/Right Handlers */}
          <div className="flex justify-center gap-16 sm:gap-24 relative">
            {matrixNodes
              .filter((n) => n.generation === 1)
              .map((node) => (
                <div key={node.id} className="flex flex-col items-center relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ring-4 ring-slate-950 ${
                    node.occupied
                      ? "bg-purple-500/20 border-purple-400 text-purple-300 shadow-md shadow-purple-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-600"
                  }`}>
                    {node.occupied ? <FiCheckCircle className="w-5 h-5 animate-pulse" /> : <FiUser className="w-5 h-5" />}
                  </div>
                  <span className="text-[9px] font-mono font-semibold text-slate-500 mt-1">Slot #{node.id}</span>
                </div>
              ))}
          </div>

          {/* GENERATION 2: Sub-children Layer */}
          <div className="flex justify-center gap-4 sm:gap-8 relative">
            {matrixNodes
              .filter((n) => n.generation === 2)
              .map((node) => (
                <div key={node.id} className="flex flex-col items-center relative z-10">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-all duration-300 ring-4 ring-slate-950 ${
                    node.occupied
                      ? "bg-pink-500/20 border-pink-400 text-pink-300 shadow-md shadow-pink-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-600"
                  }`}>
                    <FiUser className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-600 mt-1">#{node.id}</span>
                </div>
              ))}
          </div>

          {/* GENERATION 3: Advanced xXx Sub-base Deep Row */}
          {program.toLowerCase() === "xxx" && (
            <div className="flex justify-center gap-2 sm:gap-3 relative flex-wrap">
              {matrixNodes
                .filter((n) => n.generation === 3)
                .map((node) => (
                  <div key={node.id} className="flex flex-col items-center relative z-10">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center border transition-all duration-300 ring-2 ring-slate-950 ${
                      node.occupied
                        ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm"
                        : "bg-slate-900 border-slate-800 text-slate-600"
                    }`}>
                      <FiUser className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[8px] font-mono text-slate-600 mt-0.5">#{node.id}</span>
                  </div>
                ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

MatrixVisualization.propTypes = {
  program: PropTypes.oneOf(["x4", "xxx"]),
  filledSlots: PropTypes.number,
  targetUser: PropTypes.string,
  isReadOnlyInspector: PropTypes.bool,
};

MatrixVisualization.defaultProps = {
  program: "x4",
  filledSlots: 0,
  targetUser: "0x0000000000000000000000000000000000000000",
  isReadOnlyInspector: false,
};

export default MatrixVisualization;