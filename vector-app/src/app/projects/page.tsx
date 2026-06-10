"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Loader2, FolderOpen, MessageSquare, Clock, ExternalLink, FileText, Activity, Target, CheckCircle2 } from "lucide-react";
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
        // Silently handle — will show empty state
      } finally {
        setLoading(false);
      }
    }
    fetchConversations();
  }, []);

  const filtered = conversations.filter(
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
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-on-surface mb-1">Projects</h2>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            Manage your startup portfolios, active workspaces, and strategic initiatives.
          </p>
        </div>
        <Link
          href="/boardroom"
          className="bg-on-surface text-surface-container-lowest px-4 py-2 rounded-md text-sm font-semibold hover:bg-on-surface/90 transition-colors flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      {/* Search */}
      <div className="mb-10">
        <div className="relative focus-within:ring-1 focus-within:ring-outline rounded-md transition-shadow max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-surface-container border border-outline-variant rounded-md py-2 pl-10 pr-4 text-sm text-on-surface focus:outline-none w-full transition-colors placeholder:text-on-surface-variant/50"
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
              <div 
                key={project.id} 
                className="group flex flex-col p-5 rounded-xl border border-outline-variant/50 bg-surface-container-lowest hover:border-outline hover:shadow-md transition-all duration-300 cursor-default"
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
              </div>
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
          {filtered.map((conv) => {
            const msgCount = conv.messages?.length || 0;
            const lastMsg = conv.messages?.[conv.messages.length - 1];
            const preview = lastMsg?.content?.slice(0, 120) || "No messages yet";

            return (
              <Link
                key={conv.conversation_id}
                href="/boardroom"
                onClick={() => {
                  localStorage.setItem('active_conversation_id', conv.conversation_id);
                }}
                className="bg-surface border border-outline-variant rounded-xl p-5 hover:border-outline transition-all group flex flex-col gap-3 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0">
                      <span className="font-mono text-sm font-bold text-on-surface">
                        {(conv.title || "P").charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-on-surface group-hover:text-emerald-500 transition-colors line-clamp-1">
                        {conv.title || "Untitled Project"}
                      </h3>
                      <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">{conv.conversation_id.slice(0, 16)}...</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                </div>

                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {preview}...
                </p>

                <div className="flex items-center gap-4 mt-auto pt-2 border-t border-outline-variant/50">
                  <div className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                    <MessageSquare className="w-3 h-3" />
                    <span>{msgCount} messages</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                    <FileText className="w-3 h-3 text-emerald-500" />
                    <span>{conv.documents_count || 0} documents</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                    <Clock className="w-3 h-3" />
                    <span>{getTimeAgo(conv.created_at)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
