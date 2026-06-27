import React from "react";
import { FiShare2 } from "react-icons/fi";

export default function QRReferral({ referralUrl }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-5 text-white flex flex-col items-center text-center space-y-4">
      <div>
        <h4 className="text-sm font-bold">QR Invitation Access</h4>
        <p className="text-[11px] text-slate-500 mt-0.5">Instant link acquisition barcode vector.</p>
      </div>
      
      <div className="bg-white p-3 rounded-xl border-4 border-slate-800/40 shadow-inner inline-block">
        {/* Synthetic implementation placeholder of dynamic tracking block vectors */}
        <div className="w-32 h-32 bg-slate-950 flex flex-col items-center justify-center p-4 rounded text-center text-[10px] text-slate-500 font-mono">
          <FiShare2 className="w-6 h-6 mb-2 text-purple-400 animate-pulse" />
          [QR NODE GENERATOR]
        </div>
      </div>
      
      <p className="text-[10px] text-slate-400 font-mono truncate max-w-xs">{referralUrl || "Link initialization pending..."}</p>
    </div>
  );
}