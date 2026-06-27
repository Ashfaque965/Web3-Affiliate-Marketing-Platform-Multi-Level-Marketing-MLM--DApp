import React from "react";
import { FiGrid } from "react-icons/fi";

export default function NFTGallery({ items = [] }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-5 text-white space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-bold">Network Achievement Credentials</h4>
          <p className="text-[11px] text-slate-500">ERC-721 digital collectible vectors.</p>
        </div>
        <FiGrid className="text-slate-500 w-4 h-4" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.length > 0 ? (
          items.map((item, idx) => (
            <div key={idx} className="bg-slate-950/60 border border-slate-800 p-2 rounded-xl text-center space-y-2 group hover:border-slate-700 transition">
              <div className="aspect-square bg-gradient-to-tr from-purple-900/40 to-pink-900/20 rounded-lg border border-slate-800 flex items-center justify-center font-bold text-xs text-purple-400 group-hover:scale-[1.02] transition duration-200">
                #{item.tokenId}
              </div>
              <div className="text-[10px] font-bold truncate text-slate-300 font-mono">{item.name || "Affiliate Cert"}</div>
            </div>
          ))
        ) : (
          <div className="col-span-4 py-8 text-center text-xs text-slate-600 border border-dashed border-slate-800 rounded-xl">
            Achieve Level 5 inside matrix systems to mint credentials.
          </div>
        )}
      </div>
    </div>
  );
}