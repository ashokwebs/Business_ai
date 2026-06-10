"use client";

import { Download, RefreshCcw, Search, Network, Cloud, Database, Cpu, Lock, Maximize2, Server, Layers, Video, ShieldAlert, Workflow, Zap } from "lucide-react";

export default function ArchitecturePage() {
  return (
    <div className="px-6 md:px-12 pb-8 max-w-[1600px] mx-auto h-[calc(100vh-4rem)] flex flex-col pt-8">
      <div className="mb-6 flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-1">System Architecture</h2>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            Live technical blueprints, microservice topologies, and AI model orchestration for the Gengen Video Pipeline.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-surface-container border border-outline-variant text-on-surface px-4 py-2 rounded-md text-sm font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-2">
            <RefreshCcw className="w-4 h-4" />
            Regenerate
          </button>
          <button className="bg-on-surface text-surface-container-lowest px-4 py-2 rounded-md text-sm font-semibold hover:bg-on-surface/90 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Config
          </button>
        </div>
      </div>

      {/* Interactive Canvas */}
      <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col overflow-hidden relative shadow-sm">
        
        {/* Canvas Toolbar */}
        <div className="h-12 border-b border-outline-variant bg-surface-container/50 backdrop-blur-md flex items-center justify-between px-4 z-10 absolute top-0 w-full">
          <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Production (US-East)</span>
            <span className="mx-2 text-outline-variant">|</span>
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-500" /> Auto-Scaling Active</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-md transition-colors"><Search className="w-4 h-4" /></button>
            <button className="p-1.5 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-md transition-colors"><Maximize2 className="w-4 h-4" /></button>
          </div>
        </div>

        {/* The Grid / Map Area */}
        <div className="flex-1 w-full h-full relative overflow-x-auto overflow-y-hidden bg-[radial-gradient(circle_at_center,var(--outline-variant)_1px,transparent_1px)] bg-[length:24px_24px] mt-12 cursor-grab active:cursor-grabbing">
          
          <div className="min-w-[1400px] h-[700px] relative">
            {/* SVG Connecting Lines */}
            <svg className="absolute w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="var(--outline-color)" className="opacity-50" />
                </marker>
                <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                </marker>
              </defs>
              
              {/* Cloudflare to API */}
              <path d="M 180,300 C 220,300 220,300 260,300" stroke="var(--outline-color)" strokeWidth="2" markerEnd="url(#arrowhead)" fill="none" className="opacity-50" />
              
              {/* API to MCP Orchestrator */}
              <path d="M 440,300 C 480,300 480,300 520,300" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowhead-active)" fill="none" className="animate-[dash_1s_linear_infinite]" />
              
              {/* Orchestrator to DB */}
              <path d="M 700,300 C 740,300 740,150 780,150" stroke="var(--outline-color)" strokeWidth="2" markerEnd="url(#arrowhead)" fill="none" className="opacity-50" />
              
              {/* Orchestrator to Vertex AI */}
              <path d="M 700,300 C 740,300 740,450 780,450" stroke="var(--outline-color)" strokeWidth="2" markerEnd="url(#arrowhead)" fill="none" className="opacity-50" />
              
              {/* Orchestrator to Redis Queue */}
              <path d="M 700,300 C 740,300 740,300 780,300" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowhead-active)" fill="none" className="animate-[dash_1s_linear_infinite]" />
              
              {/* Redis Queue to GPU Cluster */}
              <path d="M 960,300 C 1000,300 1000,300 1040,300" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowhead-active)" fill="none" className="animate-[dash_1s_linear_infinite]" />

              {/* GPU Cluster to Base Model */}
              <path d="M 1220,300 C 1260,300 1260,220 1300,220" stroke="var(--outline-color)" strokeWidth="2" markerEnd="url(#arrowhead)" fill="none" className="opacity-50" />

              {/* GPU Cluster to LoRA */}
              <path d="M 1220,300 C 1260,300 1260,300 1300,300" stroke="var(--outline-color)" strokeWidth="2" markerEnd="url(#arrowhead)" fill="none" className="opacity-50" />

              {/* GPU Cluster to S3 */}
              <path d="M 1220,300 C 1260,300 1260,420 1300,420" stroke="var(--outline-color)" strokeWidth="2" markerEnd="url(#arrowhead)" fill="none" className="opacity-50" />
            </svg>

            {/* CSS Animation for data flow */}
            <style jsx>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: -8;
                }
              }
            `}</style>

            {/* Node 1: Cloudflare WAF */}
            <div className="absolute left-[20px] top-[260px] w-40 bg-surface border border-outline-variant rounded-lg p-3 shadow-md pointer-events-auto hover:border-outline transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-orange-500/10 text-orange-500 flex items-center justify-center"><ShieldAlert className="w-3.5 h-3.5" /></div>
                <span className="text-sm font-semibold text-on-surface">Edge WAF</span>
              </div>
              <div className="text-[10px] text-on-surface-variant font-mono">Cloudflare Proxy</div>
            </div>

            {/* Node 2: API Gateway */}
            <div className="absolute left-[260px] top-[260px] w-44 bg-surface border border-outline-variant rounded-lg p-3 shadow-md pointer-events-auto hover:border-outline transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-indigo-500/10 text-indigo-500 flex items-center justify-center"><Network className="w-3.5 h-3.5" /></div>
                <span className="text-sm font-semibold text-on-surface">API Gateway</span>
              </div>
              <div className="text-[10px] text-on-surface-variant font-mono">Next.js Edge Runtime</div>
            </div>

            {/* Node 3: MCP Server */}
            <div className="absolute left-[520px] top-[245px] w-44 bg-surface border-2 border-emerald-500/50 rounded-lg p-3 shadow-[0_0_15px_rgba(16,185,129,0.15)] pointer-events-auto group relative overflow-hidden">
              <div className="absolute inset-0 bg-emerald-500/5 animate-pulse"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-500 flex items-center justify-center"><Cpu className="w-3.5 h-3.5" /></div>
                  <span className="text-sm font-semibold text-on-surface">Orchestrator</span>
                </div>
                <div className="text-[10px] text-on-surface-variant font-mono mb-2">MCP Agent Server (Python)</div>
                <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[45%]"></div>
                </div>
              </div>
            </div>

            {/* Node 4: Database */}
            <div className="absolute left-[780px] top-[110px] w-44 bg-surface border border-outline-variant rounded-lg p-3 shadow-md pointer-events-auto hover:border-outline transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center"><Database className="w-3.5 h-3.5" /></div>
                <span className="text-sm font-semibold text-on-surface">State Storage</span>
              </div>
              <div className="text-[10px] text-on-surface-variant font-mono">MongoDB Atlas ReplicaSet</div>
            </div>

            {/* Node 5: Redis Queue */}
            <div className="absolute left-[780px] top-[260px] w-44 bg-surface border border-outline-variant rounded-lg p-3 shadow-md pointer-events-auto hover:border-outline transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-rose-500/10 text-rose-500 flex items-center justify-center"><Workflow className="w-3.5 h-3.5" /></div>
                <span className="text-sm font-semibold text-on-surface">Job Queue</span>
              </div>
              <div className="text-[10px] text-on-surface-variant font-mono mb-2">Redis Cluster</div>
              <div className="flex justify-between text-[9px] text-on-surface-variant">
                <span>Pending Jobs: 24</span>
                <span className="text-emerald-500">Processing</span>
              </div>
            </div>

            {/* Node 6: LLM Engine (Vertex AI) */}
            <div className="absolute left-[780px] top-[410px] w-44 bg-surface border border-outline-variant rounded-lg p-3 shadow-md pointer-events-auto hover:border-outline transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center"><Cloud className="w-3.5 h-3.5" /></div>
                <span className="text-sm font-semibold text-on-surface">Prompt Eng. LLM</span>
              </div>
              <div className="text-[10px] text-on-surface-variant font-mono">Vertex AI (Gemini Flash)</div>
            </div>

            {/* Security Wrapper (Model Armor) */}
            <div className="absolute left-[765px] top-[390px] w-52 h-28 border border-dashed border-rose-500/40 rounded-xl pointer-events-none">
              <div className="absolute -top-3 left-3 bg-surface-container-lowest px-1 flex items-center gap-1 text-[10px] text-rose-500 font-semibold tracking-wider">
                <Lock className="w-3 h-3" /> MODEL ARMOR
              </div>
            </div>

            {/* Node 7: GPU Rendering Cluster */}
            <div className="absolute left-[1040px] top-[245px] w-44 bg-surface border border-outline-variant rounded-lg p-3 shadow-md pointer-events-auto hover:border-outline transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-purple-500/10 text-purple-500 flex items-center justify-center"><Server className="w-3.5 h-3.5" /></div>
                <span className="text-sm font-semibold text-on-surface">GPU Render Nodes</span>
              </div>
              <div className="text-[10px] text-on-surface-variant font-mono mb-2">AWS EKS (A100/T4 Spot)</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '200ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '400ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-surface-container-high"></span>
                <span className="text-[9px] text-on-surface-variant ml-2">3/4 Nodes Active</span>
              </div>
            </div>

            {/* Node 8: Base Diffusion Model */}
            <div className="absolute left-[1300px] top-[180px] w-44 bg-surface border border-outline-variant rounded-lg p-3 shadow-md pointer-events-auto hover:border-outline transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-cyan-500/10 text-cyan-500 flex items-center justify-center"><Layers className="w-3.5 h-3.5" /></div>
                <span className="text-sm font-semibold text-on-surface">Base Model</span>
              </div>
              <div className="text-[10px] text-on-surface-variant font-mono">Stable Video Diffusion v1.1</div>
            </div>

            {/* Node 9: Temporal LoRA Weights */}
            <div className="absolute left-[1300px] top-[260px] w-44 bg-surface border border-outline-variant rounded-lg p-3 shadow-md pointer-events-auto hover:border-outline transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-pink-500/10 text-pink-500 flex items-center justify-center"><Network className="w-3.5 h-3.5" /></div>
                <span className="text-sm font-semibold text-on-surface">Temporal LoRA</span>
              </div>
              <div className="text-[10px] text-on-surface-variant font-mono">Custom VRAM Injector</div>
            </div>

            {/* Node 10: AWS S3 Storage */}
            <div className="absolute left-[1300px] top-[380px] w-44 bg-surface border border-outline-variant rounded-lg p-3 shadow-md pointer-events-auto hover:border-outline transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center"><Video className="w-3.5 h-3.5" /></div>
                <span className="text-sm font-semibold text-on-surface">Object Storage</span>
              </div>
              <div className="text-[10px] text-on-surface-variant font-mono">AWS S3 + CloudFront CDN</div>
            </div>

            {/* Grouping Box for Models */}
            <div className="absolute left-[1285px] top-[160px] w-52 h-[160px] border border-dashed border-cyan-500/30 rounded-xl pointer-events-none">
              <div className="absolute -top-3 right-3 bg-surface-container-lowest px-1 flex items-center gap-1 text-[10px] text-cyan-500 font-semibold tracking-wider uppercase">
                Inference Pipeline
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
