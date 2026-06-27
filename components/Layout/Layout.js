import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  FiGrid, 
  FiLayers, 
  FiTrendingUp, 
  FiUsers, 
  FiMenu, 
  FiX, 
  FiCpu, 
  FiGlobe 
} from "react-icons/fi";

const Layout = ({ children, platformName, chainName, isConnected }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Centralized Navigation Config Array
  const navigationOptions = [
    { name: "Dashboard", href: "/", icon: FiGrid },
    { name: "x4 Matrix Program", href: "/matrix/x4", icon: FiLayers },
    { name: "xXx Matrix Program", href: "/matrix/xxx", icon: FiTrendingUp },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased selection:bg-purple-500/30 selection:text-white">
      
      {/* ================= MOBILE NAVIGATION TOP HEADER BAR ================= */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
            <FiCpu className="w-4 h-4" />
          </div>
          <span className="font-bold tracking-tight text-sm text-white">{platformName}</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-slate-950/60 rounded-xl border border-slate-800 text-slate-400 hover:text-white transition"
        >
          {sidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
      </header>

      {/* ================= PRIMARY SIDEBAR CONTROLLER GRID ================= */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-900/60 backdrop-blur-md border-r border-slate-800/60 p-5 flex flex-col justify-between transition-transform duration-300 z-50 lg:translate-x-0 lg:static ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        
        {/* Top Branding Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                <FiCpu className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold tracking-tight text-white leading-tight">{platformName}</h1>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-purple-400">Smart DApp</p>
              </div>
            </div>
            {/* Mobile close toggle */}
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-white p-1">
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Render Active Routing Map links */}
          <nav className="space-y-1">
            {navigationOptions.map((item) => {
              const isActive = router.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600/20 to-pink-600/5 text-purple-400 border border-purple-500/20 font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-purple-400" : "text-slate-400"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Network Status Indicator Widget */}
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <FiGlobe className="w-3.5 h-3.5" /> Network
            </span>
            <span className="font-semibold text-slate-300 font-mono">{chainName}</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-800/60">
            <span className="text-slate-500 font-medium">Status</span>
            <span className={`inline-flex items-center gap-1 font-semibold ${isConnected ? "text-emerald-400" : "text-amber-500"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-500"}`} />
              {isConnected ? "Connected" : "No Wallet"}
            </span>
          </div>
        </div>

      </aside>

      {/* Overlay background click closer for smaller break viewports */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden" 
        />
      )}

      {/* ================= PRIMARY MASTER WINDOW INTERFACE SPACE ================= */}
      <main className="flex-1 min-w-0 pt-16 lg:pt-0 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {children}
        </div>
      </main>

    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  platformName: PropTypes.string,
  chainName: PropTypes.string,
  isConnected: PropTypes.bool,
};

Layout.defaultProps = {
  platformName: "LinkTum Matrix",
  chainName: "Holesky",
  isConnected: true,
};

export default Layout;