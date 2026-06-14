"use client";

import { useState } from "react";
import { Plus, Terminal, Search, Activity, Cpu, Brain, Target, TrendingUp, DollarSign, Shield, FileText, Zap } from "lucide-react";
import { motion } from "framer-motion";

const agents = [
  {
    name: "Prism",
    role: "Architect Agent",
    description: "Master orchestrator and systems intelligence layer. Understands natural language, delegates tasks to sub-agents, and synthesizes unified strategies.",
    status: "Online" as const,
    health: 94.2,
    model: "Gemini 2.5 Flash",
    tools: [
      { name: "Google Search", icon: Search, color: "text-indigo-500" },
      { name: "URL Context", icon: Activity, color: "text-sky-500" },
      { name: "Doc Generator", icon: FileText, color: "text-emerald-500" },
    ],
    gradient: "from-violet-400 to-purple-600",
    glow: "shadow-violet-500/20",
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/10",
    icon: Brain,
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
    health: 91.7,
    model: "Gemini 2.5 Flash",
    tools: [
      { name: "Web Search", icon: Search, color: "text-indigo-500" },
      { name: "Market Analysis", icon: Activity, color: "text-rose-500" },
      { name: "Doc Generator", icon: FileText, color: "text-emerald-500" },
    ],
    gradient: "from-emerald-400 to-teal-600",
    glow: "shadow-emerald-500/20",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    icon: Target,
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
    health: 97.3,
    model: "Gemini 2.5 Flash",
    tools: [
      { name: "Infrastructure", icon: Cpu, color: "text-sky-500" },
      { name: "Security Audits", icon: Shield, color: "text-amber-500" },
      { name: "Doc Generator", icon: FileText, color: "text-emerald-500" },
    ],
    gradient: "from-blue-400 to-indigo-600",
    glow: "shadow-blue-500/20",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
    icon: Terminal,
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
    health: 88.5,
    model: "Gemini 2.5 Flash",
    tools: [
      { name: "Audience Research", icon: TrendingUp, color: "text-amber-500" },
      { name: "Brand Analysis", icon: Search, color: "text-pink-500" },
      { name: "Doc Generator", icon: FileText, color: "text-emerald-500" },
    ],
    gradient: "from-amber-400 to-orange-600",
    glow: "shadow-amber-500/20",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10",
    icon: TrendingUp,
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
    health: 92.1,
    model: "Gemini 2.5 Flash",
    tools: [
      { name: "Revenue Models", icon: DollarSign, color: "text-emerald-500" },
      { name: "Cost Analysis", icon: Activity, color: "text-indigo-500" },
      { name: "Doc Generator", icon: FileText, color: "text-emerald-500" },
    ],
    gradient: "from-indigo-400 to-violet-600",
    glow: "shadow-indigo-500/20",
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    icon: DollarSign,
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
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-on-surface mb-1">Agent Console</h2>
          <p className="text-sm text-on-surface-variant/70 max-w-2xl">
            Configure, deploy, and monitor your executive AI agents in real-time.
          </p>
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative group max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 w-4 h-4 transition-colors group-focus-within:text-emerald-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-surface-container/50 border border-outline-variant/50 rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-surface focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 w-full transition-all placeholder:text-on-surface-variant/40"
            placeholder="Search agents..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto pb-8">
        {filteredAgents.map((agent, idx) => {
          const AgentIcon = agent.icon;
          return (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="premium-card rounded-xl overflow-hidden flex flex-col group"
            >
              <div className="p-5 border-b border-outline-variant/30">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-white shadow-lg ${agent.glow} transition-transform duration-300 group-hover:scale-110`}>
                      <AgentIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-on-surface">{agent.name}</h3>
                      <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider">{agent.role}</p>
                    </div>
                  </div>
                  <span
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                      agent.status === "Online"
                        ? "bg-emerald-500/8 text-emerald-500 border-emerald-500/15"
                        : "bg-surface-container-high text-on-surface-variant border-outline-variant"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        agent.status === "Online" ? "bg-emerald-500 animate-pulse shadow-[0_0_4px_rgba(16,185,129,0.5)]" : "bg-outline"
                      }`}
                    ></span>
                    {agent.status}
                  </span>
                </div>

                <p className="text-xs text-on-surface-variant/70 mb-4 leading-relaxed line-clamp-2">
                  {agent.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-on-surface-variant/60 flex items-center gap-1.5">
                      <Zap className="w-3 h-3" /> Compute Health
                    </span>
                    <span className="font-bold text-on-surface">{agent.health}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-high/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${agent.health}%` }}
                      transition={{ duration: 1.2, delay: idx * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${agent.gradient}`}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-semibold px-2.5 py-1 bg-surface-container-high/40 border border-outline-variant/30 text-on-surface-variant rounded-lg flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    {agent.model}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {agent.tools.map((tool) => {
                    const ToolIcon = tool.icon;
                    return (
                      <span
                        key={tool.name}
                        className="text-[10px] font-medium px-2 py-1 bg-surface-container-high/30 border border-outline-variant/30 text-on-surface-variant/80 rounded-lg flex items-center gap-1 hover:border-outline-variant/50 transition-colors"
                      >
                        <ToolIcon className={`w-3 h-3 ${tool.color}`} />
                        {tool.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="bg-surface-container-lowest/30 p-4 flex-1 font-mono text-[11px] leading-relaxed text-on-surface-variant/60 relative overflow-hidden min-h-[80px]">
                <div className="flex items-center gap-2 mb-2 text-on-surface-variant/30 font-sans font-bold tracking-wider text-[9px] uppercase">
                  <Terminal className="w-3 h-3" /> Live Telemetry
                </div>
                {agent.telemetry.map((line, i) => (
                  <p key={i} className={i === 0 ? "text-emerald-500/60" : ""}>
                    {line}
                  </p>
                ))}
                <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-surface-container-lowest/80 to-transparent"></div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
