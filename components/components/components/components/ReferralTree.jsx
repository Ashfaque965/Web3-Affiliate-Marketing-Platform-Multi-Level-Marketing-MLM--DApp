import React from "react";
import { FiUser, FiChevronRight } from "react-icons/fi";

export default function ReferralTree({ directNodes = [] }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-5 text-white">
      <div className="mb-4">
        <h4 className="text-sm font-bold">Direct Line Affiliates</h4>
        <p className="text-[11px] text-slate-500">Tier-1 network expansion architecture.</p>
      </div>
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {directNodes.length > 0 ? (
          directNodes.map((node, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800/50 hover:border-slate-800 transition">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                  <FiUser className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold font-mono text-slate-200">{node.address.slice(0, 12)}...</div>
                  <div className="text-[10px] text-slate-500">Joined {node.date || "Just now"}</div>
                </div>
              </div>
              <FiChevronRight className="w-4 h-4 text-slate-600" />
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500 text-xs">No downstream affiliates detected inside current tree context.</div>
        )}
      </div>
    </div>
  );
}