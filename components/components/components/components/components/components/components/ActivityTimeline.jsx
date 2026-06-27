import React from "react";

export default function ActivityTimeline({ checkpoints = [] }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-5 text-white">
      <div className="mb-5">
        <h4 className="text-sm font-bold">Account Lifecycle Milestones</h4>
      </div>
      <div className="relative border-l border-slate-800/80 ml-2.5 space-y-5">
        {checkpoints.map((cp, idx) => (
          <div key={idx} className="relative pl-6 group">
            <div className="absolute -left-[5.5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-950 border border-purple-500 group-hover:bg-purple-400 transition" />
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-slate-500 font-bold block">{cp.date}</span>
              <h5 className="text-xs font-semibold text-slate-300 group-hover:text-white transition">{cp.title}</h5>
              <p className="text-[11px] text-slate-500">{cp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}