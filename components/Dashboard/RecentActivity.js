import React from "react";
import PropTypes from "prop-types";
import { FiClock, FiUserPlus, FiArrowUpCircle, FiRefreshCw, FiExternalLink } from "react-icons/fi";

const RecentActivity = ({ activities, blockExplorerUrl }) => {
  
  // Icon selector utility based on the structural event type
  const getActivityIcon = (type) => {
    switch (type) {
      case "Registration":
        return {
          icon: <FiUserPlus className="w-4 h-4" />,
          style: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        };
      case "Upgrade":
        return {
          icon: <FiArrowUpCircle className="w-4 h-4" />,
          style: "bg-pink-500/10 text-pink-400 border-pink-500/20",
        };
      case "Cycle":
        return {
          icon: <FiRefreshCw className="w-4 h-4" />,
          style: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        };
      default:
        return {
          icon: <FiClock className="w-4 h-4" />,
          style: "bg-slate-500/10 text-slate-400 border-slate-500/20",
        };
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl text-white">
      {/* Title */}
      <div className="flex items-center justify-between mb-5 border-b border-slate-800/60 pb-4">
        <div>
          <h4 className="text-lg font-bold tracking-tight">Recent Ecosystem Activity</h4>
          <p className="text-xs text-slate-400 mt-0.5">Real-time live feeds from the smart contract stream.</p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-green-400 bg-green-500/10 px-2.5 py-0.5 rounded-full animate-pulse border border-green-500/20">
          Live
        </span>
      </div>

      {/* Feed Container */}
      <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
        {activities && activities.length > 0 ? (
          activities.map((activity, index) => {
            const visual = getActivityIcon(activity.type);
            return (
              <div 
                key={activity.id || index} 
                className="flex items-start justify-between p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/40 hover:border-slate-800 transition duration-150 group"
              >
                <div className="flex items-start gap-3">
                  {/* Event Specialized Icon Badge */}
                  <div className={`p-2.5 rounded-lg border flex items-center justify-center shrink-0 ${visual.style}`}>
                    {visual.icon}
                  </div>
                  
                  {/* Event Text Metadata */}
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-slate-200">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono text-purple-400/80">
                        {activity.userAddress ? `${activity.userAddress.slice(0, 6)}...${activity.userAddress.slice(-4)}` : "System"}
                      </span>
                      <span>•</span>
                      <span>{activity.timeAgo || "Just now"}</span>
                    </div>
                  </div>
                </div>

                {/* Blockchain Explorer Tracking Redirect Link */}
                {activity.txHash && blockExplorerUrl && (
                  <a
                    href={`${blockExplorerUrl}/tx/${activity.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-500 hover:text-white bg-slate-900/40 hover:bg-slate-800 rounded-lg border border-slate-800/60 transition flex items-center justify-center"
                    title="View Transaction"
                  >
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            );
          })
        ) : (
          /* Empty State Layout Fallback */
          <div className="text-center py-12 border border-dashed border-slate-800/60 rounded-xl bg-slate-950/10">
            <FiClock className="mx-auto text-slate-700 w-7 h-7 mb-2" />
            <p className="text-xs text-slate-500">No active matrix transactions detected in this block interval.</p>
          </div>
        )}
      </div>
    </div>
  );
};

RecentActivity.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type: PropTypes.oneOf(["Registration", "Upgrade", "Cycle", "Other"]).isRequired,
      description: PropTypes.string.isRequired,
      userAddress: PropTypes.string,
      timeAgo: PropTypes.string,
      txHash: PropTypes.string,
    })
  ),
  blockExplorerUrl: PropTypes.string,
};

RecentActivity.defaultProps = {
  activities: [
    { type: "Registration", description: "New partner registered with ID #1042", userAddress: "0x71C2344a921", timeAgo: "2m ago", txHash: "0x123..." },
    { type: "Upgrade", description: "Upgraded to x4 Program Level 3", userAddress: "0x9Ac4321f321", timeAgo: "12m ago", txHash: "0x456..." },
    { type: "Cycle", description: "Matrix Matrix Cycle completed on Level 1", userAddress: "0x3Bb5811a811", timeAgo: "1h ago", txHash: "0x789..." }
  ],
  blockExplorerUrl: "https://holesky.etherscan.io",
};

export default RecentActivity;