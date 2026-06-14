'use client';

import { Brain, Target, Terminal, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface AgentProps {
  name: string;
  role: string;
  status: 'Thinking' | 'Processing' | 'Idle';
  task: string;
  confidence: number | null;
  avatarUrl: string;
  color?: string;
}

const agentIcons: Record<string, React.ReactNode> = {
  Atlas: <Target className="w-4 h-4" />,
  Nexus: <Terminal className="w-4 h-4" />,
  Prism: <Brain className="w-4 h-4" />,
  Vanguard: <TrendingUp className="w-4 h-4" />,
  Ledger: <DollarSign className="w-4 h-4" />,
};

const agentGradients: Record<string, string> = {
  Atlas: 'from-emerald-400 to-teal-600',
  Nexus: 'from-blue-400 to-indigo-600',
  Prism: 'from-violet-400 to-purple-600',
  Vanguard: 'from-amber-400 to-orange-600',
  Ledger: 'from-indigo-400 to-violet-600',
};

const agentGlows: Record<string, string> = {
  Atlas: 'shadow-emerald-500/20',
  Nexus: 'shadow-blue-500/20',
  Prism: 'shadow-violet-500/20',
  Vanguard: 'shadow-amber-500/20',
  Ledger: 'shadow-indigo-500/20',
};

export function AgentCard({ name, role, status, task, confidence }: AgentProps) {
  
  const getStatusDot = () => {
    switch(status) {
      case 'Thinking': return 'status-dot-processing animate-pulse';
      case 'Processing': return 'status-dot-processing animate-pulse';
      case 'Idle': return 'status-dot-idle';
    }
  };

  const gradient = agentGradients[name] || 'from-zinc-400 to-zinc-600';
  const glow = agentGlows[name] || 'shadow-zinc-500/20';
  const icon = agentIcons[name] || <Brain className="w-4 h-4" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="premium-card rounded-xl p-4 flex flex-col gap-3 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg ${glow} transition-transform duration-300 group-hover:scale-110`}>
            {icon}
          </div>
          <div>
            <h4 className="text-sm font-bold text-on-surface">{name}</h4>
            <p className="text-[11px] text-on-surface-variant font-medium">{role}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 bg-surface-container-high/60 px-2.5 py-1 rounded-lg border border-outline-variant/50">
          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot()}`}></span>
          <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
            {status}
          </span>
        </div>
      </div>
      
      <div className="mt-1">
        <p className="text-[13px] text-on-surface-variant/80 line-clamp-2 h-10 leading-relaxed">
          {task}
        </p>
      </div>
      
      {confidence !== null && (
        <div className="mt-auto pt-3 border-t border-outline-variant/30">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-on-surface-variant font-medium">Confidence</span>
            <span className="text-[11px] font-bold text-on-surface">{confidence}%</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest/50 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
