import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { FiX, FiUserPlus, FiLock, FiCheckCircle, FiShield } from "react-icons/fi";

const RegistrationModal = ({ 
  isOpen, 
  onClose, 
  onApprove, 
  onRegister, 
  tokenAllowance, 
  registrationCost, 
  tokenSymbol 
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [referrerAddress, setReferrerAddress] = useState("");

  // Hook into URL to automatically look up referral tracking variables (?ref=0x...)
  useEffect(() => {
    if (router.query.ref) {
      setReferrerAddress(router.query.ref);
    }
  }, [router.query]);

  if (!isOpen) return null;

  // Evaluation variable to check if contract can transfer the registration fee tokens
  const isApproved = Number(tokenAllowance) >= Number(registrationCost);

  const handleSubmitAction = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isApproved) {
        // Step 1: Approve Smart Contract to handle ERC20 Tokens
        await onApprove(registrationCost);
      } else {
        // Step 2: Fire registration entry matrix payload 
        const fallbackReferrer = referrerAddress.trim() || "0x0000000000000000000000000000000000000000";
        await onRegister(fallbackReferrer);
        onClose();
      }
    } catch (error) {
      console.error("Registration sequence interrupted:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Dim Backdrop Blur Overlay */}
      <div onClick={onClose} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

      {/* Modal Dialog Body Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header section */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
              <FiUserPlus className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-lg">Join Matrix Network</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body Context */}
        <form onSubmit={handleSubmitAction} className="p-6 space-y-5">
          
          {/* Information Metadata Label Badge */}
          <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 flex justify-between items-center text-sm">
            <span className="text-slate-400">Onboarding Cost:</span>
            <span className="font-bold font-mono text-purple-400 text-base">
              {registrationCost} {tokenSymbol}
            </span>
          </div>

          {/* Form input item block: Referral Address Input field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Upline Referrer Wallet Address
            </label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-3.5 text-slate-600" />
              <input
                type="text"
                value={referrerAddress}
                onChange={(e) => setReferrerAddress(e.target.value)}
                placeholder="0x0000... (Optional)"
                className="w-full bg-slate-950 border border-slate-800/80 rounded-xl py-3 pl-10 pr-4 text-sm text-white font-mono focus:outline-none focus:border-purple-500 transition placeholder:text-slate-600"
              />
            </div>
            <p className="text-[10px] text-slate-500">
              If left blank, registration falls back automatically to root contract deployment node id address.
            </p>
          </div>

          {/* Sequential Step Progress Tracker Indicator map bar */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs ${
              isApproved 
                ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20" 
                : "bg-slate-950/40 text-slate-400 border-slate-800/80"
            }`}>
              <FiShield className="shrink-0" /> Step 1: Token Approval
            </div>
            <div className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs ${
              isApproved 
                ? "bg-purple-500/10 text-purple-400 border-purple-500/30 font-medium" 
                : "bg-slate-950/10 text-slate-600 border-transparent"
            }`}>
              <FiCheckCircle className="shrink-0" /> Step 2: Register Tree
            </div>
          </div>

          {/* Action Footer Controls layout buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 rounded-xl text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : !isApproved ? (
                `Approve ${tokenSymbol}`
              ) : (
                "Complete Joining"
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

RegistrationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  tokenAllowance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  registrationCost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tokenSymbol: PropTypes.string,
};

RegistrationModal.defaultProps = {
  tokenAllowance: "0",
  registrationCost: "10",
  tokenSymbol: "LINKTUM",
};

export default RegistrationModal;