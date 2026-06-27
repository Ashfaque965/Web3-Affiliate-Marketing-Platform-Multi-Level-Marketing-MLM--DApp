import React from "react";
import PropTypes from "prop-types";

const StatsCard = ({ title, value, icon: Icon, change, isTrendUp, iconColor }) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 shadow-xl hover:border-slate-700/60 transition-all duration-300 group flex items-center justify-between">
      <div className="space-y-2">
        {/* Metric Label Title */}
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          {title}
        </p>
        
        {/* Value Parameter Display */}
        <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-brand-gradient transition-all duration-300">
          {value}
        </h3>

        {/* Optional Contextual Trend Subtitle Percentage Tracker */}
        {change && (
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                isTrendUp
                  ? "bg-green-500/10 text-green-400"
                  : "bg-rose-500/10 text-rose-400"
              }`}
            >
              {isTrendUp ? "+" : "-"}
              {change}
            </span>
            <span className="text-[11px] text-slate-500">vs last period</span>
          </div>
        )}
      </div>

      {/* Metric Interactive Visual Accent Icon */}
      {Icon && (
        <div
          className={`p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110 shadow-inner ${
            iconColor || "text-purple-400"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};

// Declaring rigid props defaults to protect against React UI engine data drop rendering crashes
StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType,
  change: PropTypes.string,
  isTrendUp: PropTypes.bool,
  iconColor: PropTypes.string,
};

StatsCard.defaultProps = {
  icon: null,
  change: null,
  isTrendUp: true,
  iconColor: "text-purple-400",
};

export default StatsCard;