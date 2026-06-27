import React from "react";
import PropTypes from "prop-types";
import { FiUserPlus, FiArrowUpCircle, FiCheckSquare, FiExternalLink, FiShare2 } from "react-icons/fi";
import toast from "react-hot-toast";

const QuickActions = ({ onOpenRegistration, onOpenPurchase, isRegistered, tokenSymbol }) => {
  
  // Quick helper to copy referral link to clipboard
  const handleCopyReferral = async () => {
    if (!isRegistered) {
      toast.error("Please register an account first to generate a referral link.");
      return;
    }
    try {
      const referralLink = `${window.location.origin}?ref=${window.ethereum?.selectedAddress || ""}`;
      await navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied to clipboard! 🚀");
    } catch (err) {
      toast.error("Failed to copy link. Please copy it manually.");
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl text-white">
      {/* Title */}
      <div className="mb-5">
        <h4 className="text-lg font-bold tracking-tight">Quick Actions</h4>
        <p className="text-xs text-slate-400 mt-0.5">Execute contract triggers and ecosystem tasks instantly.</p>
      </div>

      {/* Grid Menu Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* ACTION 1: REGISTER */}
        <button
          onClick={onOpenRegistration}
          disabled={isRegistered}
          className={`flex items-center gap-3 p-4 rounded-xl border text-left transition duration-200 group relative overflow-hidden ${
            isRegistered 
              ? "bg-slate-950/20 border-slate-800/50 opacity-60 cursor-not-allowed" 
              : "bg-slate-950/40 border-slate-800 hover:border-purple-500/50 hover:bg-slate-900/40"
          }`}
        >
          <div className={`p-3 rounded-lg text-lg ${isRegistered ? "bg-slate-800 text-slate-500" : "bg-purple-500/10 text-purple-400 group-hover:scale-105 transition"}`}>
            <FiUserPlus />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Register Account</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {isRegistered ? "Already Joined" : "Join the matrix tree"}
            </p>
          </div>
        </button>

        {/* ACTION 2: UPGRADE LEVEL */}
        <button
          onClick={onOpenPurchase}
          disabled={!isRegistered}
          className={`flex items-center gap-3 p-4 rounded-xl border text-left transition duration-200 group ${
            !isRegistered 
              ? "bg-slate-950/20 border-slate-800/50 opacity-60 cursor-not-allowed" 
              : "bg-slate-950/40 border-slate-800 hover:border-pink-500/50 hover:bg-slate-900/40"
          }`}
        >
          <div className={`p-3 rounded-lg text-lg ${!isRegistered ? "bg-slate-800 text-slate-500" : "bg-pink-500/10 text-pink-400 group-hover:scale-105 transition"}`}>
            <FiArrowUpCircle />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Upgrade Tiers</p>
            <p className="text-xs text-slate-400 mt-0.5">Buy higher levels</p>
          </div>
        </button>

        {/* ACTION 3: SHARE REFERRAL */}
        <button
          onClick={handleCopyReferral}
          className="flex items-center gap-3 p-4 rounded-xl border bg-slate-950/40 border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/40 text-left transition duration-200 group"
        >
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 text-lg group-hover:scale-105 transition">
            <FiShare2 />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Invite Partners</p>
            <p className="text-xs text-slate-400 mt-0.5">Copy referral link</p>
          </div>
        </button>

        {/* ACTION 4: TOKEN APPROVAL UTILITY */}
        <a
          href="#token-operations" 
          className="flex items-center gap-3 p-4 rounded-xl border bg-slate-950/40 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/40 text-left transition duration-200 group"
        >
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 text-lg group-hover:scale-105 transition">
            <FiCheckSquare />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Approve {tokenSymbol}</p>
            <p className="text-xs text-slate-400 mt-0.5">Manage gas allowances</p>
          </div>
        </a>

      </div>
    </div>
  );
};

QuickActions.propTypes = {
  onOpenRegistration: PropTypes.func.isRequired,
  onOpenPurchase: PropTypes.func.isRequired,
  isRegistered: PropTypes.bool,
  tokenSymbol: PropTypes.string,
};

QuickActions.defaultProps = {
  isRegistered: false,
  tokenSymbol: "LINKTUM",
};

export default QuickActions;