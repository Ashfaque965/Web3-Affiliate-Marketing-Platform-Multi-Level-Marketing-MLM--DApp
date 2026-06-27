import React from "react";
import { FiTrendingUp, FiCopy, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTokenData } from "../hooks/useContract";
import toast from "react-hot-toast";

export default function WalletCard({ userAddress }) {
  const { balance } = useTokenData();
  const [copied, setCopied] = React.useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(userAddress);
    setCopied(true);
    toast.success("Wallet coordinates saved!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/40 rounded-2xl border border-slate-800 p-6 shadow-xl text-white relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500" />
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Net Portfolio Liquidity</p>
          <h3 className="text-3xl font-extrabold mt-1 font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            {Number(balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-xs font-bold text-purple-400 ml-1.5 font-sans">LINKTUM</span>
          </h3>
        </div>
        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
          <FiTrendingUp className="w-5 h-5" />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
        <div className="font-mono text-xs text-slate-400">
          {userAddress ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : "Disconnected"}
        </div>
        {userAddress && (
          <button onClick={copyAddress} className="text-slate-500 hover:text-white transition">
            {copied ? <FiCheckCircle className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}