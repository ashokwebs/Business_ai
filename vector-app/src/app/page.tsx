import { AgentCard } from "@/components/dashboard/AgentCard";
import { MultiAgentWorkspace } from "@/components/workspace/MultiAgentWorkspace";
import { OperationalInsights } from "@/components/dashboard/OperationalInsights";

export default function Dashboard() {
  return (
    <div className="px-4 md:px-8 pb-8 max-w-[1440px] mx-auto">
      {/* Hero Section */}
      <div className="mb-8 border-b border-outline-variant pb-6">
        <h2 className="text-4xl font-semibold tracking-tight text-on-surface mb-2">Business Command Center</h2>
        <p className="text-base text-on-surface-variant max-w-2xl">
          Coordinate your executive AI team to strategize, architect, and scale operations.
        </p>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left/Center Column: Agents & Collaboration */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Live Agent Activity */}
          <section className="glass-panel rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-on-surface flex items-center gap-2">
                Executive Team Status
              </h3>
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-surface-container-high border border-outline-variant text-on-surface-variant">
                5 Agents Available
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AgentCard 
                name="Atlas"
                role="CEO Agent"
                status="Idle"
                task="Ready for strategic directives."
                confidence={null}
                avatarUrl="https://ui-avatars.com/api/?name=Atlas&background=10b981&color=fff&bold=true&font-size=0.4"
              />
              <AgentCard 
                name="Nexus"
                role="CTO Agent"
                status="Idle"
                task="Ready for architectural planning."
                confidence={null}
                avatarUrl="https://ui-avatars.com/api/?name=Nexus&background=3b82f6&color=fff&bold=true&font-size=0.4"
              />
              <AgentCard 
                name="Prism"
                role="Architect Agent"
                status="Idle"
                task="Awaiting task orchestration."
                confidence={null}
                avatarUrl="https://ui-avatars.com/api/?name=Prism&background=8b5cf6&color=fff&bold=true&font-size=0.4"
              />
              <AgentCard 
                name="Vanguard"
                role="Marketing Agent"
                status="Idle"
                task="Ready for market analysis."
                confidence={null}
                avatarUrl="https://ui-avatars.com/api/?name=Vanguard&background=f59e0b&color=fff&bold=true&font-size=0.4"
              />
              <AgentCard 
                name="Ledger"
                role="Finance Agent"
                status="Idle"
                task="Ready for financial modeling."
                confidence={null}
                avatarUrl="https://ui-avatars.com/api/?name=Ledger&background=6366f1&color=fff&bold=true&font-size=0.4"
              />
            </div>
          </section>

          {/* Multi-agent collaboration workspace */}
          <MultiAgentWorkspace />
        </div>

        {/* Right Column: Operational Insights */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <OperationalInsights />
        </div>
      </div>
    </div>
  );
}
