"use client";

import { Activity, Clock, Target, CheckCircle2 } from 'lucide-react';

const upcomingProjects = [
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

export function OperationalInsights() {
  return (
    <section className="bg-surface-container border border-outline-variant rounded-xl p-5 flex-1 shadow-sm">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant">
        <h3 className="text-lg font-semibold text-on-surface flex items-center gap-2">
          Upcoming Projects
        </h3>
        <span className="text-xs font-medium text-on-surface-variant bg-surface-container-high px-2.5 py-1 rounded-full">
          6 Active
        </span>
      </div>

      <div className="space-y-4">
        {upcomingProjects.map((project) => (
          <div 
            key={project.id} 
            className="group flex flex-col p-4 rounded-lg border border-outline-variant/40 bg-surface-container-lowest hover:border-outline-variant hover:shadow-sm transition-all duration-200 cursor-default"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${project.bg} ${project.color}`}>
                  <project.icon size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                    {project.name}
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {project.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                  {project.dueDate}
                </span>
                <span className={`text-[10px] font-semibold mt-1 px-2 py-0.5 rounded-full ${
                  project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                  project.status === 'In Progress' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                  project.status === 'Planning' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                  'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    project.progress === 100 ? 'bg-emerald-500' : 
                    project.progress === 0 ? 'bg-transparent' : 'bg-on-surface'
                  }`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="text-xs font-bold text-on-surface min-w-[3ch] text-right">
                {project.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-2.5 rounded-md border border-outline-variant text-on-surface text-sm font-semibold hover:bg-surface-container-high transition-colors duration-200">
        View All Projects
      </button>
    </section>
  );
}
