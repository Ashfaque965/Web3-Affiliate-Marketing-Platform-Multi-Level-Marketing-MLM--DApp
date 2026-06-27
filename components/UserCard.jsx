import React from "react";
import RankBadge from "./RankBadge";
import { FiUser } from "react-icons/fi";

export default function UserCard({ id = "0", address = "0x0", partnersCount = 0 }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-5 flex items-center justify-between text-white">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white shadow-md shadow-purple-500/10">
          <FiUser className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-extrabold text-base tracking-tight">Node Member #{id}</h4>
          <p className="text-xs font-mono text-slate-500 mt-0.5">{address.slice(0, 6)}...{address.slice(-4)}</p>
        </div>
      </div>
      <RankBadge downlineCount={Number(partnersCount)} />
    </div>
  );
}