import React from "react";

export default function NetworkChart({ stats = { generation1: 0, generation2: 0, generation3: 0 } }) {
  const lines = [
    { name: "Direct Tier 1", val: stats.generation1 || 0, color: "bg-purple-500" },
    { name: "Indirect Tier 2", val: stats.generation2 || 0, color: "bg-pink-500" },
    { name: "Deep Structural Tier 3", val: stats.generation3 || 0, color: "bg-blue-500" },
  ];

  const maxVal = Math.max(...lines.map(l => l.val), 1);

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-5 text-white space-y-4">
      <div>
        <h4 className="text-sm font-bold">Generation Proportions</h4>
        <p className="text-[11px] text-slate-500">Distribution frequency across structural tiers.</p>
      </div>

      <div className="space-y-3">
        {lines.map((line, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">{line.name}</span>
              <span className="font-mono font-bold text-slate-200">{line.val} nodes</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-900">
              <div 
                style={{ width: `${(line.val / maxVal) * 100}%` }} 
                className={`h-full ${line.color} transition-all duration-500`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}