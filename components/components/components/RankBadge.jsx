import React from "react";
import { FiAward } from "react-icons/fi";

export default function RankBadge({ downlineCount = 0 }) {
  const getRankConfig = (count) => {
    if (count >= 50) return { title: "Ecosystem Titan", style: "from-amber-500 via-orange-600 to-yellow-500 text-amber-100" };
    if (count >= 15) return { title: "Vanguard Leader", style: "from-purple-600 via-pink-600 to-indigo-600 text-purple-100" };
    return { title: "Ecosystem Affiliate", style: "from-slate-800 to-slate-900 text-slate-300 border-slate-700" };
  };

  const rank = getRankConfig(downlineCount);

  return (
    <div className={`bg-gradient-to-r ${rank.style} px-4 py-2.5 rounded-xl border flex items-center gap-2.5 shadow-lg shadow-black/30 font-sans`}>
      <FiAward className="w-4 h-4 shrink-0" />
      <div>
        <div className="text-[9px] uppercase tracking-widest font-black opacity-60">Account Standing</div>
        <div className="text-xs font-bold tracking-tight">{rank.title}</div>
      </div>
    </div>
  );
}