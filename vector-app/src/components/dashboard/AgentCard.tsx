interface AgentProps {
  name: string;
  role: string;
  status: 'Thinking' | 'Processing' | 'Idle';
  task: string;
  confidence: number | null;
  avatarUrl: string;
}

export function AgentCard({ name, role, status, task, confidence, avatarUrl }: AgentProps) {
  
  const getStatusDot = () => {
    switch(status) {
      case 'Thinking': return 'status-dot-processing animate-pulse';
      case 'Processing': return 'status-dot-processing animate-pulse';
      case 'Idle': return 'status-dot-idle';
    }
  };

  return (
    <div className="bg-surface-container border border-outline-variant rounded-lg p-4 hover:border-outline transition-colors relative flex flex-col gap-3">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden">
            <img src={avatarUrl} alt={`${name} Avatar`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-on-surface">{name}</h4>
            <p className="text-xs text-on-surface-variant font-medium">{role}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 bg-surface-container-high px-2 py-1 rounded-md border border-outline-variant">
          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot()}`}></span>
          <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wide">
            {status}
          </span>
        </div>
      </div>
      
      <div className="mt-1">
        <p className="text-sm text-on-surface-variant line-clamp-2 h-10">
          {task}
        </p>
      </div>
      
      {confidence !== null && (
        <div className="mt-auto pt-3 border-t border-outline-variant/50">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-on-surface-variant">Confidence</span>
            <span className="text-xs font-medium text-on-surface">{confidence}%</span>
          </div>
          <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div 
              className="h-full bg-on-surface rounded-full" 
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
