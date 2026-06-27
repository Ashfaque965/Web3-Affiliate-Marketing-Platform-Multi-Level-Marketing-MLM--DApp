import React from "react";
import { FiBell, FiMail, FiZap } from "react-icons/fi";

export default function NotificationCenter({ notifications = [] }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden text-white w-full max-w-sm">
      <div className="p-4 border-b border-slate-800/80 flex justify-between items-center bg-slate-950/20">
        <h4 className="text-xs font-bold flex items-center gap-2">
          <FiBell className="text-purple-400" /> Event Stream Matrix Monitor
        </h4>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Live Sync</span>
      </div>
      <div className="divide-y divide-slate-800/40 max-h-64 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notif, idx) => (
            <div key={idx} className="p-3 flex gap-3 hover:bg-slate-950/10 transition items-start">
              <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded-md mt-0.5">
                <FiZap className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-slate-300 font-medium leading-tight">{notif.message}</p>
                <span className="text-[10px] text-slate-500 font-mono block">{notif.time || "Just now"}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2">
            <FiMail className="w-5 h-5 text-slate-700" />
            Ecosystem logs are clear. No new notifications.
          </div>
        )}
      </div>
    </div>
  );
}