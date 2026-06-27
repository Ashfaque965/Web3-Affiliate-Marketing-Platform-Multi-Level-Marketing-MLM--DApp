import React, { useState, useMemo } from 'react';
import { useContractRead } from 'wagmi';
import { FiSearch, FiUsers, FiAward, FiDownload } from 'react-icons/fi';

// Dummy representation: Replace with your actual contract hooks/ABIs if reading directly
export default function TeamManagement({ userAddress, matrixContractAddress, contractABI }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Example Wagmi hook setup to read referrals (Adjust function name based on your Solidity contract)
  /* const { data: referralData, isLoading } = useContractRead({
    address: matrixContractAddress,
    abi: contractABI,
    functionName: 'getUserReferrals',
    args: [userAddress],
  });
  */

  // Mock data representing a typical structure matching your x4 / xXx Matrix metrics
  const mockReferrals = [
    { id: "1024", address: "0x71C...3921", levelReached: 5, joinedDate: "2026-02-15", matrixEarnings: "1.5 ETH", status: "Active" },
    { id: "1089", address: "0x9Ac...F321", levelReached: 3, joinedDate: "2026-03-01", matrixEarnings: "0.4 ETH", status: "Active" },
    { id: "1102", address: "0x3Bb...A811", levelReached: 1, joinedDate: "2026-03-22", matrixEarnings: "0.0 ETH", status: "Inactive" },
  ];

  // Filtering Logic
  const filteredReferrals = useMemo(() => {
    return mockReferrals.filter(ref => 
      ref.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.id.includes(searchTerm)
    );
  }, [searchTerm]);

  // Export to CSV function
  const exportToCSV = () => {
    const headers = ["Referral ID,Wallet Address,Max Level,Joined Date,Earnings\n"];
    const rows = filteredReferrals.map(r => `${r.id},${r.address},${r.levelReached},${r.joinedDate},${r.matrixEarnings}`);
    const blob = new Blob([headers + rows.join("\n")], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `team_report_${userAddress.slice(0,6)}.csv`);
    a.click();
  };

  return (
    <div className="p-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 text-white shadow-xl">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-5 mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            <FiUsers className="text-purple-400" /> Team Network & Referrals
          </h2>
          <p className="text-slate-400 text-sm mt-1">Monitor, search, and export your downline structural matrix tree data.</p>
        </div>
        
        <button 
          onClick={exportToCSV}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium px-4 py-2 rounded-xl transition shadow-lg shadow-purple-500/20 text-sm self-start md:self-auto"
        >
          <FiDownload /> Export CSV
        </button>
      </div>

      {/* Stats Summary cards matching Glassmorphism design guidelines */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
          <span className="text-xs text-slate-400 uppercase font-semibold">Total Direct Referrals</span>
          <p className="text-2xl font-bold mt-1 text-white">{mockReferrals.length}</p>
        </div>
        <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
          <span className="text-xs text-slate-400 uppercase font-semibold">Active Members</span>
          <p className="text-2xl font-bold mt-1 text-green-400">{mockReferrals.filter(r => r.status === 'Active').length}</p>
        </div>
        <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
          <span className="text-xs text-slate-400 uppercase font-semibold">Top Performing Tier</span>
          <p className="text-2xl font-bold mt-1 text-purple-400">Level 5</p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search by ID or wallet address..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-purple-500 transition placeholder:text-slate-500"
        />
      </div>

      {/* Referrals Downline List */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
              <th className="p-4">ID</th>
              <th className="p-4">User Wallet</th>
              <th className="p-4">Highest Active Level</th>
              <th className="p-4">Join Date</th>
              <th className="p-4">Est. Earnings</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {filteredReferrals.length > 0 ? (
              filteredReferrals.map((member) => (
                <tr key={member.id} className="hover:bg-slate-800/20 transition duration-150">
                  <td className="p-4 font-mono font-bold text-slate-300">#{member.id}</td>
                  <td className="p-4 font-mono text-purple-300">{member.address}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 bg-purple-500/10 text-purple-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
                      <FiAward className="text-xs" /> Lvl {member.levelReached}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{member.joinedDate}</td>
                  <td className="p-4 font-semibold text-pink-400">{member.matrixEarnings}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded-md text-xs font-bold ${
                      member.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-500 text-sm">
                  No downstream matrix records found matching criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}