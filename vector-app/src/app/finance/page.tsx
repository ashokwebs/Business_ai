import { Download, TrendingUp, TrendingDown, DollarSign, Activity, Zap, HardDrive, Database } from "lucide-react";

export default function FinancePage() {
  return (
    <div className="px-6 md:px-12 pb-8 max-w-[1600px] mx-auto h-[calc(100vh-4rem)] flex flex-col pt-8">
      <div className="mb-6 flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-1">Financial Operations</h2>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            Monitor your startup's burn rate, runway, and granular LLM API costs.
          </p>
        </div>
        <button className="bg-surface-container border border-outline-variant text-on-surface px-4 py-2 rounded-md text-sm font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Metric 1: Burn Rate */}
        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-rose-500 bg-rose-500/10 px-2 py-1 rounded">
              <TrendingUp className="w-3 h-3" />
              +2.1%
            </div>
          </div>
          <p className="text-sm font-semibold text-on-surface-variant mb-1">Monthly Burn Rate</p>
          <p className="text-4xl font-bold text-on-surface tracking-tight">$3,840</p>
        </div>

        {/* Metric 2: API Costs */}
        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
              <TrendingDown className="w-3 h-3" />
              -0.5%
            </div>
          </div>
          <p className="text-sm font-semibold text-on-surface-variant mb-1">LLM API Costs (MTD)</p>
          <p className="text-4xl font-bold text-on-surface tracking-tight">$112.45</p>
          
          {/* Mock Sparkline */}
          <div className="absolute bottom-0 left-0 w-full h-12 opacity-30 pointer-events-none">
            <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full text-indigo-500">
              <path d="M0,30 L0,20 C10,15 20,25 30,10 C40,-5 50,20 60,15 C70,10 80,25 90,5 L100,0 L100,30 Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Metric 3: Runway */}
        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-on-surface-variant bg-surface-container-high px-2 py-1 rounded border border-outline-variant">
              Stable
            </span>
          </div>
          <p className="text-sm font-semibold text-on-surface-variant mb-1">Projected Runway</p>
          <p className="text-4xl font-bold text-on-surface tracking-tight">18 <span className="text-xl text-on-surface-variant">Mos</span></p>
        </div>
      </div>

      <div className="flex-1 bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-outline-variant bg-surface-container-lowest flex justify-between items-center">
          <h3 className="text-sm font-bold text-on-surface">Detailed Billing Breakdown</h3>
          <span className="text-xs text-on-surface-variant font-medium">May 1 - May 31, 2026</span>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low text-xs text-on-surface-variant uppercase tracking-wider font-semibold border-b border-outline-variant">
                <th className="p-4">Service / Agent</th>
                <th className="p-4">Resource</th>
                <th className="p-4">Usage</th>
                <th className="p-4 text-right">Cost (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              <tr className="hover:bg-surface-container-high transition-colors group">
                <td className="p-4 font-medium text-on-surface flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0">
                    <img src="https://ui-avatars.com/api/?name=Atlas&background=10b981&color=fff&bold=true&font-size=0.4&size=64" alt="Atlas" className="w-full h-full object-cover rounded" />
                  </div>
                  Atlas (CEO Agent)
                </td>
                <td className="p-4 text-sm text-on-surface-variant">Gemini Flash Latest Tokens</td>
                <td className="p-4 text-sm text-on-surface-variant">1,240,500</td>
                <td className="p-4 text-sm font-semibold text-on-surface text-right">$3.72</td>
              </tr>
              <tr className="hover:bg-surface-container-high transition-colors group">
                <td className="p-4 font-medium text-on-surface flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0">
                    <img src="https://ui-avatars.com/api/?name=Nexus&background=3b82f6&color=fff&bold=true&font-size=0.4&size=64" alt="Nexus" className="w-full h-full object-cover rounded" />
                  </div>
                  Nexus (CTO Agent)
                </td>
                <td className="p-4 text-sm text-on-surface-variant">Gemini Flash Latest Tokens</td>
                <td className="p-4 text-sm text-on-surface-variant">4,100,000</td>
                <td className="p-4 text-sm font-semibold text-on-surface text-right">$12.30</td>
              </tr>
              <tr className="hover:bg-surface-container-high transition-colors group">
                <td className="p-4 font-medium text-on-surface flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0">
                    <img src="https://ui-avatars.com/api/?name=Vanguard&background=f43f5e&color=fff&bold=true&font-size=0.4&size=64" alt="Vanguard" className="w-full h-full object-cover rounded" />
                  </div>
                  Vanguard (CMO Agent)
                </td>
                <td className="p-4 text-sm text-on-surface-variant">Gemini Flash Latest Tokens</td>
                <td className="p-4 text-sm text-on-surface-variant">3,512,000</td>
                <td className="p-4 text-sm font-semibold text-on-surface text-right">$10.53</td>
              </tr>
              <tr className="hover:bg-surface-container-high transition-colors group">
                <td className="p-4 font-medium text-on-surface flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0">
                    <img src="https://ui-avatars.com/api/?name=Ledger&background=f59e0b&color=fff&bold=true&font-size=0.4&size=64" alt="Ledger" className="w-full h-full object-cover rounded" />
                  </div>
                  Ledger (CFO Agent)
                </td>
                <td className="p-4 text-sm text-on-surface-variant">Gemini Flash Latest Tokens</td>
                <td className="p-4 text-sm text-on-surface-variant">1,850,000</td>
                <td className="p-4 text-sm font-semibold text-on-surface text-right">$5.55</td>
              </tr>
              <tr className="hover:bg-surface-container-high transition-colors group">
                <td className="p-4 font-medium text-on-surface flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0">
                    <img src="https://ui-avatars.com/api/?name=AWS&background=8b5cf6&color=fff&bold=true&font-size=0.4&size=64" alt="AWS" className="w-full h-full object-cover rounded" />
                  </div>
                  AWS EKS Cluster
                </td>
                <td className="p-4 text-sm text-on-surface-variant">T4 GPU Spot Instances</td>
                <td className="p-4 text-sm text-on-surface-variant">120 Hours</td>
                <td className="p-4 text-sm font-semibold text-on-surface text-right">$180.40</td>
              </tr>
              <tr className="hover:bg-surface-container-high transition-colors">
                <td className="p-4 font-medium text-on-surface flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-high border border-outline-variant text-amber-500 flex items-center justify-center shrink-0">
                    <Database className="w-4 h-4" />
                  </div>
                  MongoDB Atlas
                </td>
                <td className="p-4 text-sm text-on-surface-variant">Shared Cluster Data</td>
                <td className="p-4 text-sm text-on-surface-variant">1.2 GB</td>
                <td className="p-4 text-sm font-semibold text-on-surface text-right">$25.00</td>
              </tr>
              <tr className="hover:bg-surface-container-high transition-colors">
                <td className="p-4 font-medium text-on-surface flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-high border border-outline-variant text-indigo-500 flex items-center justify-center shrink-0">
                    <HardDrive className="w-4 h-4" />
                  </div>
                  Vector Search Storage
                </td>
                <td className="p-4 text-sm text-on-surface-variant">Storage GB/Month</td>
                <td className="p-4 text-sm text-on-surface-variant">3.5 GB</td>
                <td className="p-4 text-sm font-semibold text-on-surface text-right">$12.40</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-outline-variant bg-surface-container flex justify-between items-center">
          <span className="text-sm font-semibold text-on-surface-variant">Total Selected Resources</span>
          <span className="text-xl font-bold text-on-surface">$249.90</span>
        </div>
      </div>
    </div>
  );
}
