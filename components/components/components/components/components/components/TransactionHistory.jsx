import React from "react";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";

export default function TransactionHistory({ txs = [] }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 text-white shadow-xl overflow-hidden">
      <div className="p-4 border-b border-slate-800/80">
        <h4 className="text-sm font-bold">Ledger Dispatches</h4>
      </div>
      <div className="divide-y divide-slate-800/40">
        {txs.map((tx, idx) => (
          <div key={idx} className="p-3.5 flex justify-between items-center hover:bg-slate-950/10 transition text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <FiArrowUpRight className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-200">{tx.type || "Upgrade Contract"}</p>
                <span className="text-[10px] font-mono text-slate-500 block mt-0.5">{tx.hash?.slice(0, 16)}...</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-emerald-400">+{tx.amount} LKM</span>
              <a href={`https://holesky.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noreferrer" className="block text-[10px] text-purple-400 hover:underline mt-0.5">
                Explorer <FiExternalLink className="inline w-2.5 h-2.5 ml-0.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}