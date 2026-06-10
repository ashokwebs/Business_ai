"use client";

import { useState } from "react";
import { Plus, Terminal, Search, Activity, Cpu, Brain, Target, TrendingUp, DollarSign, Shield, FileText } from "lucide-react";

const agents = [
  {
    name: "Prism",
    role: "Architect Agent",
    description: "Master orchestrator and systems intelligence layer. Understands natural language, delegates tasks to sub-agents, and synthesizes unified strategies.",
    status: "Online" as const,
    health: 99.9,
    model: "Gemini 2.5 Flash",
    tools: [
      { name: "Google Search", icon: Search, color: "text-indigo-500" },
      { name: "URL Context", icon: Activity, color: "text-sky-500" },
      { name: "Doc Generator", icon: FileText, color: "text-emerald-500" },
    ],
    color: "8b5cf6",
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/10",
    telemetry: [
      "> Orchestration engine running...",
      "> NLU parser active. Ready to delegate.",
      "> Sub-agent pool: Atlas, Nexus, Vanguard, Ledger.",
    ],
  },
  {
    name: "Atlas",
    role: "CEO Agent",
    description: "Strategic business leadership. Generates business plans, startup strategies, product roadmaps, competitive analysis, and vision documents.",
    status: "Online" as const,
    health: 99.9,
    model: "Gemini 2.5 Flash",
    tools: [
      { name: "Web Search", icon: Search, color: "text-indigo-500" },
      { name: "Market Analysis", icon: Activity, color: "text-rose-500" },
      { name: "Doc Generator", icon: FileText, color: "text-emerald-500" },
    ],
    color: "10b981",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    telemetry: [
      "> Business intelligence engine active.",
      "> write_project_document tool: ready.",
      "> Awaiting strategy request...",
    ],
  },
  {
    name: "Nexus",
    role: "CTO Agent",
    description: "Technical intelligence and engineering leadership. Generates architecture docs, tech stack recommendations, system designs, and API specs.",
    status: "Online" as const,
    health: 100,
    model: "Gemini 2.5 Flash",
    tools: [
      { name: "Infrastructure", icon: Cpu, color: "text-sky-500" },
      { name: "Security Audits", icon: Shield, color: "text-amber-500" },
      { name: "Doc Generator", icon: FileText, color: "text-emerald-500" },
    ],
    color: "3b82f6",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
    telemetry: [
      "> Engineering analysis engine active.",
      "> write_project_document tool: ready.",
      "> Awaiting architecture request...",
    ],
  },
  {
    name: "Vanguard",
    role: "Marketing Agent",
    description: "Growth intelligence and branding strategy. Generates marketing plans, launch strategies, audience analysis, content calendars, and brand positioning.",
    status: "Online" as const,
    health: 100,
    model: "Gemini 2.5 Flash",
    tools: [
      { name: "Audience Research", icon: TrendingUp, color: "text-amber-500" },
      { name: "Brand Analysis", icon: Search, color: "text-pink-500" },
      { name: "Doc Generator", icon: FileText, color: "text-emerald-500" },
    ],
    color: "f59e0b",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10",
    telemetry: [
      "> Growth engine active.",
      "> write_project_document tool: ready.",
      "> Awaiting marketing request...",
    ],
  },
  {
    name: "Ledger",
    role: "Finance Agent",
    description: "Financial intelligence and monetization strategy. Generates pricing models, revenue projections, cost analyses, and sustainability plans.",
    status: "Online" as const,
    health: 100,
    model: "Gemini 2.5 Flash",
    tools: [
      { name: "Revenue Models", icon: DollarSign, color: "text-emerald-500" },
      { name: "Cost Analysis", icon: Activity, color: "text-indigo-500" },
      { name: "Doc Generator", icon: FileText, color: "text-emerald-500" },
    ],
    color: "6366f1",
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    telemetry: [
      "> Financial engine active.",
      "> write_project_document tool: ready.",
      "> Awaiting monetization request...",
    ],
  },
];

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 md:px-8 lg:px-12 pb-8 max-w-[1600px] mx-auto flex flex-col pt-6 md:pt-8">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-on-surface mb-1">Agent Console</h2>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            Configure, deploy, and monitor your executive AI agents in real-time.
          </p>
        </div>
        <button className="bg-on-surface text-surface-container-lowest px-4 py-2 rounded-md text-sm font-semibold hover:bg-on-surface/90 transition-colors flex items-center gap-2 shadow-sm shrink-0">
          <Plus className="w-4 h-4" />
          Train New Agent
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative focus-within:ring-1 focus-within:ring-outline rounded-md transition-shadow max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-surface-container border border-outline-variant rounded-md py-2 pl-10 pr-4 text-sm text-on-surface focus:outline-none w-full transition-colors placeholder:text-on-surface-variant/50"
            placeholder="Search agents..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto pb-8">
        {filteredAgents.map((agent) => (
          <div
            key={agent.name}
            className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col group hover:border-outline transition-colors"
          >
            <div className="p-5 border-b border-outline-variant">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-outline-variant overflow-hidden">
                    <img
                      src={`https://ui-avatars.com/api/?name=${agent.name}&background=${agent.color}&color=fff&bold=true&font-size=0.4&size=80`}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-on-surface">{agent.name}</h3>
                    <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{agent.role}</p>
                  </div>
                </div>
                <span
                  className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    agent.status === "Online"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-surface-container-high text-on-surface-variant border-outline-variant"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      agent.status === "Online" ? "bg-emerald-500 animate-pulse" : "bg-outline"
                    }`}
                  ></span>
                  {agent.status}
                </span>
              </div>

              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed line-clamp-2">
                {agent.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> Compute Health
                  </span>
                  <span className="font-semibold text-on-surface">{agent.health}%</span>
                </div>
                <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      agent.status === "Online" ? "bg-emerald-500" : "bg-on-surface"
                    }`}
                    style={{ width: `${agent.health}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-medium px-2 py-1 bg-surface-container-high border border-outline-variant text-on-surface-variant rounded">
                  {agent.model}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {agent.tools.map((tool) => {
                  const ToolIcon = tool.icon;
                  return (
                    <span
                      key={tool.name}
                      className="text-[10px] font-medium px-2 py-1 bg-surface-container-high border border-outline-variant text-on-surface rounded flex items-center gap-1"
                    >
                      <ToolIcon className={`w-3 h-3 ${tool.color}`} />
                      {tool.name}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="bg-surface-container-lowest p-4 flex-1 font-mono text-[11px] leading-relaxed text-on-surface-variant relative overflow-hidden min-h-[80px]">
              <div className="flex items-center gap-2 mb-2 text-outline font-sans font-semibold tracking-wider text-[10px] uppercase">
                <Terminal className="w-3 h-3" /> Live Telemetry
              </div>
              {agent.telemetry.map((line, idx) => (
                <p key={idx} className={idx === 0 ? "text-emerald-500/80" : ""}>
                  {line}
                </p>
              ))}
              <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-surface-container-lowest to-transparent"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
