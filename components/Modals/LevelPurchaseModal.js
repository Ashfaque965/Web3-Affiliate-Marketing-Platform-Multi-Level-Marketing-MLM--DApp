import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiX, FiLayers, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

const LevelPurchaseModal = ({ isOpen, onClose, onConfirm, currentLevel, programName, tokenSymbol, levelCosts }) => {
  const [loading, setLoading] = useState(false);
  const nextLevel = currentLevel + 1;
  const upgradeCost = levelCosts[nextLevel] || "0";

  if (!isOpen) return null;

  const handleUpgradeSubmit = async (e) => {
    e.preventDefault();
    if (nextLevel > 12) return;
    
    setLoading(true);
    try {
      await onConfirm(nextLevel, upgradeCost);
      onClose();
    } catch (error) {
      console.error("Purchase execution rejected:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dynamic Backdrop Blur Overlay */}
      <div onClick={onClose} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

      {/* Modal Dialog Frame */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200 text-white">
        
        {/* Header Title Section */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-pink-500/10 text-pink-400 rounded-lg border border-pink-500/20">
              <FiLayers className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-lg">Upgrade Matrix Tier</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body Block */}
        <form onSubmit={handleUpgradeSubmit} className="p-6 space-y-5">
          {nextLevel > 12 ? (
            <div className="flex items-start gap-3 bg-amber-500/5 text-amber-400 p-4 rounded-xl border border-amber-500/20 text-sm">
              <FiAlertTriangle className="shrink-0 w-5 h-5 mt-0.5" />
              <p>You have achieved maximum structural allocation tier levels for the <strong>{programName}</strong> program contract.</p>
            </div>
          ) : (
            <>
              <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 text-center space-y-1">
                <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Target Matrix Tier Upgrade</p>
                <h4 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  {programName} • Level {nextLevel}
                </h4>
              </div>

              {/* Fee Transaction Details pricing parameters */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Current Standing:</span>
                  <span className="font-medium text-slate-200">Level {currentLevel}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-800/60">
                  <span className="text-slate-400">Required Liquidity Cost:</span>
                  <span className="font-bold text-pink-400 font-mono text-base">
                    {upgradeCost} {tokenSymbol}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-950/20 p-3 rounded-lg border border-slate-800/40">
                <FiCheckCircle className="text-purple-400 shrink-0 mt-0.5" />
                <p>Ensure your Web3 provider wallet retains sufficient native gas and an approved contract token allowance balance before executing execution signatures.</p>
              </div>
            </>
          )}

          {/* Action Footer Button Group Controls */}
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
              disabled={loading || nextLevel > 12}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Upgrade"
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

LevelPurchaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  currentLevel: PropTypes.number,
  programName: PropTypes.string,
  tokenSymbol: PropTypes.string,
  levelCosts: PropTypes.object,
};

LevelPurchaseModal.defaultProps = {
  currentLevel: 1,
  programName: "x4 Matrix",
  tokenSymbol: "LINKTUM",
  levelCosts: {
    1: "10", 2: "20", 3: "40", 4: "80", 5: "160", 6: "320", 
    7: "640", 8: "1280", 9: "2560", 10: "5120", 11: "10240", 12: "20480"
  }
};

export default LevelPurchaseModal;