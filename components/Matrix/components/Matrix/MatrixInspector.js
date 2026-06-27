import React, { useState } from 'react';
import { useContractRead } from 'wagmi';
import { FiSearch, FiGitBranch, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';
import MatrixVisualization from './MatrixVisualization'; // Reuses your existing visualization component

export default function MatrixInspector({ contractAddress, contractABI }) {
  const [searchTarget, setSearchTarget] = useState('');
  const [activeTab, setActiveTab] = useState('x4');
  const [inspectAddress, setInspectAddress] = useState(null);

  // Example hook configurations to read specific user stats from your Solidity contract
  // Adjust function names ('users', 'getUserMatrixState') to match your actual Smart Contract ABI
  const { data: userStats, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'users', 
    args: inspectAddress ? [inspectAddress] : undefined,
    enabled: !!inspectAddress,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTarget.trim()) return;
    
    // Simple validation: check if it looks like an Ethereum address
    if (searchTarget.startsWith('0x') && searchTarget.length === 42) {
      setInspectAddress(searchTarget);
    } else {
      // If your contract supports looking up by ID, you'd resolve it here.
      // For now, we fall back to a mock demo state if it's an ID string like "1024"
      setInspectAddress(searchTarget); 
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl text-white">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          <FiGitBranch className="text-pink-500" /> Deep Matrix Inspector
        </h3>
        <p className="text-slate-400 text-xs mt-1">
          Audit any matrix tier structure across the entire smart contract system by User Wallet or Matrix ID.
        </p>
      </div>

      {/* Search Input Control */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Enter User Wallet Address (0x...) or Partner ID"
            value={searchTarget}
            onChange={(e) => setSearchTarget(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-pink-500 transition font-mono placeholder:text-slate-600"
          />
        </div>
        <button
          type="submit"
          className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium px-5 rounded-xl text-sm transition"
        >
          Inspect
        </button>
      </form>

      {/* Conditional Rendering Blocks */}
      {!inspectAddress ? (
        <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-950/20">
          <FiTrendingUp className="mx-auto text-slate-600 w-8 h-8 mb-2" />
          <p className="text-sm text-slate-500">Ready for inspection. Enter a downline address above to view their tree structure.</p>
        </div>
      ) : (
        <div>
          {/* Program Switcher Tabs */}
          <div className="flex border-b border-slate-800 mb-6">
            <button
              onClick={() => setActiveTab('x4')}
              className={`pb-3 px-4 font-semibold text-sm transition relative ${
                activeTab === 'x4' ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              x4 Matrix Program
              {activeTab === 'x4' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />}
            </button>
            <button
              onClick={() => setActiveTab('xxx')}
              className={`pb-3 px-4 font-semibold text-sm transition relative ${
                activeTab === 'xxx' ? 'text-pink-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              xXx Matrix Program
              {activeTab === 'xxx' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500" />}
            </button>
          </div>

          {/* Quick Inspector Metadata Badge */}
          <div className="mb-6 flex flex-wrap items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-slate-400">Inspecting Target:</span>
              <span className="text-xs font-mono text-purple-300">{inspectAddress}</span>
            </div>
            <div className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">
              Network Level Counter: <strong className="text-white">Active</strong>
            </div>
          </div>

          {/* Core Structure Presentation Area */}
          <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-6 min-h-[300px] flex items-center justify-center">
            {isLoading ? (
              <div className="text-center space-y-2">
                <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-500">Querying chain parameters...</p>
              </div>
            ) : isError ? (
              <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/5 p-4 rounded-xl border border-rose-500/20">
                <FiAlertCircle /> Failed to resolve matrix context. Verify address format or RPC network link.
              </div>
            ) : (
              /* Interoperability Layer: Plugs directly into your existing matrix visualization views */
              <div className="w-full text-center">
                <p className="text-xs text-slate-400 mb-4 font-semibold uppercase tracking-wider">
                  Live View Tier Layer Tree ({activeTab.toUpperCase()})
                </p>
                
                {/* Dynamically swaps visual tree layouts based on user selections */}
                <MatrixVisualization 
                  program={activeTab} 
                  targetUser={inspectAddress} 
                  isReadOnlyInspector={true}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}