import React from "react";
import StatsCard from "./Cards/StatsCard";
import { FiUsers, FiDollarSign, FiLayers, FiCpu } from "react-icons/fi";

export default function StatsGrid({ stats = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard title="Direct Referrals" value={stats.directs || "0"} icon={FiUsers} iconColor="text-teal-400" />
      <StatsCard title="Total Earnings" value={`${stats.earnings || "0"} LKM`} icon={FiDollarSign} iconColor="text-emerald-400" />
      <StatsCard title="Active Slots" value={`${stats.activeSlots || "0"} / 24`} icon={FiLayers} iconColor="text-purple-400" />
      <StatsCard title="Network Power" value={stats.power || "0 GW"} icon={FiCpu} iconColor="text-pink-400" />
    </div>
  );
}