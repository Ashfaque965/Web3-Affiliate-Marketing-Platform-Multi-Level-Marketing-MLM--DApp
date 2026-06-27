import React from "react";
import { FiTrendingUp } from "react-icons/fi";

export default function LeaderboardTable({ leaders = [] }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden text-white">
      <div className="p-4 border-b border-slate-800/80 flex justify-between items-center">
        <h4 className="text-sm font-bold">Top Matrix Champions</h4>
        <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2.5 py-0.5 rounded-full border border-purple-500/20 font-semibold uppercase tracking-wider">Global</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-950/40 border-b border-slate-800/60 text-slate-500 font-mono uppercase text-[10px] tracking-wider">
              <th className="p-3.5">Rank</th>
              <th className="p-3.5">Member Address</th>
              <th className="p-3.5">Total Directs</th>
              <th className="p-3.5 text-right">Volume Trigger</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40 font-sans">
            {leaders.map((leader, idx) => (
              <tr key={idx} className="hover:bg-slate-950/10 transition">
                <td className="p-3.5 font-bold font-mono text-purple-400">#{idx + 1}</td>
                <td className="p-3.5 font-mono text-slate-300">{leader.address.slice(0, 16)}...</td>
                <td className="p-3.5 text-slate-400">{leader.directs} partners</td>
                <td className="p-3.5 text-right font-mono font-bold text-emerald-400">+{leader.volume} LKM</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}