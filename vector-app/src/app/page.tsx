'use client';

import { AgentCard } from "@/components/dashboard/AgentCard";
import { MultiAgentWorkspace } from "@/components/workspace/MultiAgentWorkspace";
import { OperationalInsights } from "@/components/dashboard/OperationalInsights";
import { Sparkles, ArrowRight, Zap, Shield, Activity, Brain } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="px-4 md:px-8 pb-10 max-w-[1440px] mx-auto">
      {/* Hero Section */}
      <div className="mb-10 pt-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-container via-surface-container-low to-surface-container border border-outline-variant/40 p-8 md:p-10">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase tracking-[0.15em] bg-emerald-500/8 border border-emerald-500/15 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_4px_rgba(16,185,129,0.5)]" />
                  System Online
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-3">
                Business Command <span className="gradient-text">Center</span>
              </h2>
              <p className="text-base text-on-surface-variant/80 max-w-xl leading-relaxed">
                Coordinate your executive AI team to strategize, architect, and scale operations with autonomous intelligence.
              </p>
            </div>
            
            <Link
              href="/boardroom"
              className="shrink-0 flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] group"
            >
              <Sparkles className="w-4 h-4" />
              Enter Board Room
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="relative z-10 mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Active Agents', value: '5', icon: Brain, color: 'text-violet-500', bg: 'bg-violet-500/8' },
              { label: 'Model', value: 'Gemini 2.5', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/8' },
              { label: 'Uptime', value: '99.9%', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/8' },
              { label: 'Security', value: 'SOC2', icon: Shield, color: 'text-blue-500', bg: 'bg-blue-500/8' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 bg-surface-container/50 border border-outline-variant/30 rounded-xl px-4 py-3">
                <div className={`w-8 h-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-on-surface-variant/60 font-medium">{stat.label}</p>
                  <p className="text-sm font-bold text-on-surface">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left/Center Column: Agents & Collaboration */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Live Agent Activity */}
          <section className="glass-panel rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
                Executive Team Status
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-surface-container-high/50 border border-outline-variant/50 text-on-surface-variant uppercase tracking-wider">
                5 Agents
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AgentCard 
                name="Atlas"
                role="CEO Agent"
                status="Idle"
                task="Ready for strategic directives."
                confidence={null}
                avatarUrl=""
              />
              <AgentCard 
                name="Nexus"
                role="CTO Agent"
                status="Idle"
                task="Ready for architectural planning."
                confidence={null}
                avatarUrl=""
              />
              <AgentCard 
                name="Prism"
                role="Architect Agent"
                status="Idle"
                task="Awaiting task orchestration."
                confidence={null}
                avatarUrl=""
              />
              <AgentCard 
                name="Vanguard"
                role="Marketing Agent"
                status="Idle"
                task="Ready for market analysis."
                confidence={null}
                avatarUrl=""
              />
              <AgentCard 
                name="Ledger"
                role="Finance Agent"
                status="Idle"
                task="Ready for financial modeling."
                confidence={null}
                avatarUrl=""
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
