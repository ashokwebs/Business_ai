"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Loader2, FolderOpen, MessageSquare, Clock, ExternalLink, FileText, Activity, Target, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

type Conversation = {
  conversation_id: string;
  title?: string;
  created_at?: string;
  messages?: { role: string; content: string }[];
  documents_count?: number;
};

const activeInitiatives = [
  {
    id: 1,
    name: "Project Quantum",
    description: "Next-gen video rendering pipeline",
    status: "In Progress",
    progress: 75,
    dueDate: "Q3 2026",
    icon: Activity,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: 2,
    name: "Nexus Redesign",
    description: "Overhaul of the core user dashboard",
    status: "Planning",
    progress: 25,
    dueDate: "Q4 2026",
    icon: Target,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    id: 3,
    name: "Vanguard Launch",
    description: "Global marketing campaign execution",
    status: "Pending",
    progress: 0,
    dueDate: "Q1 2027",
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    id: 4,
    name: "Ledger API Integration",
    description: "Stripe and PayPal multi-currency support",
    status: "Completed",
    progress: 100,
    dueDate: "Q2 2026",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    id: 5,
    name: "Atlas Data Lake",
    description: "Enterprise user telemetry aggregation",
    status: "In Progress",
    progress: 60,
    dueDate: "Q3 2026",
    icon: Activity,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    id: 6,
    name: "Prism NLU V2",
    description: "Upgraded Natural Language Understanding",
    status: "Planning",
    progress: 10,
    dueDate: "Q4 2026",
    icon: Target,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  }
];

const seedProjects: Conversation[] = [
  {
    conversation_id: "seed-quantum-ai-saas",
    title: "Quantum AI — SaaS Analytics Platform",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    messages: [
      { role: "user", content: "Build a SaaS analytics platform powered by AI that provides real-time business intelligence dashboards for startups." },
      { role: "assistant", content: "I'll coordinate the executive council to develop a comprehensive strategy for Quantum AI. Atlas will handle business strategy, Nexus will architect the tech stack, Vanguard will design the GTM plan, and Ledger will model the financials..." },
      { role: "assistant", content: "## Executive Summary\n\nQuantum AI is a next-generation SaaS analytics platform that leverages machine learning to deliver real-time business intelligence. Target market: Series A–B startups needing actionable insights without a dedicated data team." },
    ],
    documents_count: 4,
  },
  {
    conversation_id: "seed-nexus-fintech",
    title: "Nexus Pay — Fintech Super App",
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    messages: [
      { role: "user", content: "Design a fintech super app combining payments, investments, and budgeting with AI-driven financial advice." },
      { role: "assistant", content: "Excellent concept. The council is analyzing the fintech landscape. Ledger is modeling revenue streams while Nexus evaluates the regulatory tech stack requirements..." },
    ],
    documents_count: 3,
  },
  {
    conversation_id: "seed-vanguard-edtech",
    title: "Vanguard Learn — AI Tutoring Platform",
    created_at: new Date(Date.now() - 8 * 86400000).toISOString(),
    messages: [
      { role: "user", content: "Create an AI-powered adaptive tutoring platform for K-12 students with personalized learning paths." },
      { role: "assistant", content: "Atlas is drafting the business model. The EdTech market is projected at $400B by 2027. We'll target US public school districts first..." },
      { role: "assistant", content: "Nexus recommends a microservices architecture with a real-time assessment engine powered by Gemini for dynamic question generation." },
      { role: "user", content: "What about the competitive landscape?" },
      { role: "assistant", content: "Vanguard has completed the competitive analysis. Key competitors: Khan Academy, Duolingo, Century Tech. Our differentiator: real-time adaptive difficulty powered by multi-modal AI assessment." },
    ],
    documents_count: 6,
  },
  {
    conversation_id: "seed-atlas-healthtech",
    title: "Atlas Health — Remote Patient Monitoring",
    created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
    messages: [
      { role: "user", content: "Build a remote patient monitoring platform integrating IoT wearables with AI diagnostics for chronic disease management." },
      { role: "assistant", content: "This is a high-impact healthcare initiative. Atlas is evaluating the regulatory landscape (HIPAA, FDA clearance). Nexus is designing the IoT data pipeline architecture..." },
    ],
    documents_count: 5,
  },
  {
    conversation_id: "seed-prism-devtools",
    title: "Prism DevKit — AI Developer Tools",
    created_at: new Date(Date.now() - 18 * 86400000).toISOString(),
    messages: [
      { role: "user", content: "Create an AI-powered developer toolkit that automates code review, generates documentation, and provides intelligent debugging assistance." },
      { role: "assistant", content: "The council is excited about this one. Nexus is architecting the AST analysis engine. Atlas sees a $15B TAM in developer productivity tools..." },
      { role: "assistant", content: "## Technical Architecture\n\nCore engine: Language-agnostic AST parser → Gemini 2.5 reasoning layer → IDE plugin interface. Supporting: GitHub/GitLab CI integration, real-time collaboration, and team analytics." },
    ],
    documents_count: 7,
  },
  {
    conversation_id: "seed-ledger-proptech",
    title: "Ledger Estates — AI Property Valuation",
    created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
    messages: [
      { role: "user", content: "Design a proptech platform that uses AI for real-time property valuation, market prediction, and investment portfolio optimization." },
      { role: "assistant", content: "Ledger is modeling the financial projections. The proptech market offers strong unit economics with a SaaS + transaction fee hybrid model..." },
    ],
    documents_count: 2,
  },
];

export default function ProjectsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchConversations() {
      try {
        const res = await fetch('/api/conversations');
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setConversations(data.conversations || []);
      } catch {
        // Silently handle — seed projects will show
      } finally {
        setLoading(false);
      }
    }
    fetchConversations();
  }, []);

  // Merge real conversations with seed projects, real ones first
  const allProjects = [...conversations, ...seedProjects.filter(
    (seed) => !conversations.some((c) => c.conversation_id === seed.conversation_id)
  )];

  const filtered = allProjects.filter(
    (c) =>
      (c.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.conversation_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTimeAgo = (dateStr?: string) => {
    if (!dateStr) return "Unknown";
    try {
      const diff = Date.now() - new Date(dateStr).getTime();
      const mins = Math.floor(diff / 60000);
      if (mins < 1) return "Just now";
      if (mins < 60) return `${mins}m ago`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    } catch {
      return "Unknown";
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-12 pb-8 max-w-[1600px] mx-auto flex flex-col pt-6 md:pt-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-on-surface mb-1">Projects</h2>
          <p className="text-sm text-on-surface-variant/70 max-w-2xl">
            Manage your startup portfolios, active workspaces, and strategic initiatives.
          </p>
        </div>
        <Link
          href="/boardroom"
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </motion.div>

      {/* Search */}
      <div className="mb-10">
        <div className="relative group max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 w-4 h-4 transition-colors group-focus-within:text-emerald-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-surface-container/50 border border-outline-variant/50 rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-surface focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 w-full transition-all placeholder:text-on-surface-variant/40"
            placeholder="Search projects or agents..."
          />
        </div>
      </div>

      {/* Strategic Initiatives Section */}
      {!searchQuery && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl font-bold text-on-surface">Strategic Initiatives</h3>
            <span className="bg-surface-container-high text-on-surface-variant text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {activeInitiatives.length} Active
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeInitiatives.map((project) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: project.id * 0.06 }}
                className="premium-card group flex flex-col p-5 rounded-xl cursor-default"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${project.bg} ${project.color}`}>
                      <project.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-on-surface group-hover:text-primary transition-colors">
                        {project.name}
                      </h4>
                      <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                      project.status === 'In Progress' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                      project.status === 'Planning' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                      'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-outline-variant/40">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wide">
                      Target: {project.dueDate}
                    </span>
                    <span className="text-xs font-bold text-on-surface">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        project.progress === 100 ? 'bg-emerald-500' : 
                        project.progress === 0 ? 'bg-transparent' : 'bg-on-surface'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Agent Workspaces Section */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-on-surface mb-6">Agent Workspaces</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-surface border border-outline-variant rounded-xl p-12 text-center text-on-surface-variant flex flex-col items-center">
          <FolderOpen className="w-12 h-12 mb-4 opacity-30" />
          <p className="text-lg font-medium text-on-surface">
            {searchQuery ? "No matching projects" : "No projects yet"}
          </p>
          <p className="text-sm mt-1">
            {searchQuery
              ? "Try a different search term."
              : "Start a conversation in the Board Room to create your first project."}
          </p>
          {!searchQuery && (
            <Link
              href="/boardroom"
              className="mt-4 bg-on-surface text-surface-container-lowest px-4 py-2 rounded-md text-sm font-semibold hover:bg-on-surface/90 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Start New Project
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((conv, idx) => {
            const msgCount = conv.messages?.length || 0;
            const lastMsg = conv.messages?.[conv.messages.length - 1];
            const preview = lastMsg?.content?.slice(0, 120) || "No messages yet";
            const isSeed = conv.conversation_id.startsWith("seed-");
            const gradients = [
              "from-emerald-400 to-teal-600",
              "from-blue-400 to-indigo-600",
              "from-violet-400 to-purple-600",
              "from-amber-400 to-orange-600",
              "from-rose-400 to-pink-600",
              "from-cyan-400 to-blue-600",
            ];
            const gradient = gradients[idx % gradients.length];

            return (
              <motion.div
                key={conv.conversation_id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Link
                  href="/boardroom"
                  onClick={() => {
                    if (!isSeed) localStorage.setItem('active_conversation_id', conv.conversation_id);
                  }}
                  className="premium-card rounded-xl p-5 flex flex-col gap-3 group block"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg shrink-0`}>
                        {(conv.title || "P").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-on-surface group-hover:text-emerald-500 transition-colors line-clamp-1">
                          {conv.title || "Untitled Project"}
                        </h3>
                        <p className="text-[10px] text-on-surface-variant/50 font-mono mt-0.5">
                          {isSeed ? "Demo Project" : conv.conversation_id.slice(0, 16) + "..."}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                  </div>

                  <p className="text-xs text-on-surface-variant/70 line-clamp-2 leading-relaxed">
                    {preview}...
                  </p>

                  <div className="flex items-center gap-4 mt-auto pt-2 border-t border-outline-variant/30">
                    <div className="flex items-center gap-1 text-[10px] text-on-surface-variant/60">
                      <MessageSquare className="w-3 h-3" />
                      <span>{msgCount} messages</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-on-surface-variant/60">
                      <FileText className="w-3 h-3 text-emerald-500/60" />
                      <span>{conv.documents_count || 0} documents</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-on-surface-variant/60">
                      <Clock className="w-3 h-3" />
                      <span>{getTimeAgo(conv.created_at)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
